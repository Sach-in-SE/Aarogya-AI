import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatbotScreen } from './components/ChatbotScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'chat' | 'profile'>('welcome');
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    // Update document title based on language
    const titles = {
      english: 'Aarogya-AI - Your Health Companion',
      hindi: 'आरोग्य-AI - आपका स्वास्थ्य साथी',
      odia: 'ଆରୋଗ୍ୟ-AI - ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ'
    };
    document.title = titles[language as keyof typeof titles] || titles.english;
  }, [language]);

  const handleStartChat = () => {
    setCurrentScreen('chat');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleGoToProfile = () => {
    setCurrentScreen('profile');
  };

  const handleAuthSuccess = () => {
    setCurrentScreen('profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      {/* Screen Transition */}
      <div className={`transition-all duration-100 ease-in-out ${
        currentScreen === 'welcome' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute inset-0 pointer-events-none'
      }`}>
        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            onStartChat={handleStartChat}
            onAuthSuccess={handleAuthSuccess}
            language={language}
            onLanguageChange={setLanguage}
          />
        )}
      </div>

      <div className={`transition-all duration-500 ease-in-out ${
        currentScreen === 'chat' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0 pointer-events-none'
      }`}>
        {currentScreen === 'chat' && (
          <ChatbotScreen 
            language={language}
            onBack={handleBackToWelcome}
          />
        )}
      </div>

      <div className={`transition-all duration-500 ease-in-out ${
        currentScreen === 'profile' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0 pointer-events-none'
      }`}>
        {currentScreen === 'profile' && (
          <ProfileScreen 
            language={language}
            onBack={handleBackToWelcome}
          />
        )}
      </div>
    </div>
  );
}

export default App;