import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Plus } from 'lucide-react-native';

interface Story {
  id: string;
  name: string;
  avatar: string | null;
  isAddStory?: boolean;
}

interface StoryCircleProps {
  story: Story;
}

export function StoryCircle({ story }: StoryCircleProps) {
  if (story.isAddStory) {
    return (
      <TouchableOpacity style={styles.storyContainer}>
        <View style={styles.addStoryCircle}>
          <Plus size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.storyName}>Add Story</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.storyContainer}>
      <View style={styles.storyCircle}>
        <Image source={{ uri: story.avatar! }} style={styles.storyImage} />
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {story.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  storyContainer: {
    alignItems: 'center',
    marginRight: 12,
    width: 70,
  },
  storyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 3,
    backgroundColor: '#1877F2',
    marginBottom: 6,
  },
  addStoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#42B883',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 27,
  },
  storyName: {
    fontSize: 12,
    color: '#1C1E21',
    textAlign: 'center',
    fontWeight: '500',
  },
});