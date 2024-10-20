import rabbitmqConnection from './connection.js';
import UserLocationService from '../location/location.js';
import { ProduceMessage, UserLocation } from './types.js';


const exchangeName = 'exchange';                 // The exchange name
const routingKey = 'eurl_click_analytics';       // The routing key

const pub = rabbitmqConnection.createPublisher({
  // Enable publish confirmations, similar to consumer acknowledgements
  confirm: true,
  // Enable retries
  maxAttempts: 2,
  // Ensure the existence of an exchange before we use it
  exchanges: [{ exchange: exchangeName, type: 'fanout', durable: true }],
});

// Publish a message for testing
// pub.send({ exchange: exchangeName, routingKey: routingKey }, {
//   code: '123',
//   browser: 'Chrome',
//   os: 'Windows',
//   device: 'Desktop',
//   country: 'US',
//   region: 'CA',
//   city: 'Los Angeles',
// })
//   .then(() => console.log('Message published'))
//   .catch((error) => console.error('Error publishing message:', error));

// TODO: Implement the Producer class
// TODO: Make it batch processing

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
    console.log('Producing message:', message);
    pub.send(
      {exchange: exchangeName, routingKey: routingKey}, // metadata
      message
    ).catch((error) => {
      console.error('Error producing message:', error);
  }).finally(() => {
    console.log('Message produced');
  });
}
}

const instance = new Producer();

export default instance;
