import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
  language: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess, language }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getContent = () => {
    const content = {
      english: {
        login: 'Log In',
        signup: 'Sign Up',
        email: 'Email',
        password: 'Password',
        name: 'Full Name',
        loginButton: 'Log In',
        signupButton: 'Create Account',
        switchToSignup: "Don't have an account? Sign up",
        switchToLogin: 'Already have an account? Log in',
        emailPlaceholder: 'Enter your email',
        passwordPlaceholder: 'Enter your password',
        namePlaceholder: 'Enter your full name',
        loginSuccess: 'Login successful! Welcome back.',
        signupSuccess: 'Account created successfully! Please check your email to verify.',
        loginWith: 'Continue with',
        or: 'or',
        forgotPassword: 'Forgot password?'
      },
      hindi: {
        login: 'लॉग इन',
        signup: 'साइन अप',
        email: 'ईमेल',
        password: 'पासवर्ड',
        name: 'पूरा नाम',
        loginButton: 'लॉग इन करें',
        signupButton: 'खाता बनाएं',
        switchToSignup: 'खाता नहीं है? साइन अप करें',
        switchToLogin: 'पहले से खाता है? लॉग इन करें',
        emailPlaceholder: 'अपना ईमेल दर्ज करें',
        passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
        namePlaceholder: 'अपना पूरा नाम दर्ज करें',
        loginSuccess: 'लॉगिन सफल! वापस स्वागत है।',
        signupSuccess: 'खाता सफलतापूर्वक बनाया गया! कृपया सत्यापन के लिए अपना ईमेल जांचें।',
        loginWith: 'के साथ जारी रखें',
        or: 'या',
        forgotPassword: 'पासवर्ड भूल गए?'
      },
      odia: {
        login: 'ଲଗ ଇନ',
        signup: 'ସାଇନ ଅପ',
        email: 'ଇମେଲ',
        password: 'ପାସୱାର୍ଡ',
        name: 'ପୂର୍ଣ୍ଣ ନାମ',
        loginButton: 'ଲଗ ଇନ କରନ୍ତୁ',
        signupButton: 'ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ',
        switchToSignup: 'ଖାତା ନାହିଁ? ସାଇନ ଅପ କରନ୍ତୁ',
        switchToLogin: 'ପୂର୍ବରୁ ଖାତା ଅଛି? ଲଗ ଇନ କରନ୍ତୁ',
        emailPlaceholder: 'ଆପଣଙ୍କ ଇମେଲ ଲେଖନ୍ତୁ',
        passwordPlaceholder: 'ଆପଣଙ୍କ ପାସୱାର୍ଡ ଲେଖନ୍ତୁ',
        namePlaceholder: 'ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଲେଖନ୍ତୁ',
        loginSuccess: 'ଲଗଇନ ସଫଳ! ପୁନର୍ବାର ସ୍ୱାଗତ।',
        signupSuccess: 'ଖାତା ସଫଳତାର ସହିତ ସୃଷ୍ଟି ହେଲା! ଦୟାକରି ସତ୍ୟାପନ ପାଇଁ ଆପଣଙ୍କ ଇମେଲ ଯାଞ୍ଚ କରନ୍ତୁ।',
        loginWith: 'ସହିତ ଜାରି ରଖନ୍ତୁ',
        or: 'କିମ୍ବା',
        forgotPassword: 'ପାସୱାର୍ଡ ଭୁଲିଗଲେ?'
      }
    };

    return content[language as keyof typeof content] || content.english;
  };

  const content = getContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setSuccess(content.loginSuccess);
        setTimeout(() => {
          onClose();
          onAuthSuccess();
        }, 2000);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });

        if (error) throw error;

        setSuccess(content.signupSuccess);
        setTimeout(() => {
          onClose();
          onAuthSuccess();
        }, 3000);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    setSuccess('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? content.login : content.signup}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.name}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={content.namePlaceholder}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.emailPlaceholder}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={content.passwordPlaceholder}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {content.forgotPassword}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? content.loginButton : content.signupButton}
                </div>
              ) : (
                isLogin ? content.loginButton : content.signupButton
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={switchMode}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              {isLogin ? content.switchToSignup : content.switchToLogin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};