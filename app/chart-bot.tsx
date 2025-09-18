import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mic, Search, Share, Volume2, MessageSquare, BookOpen } from 'lucide-react-native';
import { router } from 'expo-router';
import { geminiService } from '@/services/geminiService';

const CROP_SHORTCUTS = [
  { name: 'Wheat', emoji: '🌾', popular: true },
  { name: 'Rice', emoji: '🌾', popular: true },
  { name: 'Cotton', emoji: '🌿', popular: true },
  { name: 'Tomato', emoji: '🍅', popular: false },
  { name: 'Onion', emoji: '🧅', popular: false },
  { name: 'Sugarcane', emoji: '🎋', popular: false },
  { name: 'Potato', emoji: '🥔', popular: false },
  { name: 'Maize', emoji: '🌽', popular: false },
];

const ANIMAL_SHORTCUTS = [
  { name: 'Dairy Cow', emoji: '🐄', popular: true },
  { name: 'Goat', emoji: '🐐', popular: true },
  { name: 'Buffalo', emoji: '🐃', popular: true },
  { name: 'Poultry', emoji: '🐔', popular: false },
  { name: 'Sheep', emoji: '🐑', popular: false },
  { name: 'Fish', emoji: '🐟', popular: false },
];

const SAMPLE_FAQS = [
  'Best time to sow wheat?',
  'Water requirements for rice?',
  'Organic fertilizers for tomato?',
  'Crop rotation for cotton?',
  'Intercropping with sugarcane?',
];

const ANIMAL_FAQS = [
  'Daily milk yield of Jersey cow?',
  'Goat vaccination schedule?',
  'Buffalo feed requirements?',
  'Poultry housing setup?',
  'Fish pond management?',
];

export default function ChartBotScreen() {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cropData, setCropData] = useState<any>(null);
  const [animalData, setAnimalData] = useState<any>(null);
  const [conversationalResponse, setConversationalResponse] = useState<string>('');
  const [isNarrating, setIsNarrating] = useState(false);
  const [activeMode, setActiveMode] = useState<'crop' | 'animal'>('crop');
  const [language, setLanguage] = useState('en');

  const isStructuredQuery = (query: string): boolean => {
    const structuredKeywords = [
      'tell me about', 'information about', 'details about', 'cultivation of',
      'growing', 'farming', 'requirements for', 'how to grow', 'care for'
    ];
    
    const lowerQuery = query.toLowerCase();
    return structuredKeywords.some(keyword => lowerQuery.includes(keyword)) ||
           CROP_SHORTCUTS.some(crop => lowerQuery.includes(crop.name.toLowerCase())) ||
           ANIMAL_SHORTCUTS.some(animal => lowerQuery.includes(animal.name.toLowerCase()));
  };

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    setCropData(null);
    setAnimalData(null);
    setConversationalResponse('');
    
    try {
      const isStructured = isStructuredQuery(searchQuery);
      
      if (activeMode === 'crop') {
        if (isStructured) {
          const result = await geminiService.getCropInfo(searchQuery, language);
          setCropData(result);
        } else {
          const result = await geminiService.getConversationalResponse(searchQuery, 'crop', language);
          setConversationalResponse(result);
        }
      } else {
        if (isStructured) {
          const result = await geminiService.getAnimalInfo(searchQuery, language);
          setAnimalData(result);
        } else {
          const result = await geminiService.getConversationalResponse(searchQuery, 'animal', language);
          setConversationalResponse(result);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      
      // Fallback responses
      if (activeMode === 'crop' && isStructuredQuery(searchQuery)) {
        setConversationalResponse('🤖 I apologize, but I\'m having trouble processing your request right now. Please try again or rephrase your question. I can help with crop information, animal care, farming techniques, and agricultural advice in both Hindi and English.');
      } else if (activeMode === 'animal' && isStructuredQuery(searchQuery)) {
        setConversationalResponse('🤖 I apologize, but I\'m having trouble processing your request right now. Please try again or rephrase your question. I can help with animal care, livestock management, and veterinary advice in both Hindi and English.');
      } else {
        setConversationalResponse('🤖 I apologize, but I\'m having trouble processing your request right now. Please try again or rephrase your question. I can help with crop information, animal care, farming techniques, and agricultural advice in both Hindi and English.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = async () => {
    setIsListening(!isListening);
    if (!isListening) {
      try {
        // Start recording audio (simplified for demo)
        const sampleQuery = activeMode === 'crop' ? 'What are the best wheat varieties for Punjab?' : 'How much milk does a Jersey cow give daily?';
        setQuery(sampleQuery);
        await handleSearch(sampleQuery);
      } catch (error) {
        console.error('Voice input error:', error);
      } finally {
        setIsListening(false);
      }
    }
  };

  const handleNarration = async () => {
    setIsNarrating(!isNarrating);
    if (!isNarrating) {
      try {
        const textToNarrate = cropData ? 
          `Crop information for ${cropData.cropName}. Seeds: ${cropData.seeds.type}. Soil: ${cropData.soil.type}` :
          animalData ? 
          `Animal care for ${animalData.animalType}. Breed: ${animalData.breed}. Housing: ${animalData.housing}` :
          conversationalResponse || 'No data available for narration';
        
        const audioContent = await geminiService.textToSpeech(textToNarrate, language === 'hi' ? 'hi-IN' : 'en-US');
        // Play audio (implementation depends on platform)
        console.log('Audio content ready for playback');
      } catch (error) {
        console.error('Narration error:', error);
      } finally {
        setIsNarrating(false);
      }
    }
  };

  const DataRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.dataRow}>
      <Text style={styles.dataLabel}>{label}</Text>
      <Text style={styles.dataValue}>{value}</Text>
    </View>
  );

  const SustainablePracticeCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
    <View style={styles.practiceCard}>
      <Text style={styles.practiceIcon}>{icon}</Text>
      <View style={styles.practiceContent}>
        <Text style={styles.practiceTitle}>{title}</Text>
        <Text style={styles.practiceDescription}>{description}</Text>
      </View>
    </View>
  );

  const AnimalInfoCard = ({ title, content, icon }: { title: string; content: string; icon: string }) => (
    <View style={styles.animalCard}>
      <Text style={styles.animalIcon}>{icon}</Text>
      <View style={styles.animalContent}>
        <Text style={styles.animalTitle}>{title}</Text>
        <Text style={styles.animalDescription}>{content}</Text>
      </View>
    </View>
  );

  const ConversationalResponse = () => (
    <View style={styles.conversationalSection}>
      <View style={styles.resultHeader}>
        <Text style={styles.resultTitle}>🤖 AI Assistant Response</Text>
        <View style={styles.resultActions}>
          <TouchableOpacity
            style={[styles.narrationButton, isNarrating && styles.narrationButtonActive]}
            onPress={handleNarration}
          >
            <Volume2 size={16} color={isNarrating ? '#FFFFFF' : '#1877F2'} />
            <Text style={[styles.narrationText, isNarrating && styles.narrationTextActive]}>
              {isNarrating ? 'Playing...' : 'Listen'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.conversationalCard}>
        <Text style={styles.conversationalText}>{conversationalResponse}</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.shareButton}>
          <MessageSquare size={20} color="#FFFFFF" />
          <Text style={styles.shareButtonText}>Share to Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.blogButton}>
          <BookOpen size={20} color="#1877F2" />
          <Text style={styles.blogButtonText}>Save to Blog</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1C1E21" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chart Bot</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Share size={24} color="#1C1E21" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>🤖 AI Crop Information Bot</Text>
          <Text style={styles.heroSubtitle}>
            Get detailed crop and animal care data with voice support in Hindi & English
          </Text>
        </View>

        {/* Mode Toggle */}
        <View style={styles.modeToggle}>
          <TouchableOpacity
            style={[styles.modeButton, activeMode === 'crop' && styles.activeModeButton]}
            onPress={() => setActiveMode('crop')}
          >
            <Text style={[styles.modeButtonText, activeMode === 'crop' && styles.activeModeButtonText]}>
              🌾 Crops
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, activeMode === 'animal' && styles.activeModeButton]}
            onPress={() => setActiveMode('animal')}
          >
            <Text style={[styles.modeButtonText, activeMode === 'animal' && styles.activeModeButtonText]}>
              🐄 Animals
            </Text>
          </TouchableOpacity>
        </View>

        {/* Language Toggle */}
        <View style={styles.languageToggle}>
          <TouchableOpacity
            style={[styles.langButton, language === 'en' && styles.activeLangButton]}
            onPress={() => setLanguage('en')}
          >
            <Text style={[styles.langButtonText, language === 'en' && styles.activeLangButtonText]}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langButton, language === 'hi' && styles.activeLangButton]}
            onPress={() => setLanguage('hi')}
          >
            <Text style={[styles.langButtonText, language === 'hi' && styles.activeLangButtonText]}>
              हिंदी
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#65676B" />
              <TextInput
                style={styles.searchInput}
                placeholder={activeMode === 'crop' ? "Ask about any crop... (e.g., 'wheat cultivation')" : "Ask about any animal... (e.g., 'dairy cow care')"}
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={() => handleSearch(query)}
              />
            </View>
            <TouchableOpacity
              style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
              onPress={handleVoiceInput}
            >
              <Mic size={20} color={isListening ? '#FFFFFF' : '#1877F2'} />
            </TouchableOpacity>
          </View>

          {isListening && (
            <View style={styles.listeningIndicator}>
              <Text style={styles.listeningText}>🎙️ Listening... Speak in Hindi or English</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => handleSearch(query)}
            disabled={!query.trim()}
          >
            <Text style={styles.searchButtonText}>
              Get {activeMode === 'crop' ? 'Crop' : 'Animal'} Information
            </Text>
          </TouchableOpacity>
        </View>

        {/* Shortcuts */}
        <View style={styles.shortcutsSection}>
          <Text style={styles.sectionTitle}>
            {activeMode === 'crop' ? '🌾 Popular Crops' : '🐄 Popular Animals'}
          </Text>
          <View style={styles.shortcutsGrid}>
            {(activeMode === 'crop' ? CROP_SHORTCUTS : ANIMAL_SHORTCUTS)
              .filter(item => item.popular).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.shortcutCard}
                onPress={() => handleSearch(item.name)}
              >
                <Text style={styles.shortcutEmoji}>{item.emoji}</Text>
                <Text style={styles.shortcutName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.sectionTitle}>
            {activeMode === 'crop' ? '🌱 Other Crops' : '🐑 Other Animals'}
          </Text>
          <View style={styles.shortcutsGrid}>
            {(activeMode === 'crop' ? CROP_SHORTCUTS : ANIMAL_SHORTCUTS)
              .filter(item => !item.popular).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.shortcutCard}
                onPress={() => handleSearch(item.name)}
              >
                <Text style={styles.shortcutEmoji}>{item.emoji}</Text>
                <Text style={styles.shortcutName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>❓ Frequently Asked Questions</Text>
          {(activeMode === 'crop' ? SAMPLE_FAQS : ANIMAL_FAQS).map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqItem}
              onPress={() => handleSearch(faq)}
            >
              <Text style={styles.faqText}>{faq}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Loading State */}
        {isLoading && (
          <View style={styles.loadingSection}>
            <View style={styles.loadingAnimation}>
              <Text style={styles.loadingEmoji}>🤖</Text>
              <Text style={styles.loadingText}>
                AI is analyzing {activeMode === 'crop' ? 'crop' : 'animal'} data...
              </Text>
            </View>
            <View style={styles.progressSteps}>
              <Text style={styles.progressStep}>✓ Processing query</Text>
              <Text style={styles.progressStep}>🔄 Fetching {activeMode === 'crop' ? 'crop' : 'animal'} database</Text>
              <Text style={styles.progressStep}>⏳ Generating recommendations</Text>
            </View>
          </View>
        )}

        {/* Conversational Response */}
        {conversationalResponse && <ConversationalResponse />}

        {/* Results Section */}
        {cropData && (
          <View style={styles.resultsSection}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>📊 {cropData.cropName} Cultivation Guide</Text>
              <View style={styles.resultActions}>
                <TouchableOpacity
                  style={[styles.narrationButton, isNarrating && styles.narrationButtonActive]}
                  onPress={handleNarration}
                >
                  <Volume2 size={16} color={isNarrating ? '#FFFFFF' : '#1877F2'} />
                  <Text style={[styles.narrationText, isNarrating && styles.narrationTextActive]}>
                    {isNarrating ? 'Playing...' : 'Listen'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Basic Information Table */}
            <View style={styles.dataTable}>
              <Text style={styles.tableTitle}>📋 Basic Information</Text>
              <DataRow label="Seeds" value={cropData.seeds.type} />
              <DataRow label="Germination" value={cropData.seeds.germinationRate} />
              <DataRow label="Soil Type" value={cropData.soil.type} />
              <DataRow label="pH Range" value={cropData.soil.pH} />
              <DataRow label="Sowing Season" value={cropData.season.sowing} />
              <DataRow label="Harvesting" value={cropData.season.harvesting} />
            </View>

            {/* Water Requirements */}
            <View style={styles.dataTable}>
              <Text style={styles.tableTitle}>💧 Water Requirements</Text>
              <DataRow label="Daily" value={cropData.water.daily} />
              <DataRow label="Monthly" value={cropData.water.monthly} />
              <DataRow label="Yearly" value={cropData.water.yearly} />
            </View>

            {/* Fertilizer Information */}
            <View style={styles.dataTable}>
              <Text style={styles.tableTitle}>🌿 Fertilizer Guide</Text>
              <DataRow label="Organic" value={cropData.fertilizer.organic} />
              <DataRow label="Chemical" value={cropData.fertilizer.chemical} />
              <DataRow label="Timing" value={cropData.fertilizer.timing} />
            </View>

            {/* Sustainable Practices */}
            <View style={styles.sustainableSection}>
              <Text style={styles.tableTitle}>🌱 Sustainable Practices</Text>
              <SustainablePracticeCard
                title="Organic Fertilizer"
                description={cropData.sustainablePractices.organicFertilizer}
                icon="🌿"
              />
              <SustainablePracticeCard
                title="Bio-Pesticides"
                description={cropData.sustainablePractices.bioPesticides}
                icon="🐛"
              />
              <SustainablePracticeCard
                title="Crop Rotation"
                description={cropData.sustainablePractices.cropRotation}
                icon="🔄"
              />
              <SustainablePracticeCard
                title="Intercropping"
                description={cropData.sustainablePractices.intercropping}
                icon="🌾"
              />
              <SustainablePracticeCard
                title="Water Conservation"
                description={cropData.sustainablePractices.waterConservation}
                icon="💧"
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.shareButton}>
                <MessageSquare size={20} color="#FFFFFF" />
                <Text style={styles.shareButtonText}>Share to Community</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.blogButton}>
                <BookOpen size={20} color="#1877F2" />
                <Text style={styles.blogButtonText}>Save to Blog</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Animal Results Section */}
        {animalData && (
          <View style={styles.resultsSection}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>{animalData.animalType} Care Guide</Text>
              <View style={styles.resultActions}>
                <TouchableOpacity
                  style={[styles.narrationButton, isNarrating && styles.narrationButtonActive]}
                  onPress={handleNarration}
                >
                  <Volume2 size={16} color={isNarrating ? '#FFFFFF' : '#1877F2'} />
                  <Text style={[styles.narrationText, isNarrating && styles.narrationTextActive]}>
                    {isNarrating ? 'Playing...' : 'Listen'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Animal Information Cards */}
            <AnimalInfoCard title="Breed/Variety" content={animalData.breed} icon="🧬" />
            <AnimalInfoCard title="Housing Needs" content={animalData.housing} icon="🏠" />
            <AnimalInfoCard title="Feed/Fodder" content={animalData.feed} icon="🌾" />
            <AnimalInfoCard title="Water Needs" content={animalData.water} icon="💧" />
            <AnimalInfoCard title="Healthcare" content={animalData.healthcare} icon="💉" />
            <AnimalInfoCard title="Breeding Cycle" content={animalData.breeding} icon="👶" />
            <AnimalInfoCard title="Special Notes" content={animalData.specialNotes} icon="📝" />

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.shareButton}>
                <MessageSquare size={20} color="#FFFFFF" />
                <Text style={styles.shareButtonText}>Share to Community</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.blogButton}>
                <BookOpen size={20} color="#1877F2" />
                <Text style={styles.blogButtonText}>Save to Blog</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Voice Features Info */}
        <View style={styles.voiceInfoSection}>
          <Text style={styles.voiceInfoTitle}>🎤 Voice Features</Text>
          <Text style={styles.voiceInfoText}>
            • Ask questions in Hindi or English{'\n'}
            • Voice narration of results{'\n'}
            • Hands-free operation for field use{'\n'}
            • Support for crop and animal queries{'\n'}
            • Offline voice commands (coming soon)
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
  shareButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1E21',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#65676B',
    textAlign: 'center',
    lineHeight: 22,
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1C1E21',
  },
  voiceButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtonActive: {
    backgroundColor: '#1877F2',
  },
  listeningIndicator: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  listeningText: {
    textAlign: 'center',
    color: '#42B883',
    fontSize: 14,
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: '#1877F2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  shortcutsSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 16,
  },
  shortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  shortcutCard: {
    width: '30%',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  shortcutEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  shortcutName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1E21',
    textAlign: 'center',
  },
  faqSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  faqItem: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  faqText: {
    fontSize: 14,
    color: '#1C1E21',
    fontWeight: '500',
  },
  loadingSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  loadingAnimation: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 18,
    color: '#1877F2',
    fontWeight: '600',
  },
  progressSteps: {
    gap: 8,
  },
  progressStep: {
    fontSize: 14,
    color: '#65676B',
  },
  conversationalSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  conversationalCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  conversationalText: {
    fontSize: 16,
    color: '#1C1E21',
    lineHeight: 24,
  },
  resultsSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1E21',
    flex: 1,
  },
  resultActions: {
    flexDirection: 'row',
  },
  narrationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  narrationButtonActive: {
    backgroundColor: '#1877F2',
  },
  narrationText: {
    fontSize: 14,
    color: '#1877F2',
    fontWeight: '600',
    marginLeft: 4,
  },
  narrationTextActive: {
    color: '#FFFFFF',
  },
  dataTable: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 12,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  dataLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
    width: '30%',
  },
  dataValue: {
    fontSize: 14,
    color: '#65676B',
    flex: 1,
    lineHeight: 20,
  },
  sustainableSection: {
    marginBottom: 20,
  },
  practiceCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  practiceIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  practiceContent: {
    flex: 1,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 4,
  },
  practiceDescription: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    paddingVertical: 14,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  blogButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 14,
    borderRadius: 8,
  },
  blogButtonText: {
    color: '#1877F2',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  voiceInfoSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  voiceInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 8,
  },
  voiceInfoText: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 25,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeModeButton: {
    backgroundColor: '#1877F2',
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#65676B',
  },
  activeModeButtonText: {
    color: '#FFFFFF',
  },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    padding: 2,
  },
  langButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 18,
  },
  activeLangButton: {
    backgroundColor: '#42B883',
  },
  langButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#65676B',
  },
  activeLangButtonText: {
    color: '#FFFFFF',
  },
  animalCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  animalIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  animalContent: {
    flex: 1,
  },
  animalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 4,
  },
  animalDescription: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
  },
});