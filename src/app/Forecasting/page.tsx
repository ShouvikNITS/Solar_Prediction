'use client'
import React, { useState } from 'react';
import { Calendar, MapPin, Sun, Wind, CloudRain, TrendingUp, Activity, Zap, AlertTriangle, Loader2 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { fetchEnergyForecast, ForecastRequest, ForecastResponse } from '../services/forecastingApi';

  
const Forecasting: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('Assam, India');
  const [forecastDays, setForecastDays] = useState(7);
  const [energyType, setEnergyType] = useState<'solar' | 'wind' | 'both'>('solar');
  const [isLoading, setIsLoading] = useState(false);
  const [forecastData, setForecastData] = useState<ForecastResponse['data'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Generate dates starting from today
  const generateDates = (days: number) => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }));
    }
    return dates;
  };

  // Default mock data for initial display with real dates
  const defaultForecastData = generateDates(7).map((date, index) => ({
    date,
    solar: [85, 92, 78, 45, 88, 95, 90][index],
    wind: [65, 58, 72, 88, 75, 62, 68][index],
    weather: ['sunny', 'sunny', 'cloudy', 'rainy', 'partly-cloudy', 'sunny', 'sunny'][index],
    temperature: [24, 26, 22, 18, 23, 27, 25][index]
  }));

  // const hourlyForecast = [
  //   { hour: '6AM', solar: 0, wind: 45, probability: 95 },
  //   { hour: '9AM', solar: 35, wind: 52, probability: 92 },
  //   { hour: '12PM', solar: 85, wind: 68, probability: 88 },
  //   { hour: '3PM', solar: 92, wind: 75, probability: 90 },
  //   { hour: '6PM', solar: 45, wind: 72, probability: 87 },
  //   { hour: '9PM', solar: 0, wind: 58, probability: 93 },
  // ];

  const weatherIcons = {
    sunny: <Sun className="w-6 h-6 text-yellow-500" />,
    cloudy: <CloudRain className="w-6 h-6 text-gray-500" />,
    rainy: <CloudRain className="w-6 h-6 text-blue-500" />,
    'partly-cloudy': <Sun className="w-6 h-6 text-yellow-400" />,
  };

  const handleUpdateForecast = async () => {
    if (!selectedLocation.trim()) {
      setError('Please enter a valid location');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const request: ForecastRequest = {
        location: selectedLocation,
        days: forecastDays,
        energyType: energyType as 'solar' | 'wind' | 'both'
      };
      console.log('Fetching forecast with request:', request);
      const response = await fetchEnergyForecast(request);
      console.log('Forecast API response:', response);
      if (response.success && response.data) {
        
        setForecastData(response.data);
      } else {
        console.error('Forecast API error:', response.error);
        setError(response.error || 'Failed to fetch forecast data');
      }
    } catch (err) {
      setError('Network error: Unable to fetch forecast data');
      console.error('Forecast API error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Use API data if available, otherwise use default data
  const displayData = forecastData?.predictions || defaultForecastData;
  const summaryData = null;

  // Custom tooltip formatter for charts
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
          <p className="text-gray-900 dark:text-white font-medium">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey === 'solar' ? 'Solar' : 'Wind'}: ${entry.value} MJ/m2`}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  placeholder="Enter city, state/country"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Forecast Period
                </label>
                <select 
                  value={forecastDays}
                  onChange={(e) => setForecastDays(Number(e.target.value))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  disabled={isLoading}
                >
                  <option value={1}>1 Day</option>
                  <option value={3}>3 Days</option>
                  <option value={7}>7 Days</option>
                  <option value={14}>14 Days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Energy Type</label>
                <select 
                  value={energyType}
                  onChange={(e) => setEnergyType(e.target.value as 'solar' | 'wind' | 'both')}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  disabled={isLoading}
                >
                  <option value="solar">Solar Only</option>
                  <option value="wind">Wind Only</option>
                  <option value="both">Solar + Wind</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button 
                  onClick={handleUpdateForecast}
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Forecast'
                  )}
                </button>
              </div>
            </div>
            
            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Success Message */}
            {forecastData && !error && (
              <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-emerald-500 mr-2" />
                  <span className="text-emerald-700 dark:text-emerald-300 text-sm">
                    Forecast updated successfully for {forecastData.location} - {forecastData.forecastPeriod} days
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Forecast Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-emerald-900/30 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                  {/* {summaryData?.averageConfidence || 92}% Confidence */}
                  {92}% Confidence
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {/* {summaryData?.peakProduction || 2340} kWh */}
                { 2340} kWh
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Expected Peak Production</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {/* {summaryData?.peakTime || 'Tomorrow at 2:30 PM'} */}
                { 'Tomorrow at 2:30 PM'}
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-900/30 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                  {/* {summaryData?.averageConfidence || 92}% Accuracy */}
                  { 92}% Accuracy
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                { 18450} kWh
                {/* {summaryData?.totalExpected || 18450} kWh */}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{forecastDays}-Day Total Forecast</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">+15% vs last period</p>
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {displayData.find(d => d.weather === 'rainy')?.date || 'No alerts'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Low Production Expected</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Rain forecast, 45% reduction</p>
            </div>
          </div>

          {/* Main Forecast Charts */}
          <div className="grid
          //{grid-cols-1_lg:grid-cols-2 }
           gap-8 mb-8">
            {/* Multi-Day Forecast */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                {forecastDays}-Day Energy Forecast
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Date', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle' } }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Energy (MJ/m2)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                  />
                  <Tooltip content={customTooltip} />
                  <Area type="monotone" dataKey="solar" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="wind" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">Solar Energy</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">Wind Efficiency (%)</span>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Today's Hourly Forecast</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="hour" 
                    stroke="#6b7280"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Time of Day', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle' } }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Efficiency (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgb(31 41 55)', 
                      border: '1px solid rgb(75 85 99)', 
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    formatter={(value, name) => [`${value}%`, name === 'solar' ? 'Solar' : 'Wind']}
                  />
                  <Line type="monotone" dataKey="solar" stroke="#f59e0b" strokeWidth={3} />
                  <Line type="monotone" dataKey="wind" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">Solar Efficiency (%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">Wind Efficiency (%)</span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Weather Integration */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 mb-8">
            <h3 className="text-lg font-semibold text-white mb-6">Weather-Integrated Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {displayData.slice(0, 7).map((day, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{day.date}</div>
                  <div className="flex justify-center mb-3">
                    {weatherIcons[day.weather as keyof typeof weatherIcons]}
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">{day.temperature }°C</div>
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
                {/* {(forecastData?.insights || [ */}
                {( [
                  `${selectedLocation} shows optimal conditions for renewable energy generation.`,
                  'Weather patterns indicate favorable solar production in the coming days.',
                  'Wind energy will provide consistent backup during variable solar conditions.'
                ]).map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 dark:text-gray-300">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-8 border border-blue-800/30">
              <h3 className="text-xl font-semibold text-white mb-6">Optimization Recommendations</h3>
              <div className="space-y-4">
                {/* {(forecastData?.recommendations || [
                  'Schedule maintenance during low production periods to maximize uptime.',
                  'Optimize battery storage capacity to capture excess energy during peak production.',
                  'Consider grid energy trading opportunities during high production periods.' */}
                {( [
                  'Schedule maintenance during low production periods to maximize uptime.',
                  'Optimize battery storage capacity to capture excess energy during peak production.',
                  'Consider grid energy trading opportunities during high production periods.'
                ]).map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecasting;