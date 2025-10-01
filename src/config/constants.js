// API Constants
export const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export const ENDPOINTS = {
  ALL_LEAGUES: `${API_BASE_URL}/all_leagues.php`,
  LEAGUE_LOOKUP: (id) => `${API_BASE_URL}/lookupleague.php?id=${id}`,
};