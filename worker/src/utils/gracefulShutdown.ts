export function setupGracefulShutdown(onShutdown: () => Promise<void>): void {
    const shutdownHandler = async () => {
      console.log("Gracefully shutting down...");
      await onShutdown();
      process.exit(0);
    };
  
    process.on("SIGINT", shutdownHandler);
    process.on("SIGTERM", shutdownHandler);
  }
  