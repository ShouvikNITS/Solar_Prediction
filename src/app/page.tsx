// import Navbar from "@/components/Navbar";
import { LuSun } from "react-icons/lu";
import { FaWind } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { CiGlobe } from "react-icons/ci";

export default function Home() {
  return (
      <div>
        {/*<Navbar />*/}
          <div className="min-h-screen bg-gray-900">
            <section className="relative from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">Predict Renewable
                            <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Energy Production</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                            Advanced AI-powered forecasting platform that predicts solar and wind energy production using real-time weather data, historical patterns, and machine learning algorithms.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                            <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center">Start Forecasting</button>
                            <button className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-xl font-semibold text-lg hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300">Contact Us</button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            <div className="text-center group">
                                <div className="flex justify-center mb-3">
                                    <div className="p-3 rounded-xl bg-emerald-900/50 duration-200">
                                        <LuSun className="lucide lucide-sun w-8 h-8 text-emerald-600 dark:text-emerald-400"/>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">95%</div>
                                <div className="text-gray-300 font-medium">Solar Accuracy</div>
                            </div>
                            <div className="text-center group">
                                <div className="flex justify-center mb-3">
                                    <div className="p-3 rounded-xl bg-blue-900/50 duration-200">
                                        <FaWind className="lucide lucide-sun w-8 h-8 text-blue-400"/>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">92%</div>
                                <div className="text-gray-300 font-medium">Wind Accuracy</div>
                            </div>
                            <div className="text-center group">
                                <div className="flex justify-center mb-3">
                                    <div className="p-3 rounded-xl bg-purple-900/50 duration-200">
                                        <AiOutlineStock className="lucide lucide-sun w-8 h-8 text-purple-400"/>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">48h</div>
                                <div className="text-gray-300 font-medium">Forecast Range</div>
                            </div>
                            <div className="text-center group">
                                <div className="flex justify-center mb-3">
                                    <div className="p-3 rounded-xl bg-orange-900/50 duration-200">
                                        <CiGlobe className="lucide lucide-sun w-8 h-8 text-orange-400"/>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">50+</div>
                                <div className="text-gray-300 font-medium">Locations</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          </div>
      </div>
  );
}
