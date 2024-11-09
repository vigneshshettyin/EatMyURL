import rabbitmqConnection from './connection.js';
import UserLocationService from '../location/location.js';
import { ProduceMessage, UserLocation, SourceObjects } from './types.js';


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

// const test_data = [
//   {
//     code: '123',
//     browser: 'Chrome',
//     os: 'Windows',
//     device: 'Desktop',
//     country: 'US',
//     region: 'CA',
//     city: 'Los Angeles',
//   },
//   {
//     code: '123',
//     browser: 'Chrome',
//     os: 'Windows',
//     device: 'Desktop',
//     country: 'US',
//     region: 'CA',
//     city: 'Los Angeles',
//   },
//   {
//     code: '123',
//     browser: 'Chrome',
//     os: 'Windows',
//     device: 'Desktop',
//     country: 'US',
//     region: 'CA',
//     city: 'Los Angeles',
//   },
//   {
//     code: '123',
//     browser: 'Chrome',
//     os: 'Windows',
//     device: 'Desktop',
//     country: 'US',
//     region: 'CA',
//     city: 'Los Angeles',
//   }
// ]

// // Publish a message for testing
// pub.send({ exchange: exchangeName, routingKey: routingKey }, test_data)
//   .then(() => console.log('Message published'))
//   .catch((error) => console.error('Error publishing message:', error));

// TODO: Implement the Producer class
// TODO: Make it batch processing

class Producer {
  async produceLogic(produceObjects : SourceObjects[]): Promise<void> {
    const messages: ProduceMessage[] = [];
    for (const obj of produceObjects) {
      const { ip, browser, os, device, code } = obj;
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
      messages.push(message);
    }
    pub.send(
      {exchange: exchangeName, routingKey: routingKey},
      messages
    ).catch((error) => {
      console.error('Error producing message:', error);
      messages.length = 0;
  }).finally(() => {
    console.log(`[Info] : Produced ${messages.length} messages at ${new Date().toISOString()}`);
    messages.length = 0;
  });
}
}

const instance = new Producer();

export default instance;
