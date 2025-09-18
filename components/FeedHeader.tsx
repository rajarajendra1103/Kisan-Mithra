import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Bell, Search } from 'lucide-react-native';

interface FeedHeaderProps {
  onMenuPress: () => void;
}

export function FeedHeader({ onMenuPress }: FeedHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Menu size={24} color="#1C1E21" />
        </TouchableOpacity>
        <Text style={styles.title}>Kisan Mithra</Text>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Search size={24} color="#1C1E21" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Bell size={24} color="#1C1E21" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1877F2',
    marginLeft: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    marginLeft: 8,
  },
});