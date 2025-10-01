import React, { createContext, useContext, useState } from 'react';

const CacheContext = createContext();

export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};

export const CacheProvider = ({ children }) => {
  const [cache, setCache] = useState({});

  const get = (key) => {
    const item = cache[key];
    if (item && Date.now() - item.timestamp < 300000) {
      return item.data;
    }
    return null;
  };

  const set = (key, data) => {
    setCache(prev => ({
      ...prev,
      [key]: {
        data,
        timestamp: Date.now()
      }
    }));
  };

  const clear = () => {
    setCache({});
  };

  const value = {
    get,
    set,
    clear
  };

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  );
};