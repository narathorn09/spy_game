"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "./components/ProgressBar";
import Toast from "./components/Toast";
import BottomNav from "./components/BottomNav";

const missions = ["Retrieve docs", "Crack code", "Hide evidence"];

export default function PlayPage() {
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState("");
  const router = useRouter();

  const handleAction = () => {
    const success = Math.random() > 0.5;
    setToast(success ? "+5 XP" : "+0 XP");
    const next = (step + 1) % missions.length;
    setStep(next);
    setTimeout(() => {
      router.push(`/result?success=${success}`);
    }, 2500);
  };

  return (
    <div className="min-h-screen pb-16 bg-gray-50 flex flex-col text-gray-800">
      <ProgressBar value={(step / missions.length) * 100} />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow p-6 text-center w-full max-w-xs">
          <h2 className="text-lg mb-2">{missions[step]}</h2>
          <p className="text-sm text-gray-500">Choose wisely</p>
        </div>
        <div className="mt-6 w-full max-w-xs space-y-3">
          {"spy decode hide".split(" ").map((label) => (
            <button
              key={label}
              className="w-full h-12 rounded-lg bg-pink-500 text-white"
              onClick={handleAction}
            >
              {label[0].toUpperCase() + label.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <Toast message={toast} show={!!toast} onClose={() => setToast("")} />
      <BottomNav />
    </div>
  );
}
