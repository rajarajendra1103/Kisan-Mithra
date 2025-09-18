import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Mic, ExternalLink, CircleCheck as CheckCircle, CircleAlert as AlertCircle, DollarSign, FileText } from 'lucide-react-native';
import { router } from 'expo-router';

interface Scheme {
  id: string;
  name: string;
  category: string;
  eligibility: string[];
  benefits: string;
  applyLink: string;
  description: string;
  deadline?: string;
  amount?: string;
  status: 'active' | 'upcoming' | 'closed';
}

const SAMPLE_SCHEMES: Scheme[] = [
  {
    id: '1',
    name: 'PM-KISAN Samman Nidhi',
    category: 'Direct Benefit Transfer',
    eligibility: [
      'Small and marginal farmers',
      'Land holding up to 2 hectares',
      'Valid Aadhaar card required'
    ],
    benefits: '₹6,000 per year in 3 installments',
    applyLink: 'https://pmkisan.gov.in',
    description: 'Direct income support to farmers for purchasing inputs like seeds, fertilizers, equipment etc.',
    amount: '₹6,000/year',
    status: 'active',
  },
  {
    id: '2',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    category: 'Crop Insurance',
    eligibility: [
      'All farmers (sharecroppers and tenant farmers included)',
      'Enrolled in participating banks',
      'Premium payment required'
    ],
    benefits: 'Crop loss compensation up to sum insured',
    applyLink: 'https://pmfby.gov.in',
    description: 'Comprehensive crop insurance scheme providing financial support to farmers in case of crop failure.',
    amount: 'Up to ₹2 lakh coverage',
    status: 'active',
  },
  {
    id: '3',
    name: 'Kisan Credit Card (KCC)',
    category: 'Credit & Loans',
    eligibility: [
      'Farmers with land ownership documents',
      'Tenant farmers with valid agreements',
      'Self Help Group members'
    ],
    benefits: 'Easy credit access at subsidized interest rates',
    applyLink: 'https://kcc.gov.in',
    description: 'Provides adequate and timely credit support for comprehensive credit needs of farmers.',
    amount: 'Up to ₹3 lakh at 4% interest',
    status: 'active',
  },
  {
    id: '4',
    name: 'Soil Health Card Scheme',
    category: 'Soil Management',
    eligibility: [
      'All farmers',
      'No specific land holding criteria',
      'Available across all states'
    ],
    benefits: 'Free soil testing and nutrient recommendations',
    applyLink: 'https://soilhealth.dac.gov.in',
    description: 'Provides soil health cards to farmers with information on nutrient status and fertilizer recommendations.',
    status: 'active',
  },
];

const CATEGORIES = ['All', 'Direct Benefit', 'Crop Insurance', 'Credit & Loans', 'Subsidies', 'Equipment'];

export default function GovtSchemesScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setSearchQuery('PM KISAN scheme eligibility');
        setIsListening(false);
      }, 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#42B883';
      case 'upcoming': return '#FF8800';
      case 'closed': return '#FF4444';
      default: return '#65676B';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} color="#42B883" />;
      case 'upcoming': return <AlertCircle size={16} color="#FF8800" />;
      case 'closed': return <AlertCircle size={16} color="#FF4444" />;
      default: return null;
    }
  };

  const SchemeCard = ({ scheme }: { scheme: Scheme }) => (
    <View style={styles.schemeCard}>
      <View style={styles.schemeHeader}>
        <View style={styles.schemeTitle}>
          <Text style={styles.schemeName}>{scheme.name}</Text>
          <View style={styles.statusBadge}>
            {getStatusIcon(scheme.status)}
            <Text style={[styles.statusText, { color: getStatusColor(scheme.status) }]}>
              {scheme.status.toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.schemeCategory}>{scheme.category}</Text>
      </View>
      
      <Text style={styles.schemeDescription}>{scheme.description}</Text>
      
      {scheme.amount && (
        <View style={styles.amountSection}>
          <DollarSign size={16} color="#42B883" />
          <Text style={styles.amountText}>{scheme.amount}</Text>
        </View>
      )}
      
      <View style={styles.benefitsSection}>
        <Text style={styles.benefitsTitle}>💰 Benefits:</Text>
        <Text style={styles.benefitsText}>{scheme.benefits}</Text>
      </View>
      
      <View style={styles.eligibilitySection}>
        <Text style={styles.eligibilityTitle}>✅ Eligibility:</Text>
        {scheme.eligibility.map((criteria, index) => (
          <Text key={index} style={styles.eligibilityCriteria}>• {criteria}</Text>
        ))}
      </View>
      
      <View style={styles.schemeActions}>
        <TouchableOpacity style={styles.applyButton}>
          <ExternalLink size={16} color="#FFFFFF" />
          <Text style={styles.applyButtonText}>Apply Online</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton}>
          <FileText size={16} color="#1877F2" />
          <Text style={styles.detailsButtonText}>View Details</Text>
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
        <Text style={styles.headerTitle}>Government Schemes</Text>
        <TouchableOpacity
          style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
          onPress={handleVoiceInput}
        >
          <Mic size={20} color={isListening ? '#FFFFFF' : '#1877F2'} />
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#65676B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search schemes, ask in Hindi or English..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {isListening && (
        <View style={styles.listeningIndicator}>
          <Text style={styles.listeningText}>🎙️ Ask about schemes: "PM KISAN के लिए कैसे apply करें?"</Text>
        </View>
      )}

      {/* Category Filters */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesRow}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  activeCategory === category && styles.activeCategoryChip
                ]}
                onPress={() => setActiveCategory(category)}
              >
                <Text style={[
                  styles.categoryChipText,
                  activeCategory === category && styles.activeCategoryChipText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>50+</Text>
          <Text style={styles.statLabel}>Active Schemes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₹2.8L Cr</Text>
          <Text style={styles.statLabel}>Total Budget</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12 Cr+</Text>
          <Text style={styles.statLabel}>Beneficiaries</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Featured Schemes */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>🌟 Featured Schemes</Text>
          <View style={styles.schemesList}>
            {SAMPLE_SCHEMES.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </View>
        </View>

        {/* Application Process */}
        <View style={styles.processSection}>
          <Text style={styles.sectionTitle}>📋 How to Apply</Text>
          <View style={styles.processSteps}>
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Check eligibility criteria for the scheme</Text>
            </View>
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Gather required documents (Aadhaar, land records, bank details)</Text>
            </View>
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Visit official website or nearest CSC/bank branch</Text>
            </View>
            <View style={styles.processStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>Fill application form and submit documents</Text>
            </View>
          </View>
        </View>

        {/* Voice Assistant Info */}
        <View style={styles.voiceInfoSection}>
          <Text style={styles.voiceInfoTitle}>🎤 Voice Assistant Features</Text>
          <Text style={styles.voiceInfoText}>
            • Ask in Hindi: "किसान योजना के बारे में बताओ"{'\n'}
            • Ask in English: "Tell me about farmer schemes"{'\n'}
            • Get eligibility information in your language{'\n'}
            • Step-by-step application guidance{'\n'}
            • Document requirements and deadlines
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
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtonActive: {
    backgroundColor: '#1877F2',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1C1E21',
  },
  listeningIndicator: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  listeningText: {
    textAlign: 'center',
    color: '#1877F2',
    fontSize: 14,
    fontWeight: '500',
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
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
  },
  activeCategoryChip: {
    backgroundColor: '#1877F2',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#65676B',
    fontWeight: '500',
  },
  activeCategoryChipText: {
    color: '#FFFFFF',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1877F2',
  },
  statLabel: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  featuredSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 16,
  },
  schemesList: {
    gap: 16,
  },
  schemeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  schemeHeader: {
    marginBottom: 12,
  },
  schemeTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  schemeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  schemeCategory: {
    fontSize: 12,
    color: '#1877F2',
    fontWeight: '500',
  },
  schemeDescription: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
    marginBottom: 12,
  },
  amountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#42B883',
    marginLeft: 8,
  },
  benefitsSection: {
    marginBottom: 12,
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 4,
  },
  benefitsText: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
  },
  eligibilitySection: {
    marginBottom: 16,
  },
  eligibilityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 8,
  },
  eligibilityCriteria: {
    fontSize: 13,
    color: '#65676B',
    lineHeight: 18,
    marginBottom: 4,
  },
  schemeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  applyButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#42B883',
    paddingVertical: 12,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  detailsButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 12,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: '#1877F2',
    fontWeight: '600',
    marginLeft: 8,
  },
  processSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  processSteps: {
    gap: 16,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
    marginTop: 6,
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
});