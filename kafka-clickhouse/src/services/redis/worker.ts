import { Worker } from 'worker_threads';

const numWorkers = 4;
const workers = [];

import path from 'path';

const __dirname = path.resolve();

function getDynamicPath(): string {
    const loc = path.resolve(__dirname, 'build/src/services/redis/subscriber.js');
    return loc;
  }

for (let i = 0; i < numWorkers; i++) {
  const worker = new Worker(getDynamicPath());
  workers.push(worker);

  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });

  worker.on('error', (error) => {
    console.error('Worker error:', error);
  });
}

process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down...');
  stopWorkers();
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down...');
  stopWorkers();
});

function stopWorkers(): void {
  for (const worker of workers) {
    worker.postMessage('stop');
  }
}

function log(): string {
  return 'Worker threads started';
}

export default log;
