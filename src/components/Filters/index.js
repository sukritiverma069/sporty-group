import React from 'react';
import './Filters.css';

const Filters = ({ sports, selectedSport, onSportChange, onClearFilters }) => {
  return (
    <div className="filters">
      <div>
        <div className="filter-label">Filter by Sport Type</div>
        <select
          value={selectedSport}
          onChange={(e) => onSportChange(e.target.value)}
          className="sport-filter"
        >
          <option value="">All Sports</option>
          {sports.map(sport => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>
      </div>
      <button 
        className="clear-filters"
        onClick={onClearFilters}
      >
        Clear filters
      </button>
    </div>
  );
};

export default Filters;