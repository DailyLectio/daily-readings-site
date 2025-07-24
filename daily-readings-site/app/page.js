"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [todayData, setTodayData] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    // use the simplified raw URL format
    const url =
      "https://raw.githubusercontent.com/DailyLectio/daily-catholic-readings-data/main/final_daily_readings_2025_07.json";

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

  if (!todayData) return <p className="text-center mt-12 text-[#003E6C]">Loading...</p>;
  if (todayData.error)
    return <p className="text-center mt-12 text-red-600">{todayData.error}</p>;

  return (
    <div className="bg-white min-h-screen text-gray-900 flex flex-col">
      {/* Hero Banner in Marian Blue */}
      <header className="bg-[#003E6C] py-12 text-center px-6">
        <Image
          src="/faithlinks-logo.png"
          alt="FaithLinks"
          width={60}
          height={60}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-extrabold text-white mb-2">Daily Reflections</h1>
      </header>

      <div className="flex-grow overflow-auto">
        {/* Quote Section */}
        <section className="bg-[#003E6C] px-6 py-10">
          <blockquote className="text-xl md:text-2xl font-serif italic text-white leading-snug">
            &ldquo;{todayData.quote}&rdquo;
          </blockquote>
          <p className="mt-4 text-right font-semibold text-gray-200">
            &mdash; {todayData.quote_source || "Scripture"}
          </p>
        </section>

        {/* Content Blocks on white background */}
        <section className="px-6 py-8 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-[#003E6C]">First Reading Summary</h2>
            <p className="mt-3 leading-relaxed text-gray-800">
              {todayData.reading_summary}
            </p>
          </div>

          {todayData.psalm_summary && (
            <div className="bg-[#ECEFF1] p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-[#003E6C]">Responsorial Psalm</h2>
              <p className="mt-3 leading-relaxed text-gray-800">
                {todayData.psalm_summary}
              </p>
            </div>
          )}

          {todayData.gospel_summary && (
            <div>
              <h2 className="text-2xl font-bold text-[#003E6C]">Gospel Summary</h2>
              <p className="mt-3 leading-relaxed text-gray-800">
                {todayData.gospel_summary}
              </p>
            </div>
          )}

          <div className="bg-[#F5F5F5] px-6 py-8 rounded-lg">
            <h2 className="text-2xl font-bold text-[#003E6C]">Today&rsquo;s Prayer</h2>
            <p className="mt-4 italic leading-relaxed text-gray-800">
              {todayData.daily_prayer}
            </p>
          </div>
        </section>
      </div>

      {/* Action Buttons in footer Marian Blue */}
      <footer className="px-6 py-8 bg-[#003E6C]">
        <div className="grid gap-4">
          <Link
            href={todayData.exegesis_link}
            className="block py-3 bg-white text-[#003E6C] hover:bg-gray-100 rounded-lg text-center font-semibold"
          >
            Deep Dive
          </Link>
          <Link
            href={todayData.saint_reflection_link}
            className="block py-3 bg-white text-[#003E6C] hover:bg-gray-100 rounded-lg text-center font-semibold"
          >
            Saint of the Day
          </Link>
          <Link
            href={todayData.usccb_link}
            className="block py-3 bg-white text-[#003E6C] hover:bg-gray-100 rounded-lg text-center font-semibold"
          >
            Daily Readings
          </Link>
          <Link
            href="/donate"
            className="block py-3 bg-white text-[#003E6C] hover:bg-gray-100 rounded-lg text-center font-semibold"
          >
            Donate
          </Link>
          <Link
            href="/shop"
            className="block py-3 bg-white text-[#003E6C] hover:bg-gray-100 rounded-lg text-center font-semibold"
          >
            Shop Bands
          </Link>
        </div>
      </footer>
    </div>
  );
}
