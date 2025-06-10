"use client";
import React, { useState } from 'react';
import { Calendar, MapPin, Sun, Wind, CloudRain, TrendingUp, Activity, Zap, AlertTriangle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Forecasting: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('san-francisco');
  const [forecastDays, setForecastDays] = useState(7);
  const [energyType, setEnergyType] = useState('both');

  // Mock forecast data
  const forecastData = [
    { date: 'Mon', solar: 85, wind: 65, weather: 'sunny', temp: 24 },
    { date: 'Tue', solar: 92, wind: 58, weather: 'sunny', temp: 26 },
    { date: 'Wed', solar: 78, wind: 72, weather: 'cloudy', temp: 22 },
    { date: 'Thu', solar: 45, wind: 88, weather: 'rainy', temp: 18 },
    { date: 'Fri', solar: 88, wind: 75, weather: 'partly-cloudy', temp: 23 },
    { date: 'Sat', solar: 95, wind: 62, weather: 'sunny', temp: 27 },
    { date: 'Sun', solar: 90, wind: 68, weather: 'sunny', temp: 25 },
  ];

  const hourlyForecast = [
    { hour: '6AM', solar: 0, wind: 45, probability: 95 },
    { hour: '9AM', solar: 35, wind: 52, probability: 92 },
    { hour: '12PM', solar: 85, wind: 68, probability: 88 },
    { hour: '3PM', solar: 92, wind: 75, probability: 90 },
    { hour: '6PM', solar: 45, wind: 72, probability: 87 },
    { hour: '9PM', solar: 0, wind: 58, probability: 93 },
  ];

  const weatherIcons = {
    sunny: <Sun className="w-6 h-6 text-yellow-500" />,
    cloudy: <CloudRain className="w-6 h-6 text-gray-500" />,
    rainy: <CloudRain className="w-6 h-6 text-blue-500" />,
    'partly-cloudy': <Sun className="w-6 h-6 text-yellow-400" />,
  };

  return (
    <div className="min-h-screen bg-gray-900 transition-colors duration-200">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Energy Production Forecasting
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced AI-powered predictions for renewable energy production with weather integration
            </p>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-gray-300 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="san-francisco">San Francisco, CA</option>
                  <option value="austin">Austin, TX</option>
                  <option value="denver">Denver, CO</option>
                  <option value="portland">Portland, OR</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Forecast Period</label>
                <select 
                  value={forecastDays}
                  onChange={(e) => setForecastDays(Number(e.target.value))}
                  className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-gray-300 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={1}>24 Hours</option>
                  <option value={3}>3 Days</option>
                  <option value={7}>7 Days</option>
                  <option value={14}>14 Days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Energy Type</label>
                <select 
                  value={energyType}
                  onChange={(e) => setEnergyType(e.target.value)}
                  className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-gray-300 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="both">Solar + Wind</option>
                  <option value="solar">Solar Only</option>
                  <option value="wind">Wind Only</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-200 font-medium">
                  Update Forecast
                </button>
              </div>
            </div>
          </div>

          {/* Forecast Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-emerald-900/30 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded-full">
                  High Confidence
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">2,340 kWh</h3>
              <p className="text-gray-300 text-sm">Expected Peak Production</p>
              <p className="text-xs text-gray-400 mt-2">Tomorrow at 2:30 PM</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-900/30 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-blue-400 bg-blue-900/20 px-2 py-1 rounded-full">
                  92% Accuracy
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">18,450 kWh</h3>
              <p className="text-gray-300 text-sm">7-Day Total Forecast</p>
              <p className="text-xs text-gray-400 mt-2">+15% vs last week</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-900/30 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                </div>
                <span className="text-sm font-medium text-orange-400 bg-orange-900/20 px-2 py-1 rounded-full">
                  Weather Alert
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Thursday</h3>
              <p className="text-gray-300 text-sm">Low Production Expected</p>
              <p className="text-xs text-gray-400 mt-2">Rain forecast, 45% reduction</p>
            </div>
          </div>

          {/* Main Forecast Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 7-Day Forecast */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-6">7-Day Energy Forecast</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgb(31 41 55)', 
                      border: '1px solid rgb(75 85 99)', 
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                  />
                  <Area type="monotone" dataKey="solar" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="wind" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Hourly Forecast */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-6">Today's Hourly Forecast</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="hour" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgb(31 41 55)', 
                      border: '1px solid rgb(75 85 99)', 
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                  />
                  <Line type="monotone" dataKey="solar" stroke="#f59e0b" strokeWidth={3} />
                  <Line type="monotone" dataKey="wind" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weather Integration */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 mb-8">
            <h3 className="text-lg font-semibold text-white mb-6">Weather-Integrated Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {forecastData.map((day, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200">
                  <div className="text-sm font-medium text-gray-300 mb-2">{day.date}</div>
                  <div className="flex justify-center mb-3">
                    {weatherIcons[day.weather as keyof typeof weatherIcons]}
                  </div>
                  <div className="text-lg font-bold text-white mb-1">{day.temp}°C</div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-orange-400">Solar</span>
                      <span className="font-medium text-gray-300">{day.solar}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-400">Wind</span>
                      <span className="font-medium text-gray-300">{day.wind}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Forecast Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 rounded-xl p-8 border border-emerald-800/30">
              <h3 className="text-xl font-semibold text-white mb-6">Key Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Optimal solar production expected Monday-Tuesday with clear skies and 26°C temperatures.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Wind energy will compensate for reduced solar output during Thursday's rain event.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Weekend shows excellent conditions for both energy sources with 95% confidence.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-8 border border-blue-800/30">
              <h3 className="text-xl font-semibold text-white mb-6">Optimization Recommendations</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Schedule maintenance for Wednesday evening to minimize impact during low production period.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Increase battery storage capacity before Thursday to capture excess wind energy.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Consider grid energy purchase on Thursday afternoon to meet demand shortfall.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecasting;