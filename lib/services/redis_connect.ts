import Redis from 'ioredis'
const redisUri : any = process.env.REDIS_URL;

let redis: Redis;

export const getRedis = () => {
  if (!redis) {
    redis = new Redis(redisUri);
  }
  return redis;
};
