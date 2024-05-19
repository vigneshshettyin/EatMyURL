const redis = require("redis");
const redis_uri = process.env.REDIS_URI;

const ProducerController = require("../controller/producer");

(async () => {
  const client = redis.createClient({
    url: redis_uri,
  });

  const subscriber = client.duplicate();

  await subscriber.connect();

  await subscriber.subscribe("user_anlytics", (message) => {
    const { ip, browser, os, device, code } = JSON.parse(message);
    ProducerController.produce_logic(ip, browser, os, device, code);
  });
})();
