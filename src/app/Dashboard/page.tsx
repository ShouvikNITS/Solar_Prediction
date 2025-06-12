"use client";
import React, { useState } from 'react';
import { Sun, Wind, Calendar, MapPin, TrendingUp, Activity, Zap, CloudRain } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import axios from "axios";
import dotenv from "dotenv"

dotenv.config();

interface WeatherData {
    weather: { description: string }[];
    main: {temp:number};
  }
const Dashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedEnergyType, setSelectedEnergyType] = useState('solar');
  const [city, setCity] = useState("Silchar");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  
  const fetchWeather = async (city: string) => {
    try{
      const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
      );
      setWeather(res.data);
      console.log(res.data);
    } catch(err){
      console.log(err);
      return;
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && city.trim() !== '') {
      fetchWeather(city.trim());
    }
  };

  // Mock data for demonstrations
  const solarData = [
    { time: '06:00', production: 0, forecast: 0 },
    { time: '08:00', production: 15, forecast: 18 },
    { time: '10:00', production: 45, forecast: 42 },
    { time: '12:00', production: 78, forecast: 82 },
    { time: '14:00', production: 85, forecast: 88 },
    { time: '16:00', production: 62, forecast: 65 },
    { time: '18:00', production: 25, forecast: 22 },
    { time: '20:00', production: 0, forecast: 0 },
  ];

  const windData = [
    { time: '06:00', production: 35, forecast: 32 },
    { time: '08:00', production: 42, forecast: 45 },
    { time: '10:00', production: 65, forecast: 62 },
    { time: '12:00', production: 78, forecast: 75 },
    { time: '14:00', production: 88, forecast: 92 },
    { time: '16:00', production: 72, forecast: 78 },
    { time: '18:00', production: 58, forecast: 55 },
    { time: '20:00', production: 45, forecast: 48 },
  ];

  const weatherData = [
    { hour: '6AM', temp: 18, humidity: 65, windSpeed: 12 },
    { hour: '9AM', temp: 22, humidity: 58, windSpeed: 15 },
    { hour: '12PM', temp: 28, humidity: 45, windSpeed: 18 },
    { hour: '3PM', temp: 32, humidity: 40, windSpeed: 22 },
    { hour: '6PM', temp: 28, humidity: 48, windSpeed: 19 },
    { hour: '9PM', temp: 24, humidity: 55, windSpeed: 16 },
  ];

  const currentData = selectedEnergyType === 'solar' ? solarData : windData;

  return (
    <div className="min-h-screen bg-gray-900 ">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Energy Production Dashboard
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-time monitoring and forecasting of renewable energy production with advanced analytics
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                {/*<select className="border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">*/}
                {/*  <option>San Francisco, CA</option>*/}
                {/*  <option>Austin, TX</option>*/}
                {/*  <option>Denver, CO</option>*/}
                {/*</select>*/}
                <input type="text"
                       onChange={handleCityChange}
                       onKeyDown={handleKeyDown}
                       className="border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Enter your city" />
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <select 
                  value={selectedTimeRange} 
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                </select>
              </div>
            </div>

            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setSelectedEnergyType('solar')}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  selectedEnergyType === 'solar'
                    ? 'bg-gray-700 text-orange-400 shadow-sm'
                    : 'text-gray-300 hover:text-orange-400'
                }`}
              >
                <Sun className="w-4 h-4 mr-2" />
                Solar
              </button>
              <button
                onClick={() => setSelectedEnergyType('wind')}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  selectedEnergyType === 'wind'
                    ? 'bg-gray-700 text-blue-400 shadow-sm'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                <Wind className="w-4 h-4 mr-2" />
                Wind
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-emerald-900/30 rounded-lg">
                  <Zap className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded-full">
                  +12%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">1,247 kWh</h3>
              <p className="text-gray-300 text-sm">Current Production</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-900/30 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-blue-400 bg-blue-900/20 px-2 py-1 rounded-full">
                  +8%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">1,340 kWh</h3>
              <p className="text-gray-300 text-sm">Predicted Peak</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-900/30 rounded-lg">
                  <Activity className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-sm font-medium text-green-400 bg-green-900/20 px-2 py-1 rounded-full">
                  97.2%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Excellent</h3>
              <p className="text-gray-300 text-sm">Forecast Accuracy</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-900/30 rounded-lg">
                  <CloudRain className="w-6 h-6 text-orange-400" />
                </div>
                <span className="text-sm font-medium text-orange-400 bg-orange-900/20 px-2 py-1 rounded-full">
                  {weather?.weather?.[0]?.description ?? "clear sky"}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{Math.floor(weather?.main?.temp ?? 25)} °C</h3>
              <p className="text-gray-300 text-sm">Current Weather</p>
            </div>
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Production Forecast Chart */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {selectedEnergyType === 'solar' ? 'Solar' : 'Wind'} Energy Production
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-gray-300">Actual</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-300">Forecast</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgb(31 41 55)', 
                      border: '1px solid rgb(75 85 99)', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      color: 'white'
                    }} 
                  />
                  <Area type="monotone" dataKey="production" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={3} />
                  <Line type="monotone" dataKey="forecast" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Weather Conditions */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-6">Weather Conditions</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="hour" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgb(31 41 55)', 
                      border: '1px solid rgb(75 85 99)', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      color: 'white'
                    }} 
                  />
                  <Bar dataKey="temp" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="windSpeed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Optimization Recommendations */}
          <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-xl p-8 border border-emerald-800/30">
            <h3 className="text-xl font-semibold text-white mb-4">AI Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-emerald-900/30 rounded-lg flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Optimal Production Window</h4>
                  <p className="text-gray-300 text-sm">Peak production expected between 12 PM - 3 PM with 85% efficiency rate.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-900/30 rounded-lg flex-shrink-0">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Maintenance Alert</h4>
                  <p className="text-gray-300 text-sm">Wind turbine #3 showing 5% efficiency drop. Schedule inspection recommended.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;