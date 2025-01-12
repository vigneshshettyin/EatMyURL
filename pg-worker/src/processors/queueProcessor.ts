import { QueueService } from "../services/queueService";
import { UserDeviceInfo, ProduceMessage } from "../types/redis";
import { UserLocation } from "../types/location";
import UserLocationService from "../services/locationService";
import { prisma } from "../connection/prisma";

export class QueueProcessor {
  private running: boolean = true;
  private readonly queueService: QueueService;
  private readonly batchSize: number;

  constructor(queueService: QueueService, batchSize: number = 10) {
    this.queueService = queueService;
    this.batchSize = batchSize;
  }

  async saveToDatabase(produceObjects: UserDeviceInfo[]): Promise<void> {
    const messages: ProduceMessage[] = [];

    for (const obj of produceObjects) {
      const { ip, browser, os, device, code } = obj;

      if (!code || code.trim() === "") {
        console.warn(`Skipping message due to empty 'code': ${JSON.stringify(obj)}`);
        continue;
      }

      try {
        const location: UserLocation = await UserLocationService.getUserLocation(ip);
        const message: ProduceMessage = {
          code,
          browser,
          os,
          device,
          country: location.country,
          region: location.region,
          city: location.city,
        };
        messages.push(message);
      } catch (error) {
        console.error(`Failed to get location for IP: ${ip}`, error);
      }
    }

    if (messages.length > 0) {
      await prisma.clickAnalytics.createMany({
        data: messages,
      });
      console.log(`${messages.length} messages successfully saved to the database.`);
    }
  }

  async processQueue(): Promise<void> {
    console.log("Queue processor started.");
    while (this.running) {
      try {
        const batchMessages = await this.queueService.dequeueBatch();
        if (batchMessages.length > 0) {
          await this.saveToDatabase(batchMessages);
        } else {
          // No messages, wait briefly
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error("Error processing queue:", error);
      }
    }

    console.log("Processing remaining messages before shutdown...");
    await this.queueService.quit();
    console.log("Queue processor shut down.");
  }

  stop(): void {
    this.running = false;
  }
}
