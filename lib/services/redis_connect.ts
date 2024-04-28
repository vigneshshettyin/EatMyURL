const Redis = require("ioredis");
const redisUri = process.env.REDIS_URL;

let redis: any;

export const getRedis = () => {
  if (!redis) {
    redis = new Redis(redisUri);
  }
  return redis;
};
