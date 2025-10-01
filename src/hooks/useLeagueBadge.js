import { useQuery } from '@tanstack/react-query';
import { LeagueService } from '../services';

export const useLeagueBadge = (leagueId, enabled = false) => {
  return useQuery({
    queryKey: ['leagueBadge', leagueId],
    queryFn: () => LeagueService.getLeagueBadge(leagueId),
    enabled: enabled && !!leagueId,
    staleTime: 10 * 60 * 1000, // cached for 10 minutes, change it to seconds to see the effect, badge api called again on click of badge
  });
};