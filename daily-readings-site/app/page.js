// app/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [todayData, setTodayData] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const url =
      "https://raw.githubusercontent.com/DailyLectio/daily-catholic-readings-data/refs/heads/main/final_daily_readings_2025_07.json";

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setTodayData(data[today] || { error: "No data found for today." });
      } catch (err) {
        console.error("Fetch error:", err);
        setTodayData({ error: "Unable to load daily readings." });
      }
    };
    fetchData();
  }, []);

  if (!todayData) {
    return <p className="text-center mt-12 text-gray-500">Loading Daily Reflection...</p>;
  }
  if (todayData.error) {
    return <p className="text-center mt-12 text-red-600">{todayData.error}</p>;
  }

  return (
    <main className="bg-gray-50 flex-grow">
      <div className="max-w-md mx-auto py-8 px-4">
        {/* Hero */}
        <section className="text-center mb-10">
          <Image
            src="/faithlinks-logo.png"
            alt="FaithLinks Logo"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-blue-900">FaithLinks</h1>
          <p className="mt-1 text-gray-600">Daily Catholic Reflections & Prayer</p>
        </section>

        {/* Quote Card */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <blockquote className="italic text-lg text-blue-900 leading-relaxed">
            “{todayData.quote}”
          </blockquote>
        </section>

        {/* Summary & Prayer Cards */}
        <section className="space-y-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Reading Summary</h2>
            <p className="text-gray-700 leading-relaxed">{todayData.reading_summary}</p>
            {todayData.psalm_summary && (
              <p className="mt-4 text-gray-700">
                <strong>Psalm:</strong> {todayData.psalm_summary}
              </p>
            )}
            {todayData.gospel_summary && (
              <p className="mt-2 text-gray-700">
                <strong>Gospel:</strong> {todayData.gospel_summary}
              </p>
            )}
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Prayer</h2>
            <p className="text-gray-700 italic leading-relaxed">
              {todayData.daily_prayer}
            </p>
          </div>
        </section>

        {/* Action Grid */}
        <section className="grid grid-cols-2 gap-4 mb-8">
          {todayData.exegesis_link && (
            <Link
              href={todayData.exegesis_link}
              className="block py-3 bg-blue-900 text-white rounded-lg text-center hover:bg-blue-800"
            >
              Deep Dive
            </Link>
          )}
          {todayData.saint_reflection_link && (
            <Link
              href={todayData.saint_reflection_link}
              className="block py-3 bg-yellow-600 text-white rounded-lg text-center hover:bg-yellow-500"
            >
              Saint of the Day
            </Link>
          )}
          {todayData.usccb_link && (
            <a
              href={todayData.usccb_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 bg-gray-800 text-white rounded-lg text-center hover:bg-gray-700"
            >
              Daily Readings
            </a>
          )}
          <Link
            href="/donate"
            className="block py-3 bg-green-600 text-white rounded-lg text-center hover:bg-green-500"
          >
            Donate
          </Link>
          <Link
            href="/shop"
            className="col-span-2 py-3 bg-purple-700 text-white rounded-lg text-center hover:bg-purple-600"
          >
            Shop Bands
          </Link>
        </section>
      </div>
    </main>
  );
}
