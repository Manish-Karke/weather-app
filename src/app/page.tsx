"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import React from "react";
import WeatherCard from "./components/weather/page";

const HomeWeather = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const route = useRouter();
  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      console.log(data);
    } catch (error: any) {
      setError(error.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen flex flex-col justify-center items-center  items-center` gap-5 bg-blue-100 p-4 text-2xl ">
      <h1 className="font-bold text-4xl text-blue-800">Weather App</h1>
      <div className="flex gap-5 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter the name of city"
          className="border-2 rounded-2xl font-black bg-gradient-to-br from-blue-300 to-gray-500 "
        />
        <button
          onClick={fetchWeather}
          disabled={!city || loading}
          className="bg-black px-4 py-2  text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading...." : "search"}
        </button>
      </div>

      {error && <p className="text-3xl">{error}</p>}

      <WeatherCard weather={weather} />
    </main>
  );
};

export default HomeWeather;
