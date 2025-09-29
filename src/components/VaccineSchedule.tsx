import React, { useState } from 'react';
import { Calendar, Shield, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { vaccines } from '../data/vaccines';

interface VaccineScheduleProps {
  language: string;
}

export const VaccineSchedule: React.FC<VaccineScheduleProps> = ({ language }) => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedVaccine, setSelectedVaccine] = useState<string | null>(null);

  const ageGroups = ['all', 'Birth', '1-2 months', '4 months', '6 months', '12-17 years', '18-44 years', '45-59 years', '60+ years'];

  const getTranslatedContent = (vaccine: any) => {
    if (language === 'hindi' && vaccine.translations.hindi) {
      return vaccine.translations.hindi;
    }
    if (language === 'odia' && vaccine.translations.odia) {
      return vaccine.translations.odia;
    }
    return {
      name: vaccine.name,
      description: vaccine.description,
      sideEffects: vaccine.sideEffects,
      contraindications: vaccine.contraindications
    };
  };

  const filteredVaccines = vaccines.filter(vaccine => {
    if (selectedAgeGroup === 'all') return true;
    return vaccine.ageGroups.some(age => age.includes(selectedAgeGroup) || selectedAgeGroup.includes(age));
  });

  const selectedVaccineData = selectedVaccine ? vaccines.find(v => v.id === selectedVaccine) : null;
  const translatedData = selectedVaccineData ? getTranslatedContent(selectedVaccineData) : null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-green-600" />
          {language === 'hindi' ? 'टीकाकरण कार्यक्रम' :
           language === 'odia' ? 'ଟିକାକରଣ ସୂଚୀ' : 
           'Vaccination Schedule'}
        </h2>
        
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">
              {language === 'hindi' ? 'सभी आयु समूह' :
               language === 'odia' ? 'ସମସ୍ତ ବୟସ ଗୋଷ୍ଠୀ' :
               'All Age Groups'}
            </option>
            {ageGroups.slice(1).map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vaccine List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'hindi' ? 'उपलब्ध टीके' :
             language === 'odia' ? 'ଉପଲବ୍ଧ ଟିକା' :
             'Available Vaccines'}
          </h3>
          
          {filteredVaccines.map(vaccine => {
            const translated = getTranslatedContent(vaccine);
            return (
              <div
                key={vaccine.id}
                onClick={() => setSelectedVaccine(vaccine.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedVaccine === vaccine.id
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{translated.name}</h4>
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {translated.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">
                      {language === 'hindi' ? 'आयु समूह:' :
                       language === 'odia' ? 'ବୟସ ଗୋଷ୍ଠୀ:' :
                       'Age Groups:'} 
                    </span>
                    <span className="ml-2">{vaccine.ageGroups.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-orange-500" />
                    <span className="font-medium">
                      {language === 'hindi' ? 'कार्यक्रम:' :
                       language === 'odia' ? 'ସୂଚୀ:' :
                       'Schedule:'} 
                    </span>
                    <span className="ml-2">{vaccine.schedule}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vaccine Details */}
        <div className="bg-gray-50 rounded-lg p-6">
          {selectedVaccineData && translatedData ? (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{translatedData.name}</h3>
                <p className="text-gray-700">{translatedData.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    {language === 'hindi' ? 'टीकाकरण कार्यक्रम' :
                     language === 'odia' ? 'ଟିକାକରଣ ସୂଚୀ' :
                     'Vaccination Schedule'}
                  </h4>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-700">{selectedVaccineData.schedule}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'hindi' ? 'लक्षित आयु समूह' :
                     language === 'odia' ? 'ଲକ୍ଷ୍ୟ ବୟସ ଗୋଷ୍ଠୀ' :
                     'Target Age Groups'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVaccineData.ageGroups.map((age, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {age}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
                    {language === 'hindi' ? 'संभावित दुष्प्रभाव' :
                     language === 'odia' ? 'ସମ୍ଭାବ୍ୟ ପାର୍ଶ୍ୱ ପ୍ରଭାବ' :
                     'Possible Side Effects'}
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {translatedData.sideEffects.map((effect, index) => (
                      <li key={index} className="text-sm">{effect}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-red-600" />
                    {language === 'hindi' ? 'प्रतिबंध' :
                     language === 'odia' ? 'ପ୍ରତିବନ୍ଧ' :
                     'Contraindications'}
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {translatedData.contraindications.map((contra, index) => (
                      <li key={index} className="text-sm">{contra}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-green-800 mb-1">
                      {language === 'hindi' ? 'टीकाकरण की सलाह' :
                       language === 'odia' ? 'ଟିକାକରଣ ପରାମର୍ଶ' :
                       'Vaccination Advice'}
                    </h5>
                    <p className="text-sm text-green-700">
                      {language === 'hindi' ? 'टीकाकरण से पहले अपने स्वास्थ्य प्रदाता से सलाह लें। अपना टीकाकरण कार्ड अपडेट रखें।' :
                       language === 'odia' ? 'ଟିକାକରଣ ପୂର୍ବରୁ ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରଦାନକାରୀଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ। ଆପଣଙ୍କ ଟିକାକରଣ କାର୍ଡକୁ ଅଦ୍ୟତନ ରଖନ୍ତୁ।' :
                       'Consult with your healthcare provider before vaccination. Keep your vaccination card updated.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>
                  {language === 'hindi' ? 'विस्तृत जानकारी के लिए एक टीका चुनें' :
                   language === 'odia' ? 'ବିସ୍ତୃତ ସୂଚନା ପାଇଁ ଏକ ଟିକା ବାଛନ୍ତୁ' :
                   'Select a vaccine for detailed information'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};