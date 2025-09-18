import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  route?: string;
}

export function QuickActionCard({ title, subtitle, icon, color, route }: QuickActionCardProps) {
  const handlePress = () => {
    if (route) {
      router.push(route as any);
    }
  };

  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} onPress={handlePress}>
      <View style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#65676B',
  },
});