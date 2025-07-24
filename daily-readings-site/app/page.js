"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [todayData, setTodayData] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
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

  if (!todayData)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-[#003E6C]">Loading…</p>
      </div>
    );

  if (todayData.error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-red-600">{todayData.error}</p>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* ————— Hero ————— */}
      <header className="bg-[#003E6C] text-white p-6 text-center">
        <Image
          src="/faithlinks-logo.png"
          alt="FaithLinks"
          width={60}
          height={60}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold">Daily Reflections</h1>
      </header>

      {/* ————— Main content ————— */}
      <main className="flex-grow overflow-auto">
        {/* Quote */}
        <section className="bg-[#003E6C] text-white p-6">
          <blockquote className="italic text-xl leading-relaxed">
            &ldquo;{todayData.quote}&rdquo;
          </blockquote>
          <p className="mt-2 text-right font-semibold">&mdash; Scripture</p>
        </section>

        {/* Summaries */}
        <section className="p-6 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-[#003E6C]">
              First Reading Summary
            </h2>
            <p className="mt-2 leading-relaxed text-gray-800">
              {todayData.reading_summary}
            </p>
          </div>

          {todayData.psalm_summary && (
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-2xl font-bold text-[#003E6C]">
                Responsorial Psalm
              </h2>
              <p className="mt-2 leading-relaxed text-gray-800">
                {todayData.psalm_summary}
              </p>
            </div>
          )}

          {todayData.gospel_summary && (
            <div>
              <h2 className="text-2xl font-bold text-[#003E6C]">
                Gospel Summary
              </h2>
              <p className="mt-2 leading-relaxed text-gray-800">
                {todayData.gospel_summary}
              </p>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-2xl font-bold text-[#003E6C]">
              Today’s Prayer
            </h2>
            <p className="mt-2 italic leading-relaxed text-gray-800">
              {todayData.daily_prayer}
            </p>
          </div>
        </section>
      </main>

      {/* ————— Footer buttons ————— */}
      <footer className="bg-[#003E6C] p-6">
        <div className="grid gap-4">
          {todayData.exegesis && (
            <Link
              href={`/exegesis/${new Date()
                .toISOString()
                .slice(0, 10)}`}
              className="block bg-white text-[#003E6C] py-2 rounded text-center font-semibold"
            >
              Deep Dive
            </Link>
          )}

          {todayData.saint_reflection && (
            <Link
              href={`/saint/${new Date()
                .toISOString()
                .slice(0, 10)}`}
              className="block bg-white text-[#003E6C] py-2 rounded text-center font-semibold"
            >
              Saint of the Day
            </Link>
          )}

          <a
            href={todayData.usccb_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white text-[#003E6C] py-2 rounded text-center font-semibold"
          >
            Daily Readings
          </a>

          <Link
            href="/donate"
            className="block bg-white text-[#003E6C] py-2 rounded text-center font-semibold"
          >
            Donate
          </Link>

          <Link
            href="/shop"
            className="block bg-white text-[#003E6C] py-2 rounded text-center font-semibold"
          >
            Shop Bands
          </Link>
        </div>
      </footer>
    </div>
  );
}