import { Platform } from 'react-native';

export const COLORS = {
  primary: '#0A84FF',      // Apple-like blue
  primaryDark: '#0063CE',
  primaryLight: '#5E9EFF',
  secondary: '#FF9F0A',    // Warm orange accent
  background: '#F2F2F7',   // iOS light gray
  backgroundDark: '#1C1C1E',
  card: '#FFFFFF',
  cardDark: '#2C2C2E',
  text: '#000000',
  textSecondary: '#8E8E93',
  textLight: '#C6C6C8',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  border: '#C6C6C8',
  borderLight: '#E5E5EA',
  overlay: 'rgba(0,0,0,0.4)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  largeTitle: { fontSize: 34, fontWeight: '700', letterSpacing: -0.5 },
  title1: { fontSize: 28, fontWeight: '600', letterSpacing: -0.3 },
  title2: { fontSize: 22, fontWeight: '600', letterSpacing: -0.2 },
  headline: { fontSize: 17, fontWeight: '600' },
  body: { fontSize: 17, fontWeight: '400' },
  callout: { fontSize: 16, fontWeight: '400' },
  subhead: { fontSize: 15, fontWeight: '400' },
  footnote: { fontSize: 13, fontWeight: '400' },
  caption1: { fontSize: 12, fontWeight: '400' },
};

export const SHADOWS = {
  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
    },
    android: {
      elevation: 2,
    },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
    },
    android: {
      elevation: 4,
    },
  }),
  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
    },
    android: {
      elevation: 8,
    },
  }),
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};