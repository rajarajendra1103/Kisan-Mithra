import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Phone, CircleCheck as CheckCircle } from 'lucide-react-native';

interface User {
  id: string;
  name: string;
  type: 'Farmer' | 'Guide' | 'Shop Owner';
  location: string;
  avatar: string;
  verified: boolean;
  specialty?: string;
}

const USERS: User[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    type: 'Guide',
    location: 'Punjab',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    verified: true,
    specialty: 'Wheat & Rice Expert',
  },
  {
    id: '2',
    name: 'सुनीता पटेल',
    type: 'Farmer',
    location: 'Gujarat',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
    verified: true,
    specialty: 'Organic Cotton',
  },
  {
    id: '3',
    name: 'Green Valley Agro',
    type: 'Shop Owner',
    location: 'Maharashtra',
    avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
    verified: false,
    specialty: 'Seeds & Fertilizers',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Farmer', 'Guide', 'Shop Owner'];

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'Farmer': return '#42B883';
      case 'Guide': return '#1877F2';
      case 'Shop Owner': return '#FF6B35';
      default: return '#65676B';
    }
  };

  const UserCard = ({ user }: { user: User }) => (
    <TouchableOpacity style={styles.userCard}>
      <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
      <View style={styles.userInfo}>
        <View style={styles.userNameRow}>
          <Text style={styles.userName}>{user.name}</Text>
          {user.verified && (
            <CheckCircle size={16} color="#1877F2" style={styles.verifiedIcon} />
          )}
        </View>
        <Text style={[styles.userType, { color: getUserTypeColor(user.type) }]}>
          {user.type}
        </Text>
        {user.specialty && (
          <Text style={styles.specialty}>{user.specialty}</Text>
        )}
        <View style={styles.locationRow}>
          <MapPin size={14} color="#65676B" />
          <Text style={styles.location}>{user.location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Phone size={20} color="#1877F2" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Community</Text>
        <Text style={styles.headerSubtitle}>Find farmers, guides & shops</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#65676B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, location, or specialty..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#1877F2" />
        </TouchableOpacity>
      </View>

      {/* Filter Pills */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersRow}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterPill,
                  activeFilter === filter && styles.activeFilterPill,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter && styles.activeFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.usersList}>
          {USERS.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </View>

        {/* Regional Sections */}
        <View style={styles.regionSection}>
          <Text style={styles.regionTitle}>📍 By Region</Text>
          <View style={styles.regionCards}>
            <TouchableOpacity style={styles.regionCard}>
              <Text style={styles.regionName}>Punjab</Text>
              <Text style={styles.regionCount}>245 farmers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.regionCard}>
              <Text style={styles.regionName}>Gujarat</Text>
              <Text style={styles.regionCount}>189 farmers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Language Support */}
        <View style={styles.languageSection}>
          <Text style={styles.sectionTitle}>🌐 Language Support</Text>
          <Text style={styles.languageText}>
            Hindi • English • Punjabi • Gujarati • Marathi • Tamil • Telugu
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1E21',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#65676B',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1C1E21',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
  },
  activeFilterPill: {
    backgroundColor: '#1877F2',
  },
  filterText: {
    fontSize: 14,
    color: '#65676B',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  usersList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  userType: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  specialty: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: '#65676B',
    marginLeft: 4,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  regionSection: {
    padding: 16,
  },
  regionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 12,
  },
  regionCards: {
    flexDirection: 'row',
    gap: 12,
  },
  regionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
  },
  regionCount: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 4,
  },
  languageSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 8,
  },
  languageText: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
  },
});