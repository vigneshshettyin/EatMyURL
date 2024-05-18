const os = require("os");
const { CompressionTypes } = require("kafkajs");

const KafkaClient = require("./connect");

const run = async () => {
  const producer = await KafkaClient.connectProducer();
  for (let i = 0; i < 100; i++) {
    producer
      .send({
        topic: "test-topic",
        compression: CompressionTypes.GZIP,
        messages: [
          {
            key: `key-${i}`,
            value: JSON.stringify({
              message: `Message ${i}`,
              date: new Date().toISOString(),
              hostname: os.hostname(),
            }),
          },
        ],
      })
      .catch((e) => {
        console.error(`Unable to send message: ${JSON.stringify(e)}`, e);
      });
  }
};

run().catch(console.error);
