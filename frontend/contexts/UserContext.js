// contexts/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser, saveUser, updateUserInStorage } from '../utils/storage';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      await updateUserInStorage(updatedUserData);
      setUser(updatedUserData);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem('currentUserEmail');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, logoutUser, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};