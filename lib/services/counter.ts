import RedisClientManager from "./redis_connect";


const incrementCounter = async () => {
  
  const redisInstance = RedisClientManager.getInstance();
  const redis = redisInstance.getRedisClient();
  
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
