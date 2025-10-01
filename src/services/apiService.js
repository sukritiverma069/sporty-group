
import { ENDPOINTS } from '../config';

class ApiService {
  static async fetchData(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  static async getLeagues() {
    const data = await this.fetchData(ENDPOINTS.ALL_LEAGUES);
    return data.leagues || [];
  }

  static async getLeagueBadge(leagueId) {
    const data = await this.fetchData(ENDPOINTS.LEAGUE_LOOKUP(leagueId));
    return data.leagues?.[0] || null;
  }
  
}

export default ApiService;