import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644'
      }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {/* Dark Overlay */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(15,23,42,0.85)',
          padding: 20,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: '700',
            color: '#FACC15',
            textAlign: 'center',
            marginBottom: 15,
          }}
        >
          Welcome 👋
        </Text>

        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            marginBottom: 30,
            fontSize: 16,
          }}
        >
          Manage your student profile, settings and contact us easily.
        </Text>

        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            padding: 20,
            borderRadius: 18,
          }}
        >
          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={GlobalStyles.buttonText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={GlobalStyles.buttonText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={() => navigation.navigate('Contact')}
          >
            <Text style={GlobalStyles.buttonText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}