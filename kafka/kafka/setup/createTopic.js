const KafkaClient = require("../connect");

const topics = ["user_analytics", "click_analytics", "test-topic"];

const admin = KafkaClient.admin();

const createTopics = async () => {
  try {
    await admin.connect();

    await admin.createTopics({
      topics: topics.map((topic) => ({ topic })),
    });

    await admin.disconnect();
  } catch (err) {
    console.log(err);
  }
};

createTopics();
