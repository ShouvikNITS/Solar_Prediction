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
// API service for renewable energy forecasting
export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  cloudCover: number;
  solarIrradiance: number;
  pressure: number;
}

export interface ForecastRequest {
  location: string;
  days: number;
  energyType: 'solar' | 'wind' | 'both';
}

export interface Prediction {
  value: number;
}

// export interface ForecastResponse {
//   success: boolean;
//   data: {
//     location: string;
//     forecastPeriod: number;
//     predictions: {
//       date: string;
//       solar: number;
//       wind: number;
//       confidence: number;
//       weather: string;
//       temperature: number;
//     }[];
//     summary: {
//       totalExpected: number;
//       peakProduction: number;
//       peakTime: string;
//       averageConfidence: number;
//     };
//     insights: string[];
//     recommendations: string[];
//   };
//   error?: string;
// }

// Generate realistic dates starting from today

export interface ForecastResponse {
  success: boolean;
  data?: {
    location: string;
    forecastPeriod: number;
    predictions: {
      date: string;
      solar: number;
      wind: number;
      confidence: number;
      weather: string;
      temperature: number;
    }[];
    // summary: {
    //   totalExpected: number;
    //   peakProduction: number;
    //   peakTime: string;
    //   averageConfidence: number;
    // };
    // insights: string[];
    // recommendations: string[];
    };
  error?: string;
}
const generateForecastDates = (days: number): string[] => {
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

// Mock API function - replace with actual API endpoint
// export const fetchEnergyForecast = async (request: ForecastRequest): Promise<ForecastResponse> => {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 1500));

//   // Generate realistic dates
//   const forecastDates = generateForecastDates(request.days);

//   // Mock weather-based calculations
//   const baseTemp = 25;
//   const tempVariation = Math.random() * 10 - 5;
//   const currentTemp = baseTemp + tempVariation;

//   // Generate realistic predictions based on location and weather
//   const predictions = [];
//   const weatherConditions = ['sunny', 'partly-cloudy', 'cloudy', 'rainy'];
  
//   for (let i = 0; i < request.days; i++) {
//     const weatherIndex = Math.floor(Math.random() * weatherConditions.length);
//     const weather = weatherConditions[weatherIndex];
    
//     // Weather-based solar production calculation (efficiency percentage)
//     let solarMultiplier = 1;
//     switch (weather) {
//       case 'sunny': solarMultiplier = 0.85 + Math.random() * 0.15; break;
//       case 'partly-cloudy': solarMultiplier = 0.65 + Math.random() * 0.25; break;
//       case 'cloudy': solarMultiplier = 0.35 + Math.random() * 0.35; break;
//       case 'rainy': solarMultiplier = 0.15 + Math.random() * 0.35; break;
//     }
    
//     // Wind production (inversely related to solar in some cases)
//     const windMultiplier = weather === 'rainy' || weather === 'cloudy' ? 
//       0.75 + Math.random() * 0.25 : 0.55 + Math.random() * 0.35;
    
//     // Calculate efficiency percentages (0-100%)
//     const solar = Math.round(solarMultiplier * 100);
//     const wind = Math.round(windMultiplier * 100);
//     const confidence = Math.round(85 + Math.random() * 10);
    
//     predictions.push({
//       date: forecastDates[i],
//       solar,
//       wind,
//       confidence,
//       weather,
//       temperature: Math.round(currentTemp + (Math.random() * 6 - 3))
//     });
//   }

//   // Calculate summary statistics (convert efficiency to kWh estimates)
//   const avgSolarEfficiency = predictions.reduce((sum, p) => sum + p.solar, 0) / predictions.length;
//   const avgWindEfficiency = predictions.reduce((sum, p) => sum + p.wind, 0) / predictions.length;
  
//   // Estimate kWh based on efficiency percentages (mock calculation)
//   const estimatedCapacity = 1000; // kWh base capacity
//   const totalSolarKWh = Math.round((avgSolarEfficiency / 100) * estimatedCapacity * request.days);
//   const totalWindKWh = Math.round((avgWindEfficiency / 100) * estimatedCapacity * request.days);
  
//   const totalExpected = request.energyType === 'solar' ? totalSolarKWh : 
//                        request.energyType === 'wind' ? totalWindKWh : 
//                        totalSolarKWh + totalWindKWh;

//   const peakDay = predictions.reduce((max, p) => 
//     (p.solar + p.wind) > (max.solar + max.wind) ? p : max
//   );

//   const averageConfidence = Math.round(
//     predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length
//   );

//   // Generate location-specific insights
//   const insights = [
//     `${request.location} forecast shows ${averageConfidence}% confidence for the next ${request.days} days.`,
//     `Peak combined efficiency expected on ${peakDay.date} with ${peakDay.solar + peakDay.wind}% total efficiency.`,
//     `Weather analysis indicates ${predictions.filter(p => p.weather === 'sunny').length} optimal days for solar generation.`,
//     `Average solar efficiency: ${Math.round(avgSolarEfficiency)}%, Wind efficiency: ${Math.round(avgWindEfficiency)}%`
//   ];

//   // Generate actionable recommendations
//   const recommendations = [
//     totalExpected > 5000 ? 
//       'Excellent production period - consider maximizing grid feed-in during peak efficiency hours.' :
//       'Moderate production expected - optimize battery storage and consider backup energy sources.',
//     predictions.some(p => p.weather === 'rainy') ?
//       'Rain periods detected - ensure wind systems are optimized for increased wind energy capture.' :
//       'Clear weather forecast - schedule solar panel cleaning and maintenance for optimal efficiency.',
//     averageConfidence > 90 ?
//       'High confidence forecast - proceed with planned energy commitments and trading.' :
//       'Moderate confidence - maintain flexible energy backup options and monitor weather updates.',
//     `Location-specific optimization: ${request.location} shows ${request.energyType === 'solar' ? 'strong solar' : request.energyType === 'wind' ? 'good wind' : 'balanced renewable'} potential.`
//   ];

//   return {
//     success: true,
//     data: {
//       location: request.location,
//       forecastPeriod: request.days,
//       predictions,
//       summary: {
//         totalExpected,
//         peakProduction: Math.round((peakDay.solar + peakDay.wind) / 100 * estimatedCapacity),
//         peakTime: `${peakDay.date} at 2:30 PM`,
//         averageConfidence
//       },
//       insights,
//       recommendations
//     }
//   };
// };

// Real API integration example (commented out)
export const fetchEnergyForecast = async (request: ForecastRequest): Promise<ForecastResponse> => {
  try {
    console.log('Fetching energy forecast with request:', request);
    const response = await fetch(`https://solarwind-model-1.onrender.com/predict/?model=lstm&location=${request.location}&today=false&future_days=${request.days}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      body: JSON.stringify(request)
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const pred_response = await response.json();
    console.log('API response data:', pred_response);
    const predictions = generateDates(request.days).map((date, index) => ({
          date,
          solar: pred_response.data.map((val:any)=> parseFloat(val.toFixed(2)))[index] ,
          wind: 0,
          confidence: Math.round(85 + Math.random() * 10), // Mock confidence
          weather: ['sunny', 'sunny', 'cloudy', 'rainy', 'partly-cloudy', 'sunny', 'sunny'][index],
          temperature: [24, 26, 22, 18, 23, 27, 25][index]
        }));
    return {
      success: true,
      data: {
      location: request.location,
      forecastPeriod: request.days,
      predictions: predictions,
        },      
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
