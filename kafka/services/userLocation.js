class UserLocationService {
  ipAPI = "https://ipapi.co/json/?ip=";

  async getUserLocation(ip) {
    const response = await fetch(`${this.ipAPI}${ip}`);
    const data = await response.json();
    return {
        country : data.country,
        region : data.region,
        city : data.city,
    }
  }
}

module.exports = new UserLocationService();
