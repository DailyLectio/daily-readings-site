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
        if (data[today]) {
          setTodayData(data[today]);
        } else {
          setTodayData({ error: "No data found for today." });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setTodayData({ error: "Unable to load daily readings." });
      }
    };
    fetchData();
  }, []);

  if (!todayData) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  if (todayData.error) {
    return <p className="text-center mt-10 text-red-500">{todayData.error}</p>;
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 p-4 max-w-md mx-auto">
      {/* Logo/Header */}
      <header className="flex flex-col items-center my-6">
        <Image
          src="/faithlinks-logo.png"
          alt="FaithLinks Logo"
          width={80}
          height={80}
        />
        <h1 className="mt-2 text-2xl font-semibold">FaithLinks</h1>
      </header>

      {/* Quote */}
      <section className="mb-6 border-t pt-4 border-gray-200">
        <blockquote className="italic text-blue-900">
          “{todayData.quote}”
        </blockquote>
      </section>

      {/* Summaries */}
      <section className="mb-6">
        <h2 className="text-sm text-gray-500 uppercase mb-1">Reading Summary</h2>
        <p className="text-sm leading-relaxed">{todayData.reading_summary}</p>
        {todayData.psalm_summary && (
          <p className="mt-2 text-sm">
            <strong>Psalm:</strong> {todayData.psalm_summary}
          </p>
        )}
        {todayData.gospel_summary && (
          <p className="mt-2 text-sm">
            <strong>Gospel:</strong> {todayData.gospel_summary}
          </p>
        )}
      </section>

      {/* Prayer */}
      <section className="mb-8">
        <h2 className="text-sm text-gray-500 uppercase mb-1">Prayer</h2>
        <p className="italic text-sm leading-relaxed">
          {todayData.daily_prayer}
        </p>
      </section>

      {/* Action Buttons */}
      <section className="grid gap-3">
        {todayData.exegesis_link && (
          <Link
            href={todayData.exegesis_link}
            className="block text-center bg-blue-900 text-white rounded py-2"
          >
            Read Exegesis
          </Link>
        )}
        {todayData.saint_reflection_link && (
          <Link
            href={todayData.saint_reflection_link}
            className="block text-center bg-yellow-600 text-white rounded py-2"
          >
            Saint Reflection
          </Link>
        )}
        {todayData.usccb_link && (
          <a
            href={todayData.usccb_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-black text-white rounded py-2"
          >
            USCCB Reading
          </a>
        )}
        <Link
          href="/donate"
          className="block text-center bg-green-600 text-white rounded py-2"
        >
          Donate
        </Link>
        <Link
          href="/shop"
          className="block text-center bg-purple-700 text-white rounded py-2"
        >
          Shop Bands
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} FaithLinks / DailyWord LLC
      </footer>
    </main>
  );
}