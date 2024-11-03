import rabbitmqConnection from './connection.js';
import UserLocationService from '../location/location.js';
import { ProduceMessage, UserLocation } from './types.js';

const exchangeName = 'exchange';                 // The exchange name
const routingKey = 'eurl_click_analytics';       // The routing key
const batchSize = 10;                            // Set batch size for messages

const pub = rabbitmqConnection.createPublisher({
  confirm: true,                                // Enable publish confirmations
  maxAttempts: 2,                               // Enable retries
  exchanges: [{ exchange: exchangeName, type: 'fanout', durable: true }], // Ensure the exchange exists
});

class Producer {
  private dump: ProduceMessage[];                // Batch of messages

  constructor() {
    this.dump = [];
  }

  public async produceLogic(ip: string, browser: string, os: string, device: string, code: string): Promise<void> {
    try {
      const location: UserLocation = await UserLocationService.getUserLocation(ip);
      const message: ProduceMessage = {
        code,
        browser,
        os,
        device,
        country: location.country,
        region: location.region,
        city: location.city,
      };

      console.log(`[INFO] Adding message to batch: ${JSON.stringify(message)}`);
      this.dump.push(message);

      if (this.dump.length >= batchSize) {
        await this.publishBatch();
      }
    } catch (error) {
      console.error(`[ERROR] Failed to process message for IP ${ip}:`, error);
    }
  }

  private async publishBatch(): Promise<void> {
    try {
      await pub.send({ exchange: exchangeName, routingKey: routingKey }, this.dump);
      console.log(`[SUCCESS] Published ${this.dump.length} messages at ${new Date().toISOString()}`);
    } catch (error) {
      console.error(`[ERROR] Failed to publish batch of ${this.dump.length} messages:`, error);
    } finally {
      this.dump = [];  // Clear batch regardless of success or failure
    }
  }
}

const instance = new Producer();
export default instance;
