import Redis from "ioredis";
const RedisURI_01: any = `${process.env.REDIS_URL}/0`;
const RedisURI_02: any = `${process.env.REDIS_URL}/1`;


let redis: Redis;
let public_redis : Redis;

const getRedis = (): Redis => {
  if (!redis) {
    redis = new Redis(RedisURI_01);
  }
  return redis;
};

const getPublicRedis = (): Redis => {
  if (!public_redis) {
    public_redis = new Redis(RedisURI_02);
  }
  return public_redis;
};

export default getRedis;

export {
  getPublicRedis
}
