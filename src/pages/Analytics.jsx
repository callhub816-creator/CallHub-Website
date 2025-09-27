import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Download, TrendingUp, Phone, Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Analytics = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    const savedCampaigns = JSON.parse(localStorage.getItem('callhub_campaigns') || '[]');
    setCampaigns(savedCampaigns);
  }, []);

  const calculateStats = () => {
    const filteredCampaigns = selectedCampaign === 'all' 
      ? campaigns 
      : campaigns.filter(c => c.id.toString() === selectedCampaign);

    const totalCalls = filteredCampaigns.reduce((sum, campaign) => sum + (campaign.callsMade || 0), 0);
    const successfulCalls = filteredCampaigns.reduce((sum, campaign) => sum + (campaign.successful || 0), 0);
    const totalContacts = filteredCampaigns.reduce((sum, campaign) => sum + (campaign.contacts || 0), 0);
    const activeCampaigns = filteredCampaigns.filter(c => c.status === 'active').length;
    const successRate = totalCalls > 0 ? Math.round((successfulCalls / totalCalls) * 100) : 0;
    const avgCallDuration = '2:34'; // Mock data

    return {
      totalCalls,
      successfulCalls,
      totalContacts,
      activeCampaigns,
      successRate,
      avgCallDuration
    };
  };

  const stats = calculateStats();

  const handleExportReport = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const statCards = [
    {
      title: "Total Calls",
      value: stats.totalCalls.toLocaleString(),
      icon: <Phone className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      change: "+12%"
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      change: "+5%"
    },
    {
      title: "Total Contacts",
      value: stats.totalContacts.toLocaleString(),
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      change: "+8%"
    },
    {
      title: "Avg Call Duration",
      value: stats.avgCallDuration,
      icon: <Clock className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      change: "-2%"
    }
  ];

  const campaignPerformance = campaigns.map(campaign => ({
    name: campaign.name,
    type: campaign.type,
    calls: campaign.callsMade || 0,
    success: campaign.successful || 0,
    rate: campaign.callsMade > 0 ? Math.round((campaign.successful / campaign.callsMade) * 100) : 0,
    status: campaign.status
  }));

  return (
    <>
      <Helmet>
        <title>Analytics - CallHub.in</title>
        <meta name="description" content="View detailed analytics and performance metrics for your AI-powered call campaigns." />
      </Helmet>

      <Header />
      
      <main className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-4">
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
                  Analytics
                </h1>
                <p className="text-gray-300">Campaign performance and insights</p>
              </div>
            </div>

            <Button
              onClick={handleExportReport}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign
              </label>
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Campaigns</option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id.toString()}>
                    {campaign.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Time Range
              </label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="1d">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
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
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400">{stat.title}</p>
              </div>
            ))}
          </motion.div>

          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid lg:grid-cols-2 gap-8 mb-8"
          >
            {/* Call Volume Chart */}
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
              <h2 className="text-xl font-bold text-white mb-6">Call Volume Trend</h2>
              <div className="h-64 flex items-end justify-between gap-2">
                {[65, 45, 78, 52, 89, 67, 94].map((height, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-gradient-to-t from-purple-600 to-blue-500 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-400 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Rate Chart */}
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
              <h2 className="text-xl font-bold text-white mb-6">Success Rate by Campaign Type</h2>
              <div className="space-y-4">
                {[
                  { type: 'Sales', rate: 78, color: 'bg-blue-500' },
                  { type: 'Recovery', rate: 65, color: 'bg-green-500' },
                  { type: 'Survey', rate: 89, color: 'bg-purple-500' },
                  { type: 'Reminder', rate: 92, color: 'bg-orange-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-gray-300 w-20">{item.type}</span>
                    <div className="flex-1 bg-slate-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${item.color}`}
                        style={{ width: `${item.rate}%` }}
                      />
                    </div>
                    <span className="text-white font-medium w-12">{item.rate}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Campaign Performance Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20"
          >
            <h2 className="text-xl font-bold text-white mb-6">Campaign Performance</h2>
            
            {campaignPerformance.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No campaign data</h3>
                <p className="text-gray-400">Create and run campaigns to see performance analytics</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Campaign</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Calls Made</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Successful</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Success Rate</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignPerformance.map((campaign, index) => (
                      <tr key={index} className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-white font-medium">{campaign.name}</td>
                        <td className="py-3 px-4 text-gray-300 capitalize">{campaign.type}</td>
                        <td className="py-3 px-4 text-gray-300">{campaign.calls}</td>
                        <td className="py-3 px-4 text-gray-300">{campaign.success}</td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${
                            campaign.rate >= 70 ? 'text-green-400' :
                            campaign.rate >= 50 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {campaign.rate}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'active' ? 'bg-green-500/20 text-green-400' :
                            campaign.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {campaign.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Analytics;