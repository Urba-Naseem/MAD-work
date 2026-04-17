// components/CustomCard.js (Optional component for reuse)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomCard({ title, subtitle, icon, onPress, style, colors }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconContainer: { marginRight: 12 },
  textContainer: { flex: 1 },
  title: { fontFamily: 'Inter_600SemiBold', fontSize: 16 },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 2 },
});