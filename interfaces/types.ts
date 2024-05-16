export interface gettingStartedStatus {
  createLink: boolean;
  clickLink: boolean;
  checkAnalytics: boolean;
  progressValue?: number;
}

export interface locationsDetails {
  id:number,
  country: string;
  engagements: number;
  percentage: number;
}

export type devicesDetails = Record<string, number>;

export interface LinkType {
  id: number;
  title: string;
  shortLink: string;
  longLink: string;
  engagement: number;
  dateCreated: Date;
  last7DaysEngage?: number;
  weeklyChange?: number;
  locations?: locationsDetails[];
  devices?: devicesDetails;
}


export interface QRCodeType {
  id:number;
  title?: string;
  shortLink: string;
  longLink: string;
  scans: number;
  dateCreated: Date;
}

export interface User {
  id: string;
  email: string;
  startStatus?: gettingStartedStatus;
}

export type EditLink = Pick<LinkType,'title' | 'shortLink'>
export type EditQR = Pick<LinkType,'title' | 'shortLink'>

export type createLink = {
  longUrl: string;
  title?: string;
  requireQRCode: boolean;
  shortLink?: string;
};

export type createQR = Pick<createLink, "longUrl" | "title" | "shortLink">;

export type publicLinkType =  {
    longUrl : string;
    shortUrl : string,
    clicks? : string
}