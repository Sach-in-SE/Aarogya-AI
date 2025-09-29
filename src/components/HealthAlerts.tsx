import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info, AlertCircle, MapPin, Calendar } from 'lucide-react';
import { healthAlerts } from '../data/healthAlerts';
import { HealthAlert } from '../types/health';

interface HealthAlertsProps {
  language: string;
}

export const HealthAlerts: React.FC<HealthAlertsProps> = ({ language }) => {
  const [alerts, setAlerts] = useState<HealthAlert[]>(healthAlerts);
  const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'danger'>('all');

  const getTranslatedContent = (alert: HealthAlert) => {
    if (language === 'hindi' && alert.translations.hindi) {
      return alert.translations.hindi;
    }
    if (language === 'odia' && alert.translations.odia) {
      return alert.translations.odia;
    }
    return {
      title: alert.title,
      description: alert.description
    };
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'danger': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'danger': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.severity === filter
  ).sort((a, b) => b.date.getTime() - a.date.getTime());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'hindi' ? 'hi-IN' : language === 'odia' ? 'or-IN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Bell className="w-6 h-6 mr-2 text-red-600" />
          {language === 'hindi' ? 'स्वास्थ्य अलर्ट' :
           language === 'odia' ? 'ସ୍ୱାସ୍ଥ୍ୟ ସତର୍କତା' : 
           'Health Alerts'}
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {language === 'hindi' ? 'सभी' :
             language === 'odia' ? 'ସମସ୍ତ' :
             'All'} ({alerts.length})
          </button>
          <button
            onClick={() => setFilter('danger')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'danger' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            {language === 'hindi' ? 'आपातकाल' :
             language === 'odia' ? 'ଜରୁରୀ' :
             'Critical'} ({alerts.filter(a => a.severity === 'danger').length})
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'warning' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            {language === 'hindi' ? 'चेतावनी' :
             language === 'odia' ? 'ଚେତାବନୀ' :
             'Warning'} ({alerts.filter(a => a.severity === 'warning').length})
          </button>
          <button
            onClick={() => setFilter('info')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'info' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {language === 'hindi' ? 'सूचना' :
             language === 'odia' ? 'ସୂଚନା' :
             'Info'} ({alerts.filter(a => a.severity === 'info').length})
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>
              {language === 'hindi' ? 'कोई अलर्ट नहीं मिला' :
               language === 'odia' ? 'କୌଣସି ସତର୍କତା ମିଳିଲା ନାହିଁ' :
               'No alerts found'}
            </p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const translated = getTranslatedContent(alert);
            return (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)} transition-all hover:shadow-md`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 pr-4">{translated.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        alert.severity === 'danger' ? 'bg-red-200 text-red-800' :
                        alert.severity === 'warning' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                      {translated.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(alert.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500">
                          {language === 'hindi' ? 'स्रोत:' :
                           language === 'odia' ? 'ଉତ୍ସ:' :
                           'Source:'} {alert.source}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">
          {language === 'hindi' ? 'आपातकालीन संपर्क' :
           language === 'odia' ? 'ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ' :
           'Emergency Contacts'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700">
              {language === 'hindi' ? 'राष्ट्रीय आपातकाल:' :
               language === 'odia' ? 'ଜାତୀୟ ଜରୁରୀକାଳୀନ:' :
               'National Emergency:'} <span className="text-red-600 font-bold">108</span>
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">
              {language === 'hindi' ? 'स्वास्थ्य हेल्पलाइन:' :
               language === 'odia' ? 'ସ୍ୱାସ୍ଥ୍ୟ ହେଲ୍ପଲାଇନ:' :
               'Health Helpline:'} <span className="text-blue-600 font-bold">1075</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};