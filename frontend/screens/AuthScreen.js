// ./frontend/screens/AuthScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loginUser, signupUser, initializeDemoUser } from '../utils/storage';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { loadUser } = useUser();
  const { colors } = useTheme();

  // Initialize demo user on first launch
  React.useEffect(() => {
    initializeDemoUser();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      if (user) {
        await loadUser();
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await signupUser(email, password);
      await loadUser();
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage = { uri: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=2' };

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }} resizeMode="cover">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'center', padding: 24 }}>
            <View style={{ alignItems: 'center', marginBottom: 48 }}>
              <Ionicons name="school-outline" size={80} color="#FFF" />
              <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 32, color: '#FFF', marginTop: 12 }}>
                Student Portal
              </Text>
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, color: '#DDD', marginTop: 4 }}>
                {isLogin ? 'Welcome Back!' : 'Create Your Account'}
              </Text>
            </View>

            <View style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 24, padding: 24, marginBottom: 16 }}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: '#333', marginBottom: 8 }}>
                  Email
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#FFF' }}>
                  <Ionicons name="mail-outline" size={20} color="#888" />
                  <TextInput
                    style={{ flex: 1, paddingVertical: 14, paddingHorizontal: 8, fontFamily: 'Inter_400Regular', fontSize: 16 }}
                    placeholder="student@example.com"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 14, color: '#333', marginBottom: 8 }}>
                  Password
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#FFF' }}>
                  <Ionicons name="lock-closed-outline" size={20} color="#888" />
                  <TextInput
                    style={{ flex: 1, paddingVertical: 14, paddingHorizontal: 8, fontFamily: 'Inter_400Regular', fontSize: 16 }}
                    placeholder="••••••••"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              {isLogin ? (
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={loading}
                  style={{ backgroundColor: '#4A90E2', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 12 }}
                >
                  {loading ? <ActivityIndicator color="#FFF" /> : <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: '#FFF' }}>Login</Text>}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleSignup}
                  disabled={loading}
                  style={{ backgroundColor: '#4A90E2', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 12 }}
                >
                  {loading ? <ActivityIndicator color="#FFF" /> : <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16, color: '#FFF' }}>Sign Up</Text>}
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ alignItems: 'center', paddingVertical: 8 }}>
                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: '#4A90E2' }}>
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ textAlign: 'center', fontFamily: 'Inter_400Regular', fontSize: 12, color: '#DDD' }}>
              Demo: student@example.com / password123
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}