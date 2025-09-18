import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, TrendingDown, Mic, Search } from 'lucide-react-native';

interface MarketData {
  crop: string;
  price: number;
  change: number;
  unit: string;
  market: string;
}

const MARKET_DATA: MarketData[] = [
  { crop: 'Wheat', price: 2150, change: 2.5, unit: '₹/quintal', market: 'Delhi Mandi' },
  { crop: 'Rice', price: 3200, change: -1.2, unit: '₹/quintal', market: 'Punjab Mandi' },
  { crop: 'Cotton', price: 6800, change: 5.8, unit: '₹/quintal', market: 'Gujarat Mandi' },
  { crop: 'Sugarcane', price: 325, change: 0.8, unit: '₹/quintal', market: 'UP Mandi' },
  { crop: 'Tomato', price: 2500, change: -8.5, unit: '₹/quintal', market: 'Karnataka Mandi' },
  { crop: 'Onion', price: 1800, change: 12.3, unit: '₹/quintal', market: 'Maharashtra Mandi' },
];

export default function MarketScreen() {
  const [isRecording, setIsRecording] = useState(false);

  const MarketCard = ({ item }: { item: MarketData }) => (
    <View style={styles.marketCard}>
      <View style={styles.marketHeader}>
        <View>
          <Text style={styles.cropName}>{item.crop}</Text>
          <Text style={styles.marketName}>{item.market}</Text>
        </View>
        <View style={styles.priceSection}>
          <Text style={styles.price}>{item.price.toLocaleString()}</Text>
          <Text style={styles.unit}>{item.unit}</Text>
        </View>
      </View>
      <View style={styles.changeSection}>
        <View style={[
          styles.changeIndicator,
          { backgroundColor: item.change >= 0 ? '#D4F4DD' : '#FECACA' }
        ]}>
          {item.change >= 0 ? (
            <TrendingUp size={16} color="#16A34A" />
          ) : (
            <TrendingDown size={16} color="#DC2626" />
          )}
          <Text style={[
            styles.changeText,
            { color: item.change >= 0 ? '#16A34A' : '#DC2626' }
          ]}>
            {item.change >= 0 ? '+' : ''}{item.change}%
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Market Analysis</Text>
        <Text style={styles.headerSubtitle}>Real-time mandi prices</Text>
      </View>

      {/* Voice Search */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.voiceButton}>
          <Search size={20} color="#65676B" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.voiceButton, isRecording && styles.voiceButtonActive]}
          onPress={() => setIsRecording(!isRecording)}
        >
          <Mic size={20} color={isRecording ? '#FFFFFF' : '#65676B'} />
        </TouchableOpacity>
      </View>

      {isRecording && (
        <View style={styles.recordingIndicator}>
          <Text style={styles.recordingText}>🎙️ Ask about market prices in Hindi or English...</Text>
        </View>
      )}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.marketList}>
          {MARKET_DATA.map((item, index) => (
            <MarketCard key={index} item={item} />
          ))}
        </View>

        {/* Market Insights */}
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>📊 Market Insights</Text>
          <Text style={styles.insightsText}>
            • Onion prices are rising due to delayed monsoon
          </Text>
          <Text style={styles.insightsText}>
            • Cotton showing strong upward trend this week
          </Text>
          <Text style={styles.insightsText}>
            • Best time to sell: Wheat prices expected to rise next week
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1E21',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#65676B',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  voiceButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtonActive: {
    backgroundColor: '#1877F2',
  },
  recordingIndicator: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  recordingText: {
    textAlign: 'center',
    color: '#1877F2',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  marketList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  marketCard: {
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
  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cropName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
  },
  marketName: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 2,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1E21',
  },
  unit: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 2,
  },
  changeSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  insightsCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 12,
  },
  insightsText: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
    marginBottom: 6,
  },
});