const UserLocationService = require("../services/userLocation");
const KafkaClient = require("../kafka/connect");
const { CompressionTypes } = require("kafkajs");

class ProducerController {
  constructor() {
    this.producer = KafkaClient.connectProducer();
  }
  async produce_logic(ip, browser, os, device, code) {
    try {
      const userLocation = await UserLocationService.getUserLocation(ip);
      const message = {
        code,
        browser,
        os,
        device,
        ...userLocation,
      };
      const produceableMessage = JSON.stringify(message);
      const producer = await KafkaClient.connectProducer();
      await producer.send({
        topic: "click_analytics",
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

module.exports = new ProducerController();
