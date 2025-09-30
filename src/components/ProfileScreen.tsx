import React, { useState, useEffect } from 'react';
import { User, Edit3, Save, X, ArrowLeft, Heart, Shield, AlertTriangle, Phone, MapPin, Droplets, Calendar, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { HealthAlerts } from './HealthAlerts';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  blood_group?: string;
  is_diabetic?: boolean;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  age?: number;
  emergency_contact?: string;
  allergies?: string[];
  chronic_conditions?: string[];
  created_at: string;
}

interface VaccineRecord {
  id: string;
  vaccine_name: string;
  date_administered: string;
  next_due_date?: string;
  status: 'completed' | 'upcoming' | 'overdue';
}

interface ProfileScreenProps {
  language: string;
  onBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ language, onBack }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'vaccination' | 'alerts'>('dashboard');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [vaccines, setVaccines] = useState<VaccineRecord[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});

  const getContent = () => {
    const content = {
      english: {
        profile: 'Profile',
        dashboard: 'Dashboard',
        vaccination: 'Vaccination',
        alerts: 'Outbreak Alerts',
        personalInfo: 'Personal Information',
        healthInfo: 'Health Information',
        edit: 'Edit Profile',
        save: 'Save Changes',
        cancel: 'Cancel',
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone Number',
        age: 'Age',
        gender: 'Gender',
        address: 'Address',
        bloodGroup: 'Blood Group',
        diabetic: 'Are you diabetic?',
        emergencyContact: 'Emergency Contact',
        allergies: 'Allergies',
        chronicConditions: 'Chronic Conditions',
        male: 'Male',
        female: 'Female',
        other: 'Other',
        yes: 'Yes',
        no: 'No',
        vaccineHistory: 'Vaccination History',
        upcomingVaccines: 'Upcoming Vaccinations',
        addVaccine: 'Add Vaccine Record',
        noVaccines: 'No vaccination records found',
        completed: 'Completed',
        upcoming: 'Upcoming',
        overdue: 'Overdue'
      },
      hindi: {
        profile: 'प्रोफाइल',
        dashboard: 'डैशबोर्ड',
        vaccination: 'टीकाकरण',
        alerts: 'प्रकोप अलर्ट',
        personalInfo: 'व्यक्तिगत जानकारी',
        healthInfo: 'स्वास्थ्य जानकारी',
        edit: 'प्रोफाइल संपादित करें',
        save: 'परिवर्तन सहेजें',
        cancel: 'रद्द करें',
        fullName: 'पूरा नाम',
        email: 'ईमेल',
        phone: 'फोन नंबर',
        age: 'उम्र',
        gender: 'लिंग',
        address: 'पता',
        bloodGroup: 'रक्त समूह',
        diabetic: 'क्या आप मधुमेह रोगी हैं?',
        emergencyContact: 'आपातकालीन संपर्क',
        allergies: 'एलर्जी',
        chronicConditions: 'पुरानी बीमारियां',
        male: 'पुरुष',
        female: 'महिला',
        other: 'अन्य',
        yes: 'हां',
        no: 'नहीं',
        vaccineHistory: 'टीकाकरण इतिहास',
        upcomingVaccines: 'आगामी टीकाकरण',
        addVaccine: 'टीका रिकॉर्ड जोड़ें',
        noVaccines: 'कोई टीकाकरण रिकॉर्ड नहीं मिला',
        completed: 'पूर्ण',
        upcoming: 'आगामी',
        overdue: 'देर से'
      },
      odia: {
        profile: 'ପ୍ରୋଫାଇଲ',
        dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
        vaccination: 'ଟିକାକରଣ',
        alerts: 'ପ୍ରକୋପ ସତର୍କତା',
        personalInfo: 'ବ୍ୟକ୍ତିଗତ ସୂଚନା',
        healthInfo: 'ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା',
        edit: 'ପ୍ରୋଫାଇଲ ସମ୍ପାଦନା କରନ୍ତୁ',
        save: 'ପରିବର୍ତ୍ତନ ସଞ୍ଚୟ କରନ୍ତୁ',
        cancel: 'ବାତିଲ କରନ୍ତୁ',
        fullName: 'ପୂର୍ଣ୍ଣ ନାମ',
        email: 'ଇମେଲ',
        phone: 'ଫୋନ ନମ୍ବର',
        age: 'ବୟସ',
        gender: 'ଲିଙ୍ଗ',
        address: 'ଠିକଣା',
        bloodGroup: 'ରକ୍ତ ଗୋଷ୍ଠୀ',
        diabetic: 'ଆପଣ ମଧୁମେହ ରୋଗୀ କି?',
        emergencyContact: 'ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ',
        allergies: 'ଆଲର୍ଜି',
        chronicConditions: 'ଦୀର୍ଘସ୍ଥାୟୀ ରୋଗ',
        male: 'ପୁରୁଷ',
        female: 'ମହିଳା',
        other: 'ଅନ୍ୟ',
        yes: 'ହଁ',
        no: 'ନା',
        vaccineHistory: 'ଟିକାକରଣ ଇତିହାସ',
        upcomingVaccines: 'ଆଗାମୀ ଟିକାକରଣ',
        addVaccine: 'ଟିକା ରେକର୍ଡ ଯୋଗ କରନ୍ତୁ',
        noVaccines: 'କୌଣସି ଟିକାକରଣ ରେକର୍ଡ ମିଳିଲା ନାହିଁ',
        completed: 'ସମ୍ପୂର୍ଣ୍ଣ',
        upcoming: 'ଆଗାମୀ',
        overdue: 'ବିଳମ୍ବିତ'
      }
    };

    return content[language as keyof typeof content] || content.english;
  };

  const content = getContent();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchVaccines();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
        setEditForm(data);
      } else {
        // Create initial profile
        const newProfile = {
          id: user?.id,
          email: user?.email,
          full_name: user?.user_metadata?.full_name || '',
          created_at: new Date().toISOString()
        };
        setProfile(newProfile as UserProfile);
        setEditForm(newProfile);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVaccines = async () => {
    try {
      const { data, error } = await supabase
        .from('vaccine_records')
        .select('*')
        .eq('user_id', user?.id)
        .order('date_administered', { ascending: false });

      if (error) {
        console.error('Error fetching vaccines:', error);
        return;
      }

      setVaccines(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          ...editForm,
          id: user?.id,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving profile:', error);
        return;
      }

      setProfile(editForm as UserProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back</span>
            </button>
            
            <h1 className="text-2xl font-bold text-gray-900">{content.profile}</h1>
            
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {content.edit}
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : content.save}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm(profile || {});
                    }}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {content.cancel}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-5 h-5 mr-2" />
            {content.dashboard}
          </button>
          <button
            onClick={() => setActiveTab('vaccination')}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'vaccination'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Shield className="w-5 h-5 mr-2" />
            {content.vaccination}
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'alerts'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            {content.alerts}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                {content.personalInfo}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {content.fullName}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.full_name || ''}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profile?.full_name || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {content.email}
                  </label>
                  <p className="text-gray-900">{profile?.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {content.phone}
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profile?.phone || 'Not provided'}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {content.age}
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.age || ''}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{profile?.age || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {content.gender}
                    </label>
                    {isEditing ? (
                      <select
                        value={editForm.gender || ''}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="male">{content.male}</option>
                        <option value="female">{content.female}</option>
                        <option value="other">{content.other}</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">
                        {profile?.gender ? content[profile.gender as keyof typeof content] : 'Not provided'}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {content.address}
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editForm.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profile?.address || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-600" />
                {content.healthInfo}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {content.bloodGroup}
                  </label>
                  {isEditing ? (
                    <select
                      value={editForm.blood_group || ''}
                      onChange={(e) => handleInputChange('blood_group', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{profile?.blood_group || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {content.diabetic}
                  </label>
                  {isEditing ? (
                    <select
                      value={editForm.is_diabetic === null ? '' : editForm.is_diabetic ? 'yes' : 'no'}
                      onChange={(e) => handleInputChange('is_diabetic', e.target.value === 'yes')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="yes">{content.yes}</option>
                      <option value="no">{content.no}</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">
                      {profile?.is_diabetic === null ? 'Not provided' : 
                       profile?.is_diabetic ? content.yes : content.no}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {content.emergencyContact}
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.emergency_contact || ''}
                      onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profile?.emergency_contact || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {content.allergies}
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editForm.allergies?.join(', ') || ''}
                      onChange={(e) => handleInputChange('allergies', e.target.value.split(', ').filter(Boolean))}
                      placeholder="Separate with commas"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profile?.allergies?.join(', ') || 'None'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {content.chronicConditions}
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editForm.chronic_conditions?.join(', ') || ''}
                      onChange={(e) => handleInputChange('chronic_conditions', e.target.value.split(', ').filter(Boolean))}
                      placeholder="Separate with commas"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{profile?.chronic_conditions?.join(', ') || 'None'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vaccination' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                {content.vaccineHistory}
              </h2>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                {content.addVaccine}
              </button>
            </div>

            {vaccines.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">{content.noVaccines}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {vaccines.map((vaccine) => (
                  <div key={vaccine.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{vaccine.vaccine_name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vaccine.status)}`}>
                        {content[vaccine.status as keyof typeof content]}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Administered: {new Date(vaccine.date_administered).toLocaleDateString()}</span>
                      </div>
                      {vaccine.next_due_date && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Next Due: {new Date(vaccine.next_due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'alerts' && (
          <HealthAlerts language={language} />
        )}
      </div>
    </div>
  );
};