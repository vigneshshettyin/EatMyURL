import rabbitmqConnection from './connection.js';
import UserLocationService from '../location/location.js';
import { ProduceMessage, UserLocation } from './types.js';

const publisher = rabbitmqConnection.createPublisher({
  confirm: true,
  maxAttempts: 2,
  exchanges: [{exchange: 'my-events', type: 'topic'}]
})

class Producer {
  async produceLogic(ip: string, browser: string, os: string, device: string, code: string): Promise<void> {
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
    publisher.send(
      {exchange: 'my-events', routingKey: 'users.visit'}, // metadata
      JSON.stringify(message)
    ).catch((error) => {
      console.error('Error producing message:', error);
  }).finally(() => {
    console.log('Message produced');
  });
}
}

const instance = new Producer();

export default instance;
