import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import CampaignBuilder from '@/pages/CampaignBuilder';
import Analytics from '@/pages/Analytics';
import Profile from '@/pages/Profile';
import Support from '@/pages/Support';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <Helmet>
          <title>CallHub.in - AI-Powered Call Automation & Integration Platform</title>
          <meta name="description" content="Transform your business with AI-powered voicebot automation for sales, recovery, surveys, and customer engagement. Upload contacts, create campaigns, and scale your outreach effortlessly." />
          <meta name="keywords" content="AI voicebot, call automation, sales calls, debt recovery, customer surveys, call center automation, voice AI, business automation" />
          <meta property="og:title" content="CallHub.in - AI-Powered Call Automation Platform" />
          <meta property="og:description" content="Automate your calls with AI voicebot technology. Perfect for sales, recovery, surveys, and customer engagement." />
          <meta property="og:type" content="website" />
          <link rel="canonical" href="https://callhub.in" />
        </Helmet>
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campaigns/new" element={<CampaignBuilder />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
        </Routes>
        
        <Toaster />
      </div>
    </Router>
  );
}

export default App;