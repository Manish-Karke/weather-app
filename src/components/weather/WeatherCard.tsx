"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "../../utils/leafletConfig";
import MapUpdater from "./MapUpdator";
import { WeatherData } from "@/types/weather";
import Image from "next/image";

interface WeatherCardProps {
  weather: WeatherData | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  if (!weather) return null;

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  return (
    <div className="bg-gradient-to-br from-blue-100 to-gray-200 flex items-center justify-center p-4 sm:p-6 md:p-8 w-full">
      <div className="rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-2xl transform hover:scale-105 transition-transform duration-300 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {weather.name}, {weather.sys.country}
            </h1>
            <p className="text-sm text-gray-500">
              Weather on {new Date(weather.dt * 1000).toLocaleDateString()}
            </p>
          </div>
          <Image
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
            width={64}
            height={64}
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-5xl font-extrabold text-blue-600">
            {Math.round(weather.main.temp)}°C
          </h2>
          <p className="text-lg text-gray-600 capitalize">
            {weather.weather[0].description}
          </p>
          <p className="text-sm text-gray-500">
            Feels like {Math.round(weather.main.feels_like)}°C
          </p>
        </div>

        <div className="mb-6 h-80">
          <MapContainer
            center={[weather.coord.lat, weather.coord.lon]}
            zoom={10}
            style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker
              position={[weather.coord.lat, weather.coord.lon]}
              icon={icon}
            >
              <Popup>{weather.name}</Popup>
            </Marker>
            <MapUpdater
              center={[weather.coord.lat, weather.coord.lon]}
              zoom={10}
            />
          </MapContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600">Humidity</p>
            <p className="font-semibold text-gray-800">
              {weather.main.humidity}%
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600">Pressure</p>
            <p className="font-semibold text-gray-800">
              {weather.main.pressure} hPa
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600">Wind Speed</p>
            <p className="font-semibold text-gray-800">
              {weather.wind.speed} m/s
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600">Visibility</p>
            <p className="font-semibold text-gray-800">
              {(weather.visibility / 1000).toFixed(1)} km
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600">Sunrise</p>
            <p className="font-semibold text-gray-800">{sunrise}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600">Sunset</p>
            <p className="font-semibold text-gray-800">{sunset}</p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          Data from OpenWeatherMap | Map from{" "}
          <a
            href="https://www.openstreetmap.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            OpenStreetMap
          </a>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
