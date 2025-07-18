"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "../../../utils/leafletConfig";
import MapUpdater from "./MapUpdator";
import Image from "next/image";
interface Weather {
  coord: { lat: number; lon: number };
  weather: { description: string; icon: string }[];
  base?: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min?: number;
    temp_max?: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg?: number };
  clouds?: { all: number };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone?: number;
  id?: number;
  name: string;
  cod?: number;
}

interface WeatherCardProps {
  weather: Weather | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  // Return null if no weather data is provided
  console.log("weather", weather);
  if (!weather) {
    return null;
  }

  // Convert UNIX timestamps to readable time
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
    "en-US",
    { hour: "numeric", minute: "numeric", hour12: true }
  );
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString(
    "en-US",
    { hour: "numeric", minute: "numeric", hour12: true }
  );

  return (
    <div className="bg-gradient-to-br from-blue-100 w-800 to-gray-1200 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-gradient-to-br from-blue-100 to-gray-1200 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl transform hover:scale-105 transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {weather.name}, {weather.sys.country}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Weather on {new Date(weather.dt * 1000).toLocaleDateString()}
            </p>
          </div>
          <Image
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
        </div>

        {/* Main Weather Info */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-600">
            {Math.round(weather.main.temp)}°C
          </h2>
          <p className="text-base sm:text-lg text-gray-600 capitalize">
            {weather.weather[0].description}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Feels like {Math.round(weather.main.feels_like)}°C
          </p>
        </div>

        {/* Map */}
        <div className="mb-4 sm:mb-6 h-64 sm:h-80">
          <MapContainer
            center={[weather.coord.lat, weather.coord.lon]}
            zoom={10}
            style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[weather.coord.lat, weather.coord.lon]}
              icon={icon}
            >
              <Popup>{weather.name}</Popup>
            </Marker>

            {/* This will re-center the map whenever weather changes */}
            <MapUpdater lat={weather.coord.lat} lon={weather.coord.lon} />
          </MapContainer>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <p className="text-gray-600">Humidity</p>
            <p className="font-semibold text-gray-800">
              {weather.main.humidity}%
            </p>
          </div>
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <p className="text-gray-600">Pressure</p>
            <p className="font-semibold text-gray-800">
              {weather.main.pressure} hPa
            </p>
          </div>
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <p className="text-gray-600">Wind Speed</p>
            <p className="font-semibold text-gray-800">
              {weather.wind.speed} m/s
            </p>
          </div>
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <p className="text-gray-600">Visibility</p>
            <p className="font-semibold text-gray-800">
              {(weather.visibility / 1000).toFixed(1)} km
            </p>
          </div>
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <p className="text-gray-600">Sunrise</p>
            <p className="font-semibold text-gray-800">{sunrise}</p>
          </div>
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <p className="text-gray-600">Sunset</p>
            <p className="font-semibold text-gray-800">{sunset}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs text-gray-400">
            Data from OpenWeatherMap | Map from{" "}
            <a
              href="https://www.openstreetmap.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenStreetMap
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
