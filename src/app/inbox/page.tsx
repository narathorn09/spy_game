"use client";

import BottomNav from "../components/BottomNav";

const messages = ["Meet at dawn", "Code red", "Report in"];

export default function InboxPage() {
  return (
    <div className="min-h-screen pb-16 bg-gray-50 p-4 text-gray-800">
      <h1 className="text-xl mb-4">Inbox</h1>
      <ul className="space-y-2">
        {messages.map((m, i) => (
          <li key={i} className="bg-white p-4 rounded-xl shadow">
            {m}
          </li>
        ))}
      </ul>
      <BottomNav />
    </div>
  );
}
