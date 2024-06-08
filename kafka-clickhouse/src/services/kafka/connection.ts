import { Kafka, Producer, Consumer, Admin } from 'kafkajs';

class KafkaClient {
  private static instance: KafkaClient;
  private kafka: Kafka;
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;

  private constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: [process.env.KAFKA_BROKER as string],
      connectionTimeout: 10000,
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: process.env.KAFKA_USER as string,
        password: process.env.KAFKA_PASSWORD as string,
      },
    });
  }

  public static getInstance(): KafkaClient {
    if (!KafkaClient.instance) {
      KafkaClient.instance = new KafkaClient();
    }
    return KafkaClient.instance;
  }

  public admin(): Admin {
    return this.kafka.admin();
  }

  public async connectProducer(): Promise<Producer> {
    if (!this.producer) {
      this.producer = this.kafka.producer();
      try {
        await this.producer.connect();
        console.log('Kafka Producer connected successfully.');
      } catch (error) {
        console.error('Error connecting Kafka Producer:', error);
        throw error;
      }
    }
    return this.producer;
  }

  public async connectConsumer(
    groupId: string,
    topics: string[],
  ): Promise<Consumer> {
    if (!this.consumer) {
      this.consumer = this.kafka.consumer({ groupId });
      try {
        await this.consumer.connect();
        await Promise.all(
          topics.map((topic) =>
            this.consumer!.subscribe({ topic, fromBeginning: true }),
          ),
        );
        console.log(
          'Kafka Consumer connected successfully and subscribed to topics:',
          topics,
        );
      } catch (error) {
        console.error('Error connecting Kafka Consumer:', error);
        throw error;
      }
    }
    return this.consumer;
  }

  public async disconnect(): Promise<void> {
    try {
      if (this.producer) {
        await this.producer.disconnect();
        this.producer = null;
        console.log('Kafka Producer disconnected successfully.');
      }
      if (this.consumer) {
        await this.consumer.disconnect();
        this.consumer = null;
        console.log('Kafka Consumer disconnected successfully.');
      }
    } catch (error) {
      console.error('Error disconnecting Kafka Client:', error);
    }
  }
}

const kafkaClient = KafkaClient.getInstance();
await kafkaClient.connectProducer();
export default kafkaClient;
