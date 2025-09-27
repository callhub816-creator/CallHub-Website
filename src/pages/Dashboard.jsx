import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Upload, BarChart3, Phone, Users, Clock, TrendingUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Dashboard = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({
    totalCalls: 0,
    activeCampaigns: 0,
    successRate: 0,
    totalContacts: 0
  });

  useEffect(() => {
    // Load data from localStorage
    const savedCampaigns = JSON.parse(localStorage.getItem('callhub_campaigns') || '[]');
    setCampaigns(savedCampaigns);
    
    // Calculate stats
    const totalCalls = savedCampaigns.reduce((sum, campaign) => sum + (campaign.callsMade || 0), 0);
    const activeCampaigns = savedCampaigns.filter(campaign => campaign.status === 'active').length;
    const totalContacts = savedCampaigns.reduce((sum, campaign) => sum + (campaign.contacts || 0), 0);
    const successRate = totalCalls > 0 ? Math.round((savedCampaigns.reduce((sum, campaign) => sum + (campaign.successful || 0), 0) / totalCalls) * 100) : 0;
    
    setStats({ totalCalls, activeCampaigns, successRate, totalContacts });
  }, []);

  const handleCreateCampaign = () => {
    navigate('/campaigns/new');
  };

  const handleUploadContacts = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleViewAnalytics = () => {
    navigate('/analytics');
  };

  const statCards = [
    {
      title: "Total Calls Made",
      value: stats.totalCalls.toLocaleString(),
      icon: <Phone className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns,
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Total Contacts",
      value: stats.totalContacts.toLocaleString(),
      icon: <Users className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - CallHub.in</title>
        <meta name="description" content="Manage your AI-powered call campaigns, view analytics, and track performance from your CallHub.in dashboard." />
      </Helmet>

      <Header />
      
      <main className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-300 text-lg">
              Manage your campaigns and track performance
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            <Button
              onClick={handleCreateCampaign}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-6 h-auto flex flex-col items-center gap-2 rounded-xl"
            >
              <Plus className="w-8 h-8" />
              <span className="text-lg font-semibold">Create Campaign</span>
            </Button>
            
            <Button
              onClick={handleUploadContacts}
              variant="outline"
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white p-6 h-auto flex flex-col items-center gap-2 rounded-xl"
            >
              <Upload className="w-8 h-8" />
              <span className="text-lg font-semibold">Upload Contacts</span>
            </Button>
            
            <Button
              onClick={handleViewAnalytics}
              variant="outline"
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white p-6 h-auto flex flex-col items-center gap-2 rounded-xl"
            >
              <BarChart3 className="w-8 h-8" />
              <span className="text-lg font-semibold">View Analytics</span>
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {statCards.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400">{stat.title}</p>
              </div>
            ))}
          </motion.div>

          {/* Recent Campaigns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Campaigns</h2>
              <Button
                onClick={handleCreateCampaign}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>

            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No campaigns yet</h3>
                <p className="text-gray-400 mb-6">Create your first campaign to get started with AI-powered calling</p>
                <Button
                  onClick={handleCreateCampaign}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Create Your First Campaign
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.slice(0, 5).map((campaign, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30"
                  >
                    <div>
                      <h3 className="font-semibold text-white">{campaign.name}</h3>
                      <p className="text-gray-400 text-sm">{campaign.type} • {campaign.contacts} contacts</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          campaign.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;