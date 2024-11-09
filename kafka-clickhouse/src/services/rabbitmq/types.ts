export interface UserLocation {
  country: string | null;
  region: string | null;
  city: string | null;
}

export interface ProduceMessage {
  code: string;
  browser: string;
  os: string;
  device: string;
  country: string | null;
  region: string | null;
  city: string | null;
}
export interface SourceObjects {
  ip: string;
  browser: string;
  os: string;
  device: string;
  code: string;
}