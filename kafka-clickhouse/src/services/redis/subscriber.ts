// worker.js
import { parentPort } from 'worker_threads';
import RedisQueue from './connection.js';
import KafkaProducer from '../kafka/producer.js';

let running = true;

async function processQueue(): Promise<void> {
  while (running) {
    try {
      const message = await RedisQueue.dequeue(10);
      if (message) {
        const { ip, browser, os, device, code } = message;
        await KafkaProducer.produceLogic(ip, browser, os, device, code);
      }
    } catch (error) {
      console.error('Error processing queue:', error);
    }
  }
  await RedisQueue.quit();
}

process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down...');
  running = false;
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down...');
  running = false;
});

console.log('Queue processor started. Waiting for messages...');

processQueue().catch((error) => {
  console.error('Error starting queue processor:', error);
});

if (parentPort) {
  parentPort.on('message', (message) => {
    if (message === 'stop') {
      running = false;
    }
  });
}
