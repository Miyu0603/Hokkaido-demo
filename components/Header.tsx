import React, { useEffect, useState } from 'react';
import { fetchWeather, WeatherData } from '../services/weatherService';
import { SunIcon, CloudIcon, CloudSnowIcon, CloudRainIcon } from './Icons';

export const Header: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchWeather().then(setWeather);
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code <= 1) return <SunIcon className="w-8 h-8 text-yellow-300" />;
    if (code <= 3) return <CloudIcon className="w-8 h-8 text-gray-100" />;
    if (code >= 71 && code <= 86) return <CloudSnowIcon className="w-8 h-8 text-white" />; // Snow
    if (code >= 51 && code <= 67) return <CloudRainIcon className="w-8 h-8 text-blue-200" />; // Rain
    return <CloudIcon className="w-8 h-8 text-gray-200" />; // Default
  };

  return (
    <header className="bg-gradient-to-r from-sky-600 to-hokkaido-blue text-white pt-safe-top pb-4 px-4 shadow-md">
      <div className="max-w-md mx-auto flex justify-between items-start mt-2">
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-wide">北海道雪國之旅</h1>
          <p className="text-sky-100 text-sm opacity-90">Japan Trip 2024</p>
        </div>
        <div className="text-right">
          {weather ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-2">
               <div>
                  {getWeatherIcon(weather.weathercode)}
               </div>
               <div>
                 <span className="block font-bold text-lg leading-none">{weather.temperature}°C</span>
                 <span className="text-[10px] opacity-90 block">Sapporo</span>
               </div>
            </div>
          ) : (
            <div className="text-xs opacity-60">Loading...</div>
          )}
        </div>
      </div>
    </header>
  );
};
