"use client";

import { useState } from "react";
import BottomNav from "../components/BottomNav";

export default function SettingsPage() {
  const [mute, setMute] = useState(false);
  return (
    <div className="min-h-screen pb-16 bg-gray-50 p-4 text-gray-800">
      <h1 className="text-xl mb-4">Settings</h1>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="h-4 w-4 accent-pink-500"
          checked={mute}
          onChange={() => setMute(!mute)}
        />
        <span>Mute</span>
      </label>
      <BottomNav />
    </div>
  );
}
