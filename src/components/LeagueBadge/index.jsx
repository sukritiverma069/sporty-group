import React from 'react';
import { useLeagueBadge } from '../../hooks/useLeagueBadge';
import './LeagueBadge.css';

const LeagueBadge = ({ league, isVisible, onClose }) => {
  const { 
    data: badgeData, 
    isLoading, 
    error 
  } = useLeagueBadge(league?.idLeague, isVisible);

  if (!isVisible) return null;

  return (
    <div className="badge-modal-overlay" onClick={onClose}>
      <div className="badge-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="badge-content">
          <h3>{league?.strLeague}</h3>
          
          {isLoading && (
            <div className="loading">Loading badge...</div>
          )}
          
          {error && (
            <div className="error">Failed to load badge: {error.message}</div>
          )}
          
          {badgeData?.strBadge && (
            <img 
              src={badgeData.strBadge} 
              alt={`${league?.strLeague} badge`}
              className="badge-image"
            />
          )}
          
          {badgeData?.strSeason && (
            <p className="season">Season: {badgeData.strSeason}</p>
          )}
          
          {!isLoading && !error && !badgeData?.strBadge && (
            <p className="no-badge">No badge available for this league.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeagueBadge;