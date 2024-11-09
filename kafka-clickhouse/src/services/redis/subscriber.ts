// worker.js
import { parentPort } from 'worker_threads';
import RedisQueue from './connection.js';
import KafkaProducer from '../rabbitmq/producer.js';
import { SourceObjects } from '../rabbitmq/types.js';

let running = true;
const batch = 10;

async function processQueue(): Promise<void> {
  const batchMessages : SourceObjects[] = [];
  while (running) {
    try {
      const message = await RedisQueue.dequeue(10);
      if (message) {
        batchMessages.push(message);
        if (batchMessages.length < batch) {
          continue;
        }
        else {
          await KafkaProducer.produceLogic(batchMessages);
          batchMessages.length = 0;
        }
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
