import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, Bot, User, ArrowLeft, Heart, Shield, Lightbulb } from 'lucide-react';
import { ChatMessage } from '../types/health';
import { HealthNLP } from '../utils/nlp';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { WhatsAppButton } from './WhatsAppButton';

interface ChatbotScreenProps {
  language: string;
  onBack: () => void;
}

export const ChatbotScreen: React.FC<ChatbotScreenProps> = ({ language, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    isSupported: speechSupported,
    resetTranscript 
  } = useSpeechRecognition();

  const {
    isSpeaking,
    speak,
    stop: stopSpeaking,
    isSupported: ttsSupported
  } = useTextToSpeech();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (transcript && !isListening) {
      setInputValue(transcript);
      resetTranscript();
    }
  }, [transcript, isListening, resetTranscript]);

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0) {
      const greeting = HealthNLP.generateResponse('greeting', '', language);
      addBotMessage(greeting);
    }
  }, [language]);

  const addBotMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      language
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
      language
    };
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    const intent = HealthNLP.getIntent(inputValue);
    
    // Extract symptoms for symptom checker
    const symptoms = HealthNLP.extractSymptoms(inputValue);
    
    let response = '';
    if (intent === 'symptom_check' && symptoms.length > 0) {
      const assessment = HealthNLP.assessSymptoms(symptoms);
      response = generateSymptomResponse(assessment, language);
    } else {
      response = HealthNLP.generateResponse(intent, inputValue, language);
    }

    setTimeout(() => {
      addBotMessage(response);
    }, 1000);

    setInputValue('');
  };

  const generateSymptomResponse = (assessment: any, lang: string) => {
    const responses = {
      english: {
        prefix: "Based on your symptoms, here's what I found:",
        conditions: "Possible conditions:",
        recommendations: "My recommendations:",
        emergency: "⚠️ This may require immediate medical attention!",
        disclaimer: "This is preliminary guidance only. Please consult a healthcare professional for proper diagnosis."
      },
      hindi: {
        prefix: "आपके लक्षणों के आधार पर, यह है जो मुझे मिला:",
        conditions: "संभावित स्थितियां:",
        recommendations: "मेरी सिफारिशें:",
        emergency: "⚠️ इसके लिए तत्काल चिकित्सा ध्यान की आवश्यकता हो सकती है!",
        disclaimer: "यह केवल प्राथमिक मार्गदर्शन है। उचित निदान के लिए कृपया स्वास्थ्य पेशेवर से सलाह लें।"
      },
      odia: {
        prefix: "ଆପଣଙ୍କ ଲକ୍ଷଣ ଉପରେ ଆଧାର କରି, ଏହା ହେଉଛି ଯାହା ମୁଁ ପାଇଲି:",
        conditions: "ସମ୍ଭାବ୍ୟ ଅବସ୍ଥା:",
        recommendations: "ମୋର ସୁପାରିଶ:",
        emergency: "⚠️ ଏହା ତୁରନ୍ତ ଚିକିତ୍ସା ଧ୍ୟାନ ଆବଶ୍ୟକ କରିପାରେ!",
        disclaimer: "ଏହା କେବଳ ପ୍ରାଥମିକ ମାର୍ଗଦର୍ଶନ। ଉଚିତ ନିର୍ଣ୍ଣୟ ପାଇଁ ଦୟାକରି ଏକ ସ୍ୱାସ୍ଥ୍ୟ ପେଶାଦାରଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ।"
      }
    };

    const r = responses[lang as keyof typeof responses] || responses.english;
    
    let response = r.prefix + '\n\n';
    
    if (assessment.needsImmediateAttention) {
      response += r.emergency + '\n\n';
    }
    
    if (assessment.possibleConditions.length > 0) {
      response += r.conditions + '\n';
      assessment.possibleConditions.forEach((condition: any, index: number) => {
        response += `${index + 1}. ${condition.disease.name} (${Math.round(condition.probability)}% match)\n`;
      });
      response += '\n';
    }
    
    response += r.recommendations + '\n';
    assessment.recommendations.forEach((rec: string, index: number) => {
      response += `• ${rec}\n`;
    });
    
    response += '\n' + r.disclaimer;
    
    return response;
  };

  const handleSpeechToText = () => {
    if (isListening) {
      stopListening();
    } else {
      const langMap: { [key: string]: string } = {
        english: 'en-US',
        hindi: 'hi-IN',
        odia: 'or-IN'
      };
      startListening(langMap[language] || 'en-US');
    }
  };

  const handleTextToSpeech = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const langMap: { [key: string]: string } = {
        english: 'en-US',
        hindi: 'hi-IN',
        odia: 'or-IN'
      };
      speak(text, langMap[language] || 'en-US');
    }
  };

  const handleQuickReply = (topic: string) => {
    const queries = {
      diseases: {
        english: 'Tell me about common diseases',
        hindi: 'सामान्य बीमारियों के बारे में बताएं',
        odia: 'ସାଧାରଣ ରୋଗ ବିଷୟରେ କୁହନ୍ତୁ'
      },
      vaccines: {
        english: 'Show me vaccination schedule',
        hindi: 'टीकाकरण कार्यक्रम दिखाएं',
        odia: 'ଟିକାକରଣ ସୂଚୀ ଦେଖାନ୍ତୁ'
      },
      tips: {
        english: 'Give me health tips',
        hindi: 'स्वास्थ्य सुझाव दें',
        odia: 'ସ୍ୱାସ୍ଥ୍ୟ ପରାମର୍ଶ ଦିଅନ୍ତୁ'
      }
    };

    const query = queries[topic as keyof typeof queries]?.[language as keyof typeof queries.diseases] || 
                  queries[topic as keyof typeof queries]?.english || '';
    
    if (query) {
      setInputValue(query);
    }
  };

  const getQuickReplies = () => {
    const replies = {
      english: [
        { id: 'diseases', label: 'Diseases', icon: Heart },
        { id: 'vaccines', label: 'Vaccines', icon: Shield },
        { id: 'tips', label: 'Health Tips', icon: Lightbulb }
      ],
      hindi: [
        { id: 'diseases', label: 'रोग', icon: Heart },
        { id: 'vaccines', label: 'टीके', icon: Shield },
        { id: 'tips', label: 'स्वास्थ्य सुझाव', icon: Lightbulb }
      ],
      odia: [
        { id: 'diseases', label: 'ରୋଗ', icon: Heart },
        { id: 'vaccines', label: 'ଟିକା', icon: Shield },
        { id: 'tips', label: 'ସ୍ୱାସ୍ଥ୍ୟ ପରାମର୍ଶ', icon: Lightbulb }
      ]
    };

    return replies[language as keyof typeof replies] || replies.english;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        language={language}
        variant="floating"
        message={language === 'hindi' ? 'मुझे स्वास्थ्य सहायता चाहिए' : 
                 language === 'odia' ? 'ମୋତେ ସ୍ୱାସ୍ଥ୍ୟ ସହାୟତା ଦରକାର' : 
                 'I need health assistance'}
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {language === 'hindi' ? 'वापस' :
                 language === 'odia' ? 'ପଛକୁ' :
                 'Back'}
              </span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Aarogya-AI</h3>
                <span className="text-xs text-green-600">
                  {language === 'hindi' ? 'ऑनलाइन' :
                   language === 'odia' ? 'ଅନଲାଇନ୍' :
                   'Online'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-500">
                {language === 'hindi' ? 'बातचीत शुरू करने के लिए नीचे टाइप करें...' :
                 language === 'odia' ? 'କଥାବାର୍ତ୍ତା ଆରମ୍ଭ କରିବାକୁ ତଳେ ଟାଇପ କରନ୍ତୁ...' :
                 'Type below to start the conversation...'}
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-blue-500 ml-2' : 'bg-green-500 mr-2'}`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                  {message.sender === 'bot' && ttsSupported && (
                    <button
                      onClick={() => handleTextToSpeech(message.content)}
                      className="mt-2 text-xs opacity-70 hover:opacity-100 flex items-center space-x-1 transition-opacity"
                    >
                      {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 1 && (
          <div className="px-4 py-2">
            <div className="flex flex-wrap gap-2 justify-center">
              {getQuickReplies().map((reply) => {
                const Icon = reply.icon;
                return (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply.id)}
                    className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{reply.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-2 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={language === 'hindi' ? 'अपना स्वास्थ्य प्रश्न टाइप करें...' : 
                            language === 'odia' ? 'ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରଶ୍ନ ଟାଇପ କରନ୍ତୁ...' : 
                            'Type your health question...'}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            {speechSupported && (
              <button
                onClick={handleSpeechToText}
                className={`p-3 rounded-full transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
            
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};