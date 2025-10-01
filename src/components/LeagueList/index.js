import React from 'react';
import LeagueCard from '../LeagueCard';
import './LeagueList.css';

const LeagueList = ({ leagues, selectedLeague, onLeagueClick }) => {
  if (leagues.length === 0) {
    return (
      <div className="no-leagues">
        <p>No leagues found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="leagues-grid">
      {leagues.map(league => (
        <LeagueCard
          key={league.idLeague}
          league={league}
          isSelected={selectedLeague?.idLeague === league.idLeague}
          onClick={onLeagueClick}
        />
      ))}
    </div>
  );
};

export default LeagueList;