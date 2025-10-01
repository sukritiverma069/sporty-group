import React, { createContext, useContext, useReducer, useMemo } from 'react';

const initialState = {
  leagues: [],
  filteredLeagues: [],
  loading: true,
  searchTerm: '',
  selectedSport: '',
  selectedLeague: null,
  showBadge: false,
};


const ACTIONS = {
  SET_LEAGUES: 'SET_LEAGUES',
  SET_LOADING: 'SET_LOADING',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SELECTED_SPORT: 'SET_SELECTED_SPORT',
  SET_FILTERED_LEAGUES: 'SET_FILTERED_LEAGUES',
  SET_SELECTED_LEAGUE: 'SET_SELECTED_LEAGUE',
  SET_SHOW_BADGE: 'SET_SHOW_BADGE',
};


const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LEAGUES:
      return { ...state, leagues: action.payload };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case ACTIONS.SET_SELECTED_SPORT:
      return { ...state, selectedSport: action.payload };
    case ACTIONS.SET_FILTERED_LEAGUES:
      return { ...state, filteredLeagues: action.payload };
    case ACTIONS.SET_SELECTED_LEAGUE:
      return { ...state, selectedLeague: action.payload };
    case ACTIONS.SET_SHOW_BADGE:
      return { ...state, showBadge: action.payload };
    default:
      return state;
  }
};


const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setLeagues: (leagues) => dispatch({ type: ACTIONS.SET_LEAGUES, payload: leagues }),
    setLoading: (loading) => dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
    setSearchTerm: (term) => dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term }),
    setSelectedSport: (sport) => dispatch({ type: ACTIONS.SET_SELECTED_SPORT, payload: sport }),
    setFilteredLeagues: (leagues) => dispatch({ type: ACTIONS.SET_FILTERED_LEAGUES, payload: leagues }),
    setSelectedLeague: (league) => dispatch({ type: ACTIONS.SET_SELECTED_LEAGUE, payload: league }),
    setShowBadge: (show) => dispatch({ type: ACTIONS.SET_SHOW_BADGE, payload: show }),
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, actions }), [state, actions]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};