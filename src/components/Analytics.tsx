import React from 'react';
import { BarChart3, Users, MessageCircle, TrendingUp, Calendar, MapPin, Activity } from 'lucide-react';

interface AnalyticsProps {
  language: string;
}

export const Analytics: React.FC<AnalyticsProps> = ({ language }) => {
  // Mock analytics data
  const stats = {
    totalUsers: 12456,
    totalQueries: 45678,
    activeUsers: 3421,
    averageResponseTime: '1.2s',
    topQueries: [
      { query: language === 'hindi' ? 'मलेरिया के लक्षण' : language === 'odia' ? 'ମ୍ୟାଲେରିଆ ଲକ୍ଷଣ' : 'Malaria symptoms', count: 1234 },
      { query: language === 'hindi' ? 'COVID वैक्सीन' : language === 'odia' ? 'କୋଭିଡ ଟିକା' : 'COVID vaccine', count: 987 },
      { query: language === 'hindi' ? 'डेंगू बुखार' : language === 'odia' ? 'ଡେଙ୍ଗୁ ଜ୍ୱର' : 'Dengue fever', count: 756 },
      { query: language === 'hindi' ? 'बच्चों का टीकाकरण' : language === 'odia' ? 'ପିଲାମାନଙ୍କ ଟିକାକରଣ' : 'Child vaccination', count: 654 }
    ],
    locationStats: [
      { location: 'Bhubaneswar', users: 2456, color: 'bg-blue-500' },
      { location: 'Cuttack', users: 1876, color: 'bg-green-500' },
      { location: 'Berhampur', users: 1234, color: 'bg-yellow-500' },
      { location: 'Rourkela', users: 987, color: 'bg-purple-500' },
      { location: 'Sambalpur', users: 756, color: 'bg-pink-500' }
    ],
    monthlyTrends: [
      { month: 'Jan', queries: 3200 },
      { month: 'Feb', queries: 3800 },
      { month: 'Mar', queries: 4200 },
      { month: 'Apr', queries: 3900 },
      { month: 'May', queries: 4500 },
      { month: 'Jun', queries: 5200 }
    ]
  };

  const getLabel = (key: string) => {
    const labels = {
      totalUsers: {
        english: 'Total Users',
        hindi: 'कुल उपयोगकर्ता',
        odia: 'ସମୁଦାୟ ବ୍ୟବହାରକାରୀ'
      },
      totalQueries: {
        english: 'Total Queries',
        hindi: 'कुल प्रश्न',
        odia: 'ସମୁଦାୟ ପ୍ରଶ୍ନ'
      },
      activeUsers: {
        english: 'Active Users',
        hindi: 'सक्रिय उपयोगकर्ता',
        odia: 'ସକ୍ରିୟ ବ୍ୟବହାରକାରୀ'
      },
      averageResponseTime: {
        english: 'Avg Response Time',
        hindi: 'औसत प्रतिक्रिया समय',
        odia: 'ହାରାହାରି ପ୍ରତିକ୍ରିୟା ସମୟ'
      }
    };
    
    return labels[key as keyof typeof labels]?.[language as keyof typeof labels.totalUsers] || labels[key as keyof typeof labels]?.english;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
          {language === 'hindi' ? 'एनालिटिक्स डैशबोर्ड' :
           language === 'odia' ? 'ଆନାଲିଟିକ୍ସ ଡ୍ୟାସବୋର୍ଡ' : 
           'Analytics Dashboard'}
        </h2>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">{getLabel('totalUsers')}</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-blue-600 text-xs mt-2">↗ 12% from last month</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">{getLabel('totalQueries')}</p>
                <p className="text-2xl font-bold text-green-900">{stats.totalQueries.toLocaleString()}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-green-600 text-xs mt-2">↗ 8% from last month</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">{getLabel('activeUsers')}</p>
                <p className="text-2xl font-bold text-purple-900">{stats.activeUsers.toLocaleString()}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-purple-600 text-xs mt-2">↗ 15% from last month</p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">{getLabel('averageResponseTime')}</p>
                <p className="text-2xl font-bold text-orange-900">{stats.averageResponseTime}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-orange-600 text-xs mt-2">↓ 5% faster</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Queries */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'hindi' ? 'सबसे लोकप्रिय प्रश्न' :
               language === 'odia' ? 'ସବୁଠାରୁ ଲୋକପ୍ରିୟ ପ୍ରଶ୍ନ' :
               'Most Popular Queries'}
            </h3>
            <div className="space-y-4">
              {stats.topQueries.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 truncate">{item.query}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(item.count / stats.topQueries[0].count) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 ml-4">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Stats */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              {language === 'hindi' ? 'स्थान के अनुसार उपयोगकर्ता' :
               language === 'odia' ? 'ସ୍ଥାନ ଅନୁସାରେ ବ୍ୟବହାରକାରୀ' :
               'Users by Location'}
            </h3>
            <div className="space-y-3">
              {stats.locationStats.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${location.color} mr-3`}></div>
                    <span className="text-sm text-gray-700">{location.location}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{location.users}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="mt-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            {language === 'hindi' ? 'मासिक ट्रेंड' :
             language === 'odia' ? 'ମାସିକ ଧାରା' :
             'Monthly Trends'}
          </h3>
          <div className="flex items-end justify-between h-48 space-x-2">
            {stats.monthlyTrends.map((month, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="bg-blue-500 rounded-t w-full transition-all hover:bg-blue-600"
                  style={{
                    height: `${(month.queries / Math.max(...stats.monthlyTrends.map(m => m.queries))) * 160}px`,
                    minHeight: '20px'
                  }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{month.month}</span>
                <span className="text-xs text-gray-500">{month.queries}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};