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
    <div>
      <section className="mb-6 text-center">
        <Image
          src="/faithlinks-logo.png"
          alt="FaithLinks Logo"
          width={80}
          height={80}
          className="mx-auto"
        />
        <h1 className="mt-2 text-3xl font-bold">FaithLinks</h1>
      </section>

      <section className="mb-6 border-t pt-4 border-gray-200 px-4">
        <blockquote className="italic text-blue-900 text-lg leading-relaxed">
          “{todayData.quote}”
        </blockquote>
      </section>

      <section className="mb-6 px-4">
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

      <section className="mb-8 px-4">
        <h2 className="text-sm text-gray-500 uppercase mb-1">Prayer</h2>
        <p className="italic text-sm leading-relaxed">{todayData.daily_prayer}</p>
      </section>

      <section className="grid gap-3 px-4 mb-10">
        {todayData.exegesis_link && (
          <Link
            href={todayData.exegesis_link}
            className="block bg-blue-900 text-white rounded py-2 text-center"
          >
            Read Exegesis
          </Link>
        )}
        {todayData.saint_reflection_link && (
          <Link
            href={todayData.saint_reflection_link}
            className="block bg-yellow-600 text-white rounded py-2 text-center"
          >
            Saint Reflection
          </Link>
        )}
        {todayData.usccb_link && (
          <a
            href={todayData.usccb_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-black text-white rounded py-2 text-center"
          >
            USCCB Reading
          </a>
        )}
        <Link
          href="/donate"
          className="block bg-green-600 text-white rounded py-2 text-center"
        >
          Donate
        </Link>
        <Link
          href="/shop"
          className="block bg-purple-700 text-white rounded py-2 text-center"
        >
          Shop Bands
        </Link>
      </section>
    </div>
  );
}