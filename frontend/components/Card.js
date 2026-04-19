import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING, SHADOWS } from '../config/theme';

const Card = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    ...SHADOWS.small,
  },
});

export default Card;