const UserLocationService = require("../services/userLocation");
const KafkaClient = require("../kafka/connect");
const { CompressionTypes } = require("kafkajs");

class ProducerController {
  constructor() {
    this.producer = KafkaClient.connectProducer();
  }

  async produce(req, res) {
    try {
      const { ip, browser, os, device, code } = req.body;
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
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error(`Unable to send message: ${JSON.stringify(error)}`, error);
      res.status(500).json({ message: "Unable to send message" });
    }
  }
}

module.exports = new ProducerController();
