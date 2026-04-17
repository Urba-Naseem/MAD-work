// navigation/MainTabNavigator.js (updated)
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EnrolledCoursesScreen from '../screens/EnrolledCoursesScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen'; 
import TimetableScreen from '../screens/TimetableScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { fontFamily: 'Inter_600SemiBold', color: colors.text },
        headerTintColor: colors.primary,
        headerShown: true,
      }}
    >
      <HomeStack.Screen name="HomeDashboard" component={HomeScreen} options={{ title: 'Dashboard' }} />
      <HomeStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
      <HomeStack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title: 'Course Details' }} />
    </HomeStack.Navigator>
  );
}

// The Courses tab uses its own stack if needed, but we already have EnrolledCoursesScreen
// To keep navigation consistent, we'll also add CourseDetail to the Courses tab's stack.
// But since EnrolledCoursesScreen is directly under the Courses tab, we need to wrap it in a stack.
const CoursesStack = createStackNavigator();

function CoursesStackNavigator() {
  const { colors } = useTheme();
  return (
    <CoursesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CoursesStack.Screen name="EnrolledCourses" component={EnrolledCoursesScreen} />
      <CoursesStack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </CoursesStack.Navigator>
  );
}

export default function MainTabNavigator() {
  const { colors, isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Courses') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Timetable') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarLabelStyle: { fontFamily: 'Inter_400Regular', fontSize: 12 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Courses" component={CoursesStackNavigator} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}