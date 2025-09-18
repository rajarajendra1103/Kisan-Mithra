import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, Upload, Video, FileText, MapPin, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function UploadCenterScreen() {
  const [activeCategory, setActiveCategory] = useState('Products');

  const categories = ['Products', 'Land for Lease', 'Videos', 'Posts', 'Blog'];

  const UploadOption = ({ icon, title, subtitle, onPress }: any) => (
    <TouchableOpacity style={styles.uploadOption} onPress={onPress}>
      <View style={styles.uploadIcon}>
        {icon}
      </View>
      <View style={styles.uploadContent}>
        <Text style={styles.uploadTitle}>{title}</Text>
        <Text style={styles.uploadSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.uploadArrow}>
        <Text style={styles.arrowText}>→</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'Products':
        return (
          <View style={styles.categoryContent}>
            <UploadOption
              icon={<Camera size={24} color="#1877F2" />}
              title="Take Photo"
              subtitle="Capture product images"
              onPress={() => {}}
            />
            <UploadOption
              icon={<Upload size={24} color="#42B883" />}
              title="Upload from Gallery"
              subtitle="Select existing photos"
              onPress={() => {}}
            />
            <View style={styles.formSection}>
              <Text style={styles.formTitle}>Product Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Product name"
                placeholderTextColor="#65676B"
              />
              <TextInput
                style={styles.input}
                placeholder="Price (₹)"
                placeholderTextColor="#65676B"
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                placeholderTextColor="#65676B"
                multiline
                numberOfLines={4}
              />
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Upload Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'Land for Lease':
        return (
          <View style={styles.categoryContent}>
            <UploadOption
              icon={<Camera size={24} color="#1877F2" />}
              title="Land Photos"
              subtitle="Capture land images"
              onPress={() => {}}
            />
            <UploadOption
              icon={<MapPin size={24} color="#FF6B35" />}
              title="Add Location"
              subtitle="GPS coordinates"
              onPress={() => {}}
            />
            <View style={styles.formSection}>
              <Text style={styles.formTitle}>Land Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Land size (acres)"
                placeholderTextColor="#65676B"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Lease cost per year (₹)"
                placeholderTextColor="#65676B"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Soil type"
                placeholderTextColor="#65676B"
              />
              <TextInput
                style={styles.input}
                placeholder="Irrigation availability"
                placeholderTextColor="#65676B"
              />
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>List Land</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'Videos':
        return (
          <View style={styles.categoryContent}>
            <UploadOption
              icon={<Video size={24} color="#1877F2" />}
              title="Record Video"
              subtitle="Create tutorial or story"
              onPress={() => {}}
            />
            <UploadOption
              icon={<Upload size={24} color="#42B883" />}
              title="Upload Video"
              subtitle="Select from gallery"
              onPress={() => {}}
            />
            <View style={styles.formSection}>
              <Text style={styles.formTitle}>Video Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Video title"
                placeholderTextColor="#65676B"
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                placeholderTextColor="#65676B"
                multiline
                numberOfLines={3}
              />
              <TextInput
                style={styles.input}
                placeholder="Tags (comma separated)"
                placeholderTextColor="#65676B"
              />
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Upload Video</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'Posts':
        return (
          <View style={styles.categoryContent}>
            <UploadOption
              icon={<FileText size={24} color="#1877F2" />}
              title="Text Post"
              subtitle="Share your thoughts"
              onPress={() => {}}
            />
            <UploadOption
              icon={<Camera size={24} color="#42B883" />}
              title="Photo Post"
              subtitle="Share with images"
              onPress={() => {}}
            />
            <View style={styles.formSection}>
              <Text style={styles.formTitle}>Create Post</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="What's on your mind?"
                placeholderTextColor="#65676B"
                multiline
                numberOfLines={4}
              />
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Share Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'Blog':
        return (
          <View style={styles.categoryContent}>
            <UploadOption
              icon={<FileText size={24} color="#1877F2" />}
              title="Write Blog"
              subtitle="Share detailed story"
              onPress={() => router.push('/blog-corner')}
            />
            <UploadOption
              icon={<Camera size={24} color="#42B883" />}
              title="Photo Story"
              subtitle="Visual storytelling"
              onPress={() => {}}
            />
            <View style={styles.formSection}>
              <Text style={styles.formTitle}>Blog Post</Text>
              <TextInput
                style={styles.input}
                placeholder="Blog title"
                placeholderTextColor="#65676B"
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Write your story..."
                placeholderTextColor="#65676B"
                multiline
                numberOfLines={6}
              />
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Publish Blog</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1C1E21" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Center</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Category Tabs */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesRow}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  activeCategory === category && styles.activeCategoryTab
                ]}
                onPress={() => setActiveCategory(category)}
              >
                <Text style={[
                  styles.categoryTabText,
                  activeCategory === category && styles.activeCategoryTabText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderCategoryContent()}
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
  placeholder: {
    width: 40,
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  categoriesRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
  },
  activeCategoryTab: {
    backgroundColor: '#1877F2',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#65676B',
    fontWeight: '500',
  },
  activeCategoryTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  categoryContent: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  uploadOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  uploadContent: {
    flex: 1,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#65676B',
  },
  uploadArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 16,
    color: '#1877F2',
    fontWeight: 'bold',
  },
  formSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E4E6EA',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 16,
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
    backgroundColor: '#1877F2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});