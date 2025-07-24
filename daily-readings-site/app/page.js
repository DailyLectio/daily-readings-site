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

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data[today]) {
          setTodayData(data[today]);
        } else {
          setTodayData({ error: "No data for today." });
        }
      });
  }, []);

  if (!todayData) return <p className="text-center mt-10">Loading...</p>;
  if (todayData.error) return <p className="text-center mt-10 text-red-500">{todayData.error}</p>;

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans px-4 pt-6 pb-10 max-w-md mx-auto">
      <header className="flex flex-col items-center mb-6">
        <Image src="/faithlinks-logo.png" alt="FaithLinks Logo" width={80} height={80} className="mb-2" />
        <h1 className="text-2xl font-semibold tracking-wide text-black">FaithLinks</h1>
      </header>

      <section className="mb-6 border-t border-gray-300 pt-4">
        <blockquote className="text-lg italic text-blue-900 leading-snug">
          “{todayData.quote}”
        </blockquote>
      </section>

      <section className="mb-6">
        <h2 className="text-sm text-gray-500 uppercase mb-2">Reading Summary</h2>
        <p className="text-sm leading-relaxed">{todayData.reading_summary}</p>
        {todayData.psalm_summary && <p className="text-sm mt-2 text-gray-700"><strong>Psalm:</strong> {todayData.psalm_summary}</p>}
        {todayData.gospel_summary && <p className="text-sm mt-2 text-gray-700"><strong>Gospel:</strong> {todayData.gospel_summary}</p>}
      </section>

      <section className="mb-8">
        <h2 className="text-sm text-gray-500 uppercase mb-2">Prayer</h2>
        <p className="text-sm italic text-gray-700 leading-relaxed">{todayData.daily_prayer}</p>
      </section>

      <section className="grid grid-cols-1 gap-3">
        <Link href={todayData.exegesis_link} className="block text-center bg-blue-900 text-white rounded py-2 text-sm tracking-wide hover:bg-blue-800">Read Exegesis</Link>
        <Link href={todayData.saint_reflection_link} className="block text-center bg-yellow-600 text-white rounded py-2 text-sm tracking-wide hover:bg-yellow-500">Saint Reflection</Link>
        <a href={todayData.usccb_link} target="_blank" rel="noopener noreferrer" className="block text-center bg-black text-white rounded py-2 text-sm tracking-wide hover:bg-gray-800">USCCB Reading</a>
        <Link href="/donate" className="block text-center bg-green-600 text-white rounded py-2 text-sm tracking-wide hover:bg-green-500">Donate</Link>
        <Link href="/shop" className="block text-center bg-purple-700 text-white rounded py-2 text-sm tracking-wide hover:bg-purple-600">Shop Bands</Link>
      </section>

      <footer className="text-center text-xs text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} FaithLinks / DailyWord LLC
      </footer>
    </main>
  );
}