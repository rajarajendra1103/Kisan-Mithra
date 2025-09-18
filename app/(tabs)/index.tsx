import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Menu, Bell, Search, Plus, Heart, MessageCircle, Share } from 'lucide-react-native';
import { FeedHeader } from '@/components/FeedHeader';
import { PostCard } from '@/components/PostCard';
import { StoryCircle } from '@/components/StoryCircle';
import { QuickActionCard } from '@/components/QuickActionCard';

const SAMPLE_POSTS = [
  {
    id: '1',
    userType: 'Farmer',
    userName: 'राम कुमार',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    timeAgo: '2h',
    content: 'Excellent tomato harvest this season! Thanks to the AI disease detection feature.',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
    likes: 24,
    comments: 8,
    verified: true,
  },
  {
    id: '2',
    userType: 'Guide',
    userName: 'Dr. Priya Sharma',
    userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    timeAgo: '4h',
    content: 'New tutorial: Organic pest control methods for cotton crops. Voice guidance available in Hindi!',
    likes: 156,
    comments: 23,
    verified: true,
    hasVideo: true,
  },
  {
    id: '3',
    userType: 'Shop Owner',
    userName: 'Green Valley Seeds',
    userAvatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
    timeAgo: '6h',
    content: '🌾 Premium quality seeds available! Free delivery within 10km. Visit our store or order online.',
    image: 'https://images.pexels.com/photos/162637/agriculture-arable-clouds-countryside-162637.jpeg',
    likes: 42,
    comments: 12,
    verified: false,
  },
];

const STORIES = [
  { id: '1', name: 'Your Story', avatar: null, isAddStory: true },
  { id: '2', name: 'राज पटेल', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg' },
  { id: '3', name: 'सुनीता देवी', avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg' },
  { id: '4', name: 'अमित वर्मा', avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg' },
];

export default function FeedScreen() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <FeedHeader onMenuPress={() => setShowDrawer(!showDrawer)} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stories Section */}
        <View style={styles.storiesContainer}>
          <Text style={styles.sectionTitle}>Stories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.storiesRow}>
              {STORIES.map((story) => (
                <StoryCircle key={story.id} story={story} />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Tools</Text>
          <View style={styles.quickActionsGrid}>
            <QuickActionCard
              title="Crop Health"
              subtitle="AI Diagnosis"
              icon="🌱"
              color="#42B883"
              route="/crop-health"
            />
            <QuickActionCard
              title="Chart Bot"
              subtitle="Crop Info AI"
              icon="🤖"
              color="#1877F2"
              route="/chart-bot"
            />
            <QuickActionCard
              title="Market Prices"
              subtitle="Live rates"
              icon="📈"
              color="#8B5CF6"
              route="/market-analysis"
            />
            <QuickActionCard
              title="Govt Schemes"
              subtitle="Apply now"
              icon="🏛️"
              color="#F59E0B"
              route="/govt-schemes"
            />
            <QuickActionCard
              title="Weather"
              subtitle="7-day forecast"
              icon="🌤️"
              color="#06B6D4"
              route="/weather-forecast"
            />
            <QuickActionCard
              title="Land Lease"
              subtitle="Find/List land"
              icon="🌾"
              color="#84CC16"
              route="/land-lease"
            />
          </View>
        </View>

        {/* Posts Feed */}
        <View style={styles.postsContainer}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          {SAMPLE_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  scrollView: {
    flex: 1,
  },
  storiesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  storiesRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  quickActionsContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginBottom: 8,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  postsContainer: {
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});