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

      const lowerQuery = query.toLowerCase();

      // Check for query-type questions (statistics, global info, etc.)
      if (this.isQueryTypeQuestion(query)) {
        return this.getQueryResponse(query, mode);
      }

      // Simulate ChatGPT-like response with emoji labels for info requests
      if (mode === 'crop') {
        return `🌾 **Great question about farming!**

Based on your query, here's what I can tell you:

🌱 **Seeds**: The best potato seeds depend on your region and purpose. For Punjab, varieties like Kufri Pukhraj and Kufri Bahar are excellent choices.

🌍 **Growing Conditions**: Potatoes prefer well-drained, loose soil with pH 5.5-6.5. They need cool weather during tuber formation.

💡 **Pro Tip**: Plant seed potatoes 15-20 cm apart in rows, and ensure good drainage to prevent rotting.

📈 **Market Insight**: Potato farming can be quite profitable with proper planning and disease management.

✅ **Next Steps**: Consider soil testing before planting and consult local agricultural experts for region-specific guidance.

Would you like more specific information about potato cultivation or any other farming topic?`;
      } else {
        return `🐄 **Animal Care Information**

Here's what you need to know:

🧬 **Breeds**: For dairy purposes, Jersey and Holstein Friesian are high-yielding breeds, while Gir and Sahiwal are excellent indigenous options.

🏠 **Housing**: Ensure proper ventilation, dry flooring, and adequate space (40-50 sq ft per animal).

🌾 **Feeding**: A balanced diet with green fodder, dry fodder, and concentrates is essential for good milk production.

💉 **Health**: Regular vaccination schedule and deworming every 6 months keeps animals healthy.

💡 **Tip**: Maintain clean water supply and monitor animals daily for any signs of illness.

✅ **Best Practice**: Maintain detailed records of milk production, health issues, and breeding to optimize productivity.

Need more specific guidance on animal husbandry practices?`;
      }
    } catch (error) {
      console.error('Error getting conversational response:', error);
      throw new Error('Failed to get response');
    }
  }

  // Check if query is asking for statistics or general information
  private isQueryTypeQuestion(query: string): boolean {
    const queryKeywords = [
      'which country', 'where', 'how much', 'how many', 'statistics',
      'global', 'world', 'largest', 'biggest', 'top', 'most',
      'produces', 'production', 'exporter', 'best for'
    ];

    const lowerQuery = query.toLowerCase();
    return queryKeywords.some(keyword => lowerQuery.includes(keyword));
  }

  // Get detailed query responses
  private getQueryResponse(query: string, mode: 'crop' | 'animal'): string {
    const lowerQuery = query.toLowerCase();

    if (mode === 'crop') {
      // Rice production query
      if (lowerQuery.includes('rice') && lowerQuery.includes('produc')) {
        return `🌾 **Global Rice Production Analysis**

📊 **Top Rice Producing Countries (2024)**:

🥇 **1. China** - 148 million tonnes (28% of global production)
   • Largest producer and consumer
   • Major varieties: Indica, Japonica
   • Key regions: Yangtze River Valley, Pearl River Delta

🥈 **2. India** - 132 million tonnes (25% of global production)
   • Second largest producer
   • Main varieties: Basmati, IR64, Swarna
   • Major states: West Bengal, Uttar Pradesh, Punjab, Andhra Pradesh

🥉 **3. Indonesia** - 54 million tonnes (10% of global production)
   • Largest producer in Southeast Asia
   • Self-sufficient in rice

📈 **Other Major Producers**:
   • 🇧🇩 Bangladesh - 36 million tonnes
   • 🇻🇳 Vietnam - 28 million tonnes
   • 🇹🇭 Thailand - 25 million tonnes
   • 🇲🇲 Myanmar - 13 million tonnes

🌍 **Global Context**:
   ✅ Total world production: ~520 million tonnes annually
   ✅ Asia accounts for 90% of global rice production
   ✅ Rice feeds over 3.5 billion people worldwide

💡 **Interesting Facts**:
   • India is the largest rice exporter (40% of global exports)
   • China produces rice primarily for domestic consumption
   • Climate change is affecting production patterns

📱 **Impact on Farmers**:
   • Understanding global trends helps in price forecasting
   • Export opportunities for Indian farmers
   • Technology adoption from leading producers

Would you like to know more about rice cultivation techniques or market prices?`;
      }

      // Wheat production query
      if (lowerQuery.includes('wheat') && lowerQuery.includes('produc')) {
        return `🌾 **Global Wheat Production Overview**

📊 **Top Wheat Producing Countries (2024)**:

🥇 **1. China** - 137 million tonnes
   • Largest producer globally
   • Primarily for domestic consumption
   • Major regions: North China Plain

🥈 **2. India** - 110 million tonnes
   • Second largest producer
   • Major states: Uttar Pradesh, Punjab, Haryana, Madhya Pradesh
   • Varieties: HD-2967, PBW-343, DBW-88

🥉 **3. Russia** - 92 million tonnes
   • Largest wheat exporter
   • Significant role in global food security

📈 **Other Major Producers**:
   • 🇺🇸 USA - 47 million tonnes
   • 🇫🇷 France - 36 million tonnes
   • 🇨🇦 Canada - 32 million tonnes
   • 🇦🇺 Australia - 31 million tonnes

🌍 **Global Statistics**:
   ✅ Total world production: ~780 million tonnes
   ✅ Wheat is grown on every continent except Antarctica
   ✅ Feeds approximately 2.5 billion people

💡 **Key Insights**:
   • Russia and Ukraine together account for 25% of wheat exports
   • India banned wheat exports in 2022 to ensure food security
   • Climate-resilient varieties are increasingly important

✅ **For Indian Farmers**:
   • Focus on quality improvement for export markets
   • Government procurement provides price stability
   • Minimum Support Price (MSP) protects farmer income

Need information about wheat cultivation or current market prices?`;
      }

      // Cotton query
      if (lowerQuery.includes('cotton')) {
        return `🌿 **Global Cotton Production & Export Data**

📊 **Top Cotton Producing Countries**:

🥇 **1. China** - 6.2 million tonnes (22% of global production)
   • Largest producer but also largest importer
   • Xinjiang region dominates production

🥈 **2. India** - 5.8 million tonnes (21% of global production)
   • Second largest producer
   • Major states: Gujarat, Maharashtra, Telangana, Haryana
   • Bt cotton varieties dominate

🥉 **3. USA** - 3.2 million tonnes (12% of global production)
   • Largest exporter globally
   • High-quality long-staple cotton

📈 **Export Leaders**:
   🥇 USA - 35% of global exports
   🥈 Brazil - 15% of global exports
   🥉 India - 8% of global exports

🌍 **Industry Overview**:
   ✅ Global production: ~26 million tonnes
   ✅ Textile industry employs 300+ million people
   ✅ Organic cotton market growing 20% annually

💡 **Sustainability Trends**:
   • Better Cotton Initiative (BCI) certification
   • Water-efficient irrigation methods
   • Integrated pest management

✅ **For Cotton Farmers**:
   • Export quality standards increasingly important
   • Traceability and sustainability certifications
   • Direct marketing opportunities

Interested in cotton cultivation techniques or pest management?`;
      }

      // Coffee query
      if (lowerQuery.includes('coffee')) {
        return `☕ **Global Coffee Production Analysis**

📊 **Top Coffee Producing Countries**:

🥇 **1. Brazil** - 3.7 million tonnes (35% of global production)
   • Largest producer for over 150 years
   • Both Arabica and Robusta varieties
   • Major regions: Minas Gerais, São Paulo

🥈 **2. Vietnam** - 1.8 million tonnes (18%)
   • Second largest, primarily Robusta
   • Rapid growth since 1990s

🥉 **3. Colombia** - 0.9 million tonnes (8%)
   • Famous for high-quality Arabica
   • "Juan Valdez" brand recognition

📈 **Other Producers**:
   • 🇮🇩 Indonesia - 0.75 million tonnes
   • 🇪🇹 Ethiopia - 0.47 million tonnes (birthplace of coffee)
   • 🇮🇳 India - 0.35 million tonnes (Karnataka, Kerala, Tamil Nadu)

🌍 **Best Climate for Growing**:
   ✅ Temperature: 15-24°C (Arabica), 24-30°C (Robusta)
   ✅ Rainfall: 1500-2500 mm annually
   ✅ Altitude: 600-2000m for Arabica, 0-800m for Robusta
   ✅ Soil: Well-drained, slightly acidic (pH 6-6.5)

💡 **Growing Regions**:
   • "Coffee Belt" - between Tropics of Cancer and Capricorn
   • Requires shade trees for best quality
   • Takes 3-4 years for first harvest

✅ **For Coffee Growers**:
   • Specialty coffee market offers premium prices
   • Organic and fair-trade certifications valuable
   • Climate change adaptation strategies essential

Would you like tips on coffee cultivation or processing methods?`;
      }

      // Default crop query response
      return `🌾 **Agricultural Information**

I'd be happy to help answer your question about crops and agriculture!

📊 **What I can help with**:
   ✅ Global production statistics
   ✅ Top producing countries
   ✅ Export and import data
   ✅ Climate requirements
   ✅ Cultivation techniques
   ✅ Market trends

💡 **Popular Topics**:
   • Rice production by country
   • Wheat export statistics
   • Best climates for specific crops
   • Organic farming trends
   • Sustainable agriculture practices

🌍 **Regional Focus**:
   I can provide information specific to India as well as global perspectives.

Please ask a specific question, and I'll provide detailed information with statistics and insights!`;
    } else {
      // Animal/Livestock queries
      if (lowerQuery.includes('milk') && lowerQuery.includes('produc')) {
        return `🥛 **Global Milk Production Analysis**

📊 **Top Milk Producing Countries (2024)**:

🥇 **1. India** - 230 million tonnes (24% of global production)
   • Largest milk producer since 1998
   • "Operation Flood" success story
   • Major contributors: Buffalo milk (50%), Cow milk (50%)
   • States: Uttar Pradesh, Rajasthan, Madhya Pradesh, Gujarat

🥈 **2. USA** - 103 million tonnes (11%)
   • Second largest producer
   • Highly mechanized dairy farms
   • Average: 23,000+ liters per cow annually

🥉 **3. China** - 36 million tonnes (4%)
   • Rapidly growing dairy sector
   • Major importer of dairy products

📈 **Other Major Producers**:
   • 🇵🇰 Pakistan - 62 million tonnes
   • 🇧🇷 Brazil - 35 million tonnes
   • 🇩🇪 Germany - 33 million tonnes
   • 🇷🇺 Russia - 31 million tonnes
   • 🇳🇿 New Zealand - 22 million tonnes (largest exporter)

🌍 **Global Context**:
   ✅ Total world production: ~950 million tonnes
   ✅ Dairy provides livelihood to 1 billion people
   ✅ India's per capita consumption: 200 liters/year

🐄 **India's Success Factors**:
   • White Revolution (Operation Flood)
   • Cooperative model (Amul, Mother Dairy)
   • Indigenous breeds well-suited to climate
   • Small-scale farmer participation

💡 **Breed Contributions**:
   • Buffalo breeds: Murrah, Mehsana, Jaffarabadi
   • Cow breeds: Gir, Sahiwal, Red Sindhi
   • Crossbreeds: Jersey × Indigenous, Holstein × Indigenous

📱 **Market Insights**:
   ✅ Organic milk premium growing 15% annually
   ✅ A2 milk gaining popularity
   ✅ Value-added products (cheese, yogurt) expanding

✅ **For Dairy Farmers**:
   • Focus on quality for better prices
   • Balanced nutrition improves yield
   • Cooperatives provide market access
   • Technology adoption (milking machines, chilling units)

Want to know more about dairy farming techniques or breed selection?`;
      }

      // Beef production
      if (lowerQuery.includes('beef')) {
        return `🥩 **Global Beef Production & Export Data**

📊 **Top Beef Producing Countries**:

🥇 **1. USA** - 12.6 million tonnes (20% of global production)
   • Largest producer and consumer
   • Major cattle: Angus, Hereford, Texas Longhorn

🥈 **2. Brazil** - 10.4 million tonnes (17%)
   • Largest exporter globally
   • Extensive grazing systems

🥉 **3. China** - 7.2 million tonnes (12%)
   • Growing production and imports

📈 **Export Leaders** (by volume):
   🥇 Brazil - 2.6 million tonnes
   🥈 Australia - 1.6 million tonnes
   🥉 India - 1.5 million tonnes (buffalo meat)
   • 🇺🇸 USA - 1.3 million tonnes
   • 🇦🇷 Argentina - 0.8 million tonnes

🌍 **Global Overview**:
   ✅ Total production: ~62 million tonnes
   ✅ India is largest exporter of buffalo meat (carabeef)
   ✅ Grass-fed vs grain-fed market segmentation

💡 **Sustainability Focus**:
   • Carbon footprint reduction programs
   • Methane reduction in cattle
   • Regenerative agriculture practices
   • Alternative proteins emerging

🇮🇳 **India's Position**:
   • Largest buffalo meat exporter
   • Beef cattle farming restricted
   • Major export destinations: Middle East, Southeast Asia

✅ **For Livestock Farmers**:
   • Quality standards for export markets
   • Traceability systems essential
   • Animal welfare certifications
   • Sustainable practices premium

Interested in buffalo rearing or meat processing information?`;
      }

      // Egg production
      if (lowerQuery.includes('egg')) {
        return `🥚 **Global Egg Production Statistics**

📊 **Top Egg Producing Countries (2024)**:

🥇 **1. China** - 31 million tonnes (38% of global production)
   • Largest producer by significant margin
   • Both commercial and backyard production

🥈 **2. USA** - 6.5 million tonnes (8%)
   • Highly mechanized production
   • Average: 330+ eggs per hen annually

🥉 **3. India** - 6.2 million tonnes (7.5%)
   • Third largest and fastest growing
   • Major states: Andhra Pradesh, Tamil Nadu, Telangana, Haryana

📈 **Other Major Producers**:
   • 🇮🇩 Indonesia - 3.2 million tonnes
   • 🇧🇷 Brazil - 2.8 million tonnes
   • 🇯🇵 Japan - 2.5 million tonnes
   • 🇷🇺 Russia - 2.4 million tonnes

🌍 **Industry Overview**:
   ✅ Global production: ~82 million tonnes
   ✅ ~6.9 trillion eggs produced annually
   ✅ Consumption growing 3-4% per year

🐔 **Production Systems**:
   • Battery cages (conventional)
   • Enriched colony systems
   • Cage-free/Barn systems
   • Free-range and organic

💡 **Market Trends**:
   ✅ Cage-free movement gaining momentum
   ✅ Organic eggs 20-30% price premium
   ✅ Omega-3 enriched eggs popular
   ✅ Brown eggs vs white eggs preferences

🇮🇳 **India's Growth**:
   • "Egg Revolution" - production tripled since 2000
   • Per capita consumption: 81 eggs/year (2024)
   • Government promotion of eggs for nutrition

✅ **For Poultry Farmers**:
   • Layer breeds: White Leghorn, BV-300, Babcock
   • Biosecurity protocols essential
   • Feed costs = 65-70% of production cost
   • Contract farming opportunities

Want information about layer farming or egg processing?`;
      }

      // Honey production
      if (lowerQuery.includes('honey')) {
        return `🍯 **Global Honey Production Overview**

📊 **Top Honey Producing Countries**:

🥇 **1. China** - 550,000 tonnes (28% of global production)
   • Largest producer and exporter
   • Also largest importer (for re-export)

🥈 **2. Turkey** - 115,000 tonnes (6%)
   • Second largest producer
   • Famous for pine honey and mad honey

🥉 **3. Argentina** - 75,000 tonnes (4%)
   • Major exporter to Europe
   • High quality standards

📈 **Other Producers**:
   • 🇮🇷 Iran - 70,000 tonnes
   • 🇺🇸 USA - 67,000 tonnes
   • 🇮🇳 India - 65,000 tonnes
   • 🇺🇦 Ukraine - 62,000 tonnes
   • 🇷🇺 Russia - 60,000 tonnes

🌍 **Global Industry**:
   ✅ Total production: ~1.9 million tonnes
   ✅ Market growing 5% annually
   ✅ Manuka honey commands premium prices

🐝 **Types of Honey**:
   • Multi-flora (mixed flowers)
   • Mono-flora (single source)
   • Special varieties: Manuka, Sidr, Acacia
   • Organic certified honey

💡 **Production Methods**:
   • Traditional beekeeping
   • Modern commercial apiculture
   • Migratory beekeeping
   • Urban beekeeping (emerging)

🇮🇳 **India's Beekeeping**:
   • Apis mellifera (European bee) - commercial
   • Apis cerana (Indian bee) - traditional
   • Major producers: Punjab, Uttar Pradesh, West Bengal
   • National Beekeeping & Honey Mission

✅ **For Beekeepers**:
   • Multi-flora honey most common
   • Quality testing and certification essential
   • Export opportunities to Europe, Middle East
   • Pollination services additional income

⚠️ **Challenges**:
   • Colony collapse disorder
   • Pesticide effects on bees
   • Climate change impacts
   • Adulteration concerns

Interested in starting beekeeping or honey processing?`;
      }

      // Default animal query response
      return `🐄 **Livestock & Animal Husbandry Information**

I can help you with detailed information about livestock and animal production!

📊 **What I can provide**:
   ✅ Global production statistics
   ✅ Top producing countries
   ✅ Breed information
   ✅ Management practices
   ✅ Market trends
   ✅ Export/import data

💡 **Popular Topics**:
   • Milk production by country
   • Beef and buffalo meat exports
   • Egg production statistics
   • Honey production data
   • Poultry farming practices

🇮🇳 **India-Specific Info**:
   I can provide detailed information about Indian livestock sector, government schemes, and best practices.

Please ask a specific question, and I'll provide comprehensive data and insights!`;
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