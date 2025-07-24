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

    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setTodayData(data[today] || { error: "No data for today." });
      } catch {
        setTodayData({ error: "Unable to load readings." });
      }
    })();
  }, []);

  if (!todayData) return <p className="text-center mt-12 text-white">Loading...</p>;
  if (todayData.error)
    return <p className="text-center mt-12 text-red-300">{todayData.error}</p>;

  return (
    <div className="bg-orange-600 min-h-screen text-white flex flex-col">
      {/* Hero Banner */}
      <header className="py-12 text-center px-6">
        <Image
          src="/faithlinks-logo.png"
          alt="FaithLinks"
          width={60}
          height={60}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-extrabold mb-2">Daily Reflections</h1>
      </header>

      <div className="flex-grow overflow-auto">
        {/* Quote Section */}
        <section className="bg-blue-900 px-6 py-10">
          <blockquote className="text-xl md:text-2xl font-serif italic leading-snug">
            “{todayData.quote}”
          </blockquote>
          <p className="mt-4 text-right font-semibold">— {todayData.quote_source || "Scripture"}</p>
        </section>

        {/* Content Blocks */}
        <section className="px-6 py-8 space-y-12">
          <div>
            <h2 className="text-2xl font-bold">First Reading Summary</h2>
            <p className="mt-3 leading-relaxed text-gray-100">
              {todayData.reading_summary}
            </p>
          </div>

          {todayData.psalm_summary && (
            <div className="bg-yellow-500 bg-opacity-20 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gold-700">Responsorial Psalm</h2>
              <p className="mt-3 leading-relaxed text-white">
                {todayData.psalm_summary}
              </p>
            </div>
          )}

          {todayData.gospel_summary && (
            <div>
              <h2 className="text-2xl font-bold">Gospel Summary</h2>
              <p className="mt-3 leading-relaxed text-gray-100">
                {todayData.gospel_summary}
              </p>
            </div>
          )}

          <div className="bg-blue-900 px-6 py-8 rounded-lg">
            <h2 className="text-2xl font-bold">Today's Prayer</h2>
            <p className="mt-4 italic leading-relaxed">
              {todayData.daily_prayer}
            </p>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <footer className="px-6 py-8 bg-orange-700">
        <div className="grid gap-4">
          <Link
            href={todayData.exegesis_link}
            className="block py-3 bg-blue-900 hover:bg-blue-800 rounded-lg text-center font-semibold"
          >
            Deep Dive
          </Link>
          <Link
            href={todayData.saint_reflection_link}
            className="block py-3 bg-blue-900 hover:bg-blue-800 rounded-lg text-center font-semibold"
          >
            Saint of the Day
          </Link>
          <Link
            href={todayData.usccb_link}
            className="block py-3 bg-blue-900 hover:bg-blue-800 rounded-lg text-center font-semibold"
          >
            Daily Readings
          </Link>
          <Link
            href="/donate"
            className="block py-3 bg-gold-500 hover:bg-gold-600 rounded-lg text-center font-semibold text-blue-900"
          >
            Donate
          </Link>
          <Link
            href="/shop"
            className="block py-3 bg-gold-500 hover:bg-gold-600 rounded-lg text-center font-semibold text-blue-900"
          >
            Shop Bands
          </Link>
        </div>
      </footer>
    </div>
  );
}