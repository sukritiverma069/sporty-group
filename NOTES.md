# Development Notes

## AI-Assisted Development

This project was developed with the assistance of **Cursor AI** for code refactoring, syntax assistance for example for Tanstack query.

## 🏗️ Design Decisions

### Architecture
- **Component-Based Structure**: Each component is organized in its own folder with dedicated CSS files
  - Example: [`src/components/Header/`](src/components/Header/) contains `index.js` and `Header.css`
  - Example: [`src/components/LeagueCard/`](src/components/LeagueCard/) contains `index.js` and `LeagueCard.css`
- **Services Layer**: API logic separated from UI components in [`src/services/`](src/services/)
  - [`src/services/apiService.js`](src/services/apiService.js) - Base API service with error handling
  - [`src/services/leagueService.js`](src/services/leagueService.js) - League-specific business logic
- **Context API**: Centralized state management implemented in [`src/contexts/AppContext.js`](src/contexts/AppContext.js)
- **TanStack Query**: Professional data fetching configured in [`src/contexts/QueryProvider.js`](src/contexts/QueryProvider.js)

### State Management
Relying on context api as it solves the purpose for this small use case and does not need extra boilerplate setup which comes with Zustand or any other state management tool

- **UI State**: Context API with useReducer implemented in [`src/contexts/AppContext.js`](src/contexts/AppContext.js)
  - State includes: leagues, filteredLeagues, searchTerm, selectedSport, selectedLeague, showBadge
  - Actions are memoized with useMemo to prevent infinite re-renders
- **Server State**: TanStack Query hooks in [`src/hooks/`](src/hooks/)
  - [`src/hooks/useLeagues.js`](src/hooks/useLeagues.js) - Leagues data fetching
  - [`src/hooks/useLeagueBadge.js`](src/hooks/useLeagueBadge.js) - Badge data fetching

### Caching Strategy
- **Single-Level Caching**: TanStack Query handles all caching as configured in [`src/contexts/QueryProvider.js`](src/contexts/QueryProvider.js)
  - `staleTime: 5 * 60 * 1000` (5 minutes) - Data stays fresh
  - `cacheTime: 10 * 60 * 1000` (10 minutes) - Memory retention
  - `refetchOnWindowFocus: false` - Prevents unnecessary refetches

### Component Design
- **Modular Architecture**: Each component is self-contained with its own styles, not going in with any other styling techniques like StyledComponent because I see each component handles its own styles ATM and there is no such style that needs to be reused anywhere else.
  - Example: [`src/components/LeagueCard/index.js`](src/components/LeagueCard/index.js) with [`src/components/LeagueCard/LeagueCard.css`](src/components/LeagueCard/LeagueCard.css)
- **Props Interface**: Clean component APIs with minimal prop drilling
  - Example: [`src/components/LeagueCard/index.js`](src/components/LeagueCard/index.js) receives `league`, `isSelected`, `onClick`
- **Error Handling**: Implemented in [`src/components/LeagueBadge/index.js`](src/components/LeagueBadge/index.js)
- **Loading States**: Professional loading indicators in [`src/App.css`](src/App.css)

### Performance Optimizations
- **Efficient Rendering**: useMemo implemented in [`src/App.js`](src/App.js) for filtered leagues calculation
- **Smart Re-renders**: useMemo used in [`src/contexts/AppContext.js`](src/contexts/AppContext.js) because otherwise the contextValue object would be recreated on every render of the AppProvider component
- **Bundle Optimization**: Clean imports with barrel exports in [`src/services/index.js`](src/services/index.js)
- **Memory Management**: Automatic cleanup in useEffect hooks

### User Experience
- **Real-time Search**: Implemented in [`src/components/Header/index.js`](src/components/Header/index.js)
- **Combined Filters**: Search and sport filter work together in [`src/App.js`](src/App.js)
- **Visual Feedback**: Loading states and error messages in [`src/App.css`](src/App.css)
- **Responsive Design**: Mobile-first CSS in component-specific files

### API Integration
- **TheSportsDB API**: Real-time sports data integration configured in [`src/config/constants.js`](src/config/constants.js)
  - All Leagues: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
  - League Badge: `https://www.thesportsdb.com/api/v1/json/3/lookupleague.php?id={leagueId}`
- **Error Handling**: Comprehensive error states in [`src/services/apiService.js`](src/services/apiService.js)
- **Request Deduplication**: Automatic prevention via TanStack Query
- **Background Updates**: Fresh data without blocking user interactions