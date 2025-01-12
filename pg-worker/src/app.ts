import express, { Application } from "express";
import analyticsRouter from "./routes/analytics.routes";
import healthCheckRouter from "./routes/healthCheck.routes";
import loggingMiddleware from "./middlewares/logging.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import secretKeyAuth from "./middlewares/auth.middleware";

import { QueueProcessor } from "./processors/queueProcessor";
import { QueueService } from "./services/queueService";
import { setupGracefulShutdown } from "./utils/gracefulShutdown";

const app: Application = express();
const queueService = new QueueService(10); // Batch size 10
const queueProcessor = new QueueProcessor(queueService, 10);

app.use(express.json());
app.use(secretKeyAuth);
app.use(loggingMiddleware);
app.use(errorMiddleware);

queueProcessor.processQueue().catch((error) => {
  console.error("Error starting queue processor:", error);
});

// Health check route
app.use("/health", healthCheckRouter);

// v1 routes
app.use("/api/v1", analyticsRouter);

// v2 routes

// Setup graceful shutdown
setupGracefulShutdown(async () => {
  queueProcessor.stop();
});

export default app;
