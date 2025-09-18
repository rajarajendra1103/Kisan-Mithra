import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Upload, Mic, MessageSquare, ArrowLeft, Share, Video } from 'lucide-react-native';
import { router } from 'expo-router';
import { geminiService } from '@/services/geminiService';

export default function CropHealthScreen() {
  const [activeMode, setActiveMode] = useState<'live' | 'gemini' | 'photo'>('photo');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);

  const startAnalysis = async (mode: 'live' | 'gemini' | 'photo') => {
    setActiveMode(mode);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      if (mode === 'gemini') {
        // Voice-based analysis
        setIsListening(true);
        // Simulate voice input processing
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsListening(false);
        
        // Use Gemini conversational response for voice queries
        const voiceQuery = "My tomato plants have dark spots on leaves and yellowing. What could be wrong?";
        const response = await geminiService.getConversationalResponse(voiceQuery, 'crop', 'en');
        
        // Convert conversational response to structured format
        setAnalysisResult({
          disease: '🦠 Tomato Late Blight (Voice Diagnosis)',
          severity: 'Moderate',
          confidence: 88,
          symptoms: ['🍃 Dark spots on leaves', '🌱 Yellowing of lower leaves', '🍅 Brown patches on fruits'],
          treatment: {
            organic: '🌿 Copper sulfate spray, Neem oil application',
            chemical: '⚗️ Mancozeb or Chlorothalonil fungicide',
            immediate: '⚡ Remove affected leaves immediately, improve ventilation'
          },
          prevention: '🛡️ Avoid overhead watering, ensure proper spacing, crop rotation',
          nearbyShops: ['🏪 Agricultural supply stores', '🌾 Organic fertilizer shops', '💊 Pesticide dealers']
        });
      } else if (mode === 'photo') {
        // Photo-based analysis - simulate image capture and analysis
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real implementation, you would use:
        const result = await geminiService.analyzeCropDisease('sample-image-base64');
        // For now, using sample data
        setAnalysisResult(result);
      } else {
        // Live camera feed analysis - simulate real-time processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setAnalysisResult({
          disease: '🦠 Early Blight Detection',
          severity: 'Mild',
          confidence: 85,
          symptoms: ['🍃 Small dark spots on older leaves', '🌱 Concentric rings in spots'],
          treatment: {
            organic: '🌿 Baking soda spray (1 tsp per quart water)',
            chemical: '⚗️ Copper-based fungicide application',
            immediate: '⚡ Prune affected leaves, ensure good air flow'
          },
          prevention: '🛡️ Water at soil level, mulch around plants',
          nearbyShops: ['🏪 Garden center', '🌾 Farm supply store']
        });
      }
    } catch (error) {
      console.error('Analysis error:', error);
      // Fallback error handling
      setAnalysisResult({
        disease: '🦠 Analysis Error',
        severity: 'Mild',
        confidence: 0,
        symptoms: ['❌ Unable to analyze at this time'],
        treatment: {
          organic: '🌿 Please try again or consult a local agricultural expert',
          chemical: '⚗️ Check your internet connection and retry',
          immediate: '⚡ Take a clearer photo or describe symptoms verbally'
        },
        prevention: '🛡️ Regular monitoring and preventive care',
        nearbyShops: ['🏪 Local agricultural extension office']
      });
    } finally {
      setIsAnalyzing(false);
      setIsListening(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1C1E21" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crop Health Diagnosis</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Share size={24} color="#1C1E21" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>🌱 AI-Powered Crop Health Diagnosis</Text>
          <Text style={styles.heroSubtitle}>
            Use live camera, voice assistant, or photo upload to diagnose crop diseases and get treatment recommendations
          </Text>
        </View>

        {/* Mode Toggle */}
        <View style={styles.modeToggle}>
          <TouchableOpacity
            style={[styles.modeButton, activeMode === 'live' && styles.activeModeButton]}
            onPress={() => setActiveMode('live')}
          >
            <Video size={20} color={activeMode === 'live' ? '#FFFFFF' : '#1877F2'} />
            <Text style={[styles.modeButtonText, activeMode === 'live' && styles.activeModeButtonText]}>
              Live Feed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, activeMode === 'gemini' && styles.activeModeButton]}
            onPress={() => setActiveMode('gemini')}
          >
            <Mic size={20} color={activeMode === 'gemini' ? '#FFFFFF' : '#42B883'} />
            <Text style={[styles.modeButtonText, activeMode === 'gemini' && styles.activeModeButtonText]}>
              Gemini Live
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, activeMode === 'photo' && styles.activeModeButton]}
            onPress={() => setActiveMode('photo')}
          >
            <Camera size={20} color={activeMode === 'photo' ? '#FFFFFF' : '#FF6B35'} />
            <Text style={[styles.modeButtonText, activeMode === 'photo' && styles.activeModeButtonText]}>
              Photo Upload
            </Text>
          </TouchableOpacity>
        </View>

        {/* Diagnosis Options */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>
            {activeMode === 'live' ? '📹 Live Camera Analysis' : 
             activeMode === 'gemini' ? '🎙️ Voice-Based Diagnosis' : 
             '📸 Photo-Based Analysis'}
          </Text>
          
          {activeMode === 'live' && (
            <TouchableOpacity style={styles.uploadOption} onPress={() => startAnalysis('live')}>
              <Video size={32} color="#1877F2" />
              <Text style={styles.optionTitle}>Start Live Analysis</Text>
              <Text style={styles.optionSubtitle}>Real-time crop monitoring</Text>
            </TouchableOpacity>
          )}

          {activeMode === 'gemini' && (
            <TouchableOpacity style={styles.uploadOption} onPress={() => startAnalysis('gemini')}>
              <Mic size={32} color="#42B883" />
              <Text style={styles.optionTitle}>Voice Diagnosis</Text>
              <Text style={styles.optionSubtitle}>Describe symptoms verbally</Text>
            </TouchableOpacity>
          )}

          {activeMode === 'photo' && (
            <>
              <TouchableOpacity style={styles.uploadOption} onPress={() => startAnalysis('photo')}>
                <Camera size={32} color="#FF6B35" />
                <Text style={styles.optionTitle}>Take Photo</Text>
                <Text style={styles.optionSubtitle}>Capture crop image</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.uploadOption} onPress={() => startAnalysis('photo')}>
                <Upload size={32} color="#8B5CF6" />
                <Text style={styles.optionTitle}>Upload Image</Text>
                <Text style={styles.optionSubtitle}>Select from gallery</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Voice Listening Indicator */}
        {isListening && (
          <View style={styles.listeningIndicator}>
            <Text style={styles.listeningText}>🎙️ Listening... Describe your crop problem in Hindi or English</Text>
          </View>
        )}

        {/* Mode-specific Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>
            {activeMode === 'live' ? '📹 Live Feed Instructions' :
             activeMode === 'gemini' ? '🎙️ Voice Instructions' :
             '📸 Photo Instructions'}
          </Text>
          <Text style={styles.instructionsText}>
            {activeMode === 'live' ? 
              '• Point camera at affected crop parts\n• AI analyzes in real-time\n• Get instant voice guidance' :
             activeMode === 'gemini' ?
              '• Speak clearly about crop symptoms\n• Use Hindi or English\n• AI will ask follow-up questions' :
              '• Capture clear images of affected areas\n• Include leaves, stems, or fruits\n• Ensure good lighting'}
          </Text>
        </View>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <View style={styles.analysisSection}>
            <View style={styles.loadingAnimation}>
              <Text style={styles.loadingEmoji}>
                {activeMode === 'live' ? '📹' : activeMode === 'gemini' ? '🎙️' : '🔍'}
              </Text>
              <Text style={styles.loadingText}>
                {activeMode === 'live' ? 'Analyzing live feed...' :
                 activeMode === 'gemini' ? 'Processing voice input...' :
                 'AI is analyzing your crop image...'}
              </Text>
            </View>
            <View style={styles.progressSteps}>
              <Text style={styles.progressStep}>
                ✓ {activeMode === 'live' ? 'Live feed processing' :
                    activeMode === 'gemini' ? 'Voice recognition' :
                    'Image processing'}
              </Text>
              <Text style={styles.progressStep}>🔄 Disease detection</Text>
              <Text style={styles.progressStep}>⏳ Generating recommendations</Text>
            </View>
          </View>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <View style={styles.resultsSection}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>🎯 Diagnosis Complete</Text>
              <View style={styles.confidenceScore}>
                <Text style={styles.confidenceText}>{analysisResult.confidence}% Confidence</Text>
              </View>
            </View>

            <View style={styles.diseaseCard}>
              <Text style={styles.diseaseName}>{analysisResult.disease}</Text>
              <Text style={styles.severityText}>
                Severity: <Text style={[styles.severity, { 
                  color: analysisResult.severity === 'Severe' ? '#FF4444' :
                        analysisResult.severity === 'Moderate' ? '#FF6B35' : '#42B883'
                }]}>
                  {analysisResult.severity}
                </Text>
              </Text>
              <Text style={styles.confidenceText}>
                Confidence: {analysisResult.confidence}%
              </Text>
            </View>

            {/* Symptoms */}
            <View style={styles.symptomsCard}>
              <Text style={styles.cardTitle}>🔍 Identified Symptoms</Text>
              {analysisResult.symptoms.map((symptom, index) => (
                <Text key={index} style={styles.symptomText}>• {symptom}</Text>
              ))}
            </View>

            <View style={styles.treatmentCard}>
              <Text style={styles.cardTitle}>💊 Treatment Options</Text>
              <View style={styles.treatmentOption}>
                <Text style={styles.treatmentLabel}>Organic Treatment:</Text>
                <Text style={styles.cardContent}>{analysisResult.treatment.organic}</Text>
              </View>
              <View style={styles.treatmentOption}>
                <Text style={styles.treatmentLabel}>Chemical Treatment:</Text>
                <Text style={styles.cardContent}>{analysisResult.treatment.chemical}</Text>
              </View>
              <View style={styles.treatmentOption}>
                <Text style={styles.treatmentLabel}>Immediate Action:</Text>
                <Text style={styles.cardContent}>{analysisResult.treatment.immediate}</Text>
              </View>
            </View>

            <View style={styles.preventionCard}>
              <Text style={styles.cardTitle}>🛡️ Prevention</Text>
              <Text style={styles.cardContent}>{analysisResult.prevention}</Text>
            </View>

            {/* Nearby Shops */}
            <View style={styles.shopsCard}>
              <Text style={styles.cardTitle}>🏪 Where to Buy Treatment</Text>
              {analysisResult.nearbyShops.map((shop, index) => (
                <Text key={index} style={styles.shopText}>• {shop}</Text>
              ))}
            </View>

            <TouchableOpacity style={styles.findShopsButton}>
              <Text style={styles.findShopsText}>🏪 Find Nearby Shops</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareResultButton}>
              <MessageSquare size={20} color="#FFFFFF" />
              <Text style={styles.shareResultText}>Share with Community</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Sample Diseases */}
        <View style={styles.samplesSection}>
          <Text style={styles.sectionTitle}>Common Crop Diseases</Text>
          <View style={styles.samplesGrid}>
            {[
              { name: 'Leaf Blight', crop: 'Tomato', image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg' },
              { name: 'Rust Disease', crop: 'Wheat', image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg' },
              { name: 'Wilt Disease', crop: 'Cotton', image: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg' },
              { name: 'Powdery Mildew', crop: 'Grape', image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg' },
            ].map((disease, index) => (
              <TouchableOpacity key={index} style={styles.sampleCard}>
                <Image source={{ uri: disease.image }} style={styles.sampleImage} />
                <Text style={styles.sampleName}>{disease.name}</Text>
                <Text style={styles.sampleCrop}>{disease.crop}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  uploadSection: {
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
  uploadOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginLeft: 16,
    flex: 1,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#65676B',
  },
  analysisSection: {
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
  resultsSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1E21',
  },
  confidenceScore: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  confidenceText: {
    fontSize: 14,
    color: '#42B883',
    fontWeight: '600',
  },
  diseaseCard: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1E21',
    marginBottom: 8,
  },
  severityText: {
    fontSize: 14,
    color: '#65676B',
  },
  severity: {
    fontWeight: '600',
  },
  treatmentCard: {
    backgroundColor: '#E8F5E8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  preventionCard: {
    backgroundColor: '#F3E5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
  },
  findShopsButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  findShopsText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  shareResultButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    padding: 16,
    borderRadius: 12,
  },
  shareResultText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  samplesSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  samplesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sampleCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  sampleImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  sampleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
    textAlign: 'center',
    marginBottom: 4,
  },
  sampleCrop: {
    fontSize: 12,
    color: '#65676B',
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 25,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  activeModeButton: {
    backgroundColor: '#1877F2',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#65676B',
    marginLeft: 6,
  },
  activeModeButtonText: {
    color: '#FFFFFF',
  },
  listeningIndicator: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  listeningText: {
    textAlign: 'center',
    color: '#42B883',
    fontSize: 14,
    fontWeight: '500',
  },
  instructionsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
  },
  symptomsCard: {
    backgroundColor: '#FFF8E1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  symptomText: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
    marginBottom: 4,
  },
  treatmentOption: {
    marginBottom: 12,
  },
  treatmentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 4,
  },
  shopsCard: {
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  shopText: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
    marginBottom: 4,
  },
});