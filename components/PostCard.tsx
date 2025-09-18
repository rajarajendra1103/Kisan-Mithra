import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, MessageCircle, Share, MoveHorizontal as MoreHorizontal, CircleCheck as CheckCircle } from 'lucide-react-native';

interface Post {
  id: string;
  userType: 'Farmer' | 'Guide' | 'Shop Owner';
  userName: string;
  userAvatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  verified?: boolean;
  hasVideo?: boolean;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'Farmer': return '#42B883';
      case 'Guide': return '#1877F2';
      case 'Shop Owner': return '#FF6B35';
      default: return '#65676B';
    }
  };

  return (
    <View style={styles.card}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{post.userName}</Text>
              {post.verified && (
                <CheckCircle size={16} color="#1877F2" style={styles.verifiedIcon} />
              )}
            </View>
            <View style={styles.metaRow}>
              <Text style={[styles.userType, { color: getUserTypeColor(post.userType) }]}>
                {post.userType}
              </Text>
              <Text style={styles.timeAgo}>• {post.timeAgo}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color="#65676B" />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <Text style={styles.content}>{post.content}</Text>

      {/* Post Image/Video */}
      {post.image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          {post.hasVideo && (
            <View style={styles.videoOverlay}>
              <View style={styles.playButton}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Post Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, isLiked && styles.likedButton]}
          onPress={() => setIsLiked(!isLiked)}
        >
          <Heart
            size={20}
            color={isLiked ? '#E53E3E' : '#65676B'}
            fill={isLiked ? '#E53E3E' : 'transparent'}
          />
          <Text style={[styles.actionText, isLiked && styles.likedText]}>
            {post.likes + (isLiked ? 1 : 0)}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#65676B" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Share size={20} color="#65676B" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1E21',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  userType: {
    fontSize: 13,
    fontWeight: '500',
  },
  timeAgo: {
    fontSize: 13,
    color: '#65676B',
    marginLeft: 4,
  },
  moreButton: {
    padding: 8,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1C1E21',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 24,
    color: '#1C1E21',
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E4E6EA',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
    borderRadius: 20,
  },
  likedButton: {
    backgroundColor: '#FFF0F0',
  },
  actionText: {
    fontSize: 14,
    color: '#65676B',
    marginLeft: 6,
    fontWeight: '500',
  },
  likedText: {
    color: '#E53E3E',
  },
});