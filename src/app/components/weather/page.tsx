import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return null;
  }
  // Convert UNIX timestamps to readable time
  const sunrise = new Date(1752795241 * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const sunset = new Date(1752844529 * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-200 to-gray-1000 rounded-2xl shadow-2xl p-6 max-w-md w-full transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {weather.name}, {weather.sys.country}
            </h1>
            <p className="text-sm text-gray-500">
              Weather on {new Date(1752802524 * 1000).toLocaleDateString()}
              Weather on {new Date(weather.dt * 1000).toLocaleDateString()}
            </p>
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
        </div>

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
          <p className="text-xs text-gray-400">Data from OpenWeatherMap</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
