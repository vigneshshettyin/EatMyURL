class UserLocationService {
  ipAPI = "http://ip-api.com/json/";

  async getUserLocation(ip) {
    const response = await fetch(`${this.ipAPI}${ip}`);
    const data = await response.json();
    return {
        country : data.country,
        region : data.regionName,
        city : data.city,
    }
  }
}

module.exports = new UserLocationService();
