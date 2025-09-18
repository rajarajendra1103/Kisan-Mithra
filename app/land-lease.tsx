import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, MapPin, Phone, Heart, Share, Plus, Map } from 'lucide-react-native';
import { router } from 'expo-router';

interface LandListing {
  id: string;
  title: string;
  owner: string;
  ownerAvatar: string;
  location: string;
  size: string;
  price: string;
  soilType: string;
  irrigation: string;
  images: string[];
  phone: string;
  verified: boolean;
}

const SAMPLE_LISTINGS: LandListing[] = [
  {
    id: '1',
    title: 'Premium Agricultural Land for Lease',
    owner: 'राजेश कुमार',
    ownerAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    location: 'Ludhiana, Punjab',
    size: '5 acres',
    price: '₹25,000/year per acre',
    soilType: 'Loamy soil, pH 6.8',
    irrigation: 'Tube well + Canal',
    images: [
      'https://images.pexels.com/photos/162637/agriculture-arable-clouds-countryside-162637.jpeg',
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg'
    ],
    phone: '+91 98765 43210',
    verified: true,
  },
  {
    id: '2',
    title: 'Organic Certified Farmland Available',
    owner: 'सुनीता देवी',
    ownerAvatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
    location: 'Ahmedabad, Gujarat',
    size: '3 acres',
    price: '₹30,000/year per acre',
    soilType: 'Black cotton soil, pH 7.2',
    irrigation: 'Drip irrigation system',
    images: [
      'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg'
    ],
    phone: '+91 87654 32109',
    verified: true,
  },
];

export default function LandLeaseScreen() {
  const [activeTab, setActiveTab] = useState('Browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const LandCard = ({ listing }: { listing: LandListing }) => (
    <View style={styles.landCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: listing.images[0] }} style={styles.landImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart size={20} color="#FFFFFF" />
        </TouchableOpacity>
        {listing.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ Verified</Text>
          </View>
        )}
      </View>
      
      <View style={styles.landInfo}>
        <Text style={styles.landTitle}>{listing.title}</Text>
        
        <View style={styles.ownerInfo}>
          <Image source={{ uri: listing.ownerAvatar }} style={styles.ownerAvatar} />
          <Text style={styles.ownerName}>{listing.owner}</Text>
        </View>
        
        <View style={styles.landDetails}>
          <View style={styles.detailRow}>
            <MapPin size={16} color="#65676B" />
            <Text style={styles.detailText}>{listing.location}</Text>
          </View>
          <Text style={styles.landSize}>{listing.size}</Text>
          <Text style={styles.landPrice}>{listing.price}</Text>
        </View>
        
        <View style={styles.specifications}>
          <Text style={styles.specTitle}>Specifications:</Text>
          <Text style={styles.specText}>• {listing.soilType}</Text>
          <Text style={styles.specText}>• {listing.irrigation}</Text>
        </View>
        
        <View style={styles.landActions}>
          <TouchableOpacity style={styles.contactButton}>
            <Phone size={16} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>Contact Owner</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton}>
            <Map size={16} color="#1877F2" />
            <Text style={styles.mapButtonText}>View Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Share size={16} color="#65676B" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const ListLandForm = () => (
    <View style={styles.listForm}>
      <Text style={styles.formTitle}>List Your Land for Lease</Text>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>📸 Land Photos</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Plus size={24} color="#1877F2" />
          <Text style={styles.uploadButtonText}>Add Photos</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>📍 Location & Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Land title/description"
          placeholderTextColor="#65676B"
        />
        <TextInput
          style={styles.input}
          placeholder="Location (Village, District, State)"
          placeholderTextColor="#65676B"
        />
        <TextInput
          style={styles.input}
          placeholder="Land size (acres/hectares)"
          placeholderTextColor="#65676B"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Lease price per acre/year (₹)"
          placeholderTextColor="#65676B"
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>🌱 Soil & Irrigation</Text>
        <TextInput
          style={styles.input}
          placeholder="Soil type (e.g., Loamy, Clay, Sandy)"
          placeholderTextColor="#65676B"
        />
        <TextInput
          style={styles.input}
          placeholder="Soil pH (if known)"
          placeholderTextColor="#65676B"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Irrigation facilities"
          placeholderTextColor="#65676B"
        />
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>📞 Contact Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Your phone number"
          placeholderTextColor="#65676B"
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Additional details or requirements"
          placeholderTextColor="#65676B"
          multiline
          numberOfLines={4}
        />
      </View>
      
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>List My Land</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1C1E21" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Land for Lease</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['Browse', 'List Land', 'My Listings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'Browse' && (
        <>
          {/* Search and Filter */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#65676B" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by location, size, price..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} color="#1877F2" />
            </TouchableOpacity>
          </View>

          {/* Quick Filters */}
          <View style={styles.quickFilters}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filtersRow}>
                {['All', 'Punjab', 'Gujarat', 'Maharashtra', 'Under ₹30k', 'Organic Certified'].map((filter) => (
                  <TouchableOpacity key={filter} style={styles.filterChip}>
                    <Text style={styles.filterChipText}>{filter}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Map View Toggle */}
          <View style={styles.viewToggle}>
            <TouchableOpacity style={styles.mapViewButton}>
              <Map size={16} color="#1877F2" />
              <Text style={styles.mapViewText}>Map View</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.landsList}>
              {SAMPLE_LISTINGS.map((listing) => (
                <LandCard key={listing.id} listing={listing} />
              ))}
            </View>
          </ScrollView>
        </>
      )}

      {activeTab === 'List Land' && (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <ListLandForm />
        </ScrollView>
      )}

      {activeTab === 'My Listings' && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No listings yet</Text>
          <TouchableOpacity 
            style={styles.createListingButton}
            onPress={() => setActiveTab('List Land')}
          >
            <Text style={styles.createListingButtonText}>Create First Listing</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#42B883',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#42B883',
  },
  tabText: {
    fontSize: 14,
    color: '#65676B',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#42B883',
    fontWeight: '600',
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
  quickFilters: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#F0F2F5',
  },
  filterChipText: {
    fontSize: 12,
    color: '#65676B',
    fontWeight: '500',
  },
  viewToggle: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  mapViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  mapViewText: {
    fontSize: 14,
    color: '#1877F2',
    marginLeft: 4,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  landsList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  landCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  landImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#42B883',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  landInfo: {
    padding: 16,
  },
  landTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 8,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ownerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  ownerName: {
    fontSize: 14,
    color: '#1C1E21',
    marginLeft: 8,
    fontWeight: '500',
  },
  landDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#65676B',
    marginLeft: 4,
  },
  landSize: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 4,
  },
  landPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#42B883',
  },
  specifications: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  specTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 4,
  },
  specText: {
    fontSize: 13,
    color: '#65676B',
    marginBottom: 2,
  },
  landActions: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#42B883',
    paddingVertical: 10,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 14,
  },
  mapButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 10,
    borderRadius: 8,
  },
  mapButtonText: {
    color: '#1877F2',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 14,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listForm: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1E21',
    marginBottom: 20,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    paddingVertical: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E4E6EA',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    color: '#1877F2',
    fontWeight: '600',
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1C1E21',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E4E6EA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#42B883',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#65676B',
    marginBottom: 20,
  },
  createListingButton: {
    backgroundColor: '#42B883',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createListingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});