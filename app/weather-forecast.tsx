import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mic, MapPin, Droplets, Wind, Eye, Thermometer, Sun, Cloud, CloudRain } from 'lucide-react-native';
import { router } from 'expo-router';

interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    uvIndex: number;
  };
  forecast: Array<{
    day: string;
    date: string;
    high: number;
    low: number;
    condition: string;
    rainfall: number;
    icon: string;
  }>;
  alerts: Array<{
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  farmingAdvice: Array<{
    activity: string;
    recommendation: string;
    timing: string;
  }>;
}

const SAMPLE_WEATHER: WeatherData = {
  location: 'Ludhiana, Punjab',
  current: {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    uvIndex: 6,
  },
  forecast: [
    { day: 'Today', date: 'Mar 15', high: 30, low: 18, condition: 'Sunny', rainfall: 0, icon: '☀️' },
    { day: 'Tomorrow', date: 'Mar 16', high: 32, low: 20, condition: 'Partly Cloudy', rainfall: 0, icon: '⛅' },
    { day: 'Wed', date: 'Mar 17', high: 29, low: 19, condition: 'Light Rain', rainfall: 5, icon: '🌦️' },
    { day: 'Thu', date: 'Mar 18', high: 26, low: 16, condition: 'Heavy Rain', rainfall: 25, icon: '🌧️' },
    { day: 'Fri', date: 'Mar 19', high: 24, low: 15, condition: 'Thunderstorm', rainfall: 40, icon: '⛈️' },
    { day: 'Sat', date: 'Mar 20', high: 27, low: 17, condition: 'Cloudy', rainfall: 2, icon: '☁️' },
    { day: 'Sun', date: 'Mar 21', high: 29, low: 18, condition: 'Sunny', rainfall: 0, icon: '☀️' },
  ],
  alerts: [
    {
      type: 'Heavy Rain Alert',
      message: 'Heavy rainfall expected on Thu-Fri. Protect crops and avoid field work.',
      severity: 'high',
    },
    {
      type: 'Wind Advisory',
      message: 'Strong winds expected. Secure loose structures and young plants.',
      severity: 'medium',
    },
  ],
  farmingAdvice: [
    {
      activity: 'Irrigation',
      recommendation: 'Skip irrigation for next 3 days due to expected rainfall',
      timing: 'Mar 17-19',
    },
    {
      activity: 'Spraying',
      recommendation: 'Complete pesticide/fertilizer spraying before Wednesday',
      timing: 'Before Mar 17',
    },
    {
      activity: 'Harvesting',
      recommendation: 'Harvest ready crops before Thursday to avoid rain damage',
      timing: 'Before Mar 18',
    },
  ],
};

export default function WeatherForecastScreen() {
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData>(SAMPLE_WEATHER);

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setQuery('Weather for next 7 days in Ludhiana');
        setIsListening(false);
      }, 3000);
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#FF4444';
      case 'medium': return '#FF8800';
      case 'low': return '#FFC107';
      default: return '#65676B';
    }
  };

  const WeatherCard = ({ day }: { day: any }) => (
    <View style={styles.forecastCard}>
      <Text style={styles.dayName}>{day.day}</Text>
      <Text style={styles.dayDate}>{day.date}</Text>
      <Text style={styles.weatherIcon}>{day.icon}</Text>
      <Text style={styles.condition}>{day.condition}</Text>
      <View style={styles.tempRange}>
        <Text style={styles.highTemp}>{day.high}°</Text>
        <Text style={styles.lowTemp}>{day.low}°</Text>
      </View>
      {day.rainfall > 0 && (
        <View style={styles.rainfallInfo}>
          <Droplets size={12} color="#4A90E2" />
          <Text style={styles.rainfallText}>{day.rainfall}mm</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1C1E21" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weather Forecast</Text>
        <TouchableOpacity
          style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
          onPress={handleVoiceInput}
        >
          <Mic size={20} color={isListening ? '#FFFFFF' : '#1877F2'} />
        </TouchableOpacity>
      </View>

      {/* Voice Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Ask about weather in Hindi or English..."
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {isListening && (
        <View style={styles.listeningIndicator}>
          <Text style={styles.listeningText}>🎙️ Listening... Ask about weather in your language</Text>
        </View>
      )}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Current Weather */}
        <View style={styles.currentWeatherCard}>
          <View style={styles.locationHeader}>
            <MapPin size={20} color="#1877F2" />
            <Text style={styles.locationText}>{weatherData.location}</Text>
          </View>
          
          <View style={styles.currentWeatherContent}>
            <View style={styles.tempSection}>
              <Text style={styles.currentTemp}>{weatherData.current.temp}°C</Text>
              <Text style={styles.currentCondition}>{weatherData.current.condition}</Text>
            </View>
            <Text style={styles.weatherEmoji}>⛅</Text>
          </View>
          
          <View style={styles.weatherDetails}>
            <View style={styles.detailItem}>
              <Droplets size={16} color="#4A90E2" />
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{weatherData.current.humidity}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Wind size={16} color="#42B883" />
              <Text style={styles.detailLabel}>Wind</Text>
              <Text style={styles.detailValue}>{weatherData.current.windSpeed} km/h</Text>
            </View>
            <View style={styles.detailItem}>
              <Eye size={16} color="#65676B" />
              <Text style={styles.detailLabel}>Visibility</Text>
              <Text style={styles.detailValue}>{weatherData.current.visibility} km</Text>
            </View>
          </View>
        </View>

        {/* Weather Alerts */}
        {weatherData.alerts.length > 0 && (
          <View style={styles.alertsSection}>
            <Text style={styles.sectionTitle}>⚠️ Weather Alerts</Text>
            {weatherData.alerts.map((alert, index) => (
              <View key={index} style={[styles.alertCard, { borderLeftColor: getAlertColor(alert.severity) }]}>
                <Text style={styles.alertType}>{alert.type}</Text>
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
            ))}
          </View>
        )}

        {/* 7-Day Forecast */}
        <View style={styles.forecastSection}>
          <Text style={styles.sectionTitle}>📅 7-Day Forecast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.forecastRow}>
              {weatherData.forecast.map((day, index) => (
                <WeatherCard key={index} day={day} />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Farming Advice */}
        <View style={styles.adviceSection}>
          <Text style={styles.sectionTitle}>🌾 Farming Recommendations</Text>
          {weatherData.farmingAdvice.map((advice, index) => (
            <View key={index} style={styles.adviceCard}>
              <View style={styles.adviceHeader}>
                <Text style={styles.activityName}>{advice.activity}</Text>
                <Text style={styles.timingText}>{advice.timing}</Text>
              </View>
              <Text style={styles.recommendationText}>{advice.recommendation}</Text>
            </View>
          ))}
        </View>

        {/* Voice Features */}
        <View style={styles.voiceInfoSection}>
          <Text style={styles.voiceInfoTitle}>🎤 Voice Weather Assistant</Text>
          <Text style={styles.voiceInfoText}>
            • Ask in Hindi: "अगले 7 दिन का मौसम बताओ"{'\n'}
            • Ask in English: "What's the weather forecast?"{'\n'}
            • Get voice responses in your preferred language{'\n'}
            • Farming-specific weather advice
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
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
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
  scrollView: {
    flex: 1,
  },
  currentWeatherCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    color: '#1877F2',
    marginLeft: 8,
    fontWeight: '500',
  },
  currentWeatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tempSection: {
    flex: 1,
  },
  currentTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1C1E21',
  },
  currentCondition: {
    fontSize: 18,
    color: '#65676B',
    marginTop: 4,
  },
  weatherEmoji: {
    fontSize: 64,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
    marginTop: 2,
  },
  alertsSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 12,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  alertType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
  },
  forecastSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  forecastRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  forecastCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dayName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1E21',
  },
  dayDate: {
    fontSize: 12,
    color: '#65676B',
    marginBottom: 8,
  },
  weatherIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  condition: {
    fontSize: 12,
    color: '#65676B',
    textAlign: 'center',
    marginBottom: 8,
  },
  tempRange: {
    alignItems: 'center',
  },
  highTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1E21',
  },
  lowTemp: {
    fontSize: 14,
    color: '#65676B',
  },
  rainfallInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rainfallText: {
    fontSize: 12,
    color: '#4A90E2',
    marginLeft: 4,
  },
  adviceSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  adviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  adviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1E21',
  },
  timingText: {
    fontSize: 12,
    color: '#42B883',
    fontWeight: '500',
  },
  recommendationText: {
    fontSize: 14,
    color: '#65676B',
    lineHeight: 20,
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