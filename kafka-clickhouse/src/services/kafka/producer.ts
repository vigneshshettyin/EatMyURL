import { CompressionTypes, Producer } from 'kafkajs';

import KafkaClient from './connection.js';
import UserLocationService from '../location/location.js';
import { ProduceMessage, UserLocation } from './types.js';

class KafkaProducer {
  private producer: Producer | null = null;

  private async getProducer(): Promise<Producer> {
    if (!this.producer) {
      this.producer = await KafkaClient.connectProducer();
    }
    return this.producer;
  }

  public async produceLogic(
    ip: string,
    browser: string,
    os: string,
    device: string,
    code: string,
  ): Promise<void> {
    try {
      const userLocation: UserLocation =
        await UserLocationService.getUserLocation(ip);
      const message: ProduceMessage = {
        code,
        browser,
        os,
        device,
        ...userLocation,
      };
      const produceableMessage = JSON.stringify(message);
      const producer = await this.getProducer();
      await producer.send({
        topic: 'click_analytics',
        compression: CompressionTypes.GZIP,
        messages: [
          {
            value: produceableMessage,
          },
        ],
      });
      console.log(`Message sent: ${produceableMessage}`);
    } catch (error) {
      console.error(`Unable to send message: ${JSON.stringify(error)}`, error);
    }
  }
}

export default new KafkaProducer();
