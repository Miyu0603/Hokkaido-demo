import { APP_CONFIG } from '../constants';

export interface WeatherData {
  temperature: number;
  weathercode: number;
}

export const fetchWeather = async (): Promise<WeatherData | null> => {
  try {
    const response = await fetch(APP_CONFIG.WEATHER_API);
    const data = await response.json();
    if (data && data.current_weather) {
      return {
        temperature: data.current_weather.temperature,
        weathercode: data.current_weather.weathercode,
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch weather", error);
    return null;
  }
};