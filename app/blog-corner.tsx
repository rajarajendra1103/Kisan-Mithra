import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, Plus, Heart, MessageCircle, Share, BookOpen, Camera, Mic } from 'lucide-react-native';
import { router } from 'expo-router';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  tags: string[];
  likes: number;
  comments: number;
  type: 'Success Story' | 'Tips' | 'Blog';
}

const SAMPLE_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'From 2 Acres to Prosperity: My Organic Farming Journey',
    author: 'राम कुमार',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    timeAgo: '2h',
    content: 'Started with just 2 acres and traditional methods. Today, my organic farm produces 40% more yield than conventional farming...',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
    tags: ['Organic', 'Success Story', 'Wheat'],
    likes: 156,
    comments: 23,
    type: 'Success Story',
  },
  {
    id: '2',
    title: '5 Natural Ways to Control Pest Without Chemicals',
    author: 'Dr. Priya Sharma',
    authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    timeAgo: '4h',
    content: 'Neem oil, companion planting, and beneficial insects can effectively control pests while maintaining soil health...',
    tags: ['Tips', 'Organic', 'Pest Control'],
    likes: 89,
    comments: 12,
    type: 'Tips',
  },
  {
    id: '3',
    title: 'Water Conservation Techniques That Doubled My Yield',
    author: 'सुनीता पटेल',
    authorAvatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
    timeAgo: '1d',
    content: 'Drip irrigation and mulching transformed my cotton farm. Here\'s how I reduced water usage by 60% while increasing yield...',
    image: 'https://images.pexels.com/photos/162637/agriculture-arable-clouds-countryside-162637.jpeg',
    tags: ['Water Conservation', 'Cotton', 'Sustainable'],
    likes: 234,
    comments: 45,
    type: 'Blog',
  },
];

export default function BlogCornerScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filters = ['All', 'Success Story', 'Tips', 'Blog'];

  const BlogCard = ({ blog }: { blog: BlogPost }) => (
    <View style={styles.blogCard}>
      <View style={styles.blogHeader}>
        <Image source={{ uri: blog.authorAvatar }} style={styles.authorAvatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{blog.author}</Text>
          <Text style={styles.timeAgo}>{blog.timeAgo}</Text>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(blog.type) }]}>
          <Text style={styles.typeBadgeText}>{blog.type}</Text>
        </View>
      </View>
      
      <Text style={styles.blogTitle}>{blog.title}</Text>
      <Text style={styles.blogContent} numberOfLines={3}>{blog.content}</Text>
      
      {blog.image && (
        <Image source={{ uri: blog.image }} style={styles.blogImage} />
      )}
      
      <View style={styles.tagsContainer}>
        {blog.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.blogActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={20} color="#65676B" />
          <Text style={styles.actionText}>{blog.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#65676B" />
          <Text style={styles.actionText}>{blog.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share size={20} color="#65676B" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Success Story': return '#E8F5E8';
      case 'Tips': return '#E3F2FD';
      case 'Blog': return '#FFF3E0';
      default: return '#F0F2F5';
    }
  };

  const CreateBlogModal = () => (
    <View style={styles.createModal}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Create New Post</Text>
        <TouchableOpacity onPress={() => setShowCreateModal(false)}>
          <Text style={styles.modalClose}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.createOptions}>
        <TouchableOpacity style={styles.createOption}>
          <BookOpen size={24} color="#1877F2" />
          <Text style={styles.createOptionText}>Write Blog</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createOption}>
          <Camera size={24} color="#42B883" />
          <Text style={styles.createOptionText}>Photo Story</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createOption}>
          <Mic size={24} color="#FF6B35" />
          <Text style={styles.createOptionText}>Voice Story</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.titleInput}
        placeholder="Enter title..."
        placeholderTextColor="#65676B"
      />
      
      <TextInput
        style={styles.contentInput}
        placeholder="Share your story, tips, or experience..."
        placeholderTextColor="#65676B"
        multiline
        numberOfLines={6}
      />
      
      <View style={styles.tagInput}>
        <TextInput
          style={styles.tagTextInput}
          placeholder="Add tags (e.g., organic, wheat, tips)"
          placeholderTextColor="#65676B"
        />
      </View>
      
      <TouchableOpacity style={styles.publishButton}>
        <Text style={styles.publishButtonText}>Publish Post</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1C1E21" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blog Corner</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#65676B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search blogs, stories, tips..."
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

      {/* Featured Section */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>🌟 Featured Stories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.featuredRow}>
            <TouchableOpacity style={styles.featuredCard}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg' }}
                style={styles.featuredImage}
              />
              <Text style={styles.featuredTitle}>Success Stories</Text>
              <Text style={styles.featuredSubtitle}>Inspiring journeys</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredCard}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/162637/agriculture-arable-clouds-countryside-162637.jpeg' }}
                style={styles.featuredImage}
              />
              <Text style={styles.featuredTitle}>Farming Tips</Text>
              <Text style={styles.featuredSubtitle}>Expert advice</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredCard}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg' }}
                style={styles.featuredImage}
              />
              <Text style={styles.featuredTitle}>Sustainable Practices</Text>
              <Text style={styles.featuredSubtitle}>Eco-friendly methods</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.blogsList}>
          {SAMPLE_BLOGS.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </View>
      </ScrollView>

      {showCreateModal && <CreateBlogModal />}
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
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
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
  featuredSection: {
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
  featuredRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  featuredCard: {
    width: 120,
    marginRight: 12,
    alignItems: 'center',
  },
  featuredImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
    textAlign: 'center',
  },
  featuredSubtitle: {
    fontSize: 12,
    color: '#65676B',
    textAlign: 'center',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  blogsList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  blogCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  blogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
  },
  timeAgo: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 2,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1C1E21',
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 8,
    lineHeight: 22,
  },
  blogContent: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
    marginBottom: 12,
  },
  blogImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#1877F2',
    fontWeight: '500',
  },
  blogActions: {
    flexDirection: 'row',
    paddingTop: 12,
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
  actionText: {
    fontSize: 14,
    color: '#65676B',
    marginLeft: 6,
    fontWeight: '500',
  },
  createModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
  },
  modalClose: {
    fontSize: 24,
    color: '#65676B',
  },
  createOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  createOption: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    width: '30%',
  },
  createOptionText: {
    fontSize: 12,
    color: '#1C1E21',
    marginTop: 8,
    fontWeight: '500',
  },
  titleInput: {
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
  contentInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1C1E21',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E4E6EA',
    height: 150,
    textAlignVertical: 'top',
  },
  tagInput: {
    marginBottom: 20,
  },
  tagTextInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1C1E21',
    borderWidth: 1,
    borderColor: '#E4E6EA',
  },
  publishButton: {
    backgroundColor: '#1877F2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});