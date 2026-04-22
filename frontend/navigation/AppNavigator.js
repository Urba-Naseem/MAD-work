import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import Loader from '../components/Loader';
import { COLORS } from '../config/theme'; 

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <NavigationContainer>
      {user ? <MainTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;