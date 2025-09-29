import React, { useState } from 'react';
import { Search, Info, Shield, AlertTriangle } from 'lucide-react';
import { diseases } from '../data/diseases';

interface DiseaseLibraryProps {
  language: string;
}

export const DiseaseLibrary: React.FC<DiseaseLibraryProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(diseases.map(d => d.category)))];

  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || disease.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTranslatedContent = (disease: any) => {
    if (language === 'hindi' && disease.translations.hindi) {
      return disease.translations.hindi;
    }
    if (language === 'odia' && disease.translations.odia) {
      return disease.translations.odia;
    }
    return {
      name: disease.name,
      symptoms: disease.symptoms,
      causes: disease.causes,
      prevention: disease.prevention,
      treatment: disease.treatment
    };
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const selectedDiseaseData = selectedDisease ? diseases.find(d => d.id === selectedDisease) : null;
  const translatedData = selectedDiseaseData ? getTranslatedContent(selectedDiseaseData) : null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {language === 'hindi' ? 'रोग पुस्तकालय' :
           language === 'odia' ? 'ରୋଗ ଲାଇବ୍ରେରୀ' : 
           'Disease Library'}
        </h2>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'hindi' ? 'रोग या लक्षण खोजें...' :
                          language === 'odia' ? 'ରୋଗ କିମ୍ବା ଲକ୍ଷଣ ଖୋଜନ୍ତୁ...' :
                          'Search diseases or symptoms...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">
              {language === 'hindi' ? 'सभी श्रेणियां' :
               language === 'odia' ? 'ସମସ୍ତ ବର୍ଗ' :
               'All Categories'}
            </option>
            {categories.slice(1).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Disease List */}
        <div className="lg:col-span-1 space-y-3 max-h-96 overflow-y-auto">
          {filteredDiseases.map(disease => {
            const translated = getTranslatedContent(disease);
            return (
              <div
                key={disease.id}
                onClick={() => setSelectedDisease(disease.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedDisease === disease.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{translated.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(disease.severity)}`}>
                    {disease.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {translated.symptoms.slice(0, 3).join(', ')}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-500">{disease.category}</span>
                  {disease.contagious && (
                    <AlertTriangle className="w-3 h-3 text-orange-500 ml-2" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Disease Details */}
        <div className="lg:col-span-2">
          {selectedDiseaseData && translatedData ? (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{translatedData.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm px-3 py-1 rounded-full ${getSeverityColor(selectedDiseaseData.severity)}`}>
                      {selectedDiseaseData.severity}
                    </span>
                    {selectedDiseaseData.contagious && (
                      <span className="text-sm px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
                        {language === 'hindi' ? 'संक्रामक' :
                         language === 'odia' ? 'ସଂକ୍ରାମକ' :
                         'Contagious'}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600">{selectedDiseaseData.category}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Info className="w-4 h-4 mr-2 text-blue-600" />
                      {language === 'hindi' ? 'लक्षण' :
                       language === 'odia' ? 'ଲକ୍ଷଣ' :
                       'Symptoms'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {translatedData.symptoms.map((symptom, index) => (
                        <li key={index} className="text-sm">{symptom}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'hindi' ? 'कारण' :
                       language === 'odia' ? 'କାରଣ' :
                       'Causes'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {translatedData.causes.map((cause, index) => (
                        <li key={index} className="text-sm">{cause}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-green-600" />
                      {language === 'hindi' ? 'रोकथाम' :
                       language === 'odia' ? 'ପ୍ରତିରୋଧ' :
                       'Prevention'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {translatedData.prevention.map((prevention, index) => (
                        <li key={index} className="text-sm">{prevention}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'hindi' ? 'उपचार' :
                       language === 'odia' ? 'ଚିକିତ୍ସା' :
                       'Treatment'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {translatedData.treatment.map((treatment, index) => (
                        <li key={index} className="text-sm">{treatment}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>
                    {language === 'hindi' ? 'अस्वीकरण:' :
                     language === 'odia' ? 'ଦାବିତ୍ୟାଗ:' :
                     'Disclaimer:'}
                  </strong>{' '}
                  {language === 'hindi' ? 'यह जानकारी केवल शिक्षा के उद्देश्य से है। उचित निदान और उपचार के लिए हमेशा एक योग्य चिकित्सक से सलाह लें।' :
                   language === 'odia' ? 'ଏହି ସୂଚନା କେବଳ ଶିକ୍ଷାର ଉଦ୍ଦେଶ୍ୟରେ। ସଠିକ ନିଦାନ ଏବଂ ଚିକିତ୍ସା ପାଇଁ ସର୍ବଦା ଏକ ଯୋଗ୍ୟ ଚିକିତ୍ସକଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ।' :
                   'This information is for educational purposes only. Always consult with a qualified healthcare provider for proper diagnosis and treatment.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>
                  {language === 'hindi' ? 'विस्तृत जानकारी के लिए एक रोग चुनें' :
                   language === 'odia' ? 'ବିସ୍ତୃତ ସୂଚନା ପାଇଁ ଏକ ରୋଗ ବାଛନ୍ତୁ' :
                   'Select a disease for detailed information'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};