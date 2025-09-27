import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Play, Save, FileText, Phone, MessageSquare, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';

const CampaignBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    type: '',
    language: 'english',
    tone: 'professional',
    script: '',
    contacts: [],
    schedule: 'immediate'
  });

  const campaignTypes = [
    {
      id: 'sales',
      title: 'Sales Calls',
      description: 'Promote products and services to potential customers',
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      id: 'recovery',
      title: 'Debt Recovery',
      description: 'Gentle reminders for payment collection',
      icon: <AlertCircle className="w-6 h-6" />
    },
    {
      id: 'survey',
      title: 'Customer Survey',
      description: 'Gather feedback and insights from customers',
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      id: 'reminder',
      title: 'Appointment Reminders',
      description: 'Automated reminders for appointments and events',
      icon: <Phone className="w-6 h-6" />
    }
  ];

  const languages = [
    { id: 'english', name: 'English' },
    { id: 'hindi', name: 'Hindi' },
    { id: 'hinglish', name: 'Hinglish' }
  ];

  const tones = [
    { id: 'professional', name: 'Professional' },
    { id: 'friendly', name: 'Friendly' },
    { id: 'casual', name: 'Casual' },
    { id: 'urgent', name: 'Urgent' }
  ];

  const handleInputChange = (field, value) => {
    setCampaignData({
      ...campaignData,
      [field]: value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate file parsing
      const mockContacts = [
        { name: 'John Doe', phone: '+1234567890', email: 'john@example.com' },
        { name: 'Jane Smith', phone: '+1234567891', email: 'jane@example.com' },
        { name: 'Bob Johnson', phone: '+1234567892', email: 'bob@example.com' }
      ];
      
      setCampaignData({
        ...campaignData,
        contacts: mockContacts
      });
      
      toast({
        title: "File Uploaded Successfully! 📁",
        description: `Parsed ${mockContacts.length} contacts from ${file.name}`,
      });
    }
  };

  const generateScript = () => {
    const scripts = {
      sales: `Hello {name}, this is an automated call from CallHub. We have an exciting offer on our premium services that might interest you. Would you like to hear more about our special discount?`,
      recovery: `Hello {name}, this is a friendly reminder about your pending payment. We understand that sometimes things can be overlooked. Could we discuss a convenient payment arrangement?`,
      survey: `Hello {name}, we value your opinion! We're conducting a brief survey to improve our services. Would you have 2 minutes to share your feedback with us?`,
      reminder: `Hello {name}, this is a reminder about your upcoming appointment scheduled for tomorrow. Please confirm your attendance or let us know if you need to reschedule.`
    };
    
    const script = scripts[campaignData.type] || 'Hello {name}, thank you for your time.';
    handleInputChange('script', script);
    
    toast({
      title: "Script Generated! ✨",
      description: "AI-powered script has been created based on your campaign type.",
    });
  };

  const saveCampaign = () => {
    if (!campaignData.name || !campaignData.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in campaign name and type before saving.",
        variant: "destructive"
      });
      return;
    }

    const campaigns = JSON.parse(localStorage.getItem('callhub_campaigns') || '[]');
    const newCampaign = {
      ...campaignData,
      id: Date.now(),
      status: 'draft',
      createdAt: new Date().toISOString(),
      contacts: campaignData.contacts.length,
      callsMade: 0,
      successful: 0
    };
    
    campaigns.push(newCampaign);
    localStorage.setItem('callhub_campaigns', JSON.stringify(campaigns));
    
    toast({
      title: "Campaign Saved! 💾",
      description: "Your campaign has been saved as a draft.",
    });
  };

  const startCampaign = () => {
    if (!campaignData.name || !campaignData.type || campaignData.contacts.length === 0) {
      toast({
        title: "Campaign Incomplete",
        description: "Please complete all steps before starting the campaign.",
        variant: "destructive"
      });
      return;
    }

    const campaigns = JSON.parse(localStorage.getItem('callhub_campaigns') || '[]');
    const newCampaign = {
      ...campaignData,
      id: Date.now(),
      status: 'active',
      createdAt: new Date().toISOString(),
      contacts: campaignData.contacts.length,
      callsMade: Math.floor(Math.random() * campaignData.contacts.length),
      successful: Math.floor(Math.random() * (campaignData.contacts.length / 2))
    };
    
    campaigns.push(newCampaign);
    localStorage.setItem('callhub_campaigns', JSON.stringify(campaigns));
    
    toast({
      title: "Campaign Started! 🚀",
      description: "Your AI voicebot campaign is now running.",
    });
    
    navigate('/dashboard');
  };

  const steps = [
    { number: 1, title: 'Campaign Details', description: 'Basic information and type' },
    { number: 2, title: 'Upload Contacts', description: 'Add your contact list' },
    { number: 3, title: 'Configure Script', description: 'Customize your message' },
    { number: 4, title: 'Review & Launch', description: 'Final review and start' }
  ];

  return (
    <>
      <Helmet>
        <title>Campaign Builder - CallHub.in</title>
        <meta name="description" content="Create and configure AI-powered call campaigns with our intuitive campaign builder." />
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
                Campaign Builder
              </h1>
              <p className="text-gray-300">Create your AI-powered call campaign</p>
            </div>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'border-gray-600 text-gray-400'
                  }`}>
                    {step.number}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-purple-600' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20"
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Campaign Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    value={campaignData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter campaign name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Campaign Type
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {campaignTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => handleInputChange('type', type.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          campaignData.type === type.id
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-slate-600 hover:border-purple-400'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-purple-400">
                            {type.icon}
                          </div>
                          <h3 className="font-semibold text-white">{type.title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm">{type.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={campaignData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {languages.map((lang) => (
                        <option key={lang.id} value={lang.id}>{lang.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tone
                    </label>
                    <select
                      value={campaignData.tone}
                      onChange={(e) => handleInputChange('tone', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {tones.map((tone) => (
                        <option key={tone.id} value={tone.id}>{tone.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Upload Contacts</h2>
                
                <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Upload Contact File</h3>
                  <p className="text-gray-400 mb-4">
                    Support for Excel, CSV, TXT, and JSON formats
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".xlsx,.xls,.csv,.txt,.json"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Choose File
                    </Button>
                  </label>
                </div>

                {campaignData.contacts.length > 0 && (
                  <div className="bg-slate-700/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Contacts Preview ({campaignData.contacts.length} contacts)
                    </h3>
                    <div className="space-y-2">
                      {campaignData.contacts.slice(0, 3).map((contact, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-slate-600/30 rounded-lg">
                          <span className="text-white font-medium">{contact.name}</span>
                          <span className="text-gray-400">{contact.phone}</span>
                          <span className="text-gray-400">{contact.email}</span>
                        </div>
                      ))}
                      {campaignData.contacts.length > 3 && (
                        <p className="text-gray-400 text-sm">
                          And {campaignData.contacts.length - 3} more contacts...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Configure Script</h2>
                  <Button
                    onClick={generateScript}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Generate AI Script
                  </Button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Call Script
                  </label>
                  <textarea
                    value={campaignData.script}
                    onChange={(e) => handleInputChange('script', e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your call script here. Use {name} for personalization."
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Use {'{name}'} to personalize calls with contact names
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <h3 className="text-blue-400 font-semibold mb-2">Script Tips:</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Keep it conversational and natural</li>
                    <li>• Include clear call-to-action</li>
                    <li>• Use personalization variables</li>
                    <li>• Consider tone and language settings</li>
                  </ul>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Review & Launch</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <h3 className="font-semibold text-white mb-2">Campaign Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Name:</span>
                          <span className="text-white">{campaignData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span className="text-white capitalize">{campaignData.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Language:</span>
                          <span className="text-white capitalize">{campaignData.language}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tone:</span>
                          <span className="text-white capitalize">{campaignData.tone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <h3 className="font-semibold text-white mb-2">Contacts</h3>
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Contacts:</span>
                          <span className="text-white">{campaignData.contacts.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <h3 className="font-semibold text-white mb-2">Script Preview</h3>
                    <div className="text-sm text-gray-300 bg-slate-800/50 rounded-lg p-3 max-h-32 overflow-y-auto">
                      {campaignData.script || 'No script configured'}
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                  <h3 className="text-green-400 font-semibold mb-2">Ready to Launch!</h3>
                  <p className="text-gray-300 text-sm">
                    Your campaign is configured and ready to start. The AI voicebot will begin calling your contacts immediately.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-600">
              <Button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                variant="outline"
                className="border-slate-600 text-gray-400 hover:bg-slate-700"
              >
                Previous
              </Button>

              <div className="flex gap-3">
                <Button
                  onClick={saveCampaign}
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={startCampaign}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Campaign
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default CampaignBuilder;