import React, { useMemo } from 'react';
import './App.css';
import { QueryProvider } from './contexts/QueryProvider';
import { AppProvider, useApp } from './contexts/AppContext';
import { useLeagues } from './hooks/useLeagues';
import Header from './components/Header';
import Filters from './components/Filters';
import LeagueList from './components/LeagueList';
import LeagueBadge from './components/LeagueBadge';

function AppContent() {
  const { state, actions } = useApp();
  const { data: leagues = [], isLoading, error } = useLeagues();

  const filteredLeagues = useMemo(() => {
    let filtered = leagues;

    if (state.searchTerm) {
      filtered = filtered.filter(league =>
        league.strLeague.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    if (state.selectedSport) {
      filtered = filtered.filter(league => league.strSport === state.selectedSport);
    }

    return filtered;
  }, [leagues, state.searchTerm, state.selectedSport]);

  const handleLeagueClick = (league) => {
    actions.setSelectedLeague(league);
    actions.setShowBadge(true);
  };

  const handleClearFilters = () => {
    actions.setSearchTerm('');
    actions.setSelectedSport('');
  };

  const sports = [...new Set(leagues.map(league => league.strSport))].sort();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading leagues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading leagues</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        searchTerm={state.searchTerm}
        onSearchChange={actions.setSearchTerm}
      />

      <Filters
        sports={sports}
        selectedSport={state.selectedSport}
        onSportChange={actions.setSelectedSport}
        onClearFilters={handleClearFilters}
      />

      <main>
        <LeagueList
          leagues={filteredLeagues}
          selectedLeague={state.selectedLeague}
          onLeagueClick={handleLeagueClick}
          hasMore={filteredLeagues.length > 0}
          loading={isLoading}
        />
      </main>

      <LeagueBadge
        league={state.selectedLeague}
        isVisible={state.showBadge}
        onClose={() => actions.setShowBadge(false)}
      />

      <footer className="app-footer">
        <p>Powered by SportsDB API</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </QueryProvider>
  );
}

export default App;
