import { Request, Response } from 'express';
import os from 'os';

import {
  HealthCheckResponse,
  RuntimeDetails,
  SystemDetails,
} from './types/healthcheck.js';

class HealthCheckController {
  healthCheckHandler(_req: Request, res: Response): void {
    const runtimeDetails: RuntimeDetails = {
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    };

    const systemDetails: SystemDetails = {
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      cpuCores: os.cpus().length,
      cpuModel: os.cpus()[0].model,
      hostname: os.hostname(),
      uptime: os.uptime(),
    };

    const healthCheckResponse: HealthCheckResponse = {
      status: 'healthy',
      runtime: runtimeDetails,
      system: systemDetails,
    };

    res.status(200).json(healthCheckResponse);
  }
}

export default new HealthCheckController();
