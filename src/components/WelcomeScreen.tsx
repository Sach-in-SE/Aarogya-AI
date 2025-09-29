import React from 'react';
import { MessageCircle, Heart, Shield, Lightbulb, ArrowRight } from 'lucide-react';
import { WhatsAppService } from '../utils/whatsapp';

interface WelcomeScreenProps {
  onStartChat: () => void;
  language: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat, language }) => {
  const handleWhatsAppClick = () => {
    // Use WhatsApp service to open chat with localized message
    WhatsAppService.openWhatsAppChat(undefined, language);
  };

  const getContent = () => {
    const content = {
      english: {
        title: 'Aarogya-AI',
        tagline: 'Get instant health information & disease awareness.',
        whatsappText: 'Also available on WhatsApp ✅',
        whatsappButton: 'Chat on WhatsApp',
        startButton: 'Start Chat',
        features: [
          { icon: Heart, title: 'Disease Information', desc: 'Learn about symptoms, causes & prevention' },
          { icon: Shield, title: 'Vaccination Guide', desc: 'Get personalized vaccine schedules' },
          { icon: Lightbulb, title: 'Health Tips', desc: 'Daily wellness advice & alerts' }
        ]
      },
      hindi: {
        title: 'आरोग्य-AI',
        tagline: 'तुरंत स्वास्थ्य जानकारी और रोग जागरूकता प्राप्त करें।',
        whatsappText: 'WhatsApp पर भी उपलब्ध ✅',
        whatsappButton: 'WhatsApp पर चैट करें',
        startButton: 'चैट शुरू करें',
        features: [
          { icon: Heart, title: 'रोग की जानकारी', desc: 'लक्षण, कारण और रोकथाम के बारे में जानें' },
          { icon: Shield, title: 'टीकाकरण गाइड', desc: 'व्यक्तिगत टीका कार्यक्रम प्राप्त करें' },
          { icon: Lightbulb, title: 'स्वास्थ्य सुझाव', desc: 'दैनिक कल्याण सलाह और अलर्ट' }
        ]
      },
      odia: {
        title: 'ଆରୋଗ୍ୟ-AI',
        tagline: 'ତୁରନ୍ତ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ଏବଂ ରୋଗ ସଚେତନତା ପାଆନ୍ତୁ।',
        whatsappText: 'WhatsApp ରେ ମଧ୍ୟ ଉପଲବ୍ଧ ✅',
        whatsappButton: 'WhatsApp ରେ ଚାଟ କରନ୍ତୁ',
        startButton: 'ଚାଟ ଆରମ୍ଭ କରନ୍ତୁ',
        features: [
          { icon: Heart, title: 'ରୋଗ ସୂଚନା', desc: 'ଲକ୍ଷଣ, କାରଣ ଏବଂ ପ୍ରତିରୋଧ ବିଷୟରେ ଜାଣନ୍ତୁ' },
          { icon: Shield, title: 'ଟିକାକରଣ ଗାଇଡ', desc: 'ବ୍ୟକ୍ତିଗତ ଟିକା କାର୍ଯ୍ୟସୂଚୀ ପାଆନ୍ତୁ' },
          { icon: Lightbulb, title: 'ସ୍ୱାସ୍ଥ୍ୟ ପରାମର୍ଶ', desc: 'ଦୈନିକ ସୁସ୍ଥତା ପରାମର୍ଶ ଏବଂ ସତର୍କତା' }
        ]
      }
    };

    return content[language as keyof typeof content] || content.english;
  };

  const { title, tagline, whatsappText, whatsappButton, startButton, features } = getContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full shadow-lg mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {tagline}
            </p>
          </div>

          {/* WhatsApp Banner */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-green-100 border border-green-200 rounded-full px-6 py-3 mb-4">
              <span className="text-green-800 font-medium text-sm md:text-base">
                {whatsappText}
              </span>
            </div>
            
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mr-4 mb-4"
              title={`${whatsappButton} - ${language === 'hindi' ? 'तुरंत स्वास्थ्य सहायता पाएं' : language === 'odia' ? 'ତୁରନ୍ତ ସ୍ୱାସ୍ଥ୍ୟ ସହାୟତା ପାଆନ୍ତୁ' : 'Get instant health assistance'}`}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              {WhatsAppService.getButtonText(language)}
            </button>
          </div>

          {/* Main CTA */}
          <button
            onClick={onStartChat}
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            {startButton}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 px-4">
        <p className="text-sm text-gray-500">
          {language === 'hindi' ? 'आपका विश्वसनीय स्वास्थ्य साथी' :
           language === 'odia' ? 'ଆପଣଙ୍କର ବିଶ୍ୱସ୍ତ ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ' :
           'Your trusted health companion'}
        </p>
      </div>
    </div>
  );
};