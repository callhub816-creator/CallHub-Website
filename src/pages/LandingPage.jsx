import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Phone, Bot, BarChart3, Users, Zap, Shield, Globe, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/register');
  };

  const handleUploadContacts = () => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "Contact upload will be available after registration. Sign up to get early access!",
    });
  };

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Voicebot",
      description: "Natural conversations with sentiment analysis and intelligent responses"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Multi-Campaign Support",
      description: "Sales, recovery, surveys, reminders - all in one platform"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Track performance, success rates, and campaign insights instantly"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Human Handover",
      description: "Seamlessly transfer complex calls to live agents when needed"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automated Follow-ups",
      description: "WhatsApp and SMS automation for enhanced engagement"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Voice Biometrics",
      description: "Secure authentication and fraud detection capabilities"
    }
  ];

  const useCases = [
    {
      title: "Credit Card Sales",
      description: "Automated outreach for credit card offers with personalized scripts",
      image: "Professional sales representative making calls in modern office"
    },
    {
      title: "Debt Recovery",
      description: "Gentle, compliant recovery calls with payment reminders",
      image: "Customer service agent handling debt recovery calls professionally"
    },
    {
      title: "Customer Surveys",
      description: "Gather feedback and insights through automated survey calls",
      image: "Market research team conducting customer satisfaction surveys"
    }
  ];

  return (
    <>
      <Helmet>
        <title>CallHub.in - AI-Powered Call Automation & Integration Platform</title>
        <meta name="description" content="Transform your business with AI-powered voicebot automation for sales, recovery, surveys, and customer engagement. Upload contacts, create campaigns, and scale your outreach effortlessly." />
      </Helmet>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-6xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              AI-Powered Call Automation
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Transform your business with intelligent voicebot technology. Automate sales calls, debt recovery, surveys, and customer engagement at scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={handleStartTrial}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Start Free Trial
              </Button>
              <Button
                onClick={handleUploadContacts}
                variant="outline"
                size="lg"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Upload Contact File
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16"
            >
              <img 
                className="mx-auto rounded-2xl shadow-2xl max-w-4xl w-full"
                alt="CallHub.in dashboard interface showing campaign management and analytics"
               src="https://images.unsplash.com/photo-1686061592689-312bbfb5c055" />
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to automate and scale your call operations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-purple-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900/10 to-blue-900/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Use Cases
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Proven solutions for various industries and business needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <img 
                    className="w-full h-48 object-cover"
                    alt={`${useCase.title} use case illustration`}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of businesses already using AI-powered call automation to scale their operations and improve customer engagement.
            </p>
            <Button
              onClick={handleStartTrial}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started Today
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;