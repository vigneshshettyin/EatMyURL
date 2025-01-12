export interface UserDeviceInfo {
  code: string;
  ip: string;
  browser: string;
  os: string;
  device: string;
}

export interface ProduceMessage {
  code: string;
  browser: string | null;
  os: string | null;
  device: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
}
