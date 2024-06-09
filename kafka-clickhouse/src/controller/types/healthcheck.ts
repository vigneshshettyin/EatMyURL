export interface RuntimeDetails {
    nodeVersion: string;
    platform: NodeJS.Platform;
    architecture: string;
    uptime: number;
    memoryUsage: NodeJS.MemoryUsage;
}

export interface SystemDetails {
    totalMemory: number;
    freeMemory: number;
    cpuCores: number;
    cpuModel: string;
    hostname: string;
    uptime: number;
}

export interface HealthCheckResponse {
    status: string;
    runtime: RuntimeDetails;
    system: SystemDetails;
}