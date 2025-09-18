// Gemini AI Service for Kisan Mithra App
// Handles crop information, animal care, disease diagnosis, and voice features

interface CropInfo {
  cropName: string;
  seeds: {
    type: string;
    germinationRate: string;
    variety: string;
  };
  soil: {
    type: string;
    pH: string;
    preparation: string;
  };
  water: {
    daily: string;
    monthly: string;
    yearly: string;
  };
  season: {
    sowing: string;
    harvesting: string;
    climate: string;
  };
  fertilizer: {
    organic: string;
    chemical: string;
    timing: string;
  };
  sustainablePractices: {
    organicFertilizer: string;
    bioPesticides: string;
    cropRotation: string;
    intercropping: string;
    waterConservation: string;
  };
}

interface AnimalInfo {
  animalType: string;
  breed: string;
  housing: string;
  feed: string;
  water: string;
  healthcare: string;
  breeding: string;
  specialNotes: string;
}

interface DiseaseAnalysis {
  disease: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  confidence: number;
  symptoms: string[];
  treatment: {
    organic: string;
    chemical: string;
    immediate: string;
  };
  prevention: string;
  nearbyShops: string[];
}

class GeminiService {
  private apiKey: string;
  private vertexApiKey: string;

  constructor() {
    this.apiKey = 'AIzaSyD-yA7h2BIsISOysE-E0uVn7IgsaRLqHvs';
    this.vertexApiKey = 'AIzaSyBLNJRKGvi61U43ERTNXRYPiyY1EyKypsg';
  }

  // Determine if query should return structured data or conversational response
  private isStructuredQuery(query: string): boolean {
    const structuredKeywords = [
      'tell me about', 'information about', 'details about', 'cultivation of',
      'growing', 'farming', 'requirements for', 'how to grow', 'care for'
    ];
    
    const lowerQuery = query.toLowerCase();
    return structuredKeywords.some(keyword => lowerQuery.includes(keyword));
  }

  // Get structured crop information
  async getCropInfo(query: string, language: string = 'en'): Promise<CropInfo> {
    try {
      // Simulate API call with structured response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Extract crop name from query
      const cropName = this.extractCropName(query);
      
      return {
        cropName: `🌾 ${cropName}`,
        seeds: {
          type: '🌱 HD-2967, PBW-343, DBW-88',
          germinationRate: '📊 85-90% in 7-10 days',
          variety: '🌾 Recommended for Punjab region'
        },
        soil: {
          type: '🌍 Well-drained loamy soil',
          pH: '⚗️ 6.0-7.5 optimal range',
          preparation: '🚜 Deep plowing and leveling required'
        },
        water: {
          daily: '💧 25-30 mm during critical growth stages',
          monthly: '📅 750-900 mm total requirement',
          yearly: '🗓️ Rabi season (Oct-Apr), 4-6 irrigations needed'
        },
        season: {
          sowing: '🌱 October-November (Rabi season)',
          harvesting: '🌾 March-April',
          climate: '🌤️ Cool, dry climate preferred'
        },
        fertilizer: {
          organic: '🌿 FYM 10-15 tonnes/ha, Vermicompost 5 tonnes/ha',
          chemical: '⚗️ NPK 120:60:40 kg/ha',
          timing: '⏰ Apply in 2-3 splits during growth stages'
        },
        sustainablePractices: {
          organicFertilizer: '🌱 FYM 10-15 tonnes/ha, Vermicompost 5 tonnes/ha',
          bioPesticides: '🐛 Neem oil, Trichoderma, Bacillus thuringiensis',
          cropRotation: '🔄 Wheat-Rice-Fallow, Wheat-Cotton-Sugarcane',
          intercropping: '🌾 Wheat + Mustard, Wheat + Chickpea (border rows)',
          waterConservation: '💧 Drip irrigation, Mulching, Laser land leveling'
        }
      };
    } catch (error) {
      console.error('Error fetching crop info:', error);
      throw new Error('Failed to fetch crop information');
    }
  }

  // Get structured animal information
  async getAnimalInfo(query: string, language: string = 'en'): Promise<AnimalInfo> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const animalName = this.extractAnimalName(query);
      
      return {
        animalType: `🐄 ${animalName}`,
        breed: '🧬 Gir, Sahiwal, Jersey, Holstein Friesian',
        housing: '🏠 Well-ventilated shed, dry floor, 40-50 sq ft per animal',
        feed: '🌾 Green fodder 25-30 kg, dry fodder 5-7 kg, concentrates 3-4 kg daily',
        water: '💧 40-60 liters per day, more during lactation',
        healthcare: '💉 FMD, Brucellosis, Deworming every 6 months',
        breeding: '👶 Calving every 12-15 months, gestation 280 days',
        specialNotes: '📝 High milk yield needs protein-rich diet, regular health checkups'
      };
    } catch (error) {
      console.error('Error fetching animal info:', error);
      throw new Error('Failed to fetch animal information');
    }
  }

  // Get conversational response (ChatGPT-like)
  async getConversationalResponse(query: string, mode: 'crop' | 'animal', language: string = 'en'): Promise<string> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate ChatGPT-like response with emoji labels
      if (mode === 'crop') {
        return `🌾 **Great question about farming!** 

Based on your query, here's what I can tell you:

🌱 **Seeds**: The best potato seeds depend on your region and purpose. For Punjab, varieties like Kufri Pukhraj and Kufri Bahar are excellent choices.

🌍 **Growing Conditions**: Potatoes prefer well-drained, loose soil with pH 5.5-6.5. They need cool weather during tuber formation.

💡 **Pro Tip**: Plant seed potatoes 15-20 cm apart in rows, and ensure good drainage to prevent rotting.

📈 **Market Insight**: Potato farming can be quite profitable with proper planning and disease management.

Would you like more specific information about potato cultivation or any other farming topic?`;
      } else {
        return `🐄 **Animal Care Information**

Here's what you need to know:

🧬 **Breeds**: For dairy purposes, Jersey and Holstein Friesian are high-yielding breeds, while Gir and Sahiwal are excellent indigenous options.

🏠 **Housing**: Ensure proper ventilation, dry flooring, and adequate space (40-50 sq ft per animal).

🌾 **Feeding**: A balanced diet with green fodder, dry fodder, and concentrates is essential for good milk production.

💉 **Health**: Regular vaccination schedule and deworming every 6 months keeps animals healthy.

💡 **Tip**: Maintain clean water supply and monitor animals daily for any signs of illness.

Need more specific guidance on animal husbandry practices?`;
      }
    } catch (error) {
      console.error('Error getting conversational response:', error);
      throw new Error('Failed to get response');
    }
  }

  // Analyze crop disease from image
  async analyzeCropDisease(imageBase64: string): Promise<DiseaseAnalysis> {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      return {
        disease: '🦠 Tomato Late Blight',
        severity: 'Moderate',
        confidence: 92,
        symptoms: [
          '🍃 Dark spots with yellow halos on leaves',
          '🌱 Leaf curling and wilting',
          '🍅 Brown patches on fruits'
        ],
        treatment: {
          organic: '🌿 Apply copper-based fungicide every 7-10 days',
          chemical: '⚗️ Use Mancozeb 75% WP @ 2g/liter',
          immediate: '⚡ Remove infected leaves, improve air circulation'
        },
        prevention: '🛡️ Improve air circulation, avoid overhead watering',
        nearbyShops: [
          '🏪 Krishi Kendra - 2km away',
          '🌾 Local seed store - 5km away',
          '💊 Pesticide shop - 3km away'
        ]
      };
    } catch (error) {
      console.error('Error analyzing crop disease:', error);
      throw new Error('Failed to analyze crop disease');
    }
  }

  // Text-to-Speech conversion
  async textToSpeech(text: string, languageCode: string = 'en-US'): Promise<string> {
    try {
      // Simulate TTS processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would return audio data
      console.log(`Converting to speech: ${text} in ${languageCode}`);
      return 'audio-data-base64';
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      throw new Error('Failed to convert text to speech');
    }
  }

  // Speech-to-Text conversion
  async speechToText(audioBlob: Blob, languageCode: string = 'en-US'): Promise<string> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate STT processing
      console.log(`Converting speech to text in ${languageCode}`);
      return 'Sample transcribed text from speech';
    } catch (error) {
      console.error('Error in speech-to-text:', error);
      throw new Error('Failed to convert speech to text');
    }
  }

  // Helper methods
  private extractCropName(query: string): string {
    const crops = ['wheat', 'rice', 'cotton', 'tomato', 'onion', 'sugarcane', 'potato', 'maize'];
    const lowerQuery = query.toLowerCase();
    
    for (const crop of crops) {
      if (lowerQuery.includes(crop)) {
        return crop.charAt(0).toUpperCase() + crop.slice(1);
      }
    }
    
    return 'Wheat'; // Default
  }

  private extractAnimalName(query: string): string {
    const animals = ['cow', 'goat', 'buffalo', 'poultry', 'sheep', 'fish'];
    const lowerQuery = query.toLowerCase();
    
    for (const animal of animals) {
      if (lowerQuery.includes(animal)) {
        return animal.charAt(0).toUpperCase() + animal.slice(1);
      }
    }
    
    return 'Dairy Cow'; // Default
  }
}

export const geminiService = new GeminiService();