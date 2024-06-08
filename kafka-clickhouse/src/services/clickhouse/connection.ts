import { createClient, ClickHouseClient } from '@clickhouse/client';

class ClickHouseSingleton {
  private static instance: ClickHouseSingleton;
  private client: ClickHouseClient;

  private constructor() {
    this.client = createClient({
      url: process.env.CLICKHOUSE_URL as string,
    });
  }

  public static getInstance(): ClickHouseSingleton {
    if (!ClickHouseSingleton.instance) {
      ClickHouseSingleton.instance = new ClickHouseSingleton();
    }
    return ClickHouseSingleton.instance;
  }

  public getClient(): ClickHouseClient {
    return this.client;
  }
}

const client = ClickHouseSingleton.getInstance().getClient();

export default client;
