import React from 'react';
import { Brain, Database, Zap, Shield, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Models',
      description: 'Machine learning algorithms trained on millions of data points for accurate energy production forecasting.'
    },
    {
      icon: Database,
      title: 'Real-time Data Integration',
      description: 'Seamless integration with weather APIs, sensor networks, and historical energy production databases.'
    },
    {
      icon: Zap,
      title: 'Instant Predictions',
      description: 'Get energy production forecasts in milliseconds with our optimized prediction engine.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with encrypted data transmission and secure cloud infrastructure.'
    },
    {
      icon: Users,
      title: 'Multi-user Collaboration',
      description: 'Team-based dashboards with role-based access control and collaborative analytics.'
    },
    {
      icon: Award,
      title: 'Industry Leading Accuracy',
      description: '95%+ accuracy rates validated by independent energy research institutions.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Energy Projects' },
    { number: '95%', label: 'Prediction Accuracy' },
    { number: '50+', label: 'Countries Served' },
    { number: '2.1M', label: 'Hours Analyzed' }
  ];

  const benefits = [
    'Reduce energy production uncertainty by up to 85%',
    'Optimize grid integration and energy storage planning',
    'Lower operational costs through predictive maintenance',
    'Maximize renewable energy investment returns',
    'Meet regulatory compliance and reporting requirements',
    'Enable data-driven decision making for energy trading'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              The Future of Energy
              <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Forecasting is Here
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              EnergyForcast combines cutting-edge artificial intelligence with comprehensive weather data 
              and historical energy patterns to deliver the most accurate renewable energy production 
              predictions in the industry.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Powerful Features for Energy Professionals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-200">
                      <IconComponent className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Transform Your Energy Operations
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
                <p className="text-emerald-100 mb-8 leading-relaxed">
                  Join thousands of energy professionals who trust EnergyForcast for accurate, 
                  reliable renewable energy predictions. Start your free trial today.
                </p>
                <div className="space-y-4">
                  <button className="w-full bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button className="w-full border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:border-white/50 transition-colors duration-200">
                    Schedule Demo
                  </button>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-bounce"></div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Built with Industry-Leading Technology
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">TensorFlow</div>
              <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">PyTorch</div>
              <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">AWS</div>
              <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">Docker</div>
              <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">Kubernetes</div>
              <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">PostgreSQL</div>
              <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">Redis</div>
              <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">GraphQL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;