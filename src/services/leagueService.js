import ApiService from './apiService';

class LeagueService {
  static async getLeagues() {
    return await ApiService.getLeagues();
  }

  static async getLeagueBadge(leagueId) {
    return await ApiService.getLeagueBadge(leagueId);
  }
}

export default LeagueService;