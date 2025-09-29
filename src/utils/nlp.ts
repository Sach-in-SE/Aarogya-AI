import { diseases } from '../data/diseases';
import { vaccines } from '../data/vaccines';
import { SymptomAssessment, Disease } from '../types/health';

export class HealthNLP {
  private static symptoms: { [key: string]: string[] } = {
    fever: ['fever', 'temperature', 'hot', 'chills', 'burning', 'जुखाम', 'बुखार', 'ज्वर', 'ଜ୍ୱର', 'ଗରମ'],
    headache: ['headache', 'head pain', 'migraine', 'सिरदर्द', 'सिर दर्द', 'ମୁଣ୍ଡ ବିନ୍ଧା', 'ମୁଣ୍ଡ ଯନ୍ତ୍ରଣା'],
    cough: ['cough', 'coughing', 'खांसी', 'खाँसी', 'କାଶ', 'କଫ'],
    pain: ['pain', 'ache', 'hurt', 'sore', 'दर्द', 'पीड़ा', 'ବିନ୍ଧା', 'ଯନ୍ତ୍ରଣା'],
    nausea: ['nausea', 'vomiting', 'throw up', 'जी मिचलाना', 'उल्टी', 'ବାନ୍ତି', 'ଉବକାଇବା'],
    fatigue: ['tired', 'fatigue', 'weakness', 'exhausted', 'थकान', 'कमजोरी', 'ଥକ୍କା', 'ଦୁର୍ବଳତା']
  };

  private static diseases = diseases;
  private static vaccines = vaccines;

  static extractSymptoms(text: string): string[] {
    const lowerText = text.toLowerCase();
    const foundSymptoms: string[] = [];

    Object.entries(this.symptoms).forEach(([symptom, keywords]) => {
      keywords.forEach(keyword => {
        if (lowerText.includes(keyword.toLowerCase())) {
          foundSymptoms.push(symptom);
        }
      });
    });

    return [...new Set(foundSymptoms)];
  }

  static assessSymptoms(symptoms: string[]): SymptomAssessment {
    const possibleConditions: SymptomAssessment['possibleConditions'] = [];

    this.diseases.forEach(disease => {
      const matchedSymptoms = symptoms.filter(symptom => 
        disease.symptoms.some(diseaseSymptom => 
          diseaseSymptom.toLowerCase().includes(symptom) || 
          symptom.includes(diseaseSymptom.toLowerCase())
        )
      );

      if (matchedSymptoms.length > 0) {
        const probability = (matchedSymptoms.length / disease.symptoms.length) * 100;
        let urgency: 'low' | 'moderate' | 'high' | 'emergency' = 'low';

        if (disease.severity === 'critical') urgency = 'emergency';
        else if (disease.severity === 'high') urgency = 'high';
        else if (disease.severity === 'moderate') urgency = 'moderate';

        possibleConditions.push({
          disease,
          probability: Math.min(probability, 85), // Cap at 85% for preliminary assessment
          urgency
        });
      }
    });

    // Sort by probability
    possibleConditions.sort((a, b) => b.probability - a.probability);

    const needsImmediateAttention = possibleConditions.some(
      condition => condition.urgency === 'emergency' || condition.urgency === 'high'
    );

    const recommendations = this.generateRecommendations(symptoms, possibleConditions);

    return {
      id: Date.now().toString(),
      symptoms,
      possibleConditions: possibleConditions.slice(0, 3), // Top 3 matches
      recommendations,
      needsImmediateAttention
    };
  }

  private static generateRecommendations(symptoms: string[], conditions: SymptomAssessment['possibleConditions']): string[] {
    const recommendations: string[] = [];

    if (conditions.some(c => c.urgency === 'emergency')) {
      recommendations.push('Seek immediate emergency medical attention');
      recommendations.push('Call emergency services or visit nearest hospital');
    } else if (conditions.some(c => c.urgency === 'high')) {
      recommendations.push('Consult a healthcare provider within 24 hours');
      recommendations.push('Monitor symptoms closely');
    } else {
      recommendations.push('Monitor symptoms for 24-48 hours');
      recommendations.push('Maintain rest and hydration');
      recommendations.push('Consult healthcare provider if symptoms worsen');
    }

    // Add symptom-specific recommendations
    if (symptoms.includes('fever')) {
      recommendations.push('Keep body temperature monitored');
      recommendations.push('Use cool compresses and stay hydrated');
    }

    return recommendations;
  }

  static getIntent(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Vaccination intents
    if (lowerMessage.includes('vaccine') || lowerMessage.includes('vaccination') || 
        lowerMessage.includes('टीका') || lowerMessage.includes('टीकाकरण') ||
        lowerMessage.includes('ଟିକା') || lowerMessage.includes('ଟିକାକରଣ')) {
      return 'vaccination_info';
    }

    // Disease information intents
    if (lowerMessage.includes('disease') || lowerMessage.includes('illness') ||
        lowerMessage.includes('बीमारी') || lowerMessage.includes('रोग') ||
        lowerMessage.includes('ରୋଗ') || lowerMessage.includes('ଅସୁସ୍ଥତା')) {
      return 'disease_info';
    }

    // Symptom checker intents
    if (this.extractSymptoms(message).length > 0 || 
        lowerMessage.includes('symptoms') || lowerMessage.includes('लक्षण') ||
        lowerMessage.includes('ଲକ୍ଷଣ')) {
      return 'symptom_check';
    }

    // Prevention intents
    if (lowerMessage.includes('prevent') || lowerMessage.includes('prevention') ||
        lowerMessage.includes('रोकथाम') || lowerMessage.includes('बचाव') ||
        lowerMessage.includes('ପ୍ରତିରୋଧ') || lowerMessage.includes('ସୁରକ୍ଷା')) {
      return 'prevention_info';
    }

    return 'general_health';
  }

  static generateResponse(intent: string, message: string, language: string = 'english'): string {
    const responses = {
      english: {
        greeting: "Hello! I'm your health assistant. How can I help you today? You can ask about diseases, symptoms, vaccines, or prevention methods.",
        vaccination_info: "I can provide information about vaccination schedules, vaccine availability, and safety. Which vaccine would you like to know about?",
        disease_info: "I can help you learn about various diseases, their symptoms, causes, and prevention. Which disease interests you?",
        symptom_check: "I'll help assess your symptoms. Please describe what you're experiencing, and I'll provide preliminary guidance.",
        prevention_info: "Prevention is key to good health. I can share preventive measures for various diseases and healthy lifestyle tips.",
        general_health: "I'm here to help with your health questions. Ask me about diseases, symptoms, vaccines, or prevention methods."
      },
      hindi: {
        greeting: "नमस्ते! मैं आपका स्वास्थ्य सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं? आप बीमारियों, लक्षणों, टीकों या रोकथाम के तरीकों के बारे में पूछ सकते हैं।",
        vaccination_info: "मैं टीकाकरण कार्यक्रम, टीकों की उपलब्धता और सुरक्षा के बारे में जानकारी प्रदान कर सकता हूं। आप किस टीके के बारे में जानना चाहते हैं?",
        disease_info: "मैं विभिन्न रोगों, उनके लक्षणों, कारणों और रोकथाम के बारे में जानने में आपकी मदद कर सकता हूं। कौन सा रोग आपको दिलचस्प लगता है?",
        symptom_check: "मैं आपके लक्षणों का आकलन करने में मदद करूंगा। कृपया बताएं कि आप क्या अनुभव कर रहे हैं, और मैं प्राथमिक मार्गदर्शन प्रदान करूंगा।",
        prevention_info: "रोकथाम अच्छे स्वास्थ्य की कुंजी है। मैं विभिन्न बीमारियों के लिए रोकथाम के उपाय और स्वस्थ जीवन शैली की सुझाव साझा कर सकता हूं।",
        general_health: "मैं आपके स्वास्थ्य प्रश्नों में मदद के लिए यहां हूं। मुझसे बीमारियों, लक्षणों, टीकों या रोकथाम के तरीकों के बारे में पूछें।"
      },
      odia: {
        greeting: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି? ଆପଣ ରୋଗ, ଲକ୍ଷଣ, ଟିକା କିମ୍ବା ପ୍ରତିରୋଧ ପଦ୍ଧତି ବିଷୟରେ ପଚାରିପାରିବେ।",
        vaccination_info: "ମୁଁ ଟିକାକରଣ କାର୍ଯ୍ୟସୂଚୀ, ଟିକାର ଉପଲବ୍ଧତା ଏବଂ ସୁରକ୍ଷା ବିଷୟରେ ସୂଚନା ପ୍ରଦାନ କରିପାରିବି। ଆପଣ କେଉଁ ଟିକା ବିଷୟରେ ଜାଣିବାକୁ ଚାହାନ୍ତି?",
        disease_info: "ମୁଁ ବିଭିନ୍ନ ରୋଗ, ସେମାନଙ୍କର ଲକ୍ଷଣ, କାରଣ ଏବଂ ପ୍ରତିରୋଧ ବିଷୟରେ ଜାଣିବାରେ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିପାରିବି। କେଉଁ ରୋଗ ଆପଣଙ୍କୁ ଆଗ୍ରହୀ କରେ?",
        symptom_check: "ମୁଁ ଆପଣଙ୍କ ଲକ୍ଷଣଗୁଡ଼ିକର ମୂଲ୍ୟାଙ୍କନ କରିବାରେ ସାହାଯ୍ୟ କରିବି। ଦୟାକରି ବର୍ଣ୍ଣନା କରନ୍ତୁ ଆପଣ କ'ଣ ଅନୁଭବ କରୁଛନ୍ତି, ଏବଂ ମୁଁ ପ୍ରାଥମିକ ମାର୍ଗଦର୍ଶନ ପ୍ରଦାନ କରିବି।",
        prevention_info: "ପ୍ରତିରୋଧ ଭଲ ସ୍ୱାସ୍ଥ୍ୟର ଚାବି। ମୁଁ ବିଭିନ୍ନ ରୋଗ ପାଇଁ ପ୍ରତିରୋଧକ ବ୍ୟବସ୍ଥା ଏବଂ ସ୍ୱସ୍ଥ ଜୀବନଶୈଳୀର ପରାମର୍ଶ ସାଝା କରିପାରିବି।",
        general_health: "ମୁଁ ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରଶ୍ନଗୁଡ଼ିକରେ ସାହାଯ୍ୟ କରିବା ପାଇଁ ଏଠାରେ ଅଛି। ମୋତେ ରୋଗ, ଲକ୍ଷଣ, ଟିକା କିମ୍ବା ପ୍ରତିରୋଧ ପଦ୍ଧତି ବିଷୟରେ ପଚାରନ୍ତୁ।"
      }
    };

    const langResponses = responses[language as keyof typeof responses] || responses.english;
    return langResponses[intent as keyof typeof langResponses] || langResponses.general_health;
  }
}