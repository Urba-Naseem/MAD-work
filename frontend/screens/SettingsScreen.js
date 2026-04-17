import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../styles/GlobalStyles';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const backgroundColor = darkMode ? '#0F172A' : '#F1F5F9';
  const cardColor = darkMode ? '#1E293B' : '#FFFFFF';
  const textColor = darkMode ? '#FFFFFF' : '#0F172A';

  const showAlert = (message) => Alert.alert(message);

  // Reusable row for switches
  const SwitchRow = ({ icon, label, value, onValueChange }) => (
    <View style={styles.row}>
      <View style={styles.left}>
        <Ionicons name={icon} size={22} color="#FACC15" />
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? '#FACC15' : '#ccc'}
      />
    </View>
  );

  // Reusable row for buttons
  const ButtonRow = ({ icon, label, onPress }) => (
    <>
      <TouchableOpacity style={styles.row} onPress={onPress}>
        <View style={styles.left}>
          <Ionicons name={icon} size={22} color="#FACC15" />
          <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color={textColor} />
      </TouchableOpacity>
      <View style={styles.divider} />
    </>
  );

  return (
    <View style={[GlobalStyles.container, { backgroundColor }]}>
      <Text style={[GlobalStyles.title, { color: textColor }]}>Settings</Text>

      <View style={[GlobalStyles.card, { backgroundColor: cardColor }]}>
        <SwitchRow
          icon="notifications-outline"
          label="Enable Notifications"
          value={notifications}
          onValueChange={setNotifications}
        />
        <View style={styles.divider} />

        <SwitchRow
          icon="moon-outline"
          label="Dark Mode"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <View style={styles.divider} />

        <ButtonRow
          icon="language-outline"
          label="Language"
          onPress={() => showAlert("Language settings coming soon")}
        />

        <ButtonRow
          icon="lock-closed-outline"
          label="Change Password"
          onPress={() => showAlert("Change Password clicked")}
        />

        <ButtonRow
          icon="shield-checkmark-outline"
          label="Privacy Policy"
          onPress={() => showAlert("Privacy Policy clicked")}
        />

        <ButtonRow
          icon="information-circle-outline"
          label="About App"
          onPress={() => showAlert("App Version 1.0.0")}
        />
      </View>

      <TouchableOpacity
        style={[GlobalStyles.button, { marginTop: 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={GlobalStyles.buttonText}>⬅ Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 5,
  },
};