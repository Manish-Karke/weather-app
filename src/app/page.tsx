"use client";

import { useState } from "react";

import React from "react";
import dynamic from "next/dynamic";

import { WeatherData } from "@/types/weather";
const WeatherCard = dynamic(() => import("../components/weather/WeatherCard"), {
  ssr: false,
});
const HomeWeather = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-5 bg-blue-100 p-4 text-2xl">
      <h1 className="font-bold text-4xl text-blue-800">Weather App</h1>
      <div className="flex gap-5 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter the name of city"
          className="border-2 rounded-2xl font-black bg-gradient-to-br from-blue-300 to-gray-500 p-2"
        />
        <button
          onClick={fetchWeather}
          disabled={!city || loading}
          className="bg-black px-4 py-2 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && <p className="text-3xl text-red-600">{error}</p>}
      <WeatherCard weather={weather} />
    </main>
  );
};

export default HomeWeather;
