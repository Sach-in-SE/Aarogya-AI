import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatbotScreen } from './components/ChatbotScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'chat'>('welcome');
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

  return (
    <div className="relative">
      {/* Screen Transition */}
      <div className={`transition-all duration-500 ease-in-out ${
        currentScreen === 'welcome' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute inset-0'
      }`}>
        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            onStartChat={handleStartChat}
            language={language}
            onLanguageChange={setLanguage}
          />
        )}
      </div>

      <div className={`transition-all duration-500 ease-in-out ${
        currentScreen === 'chat' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0'
      }`}>
        {currentScreen === 'chat' && (
          <ChatbotScreen 
            language={language}
            onBack={handleBackToWelcome}
          />
        )}
      </div>
    </div>
  );
}

export default App;