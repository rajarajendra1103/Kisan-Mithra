import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, CreditCard as Edit, Share, MapPin, Calendar, CircleCheck as CheckCircle, Camera, Plus, Video, Phone, Upload, BookOpen, Menu } from 'lucide-react-native';
import { router } from 'expo-router';

type UserType = 'Farmer' | 'Guide' | 'Shop Owner';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Posts');
  const [userType, setUserType] = useState<UserType>('Farmer');
  const [showDrawer, setShowDrawer] = useState(false);

  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.coverPhoto}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/162637/agriculture-arable-clouds-countryside-162637.jpeg' }}
          style={styles.coverImage}
        />
        <TouchableOpacity style={styles.editCoverButton}>
          <Camera size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileInfo}>
        <TouchableOpacity 
          style={styles.avatarContainer}
          onPress={() => setShowDrawer(true)}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.profileAvatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Camera size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </TouchableOpacity>
        
        <View style={styles.userDetails}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>राम कुमार शर्मा</Text>
            <CheckCircle size={20} color="#1877F2" style={styles.verifiedBadge} />
          </View>
          
          <View style={styles.userTypeRow}>
            <Text style={[styles.userTypeText, { color: getUserTypeColor(userType) }]}>
              Verified {userType}
            </Text>
            <View style={styles.userTypeBadge}>
              <Text style={styles.badgeEmoji}>🌾</Text>
            </View>
          </View>
          
          <Text style={styles.userBio}>
            {userType === 'Farmer' && 'Organic farming enthusiast from Punjab. Growing wheat, rice, and vegetables using sustainable methods. Happy to share knowledge with fellow farmers!'}
            {userType === 'Guide' && 'Agricultural expert with 15+ years experience. Specializing in crop disease management and sustainable farming practices. Available for video consultations.'}
            {userType === 'Shop Owner' && 'Premium quality seeds and fertilizers supplier. Serving farmers across Punjab with doorstep delivery. Certified organic products available.'}
          </Text>
          
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <MapPin size={16} color="#65676B" />
              <Text style={styles.metaText}>Punjab, India</Text>
            </View>
            <View style={styles.metaItem}>
              <Calendar size={16} color="#65676B" />
              <Text style={styles.metaText}>Joined March 2024</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.profileActions}>
        <TouchableOpacity style={styles.editProfileButton}>
          <Edit size={16} color="#FFFFFF" />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
        {userType === 'Guide' && (
          <TouchableOpacity style={styles.videoCallButton}>
            <Video size={16} color="#FFFFFF" />
            <Text style={styles.videoCallText}>Video Call</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.shareButton}>
          <Share size={16} color="#1877F2" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>45</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1.2K</Text>
          <Text style={styles.statLabel}>
            {userType === 'Farmer' ? 'Followers' : userType === 'Guide' ? 'Students' : 'Customers'}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>234</Text>
          <Text style={styles.statLabel}>
            {userType === 'Farmer' ? 'Following' : userType === 'Guide' ? 'Following' : 'Products'}
          </Text>
        </View>
      </View>
    </View>
  );

  const ProfileTabs = () => {
    const tabs = userType === 'Farmer' 
      ? ['Posts', 'Products', 'Guides', 'Videos'] 
      : userType === 'Guide'
      ? ['Posts', 'Tutorials', 'Products', 'About']
      : ['Products', 'Gallery', 'Location', 'About'];

    return (
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
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
    );
  };

  const AsideDrawer = () => (
    <Modal
      visible={showDrawer}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowDrawer(false)}
    >
      <View style={styles.drawerOverlay}>
        <TouchableOpacity 
          style={styles.drawerBackdrop} 
          onPress={() => setShowDrawer(false)} 
        />
        <View style={styles.drawerContent}>
          <View style={styles.drawerHeader}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.drawerAvatar}
            />
            <Text style={styles.drawerName}>राम कुमार शर्मा</Text>
            <Text style={styles.drawerType}>{userType}</Text>
          </View>
          
          <View style={styles.drawerMenu}>
            <TouchableOpacity 
              style={styles.drawerItem}
              onPress={() => {
                setShowDrawer(false);
                // Navigate to profile
              }}
            >
              <View style={styles.drawerIcon}>
                <Text style={styles.drawerEmoji}>👤</Text>
              </View>
              <Text style={styles.drawerItemText}>My Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.drawerItem}
              onPress={() => {
                setShowDrawer(false);
                router.push('/upload-center');
              }}
            >
              <View style={styles.drawerIcon}>
                <Upload size={20} color="#1877F2" />
              </View>
              <Text style={styles.drawerItemText}>Upload Center</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.drawerItem}
              onPress={() => {
                setShowDrawer(false);
                router.push('/blog-corner');
              }}
            >
              <View style={styles.drawerIcon}>
                <BookOpen size={20} color="#42B883" />
              </View>
              <Text style={styles.drawerItemText}>Blog Corner</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.drawerItem}
              onPress={() => {
                setShowDrawer(false);
                router.push('/land-lease');
              }}
            >
              <View style={styles.drawerIcon}>
                <Text style={styles.drawerEmoji}>🌾</Text>
              </View>
              <Text style={styles.drawerItemText}>Land for Lease</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.drawerItem}
              onPress={() => {
                setShowDrawer(false);
                router.push('/settings');
              }}
            >
              <View style={styles.drawerIcon}>
                <Settings size={20} color="#65676B" />
              </View>
              <Text style={styles.drawerItemText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'Farmer': return '#42B883';
      case 'Guide': return '#1877F2';
      case 'Shop Owner': return '#FF6B35';
      default: return '#65676B';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Posts':
        return (
          <View style={styles.tabContent}>
            <TouchableOpacity style={styles.createPostButton}>
              <Plus size={20} color="#1877F2" />
              <Text style={styles.createPostText}>Share your farming experience...</Text>
            </TouchableOpacity>
            
            <View style={styles.postGrid}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <TouchableOpacity key={i} style={styles.postThumbnail}>
                  <Image
                    source={{ uri: `https://images.pexels.com/photos/${1327838 + i}/pexels-photo-${1327838 + i}.jpeg` }}
                    style={styles.postImage}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      
      case 'Products':
        return (
          <View style={styles.tabContent}>
            <TouchableOpacity style={styles.uploadButton}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.uploadButtonText}>Upload Product</Text>
            </TouchableOpacity>
            
            <View style={styles.productsList}>
              <View style={styles.productCard}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg' }}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>Organic Tomatoes</Text>
                <Text style={styles.productPrice}>₹40/kg</Text>
              </View>
            </View>
          </View>
        );
      
      case 'Guides':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>📚 Followed Guides</Text>
            <View style={styles.guidesList}>
              <View style={styles.guideCard}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
                  style={styles.guideAvatar}
                />
                <View style={styles.guideInfo}>
                  <Text style={styles.guideName}>Dr. Priya Sharma</Text>
                  <Text style={styles.guideSpecialty}>Crop Disease Expert</Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followButtonText}>Following</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      
      default:
        return (
          <View style={styles.tabContent}>
            <Text style={styles.emptyStateText}>Content coming soon...</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowDrawer(true)} style={styles.menuButton}>
          <Menu size={24} color="#1C1E21" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.userTypeSelector}>
          {(['Farmer', 'Guide', 'Shop Owner'] as UserType[]).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                userType === type && styles.activeTypeButton
              ]}
              onPress={() => setUserType(type)}
            >
              <Text style={[
                styles.typeButtonText,
                userType === type && styles.activeTypeButtonText
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <ProfileTabs />
        {renderTabContent()}
      </ScrollView>

      <AsideDrawer />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
  },
  userTypeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    padding: 2,
  },
  typeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  activeTypeButton: {
    backgroundColor: '#1877F2',
  },
  typeButtonText: {
    fontSize: 10,
    color: '#65676B',
    fontWeight: '500',
  },
  activeTypeButtonText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  coverPhoto: {
    position: 'relative',
    height: 200,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editCoverButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  avatarContainer: {
    position: 'absolute',
    top: -50,
    left: 16,
    zIndex: 1,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: 120,
    marginTop: -30,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1E21',
  },
  verifiedBadge: {
    marginLeft: 8,
  },
  userTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userTypeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  userTypeBadge: {
    marginLeft: 8,
  },
  badgeEmoji: {
    fontSize: 16,
  },
  userBio: {
    fontSize: 14,
    lineHeight: 20,
    color: '#65676B',
    marginBottom: 12,
  },
  metaInfo: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: '#65676B',
    marginLeft: 6,
  },
  profileActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  editProfileButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    paddingVertical: 12,
    borderRadius: 8,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  videoCallButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#42B883',
    paddingVertical: 12,
    borderRadius: 8,
  },
  videoCallText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E6EA',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1E21',
  },
  statLabel: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1877F2',
  },
  tabText: {
    fontSize: 14,
    color: '#65676B',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1877F2',
    fontWeight: '600',
  },
  tabContent: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    minHeight: 400,
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  createPostText: {
    color: '#65676B',
    marginLeft: 8,
    flex: 1,
  },
  postGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 2,
  },
  postThumbnail: {
    width: '32.66%',
    aspectRatio: 1,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#42B883',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  productsList: {
    paddingHorizontal: 16,
  },
  productCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
  },
  productPrice: {
    fontSize: 12,
    color: '#42B883',
    fontWeight: '500',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  guidesList: {
    paddingHorizontal: 16,
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  guideAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  guideInfo: {
    flex: 1,
    marginLeft: 12,
  },
  guideName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
  },
  guideSpecialty: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  followButtonText: {
    fontSize: 12,
    color: '#1877F2',
    fontWeight: '600',
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#65676B',
    fontSize: 16,
    marginTop: 40,
  },
  drawerOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContent: {
    width: 280,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
  },
  drawerHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  drawerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  drawerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1E21',
  },
  drawerType: {
    fontSize: 14,
    color: '#65676B',
    marginTop: 4,
  },
  drawerMenu: {
    paddingVertical: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  drawerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  drawerEmoji: {
    fontSize: 20,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#1C1E21',
    fontWeight: '500',
  },
});