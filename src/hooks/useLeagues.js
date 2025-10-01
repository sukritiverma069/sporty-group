import { useQuery } from '@tanstack/react-query';
import { LeagueService } from '../services';

export const useLeagues = () => {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: () => LeagueService.getLeagues(),
    staleTime: 5 * 60 * 1000,
  });
};