import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import the wrapper
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import Loader from '../components/Loader';
import { COLORS } from '../config/theme'; // Import your theme for background

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <NavigationContainer>
        {user ? <MainTabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;