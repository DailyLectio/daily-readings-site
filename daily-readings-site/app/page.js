"use client";  // <-- THIS IS CRITICAL

import { useEffect, useState } from "react";

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

  if (!todayData) return <p>Loading...</p>;
  if (todayData.error) return <p>{todayData.error}</p>;

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Daily Catholic Reflection</h1>
      <p><strong>Quote:</strong> {todayData.quote}</p>
      <p><strong>Reading Summary:</strong> {todayData.reading_summary}</p>
      {todayData.psalm_summary && <p><strong>Psalm:</strong> {todayData.psalm_summary}</p>}
      {todayData.gospel_summary && <p><strong>Gospel:</strong> {todayData.gospel_summary}</p>}
      <p><strong>Prayer:</strong> {todayData.daily_prayer}</p>

      <div style={{ marginTop: "1rem" }}>
        <a href={todayData.exegesis_link} style={{ marginRight: "1rem" }}>Read Exegesis</a>
        <a href={todayData.saint_reflection_link} style={{ marginRight: "1rem" }}>Saint Reflection</a>
        <a href={todayData.usccb_link} target="_blank" rel="noopener noreferrer">USCCB Reading</a>
      </div>
    </main>
  );
}