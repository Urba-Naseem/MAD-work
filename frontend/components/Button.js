import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../config/theme';

const Button = ({ title, onPress, loading = false, disabled = false, variant = 'primary' }) => {
  const backgroundColor = variant === 'primary' ? COLORS.primary : COLORS.card;
  const textColor = variant === 'primary' ? '#fff' : COLORS.primary;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  text: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;