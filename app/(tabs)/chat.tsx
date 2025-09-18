import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, CreditCard as Edit, Phone, Video, Mic } from 'lucide-react-native';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timeAgo: string;
  avatar: string;
  isOnline: boolean;
  unreadCount?: number;
  isGroup?: boolean;
}

const CHATS: Chat[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    lastMessage: 'Voice message about tomato disease treatment',
    timeAgo: '2m',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Punjab Farmers Group',
    lastMessage: 'राम: Wheat harvest completed successfully!',
    timeAgo: '15m',
    avatar: 'https://images.pexels.com/photos/162637/agriculture-arable-clouds-countryside-162637.jpeg',
    isOnline: false,
    isGroup: true,
    unreadCount: 5,
  },
  {
    id: '3',
    name: 'Green Valley Seeds',
    lastMessage: 'New seeds arrived! 20% discount this week',
    timeAgo: '1h',
    avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
    isOnline: true,
  },
  {
    id: '4',
    name: 'राज पटेल',
    lastMessage: 'धन्यवाद भाई, बहुत मदद मिली',
    timeAgo: '3h',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    isOnline: false,
  },
];

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState('Chats');

  const ChatItem = ({ chat }: { chat: Chat }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: chat.avatar }} style={styles.avatar} />
        {chat.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{chat.name}</Text>
          <Text style={styles.timeAgo}>{chat.timeAgo}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unreadCount && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kisan Chat</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Search size={24} color="#1C1E21" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Edit size={24} color="#1C1E21" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['Chats', 'Calls', 'Groups'].map((tab) => (
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

      {/* Voice Assistant Quick Access */}
      <TouchableOpacity style={styles.voiceAssistant}>
        <View style={styles.voiceIcon}>
          <Mic size={24} color="#FFFFFF" />
        </View>
        <View style={styles.voiceContent}>
          <Text style={styles.voiceTitle}>🤖 AI Assistant</Text>
          <Text style={styles.voiceSubtitle}>Ask about crops, weather, market prices in Hindi/English</Text>
        </View>
        <View style={styles.voiceButton}>
          <Text style={styles.voiceButtonText}>Talk</Text>
        </View>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.chatsList}>
          {CHATS.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </View>

        {/* Community Rooms */}
        <View style={styles.communitySection}>
          <Text style={styles.sectionTitle}>🌾 Community Rooms</Text>
          <View style={styles.communityRooms}>
            <TouchableOpacity style={styles.communityRoom}>
              <Text style={styles.roomEmoji}>🌱</Text>
              <Text style={styles.roomName}>Crop Disease Help</Text>
              <Text style={styles.roomMembers}>156 active</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.communityRoom}>
              <Text style={styles.roomEmoji}>📈</Text>
              <Text style={styles.roomName}>Market Updates</Text>
              <Text style={styles.roomMembers}>89 active</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.communityRoom}>
              <Text style={styles.roomEmoji}>🌦️</Text>
              <Text style={styles.roomName}>Weather Alerts</Text>
              <Text style={styles.roomMembers}>203 active</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Video Calls */}
        <View style={styles.videoCallsSection}>
          <Text style={styles.sectionTitle}>📹 Recent Expert Calls</Text>
          <TouchableOpacity style={styles.videoCallItem}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
              style={styles.callAvatar}
            />
            <View style={styles.callInfo}>
              <Text style={styles.callName}>Dr. Priya Sharma</Text>
              <Text style={styles.callType}>Video consultation</Text>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Video size={20} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton}>
              <Phone size={20} color="#42B883" />
            </TouchableOpacity>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1E21',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1877F2',
  },
  tabText: {
    fontSize: 16,
    color: '#65676B',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1877F2',
    fontWeight: '600',
  },
  voiceAssistant: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  voiceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceContent: {
    flex: 1,
    marginLeft: 12,
  },
  voiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
  },
  voiceSubtitle: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 2,
  },
  voiceButton: {
    backgroundColor: '#1877F2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  voiceButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  chatsList: {
    backgroundColor: '#FFFFFF',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#42B883',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatContent: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
  },
  timeAgo: {
    fontSize: 12,
    color: '#65676B',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#65676B',
  },
  unreadBadge: {
    backgroundColor: '#1877F2',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  communitySection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 12,
  },
  communityRooms: {
    gap: 8,
  },
  communityRoom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
  },
  roomEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  roomName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1E21',
  },
  roomMembers: {
    fontSize: 12,
    color: '#42B883',
    fontWeight: '500',
  },
  videoCallsSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  videoCallItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  callInfo: {
    flex: 1,
    marginLeft: 12,
  },
  callName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
  },
  callType: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 2,
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});