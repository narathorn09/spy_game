"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const steps = ["Welcome Agent", "Trust no one", "Earn XP"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 text-center text-gray-800">
      <p className="mb-8 text-lg">{steps[step]}</p>
      <button
        onClick={next}
        className="w-full max-w-xs h-12 bg-pink-500 text-white rounded-lg mb-4"
      >
        Next
      </button>
      <button
        onClick={() => router.push("/")}
        className="text-gray-500 text-sm"
      >
        Skip
      </button>
    </div>
  );
}
