import React from 'react';
import './LeagueCard.css';

const LeagueCard = ({ league, isSelected, onClick }) => {
  return (
    <div
      className={`league-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(league)}
    >
      <h3>{league.strLeague}</h3>
      <span className="sport">{league.strSport}</span>
      {league.strLeagueAlternate && (
        <p className="alternate">{league.strLeagueAlternate}</p>
      )}
    </div>
  );
};

export default LeagueCard;