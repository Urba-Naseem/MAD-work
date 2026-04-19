import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../config/theme';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const { login, signup } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (error) {
      let message = 'Authentication failed';
      if (error.code === 'auth/email-already-in-use') message = 'Email already in use';
      else if (error.code === 'auth/wrong-password') message = 'Wrong password';
      else if (error.code === 'auth/user-not-found') message = 'User not found';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800' }}
      style={styles.background}
      blurRadius={8}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.overlay}>
            <View style={styles.header}>
             <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
             <Text style={styles.subtitle}>{isLogin ? 'Sign in to continue' : 'Join us today'}</Text>
            </View>

            <LinearGradient
              colors={['rgba(255,255,255,0.95)', '#fff']}
              style={styles.formContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                error={errors.email}
                placeholder="your@email.com"
              />
              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                error={errors.password}
                placeholder="••••••••"
              />

              <TouchableOpacity style={styles.toggleContainer}>
                <Text style={styles.toggleText}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <Text
                    style={styles.toggleLink}
                    onPress={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Sign Up' : 'Login'}
                  </Text>
                </Text>
              </TouchableOpacity>

              <Button
                title={isLogin ? 'Login' : 'Create Account'}
                onPress={handleAuth}
                loading={loading}
                style={styles.button}
              />
            </LinearGradient>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.overlay,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: '#fff',
    fontSize: 42,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: '#fff',
    textAlign: 'center',
    marginTop: SPACING.sm,
    opacity: 0.9,
  },
  formContainer: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.large,
  },
  toggleContainer: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  toggleText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  toggleLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  button: {
    marginTop: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
});

export default AuthScreen;