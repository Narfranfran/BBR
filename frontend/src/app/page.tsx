"use client";

import { fetchHealth } from "@/services/api";

export default async function Home() {
  const health = await fetchHealth();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">BBr – BuscaBares</h1>
      <pre>{JSON.stringify(health, null, 2)}</pre>
    </main>
  );
}
