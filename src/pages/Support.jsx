import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, MessageCircle, Book, HelpCircle, Send, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Support = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('faq');
  const [chatMessage, setChatMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    toast({
      title: "Message Sent! 💬",
      description: "Our support team will respond within 24 hours.",
    });
    setChatMessage('');
  };

  const faqs = [
    {
      question: "How do I create my first campaign?",
      answer: "Navigate to the Dashboard and click 'Create Campaign'. Follow the step-by-step wizard to set up your campaign type, upload contacts, configure your script, and launch."
    },
    {
      question: "What file formats are supported for contact upload?",
      answer: "CallHub supports Excel (.xlsx, .xls), CSV (.csv), TXT (.txt), and JSON (.json) formats. The system automatically detects and parses your contact data."
    },
    {
      question: "How does the AI voicebot work?",
      answer: "Our AI voicebot uses advanced natural language processing to conduct conversations. It can handle multiple languages, detect sentiment, and seamlessly transfer calls to human agents when needed."
    },
    {
      question: "Can I customize the call scripts?",
      answer: "Yes! You can either use our AI-generated scripts based on your campaign type or create completely custom scripts. Use {name} and other variables for personalization."
    },
    {
      question: "What analytics are available?",
      answer: "View comprehensive analytics including call volume, success rates, campaign performance, call duration, and detailed reports. Export data in PDF or Excel formats."
    },
    {
      question: "How do I set up WhatsApp integration?",
      answer: "Go to Profile > API Configuration and enter your WhatsApp Business API key. This enables automated follow-up messages after calls."
    }
  ];

  const tutorials = [
    {
      title: "Getting Started with CallHub",
      description: "Complete guide to setting up your account and creating your first campaign",
      duration: "5 min read"
    },
    {
      title: "Advanced Script Customization",
      description: "Learn how to create dynamic, personalized call scripts for better engagement",
      duration: "8 min read"
    },
    {
      title: "Analytics and Reporting",
      description: "Understanding your campaign metrics and optimizing performance",
      duration: "6 min read"
    },
    {
      title: "Integration Best Practices",
      description: "How to integrate with CRM systems and external APIs effectively",
      duration: "10 min read"
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'tutorials', label: 'Tutorials', icon: <Book className="w-4 h-4" /> },
    { id: 'chat', label: 'Live Chat', icon: <MessageCircle className="w-4 h-4" /> }
  ];

  return (
    <>
      <Helmet>
        <title>Support - CallHub.in</title>
        <meta name="description" content="Get help with CallHub.in. Find answers in our FAQ, browse tutorials, or chat with our support team." />
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
                Support Center
              </h1>
              <p className="text-gray-300">Get help and learn how to use CallHub effectively</p>
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
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search FAQs..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30"
                    >
                      <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8">
                    <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No results found</h3>
                    <p className="text-gray-400">Try different search terms or browse all FAQs</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tutorials' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Tutorials & Guides</h2>
                
                <div className="grid gap-6">
                  {tutorials.map((tutorial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30 hover:border-purple-400/40 transition-all duration-300 cursor-pointer"
                      onClick={() => toast({
                        title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                      })}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{tutorial.title}</h3>
                          <p className="text-gray-300 mb-3">{tutorial.description}</p>
                          <span className="text-purple-400 text-sm font-medium">{tutorial.duration}</span>
                        </div>
                        <Book className="w-6 h-6 text-purple-400 ml-4" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                  <h3 className="text-blue-400 font-semibold mb-2">Need More Help?</h3>
                  <p className="text-gray-300 mb-4">
                    Can't find what you're looking for? Our comprehensive documentation covers advanced topics and integration guides.
                  </p>
                  <Button
                    onClick={() => toast({
                      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    View Documentation
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Live Chat Support</h2>
                
                <div className="bg-slate-700/30 rounded-xl p-6 h-96 flex flex-col">
                  <div className="flex-1 mb-4 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-purple-600/20 rounded-lg p-3 max-w-xs">
                          <p className="text-white text-sm">
                            Hello! I'm here to help you with CallHub. What can I assist you with today?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <h3 className="text-green-400 font-semibold mb-2">Quick Response</h3>
                    <p className="text-gray-300 text-sm">
                      Our support team typically responds within 2-4 hours during business hours.
                    </p>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <h3 className="text-blue-400 font-semibold mb-2">24/7 Availability</h3>
                    <p className="text-gray-300 text-sm">
                      Chat support is available around the clock for urgent issues and technical problems.
                    </p>
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

export default Support;