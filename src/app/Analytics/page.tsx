"use client";
import React, { useState } from 'react';
import { BarChart, Calendar, Download, Filter, TrendingUp, TrendingDown, Activity, Zap } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('production');

  // Mock historical data
  const monthlyData = [
    { month: 'Jan', solar: 1200, wind: 980, target: 1100 },
    { month: 'Feb', solar: 1350, wind: 1100, target: 1200 },
    { month: 'Mar', solar: 1580, wind: 1250, target: 1400 },
    { month: 'Apr', solar: 1720, wind: 1380, target: 1550 },
    { month: 'May', solar: 1950, wind: 1420, target: 1650 },
    { month: 'Jun', solar: 2100, wind: 1350, target: 1700 },
    { month: 'Jul', solar: 2250, wind: 1280, target: 1750 },
    { month: 'Aug', solar: 2180, wind: 1320, target: 1700 },
    { month: 'Sep', solar: 1890, wind: 1450, target: 1600 },
    { month: 'Oct', solar: 1650, wind: 1580, target: 1500 },
    { month: 'Nov', solar: 1420, wind: 1720, target: 1400 },
    { month: 'Dec', solar: 1280, wind: 1850, target: 1300 },
  ];

  const efficiencyData = [
    { name: 'Solar Panels', value: 87, color: '#f59e0b' },
    { name: 'Wind Turbines', value: 92, color: '#3b82f6' },
    { name: 'Battery Storage', value: 78, color: '#10b981' },
    { name: 'Grid Integration', value: 95, color: '#8b5cf6' },
  ];

  const performanceMetrics = [
    { 
      title: 'Total Energy Generated', 
      value: '2.4 GWh', 
      change: '+15.3%', 
      trend: 'up',
      icon: Zap,
      color: 'emerald'
    },
    { 
      title: 'Average Efficiency', 
      value: '89.2%', 
      change: '+2.1%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'blue'
    },
    { 
      title: 'Peak Production', 
      value: '1.85 MW', 
      change: '+8.7%', 
      trend: 'up',
      icon: Activity,
      color: 'purple'
    },
    { 
      title: 'Carbon Offset', 
      value: '1,680 tons', 
      change: '+12.4%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 transition-colors duration-200">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Advanced Analytics
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Deep insights into renewable energy performance, efficiency trends, and predictive analytics
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-6 lg:mt-0">
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-600 rounded-lg px-4 py-2 bg-gray-800 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">This Year</option>
              </select>
              
              <button className="flex items-center px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors duration-200">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              
              <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {performanceMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              const colorClasses = {
                emerald: 'bg-emerald-900/30 text-emerald-400',
                blue: 'bg-blue-900/30 text-blue-400',
                purple: 'bg-purple-900/30 text-purple-400',
                green: 'bg-green-900/30 text-green-400',
              };
              
              return (
                <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${
                      metric.trend === 'up' ? 'text-green-400 bg-green-900/20' : 'text-red-400 bg-red-900/20'
                    }`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {metric.change}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
                  <p className="text-gray-300 text-sm">{metric.title}</p>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Monthly Production Trends */}
            <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Monthly Production Trends</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                    <span className="text-gray-300">Solar</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-300">Wind</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                    <span className="text-gray-300">Target</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgb(31 41 55)', 
                      border: '1px solid rgb(75 85 99)', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      color: 'white'
                    }} 
                  />
                  <Area type="monotone" dataKey="solar" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="wind" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Line type="monotone" dataKey="target" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* System Efficiency */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-6">System Efficiency</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={efficiencyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {efficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Efficiency']}
                    contentStyle={{ 
                      background: 'rgb(31 41 55)', 
                      border: '1px solid rgb(75 85 99)', 
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-3">
                {efficiencyData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights and Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 rounded-xl p-8 border border-emerald-800/30">
              <h3 className="text-xl font-semibold text-white mb-6">Key Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Solar production increased by 23% compared to last quarter, driven by improved weather conditions and panel optimization.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Wind energy generation shows consistent performance with 92% efficiency, exceeding industry standards.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Peak production hours shifted 30 minutes earlier, suggesting seasonal pattern changes.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-8 border border-blue-800/30">
              <h3 className="text-xl font-semibold text-white mb-6">Optimization Opportunities</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Upgrading battery storage capacity could increase overall system efficiency by an estimated 8-12%.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Implementing predictive maintenance could reduce downtime by 15% and extend equipment lifespan.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Grid integration improvements could optimize energy distribution during peak demand periods.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;