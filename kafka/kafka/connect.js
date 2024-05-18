const { Kafka } = require("kafkajs");

class KafkaClient {
  constructor() {
    if (KafkaClient.instance) {
      return KafkaClient.instance;
    }

    this.kafka = new Kafka({
      clientId: "my-app",
      brokers: [process.env.KAFKA_BROKER],
      connectionTimeout: 10000,
      ssl: true,
      sasl: {
        mechanism: "plain",
        username: process.env.KAFKA_USER,
        password: process.env.KAFKA_PASSWORD,
      },
    });

    this.producer = null;
    this.consumer = null;

    KafkaClient.instance = this;
  }

  admin() {
    return this.kafka.admin();
  }

  async connectProducer() {
    if (!this.producer) {
      this.producer = this.kafka.producer();
      try {
        await this.producer.connect();
        console.log("Kafka Producer connected successfully.");
      } catch (error) {
        console.error("Error connecting Kafka Producer:", error);
        throw error;
      }
    }
    return this.producer;
  }

  async connectConsumer(groupId, topics) {
    if (!this.consumer) {
      this.consumer = this.kafka.consumer({ groupId });
      try {
        await this.consumer.connect();
        await Promise.all(
          topics.map((topic) =>
            this.consumer.subscribe({ topic, fromBeginning: true })
          )
        );
        console.log(
          "Kafka Consumer connected successfully and subscribed to topics:",
          topics
        );
      } catch (error) {
        console.error("Error connecting Kafka Consumer:", error);
        throw error;
      }
    }
    return this.consumer;
  }

  async disconnect() {
    try {
      if (this.producer) {
        await this.producer.disconnect();
        this.producer = null;
        console.log("Kafka Producer disconnected successfully.");
      }
      if (this.consumer) {
        await this.consumer.disconnect();
        this.consumer = null;
        console.log("Kafka Consumer disconnected successfully.");
      }
    } catch (error) {
      console.error("Error disconnecting Kafka Client:", error);
    }
  }
}

module.exports = new KafkaClient();
