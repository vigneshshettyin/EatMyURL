import getRedis from "./redis_connect";

const incrementCounter = async () => {
  const redis = getRedis();
  let counter = (await redis.get("counter")) as number | null;
  if (!counter) {
    await redis.set("counter", 100000000);
    counter = 100000000;
  } else {
    counter = await redis.incr("counter");
  }
  return counter;
};

export default incrementCounter;
