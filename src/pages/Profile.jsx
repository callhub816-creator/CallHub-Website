import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, User, Mail, Phone, Building, Key, Bell, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [settings, setSettings] = useState({
    language: 'english',
    notifications: true,
    emailUpdates: true,
    smsAlerts: false
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('callhub_current_user') || '{}');
    if (currentUser.id) {
      setProfileData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        company: currentUser.company || ''
      });
    }
  }, []);

  const handleProfileUpdate = () => {
    const currentUser = JSON.parse(localStorage.getItem('callhub_current_user') || '{}');
    const updatedUser = { ...currentUser, ...profileData };
    
    localStorage.setItem('callhub_current_user', JSON.stringify(updatedUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('callhub_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('callhub_users', JSON.stringify(users));
    }
    
    toast({
      title: "Profile Updated! ✅",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSettingsUpdate = () => {
    localStorage.setItem('callhub_settings', JSON.stringify(settings));
    toast({
      title: "Settings Saved! ⚙️",
      description: "Your preferences have been updated.",
    });
  };

  const handleApiKeyGeneration = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Bell className="w-4 h-4" /> },
    { id: 'api', label: 'API Keys', icon: <Key className="w-4 h-4" /> }
  ];

  return (
    <>
      <Helmet>
        <title>Profile - CallHub.in</title>
        <meta name="description" content="Manage your CallHub.in profile, settings, and API configurations." />
      </Helmet>

      <Header />
      
      <main className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Profile & Settings
              </h1>
              <p className="text-gray-300">Manage your account and preferences</p>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex space-x-1 mb-8 bg-slate-800/50 rounded-xl p-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20"
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleProfileUpdate}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Update Profile
                </Button>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Default Language
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={settings.language}
                        onChange={(e) => setSettings({...settings, language: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="hinglish">Hinglish</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Notifications</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                      <div>
                        <h4 className="font-medium text-white">Push Notifications</h4>
                        <p className="text-gray-400 text-sm">Receive notifications about campaign updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications}
                          onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                      <div>
                        <h4 className="font-medium text-white">Email Updates</h4>
                        <p className="text-gray-400 text-sm">Receive campaign reports via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailUpdates}
                          onChange={(e) => setSettings({...settings, emailUpdates: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                      <div>
                        <h4 className="font-medium text-white">SMS Alerts</h4>
                        <p className="text-gray-400 text-sm">Receive urgent alerts via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.smsAlerts}
                          onChange={(e) => setSettings({...settings, smsAlerts: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSettingsUpdate}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Save Settings
                </Button>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">API Configuration</h2>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                  <h3 className="text-blue-400 font-semibold mb-2">API Integration</h3>
                  <p className="text-gray-300 mb-4">
                    Connect external AI voice services and configure API keys for enhanced functionality.
                  </p>
                  <Button
                    onClick={handleApiKeyGeneration}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Generate API Key
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Integration Settings</h3>
                  
                  <div className="grid gap-4">
                    <div className="p-4 bg-slate-700/30 rounded-xl">
                      <h4 className="font-medium text-white mb-2">Voice AI Provider</h4>
                      <select className="w-full px-4 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>Google Dialogflow</option>
                        <option>Azure Speech Services</option>
                        <option>Custom LLM</option>
                      </select>
                    </div>

                    <div className="p-4 bg-slate-700/30 rounded-xl">
                      <h4 className="font-medium text-white mb-2">WhatsApp Integration</h4>
                      <input
                        type="text"
                        placeholder="WhatsApp Business API Key"
                        className="w-full px-4 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-700/30 rounded-xl">
                      <h4 className="font-medium text-white mb-2">SMS Gateway</h4>
                      <input
                        type="text"
                        placeholder="SMS Service API Key"
                        className="w-full px-4 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Profile;