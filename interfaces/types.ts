import { pageOrder } from "@/lib/constants";

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
  devices?: Record<string, number>;
  refs?: Record<string, number>,
  os?:Record<string, number>,
  browser?:Record<string, number>,
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

export type linkType = {
  id:number,
  user_id: number;
  short_code: string;
  long_url: string;
  created_at: Date;
  title: string | null;
}

export type paginationType = {
  value: number,
  pageActive: pageOrder
}