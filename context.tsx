
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppData, INITIAL_DATA } from './types';
import { subscribeToAppData } from './firebaseService';

interface DataContextType {
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
  resetData: () => void;
  isAdmin: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = 'ankit_portfolio_data';
const AUTH_KEY = 'ankit_portfolio_auth';
const THEME_KEY = 'ankit_portfolio_theme';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Load data from local storage
    const storedData = localStorage.getItem(STORAGE_KEY);
    const storedAuth = localStorage.getItem(AUTH_KEY);
    const storedTheme = localStorage.getItem(THEME_KEY);

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        // Merge with initial data to ensure new fields (blogs, certs) exist if old data is present
        setData({ ...INITIAL_DATA, ...parsed });
      } catch (e) {
        console.error("Failed to parse stored data", e);
      }
    }
    
    if (storedAuth === 'true') {
      setIsAdmin(true);
    }

    if (storedTheme) {
        setIsDark(storedTheme === 'dark');
    } else {
        // Default to dark
        setIsDark(true);
    }

    setIsLoaded(true);
  }, []);

  // Subscribe to Firestore updates and keep context in sync
  useEffect(() => {
    if (!isLoaded) return;
    const unsub = subscribeToAppData((remoteData) => {
      try {
        // Merge remote with INITIAL_DATA to ensure all keys exist
        setData({ ...INITIAL_DATA, ...remoteData });
      } catch (e) {
        console.error('Failed to apply remote data snapshot', e);
      }
    });
    return () => unsub && unsub();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  useEffect(() => {
      if (isLoaded) {
          const root = window.document.documentElement;
          if (isDark) {
              root.classList.add('dark');
              localStorage.setItem(THEME_KEY, 'dark');
          } else {
              root.classList.remove('dark');
              localStorage.setItem(THEME_KEY, 'light');
          }
      }
  }, [isDark, isLoaded]);

  const updateData = (newData: Partial<AppData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const resetData = () => {
    setData(INITIAL_DATA);
  };

  const login = (password: string) => {
    // Mock password for demo
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const toggleTheme = () => {
      setIsDark(!isDark);
  };

  if (!isLoaded) return null;

  return (
    <DataContext.Provider value={{ data, updateData, resetData, isAdmin, login, logout, isDark, toggleTheme }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
