import fetch from 'node-fetch';

import { UserLocation, IPApiResponse } from './types.js';

class UserLocationService {
  private ipAPI = 'http://ip-api.com/json/';

  public async getUserLocation(ip: string): Promise<UserLocation> {
    try {
      const response = await fetch(`${this.ipAPI}${ip}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // @ts-expect-error noImplicitAny
      const data: IPApiResponse = await response.json();

      return {
        country: data.country,
        region: data.regionName,
        city: data.city,
      };
    } catch (error) {
      console.error('Error fetching user location:', error);
      return {
        country: null,
        region: null,
        city: null,
      };
    }
  }
}

export default new UserLocationService();
