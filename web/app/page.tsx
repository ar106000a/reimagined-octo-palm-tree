"use client";
import { useEffect, useState } from "react";


export default function Home() {
  const [salons, setSalons] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/salons") // Your Hono API
      .then((res) => res.json())
      .then((data) => setSalons(data.data));
  }, []);

  return (
    <div>
      <h1>Salons</h1>
      <ul>
        {salons.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
}
