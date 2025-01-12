import { UserLocation, IPApiResponse } from "../types/location";

class UserLocationService {
  private readonly ipAPI = "http://ip-api.com/json/";
  private readonly retryAttempts = 3; // Number of retries
  private readonly timeoutMs = 5000; // Timeout for fetch requests in milliseconds

  /**
   * Fetches user location from IP-API with retries and timeout.
   * @param ip - The IP address of the user
   * @returns UserLocation object containing country, region, and city
   */
  public async getUserLocation(ip: string): Promise<UserLocation> {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await this.fetchWithTimeout(
          `${this.ipAPI}${ip}`,
          this.timeoutMs
        );

        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        const data: IPApiResponse = (await response.json()) as IPApiResponse;

        if (!data || !data.country || !data.regionName || !data.city) {
          throw new Error("Invalid response format");
        }

        return {
          country: data.country,
          region: data.regionName,
          city: data.city,
        };
      } catch (error) {
        console.error(
          `Attempt ${attempt} failed to fetch location for IP: ${ip}. Error: ${error}`
        );

        if (attempt === this.retryAttempts) {
          console.error("All retry attempts failed.");
        }
      }
    }

    // Default fallback location in case all retries fail
    return {
      country: null,
      region: null,
      city: null,
    };
  }

  /**
   * Fetches a URL with a timeout.
   * @param url - The URL to fetch
   * @param timeout - Timeout duration in milliseconds
   * @returns Fetch response object
   */
  private async fetchWithTimeout(
    url: string,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      return await fetch(url, { signal });
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

const instance = new UserLocationService();

export default instance;
