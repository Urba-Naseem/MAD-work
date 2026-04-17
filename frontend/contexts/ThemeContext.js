// ./frontend/contexts/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? '#121212' : '#F5F7FA',
      surface: isDarkMode ? '#1E1E2A' : '#FFFFFF',
      card: isDarkMode ? '#2C2C38' : '#FFFFFF',
      text: isDarkMode ? '#FFFFFF' : '#1A1A2E',
      textSecondary: isDarkMode ? '#A0A0B0' : '#6B7280',
      primary: '#4A90E2',
      primaryDark: '#357ABD',
      accent: '#FF6B6B',
      border: isDarkMode ? '#333344' : '#E5E7EB',
      success: '#4CD964',
      error: '#FF3B30',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};