import React from 'react';
import './Header.css';

const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <header>
      <h1>Sports Leagues Explorer</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search leagues..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
    </header>
  );
};

export default Header;