import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotesScreen from '../screens/NotesScreen';
import MoviesScreen from '../screens/MoviesScreen';
import { COLORS } from '../config/theme';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Notes') iconName = 'note';
          else if (route.name === 'Movies') iconName = 'movie';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Movies" component={MoviesScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;