export interface User {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  location: string;
  preferredLanguage: string;
  healthProfile?: HealthProfile;
}

export interface HealthProfile {
  chronicConditions: string[];
  allergies: string[];
  medications: string[];
  lastCheckup?: Date;
  emergencyContact: string;
}

export interface Disease {
  id: string;
  name: string;
  category: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  treatment: string[];
  severity: 'low' | 'moderate' | 'high' | 'critical';
  contagious: boolean;
  translations: Record<string, {
    name: string;
    symptoms: string[];
    causes: string[];
    prevention: string[];
    treatment: string[];
  }>;
}

export interface Vaccine {
  id: string;
  name: string;
  ageGroups: string[];
  schedule: string;
  description: string;
  sideEffects: string[];
  contraindications: string[];
  translations: Record<string, {
    name: string;
    description: string;
    sideEffects: string[];
    contraindications: string[];
  }>;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'audio' | 'image';
  language: string;
  metadata?: {
    intent?: string;
    entities?: any;
    confidence?: number;
  };
}

export interface HealthAlert {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'danger';
  location: string;
  date: Date;
  source: string;
  translations: Record<string, {
    title: string;
    description: string;
  }>;
}

export interface SymptomAssessment {
  id: string;
  symptoms: string[];
  possibleConditions: {
    disease: Disease;
    probability: number;
    urgency: 'low' | 'moderate' | 'high' | 'emergency';
  }[];
  recommendations: string[];
  needsImmediateAttention: boolean;
}