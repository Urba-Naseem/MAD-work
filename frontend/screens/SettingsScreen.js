// ./frontend/screens/SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { resetAllData } from '../utils/storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({ navigation }) {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const { logoutUser } = useUser();
  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logoutUser();
          },
        },
      ]
    );
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset Data',
      'This will erase all user data including login info. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetAllData();
            await logoutUser();
          },
        },
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Student Portal App does not collect any personal data. All information is stored locally on your device.',
      [{ text: 'OK' }]
    );
  };

  const settingsOptions = [
    { title: 'Dark Mode', icon: 'moon-outline', action: null, component: <Switch value={isDarkMode} onValueChange={toggleTheme} trackColor={{ false: '#E5E7EB', true: colors.primary }} /> },
    { title: 'Privacy Policy', icon: 'document-text-outline', action: handlePrivacyPolicy, color: colors.primary, textColor: colors.text },
    { title: 'About', icon: 'information-circle-outline', action: () => setAboutModalVisible(true), color: colors.primary, textColor: colors.text },
    { title: 'Logout', icon: 'log-out-outline', action: handleLogout, color: '#FF3B30', textColor: '#FF3B30' },
    { title: 'Reset All Data', icon: 'alert-circle-outline', action: handleResetData, color: '#FF3B30', textColor: '#FF3B30' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 28, color: colors.text, marginBottom: 24 }}>
          Settings
        </Text>

        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={option.action}
            disabled={!option.action && !option.component}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Ionicons name={option.icon} size={24} color={option.color || colors.primary} />
              <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: option.textColor || colors.text }}>
                {option.title}
              </Text>
            </View>
            {option.component}
          </TouchableOpacity>
        ))}

        <View style={{ marginTop: 32, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: colors.textSecondary }}>
            Student Portal App v1.0
          </Text>
        </View>
      </ScrollView>

      {/* About Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={aboutModalVisible}
        onRequestClose={() => setAboutModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: colors.surface, borderRadius: 24, padding: 24, width: '85%', borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 22, color: colors.text, marginBottom: 16, textAlign: 'center' }}>
              About Student Portal
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary, marginBottom: 12, textAlign: 'center' }}>
              Version 1.0
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: colors.textSecondary, marginBottom: 20, textAlign: 'center' }}>
              A complete student portal app built with React Native Expo.
              {'\n\n'}Features:
              {'\n'}• Smart Dashboard
              {'\n'}• Course Management
              {'\n'}• Dark/Light Theme
              {'\n'}• Local Data Storage
            </Text>
            <TouchableOpacity
              onPress={() => setAboutModalVisible(false)}
              style={{ backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 12, alignItems: 'center' }}
            >
              <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: '#FFF' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}