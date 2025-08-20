"use client";

import BottomNav from "../components/BottomNav";

const agents = [
  { name: "Luna", rarity: "common" },
  { name: "Milo", rarity: "rare" },
  { name: "Nova", rarity: "epic" },
];

const colors: Record<string, string> = {
  common: "bg-gray-300",
  rare: "bg-pink-300",
  epic: "bg-purple-300",
};

export default function AgentsPage() {
  return (
    <div className="min-h-screen pb-16 bg-gray-50 p-4 text-gray-800">
      <h1 className="text-xl mb-4">Agents</h1>
      <div className="grid gap-4">
        {agents.map((a) => (
          <div key={a.name} className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center justify-between">
              <span>{a.name}</span>
              <span className={`w-3 h-3 rounded-full ${colors[a.rarity]}`}></span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
