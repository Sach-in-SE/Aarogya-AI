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
    const titles = {
      english: 'Aarogya-AI - Your Health Companion',
      hindi: 'आरोग्य-AI - आपका स्वास्थ्य साथी',
      odia: 'ଆରୋଗ୍ୟ-AI - ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ'
    };
    document.title = titles[language as keyof typeof titles] || titles.english;
  }, [language]);

  const handleStartChat = () => setCurrentScreen('chat');
  const handleBackToWelcome = () => setCurrentScreen('welcome');
  const handleGoToProfile = () => setCurrentScreen('profile');
  const handleAuthSuccess = () => setCurrentScreen('profile');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      {/* Welcome Screen */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          currentScreen === 'welcome' ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        <WelcomeScreen
          onStartChat={handleStartChat}
          onAuthSuccess={handleAuthSuccess}
          language={language}
          onLanguageChange={setLanguage}
        />
      </div>

      {/* Chatbot Screen */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          currentScreen === 'chat' ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        <ChatbotScreen
          language={language}
          onBack={handleBackToWelcome}
        />
      </div>

      {/* Profile Screen */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          currentScreen === 'profile' ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        <ProfileScreen
          language={language}
          onBack={handleBackToWelcome}
        />
      </div>
    </div>
  );
}

export default App;
