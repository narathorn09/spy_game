"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import BottomNav from "../components/BottomNav";

function ResultContent() {
  const router = useRouter();
  const params = useSearchParams();
  const success = params.get("success") === "true";

  return (
    <div className="min-h-screen pb-16 flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.y > 50) router.push("/");
        }}
        className="bg-white rounded-xl shadow p-8 text-center w-full max-w-xs"
      >
        <h2 className="text-xl mb-2">
          {success ? "Mission Success" : "Mission Failed"}
        </h2>
        <p className="mb-4">{success ? "+5 XP" : "+0 XP"}</p>
        <button
          onClick={() => router.push("/")}
          className="w-full h-12 rounded-lg bg-pink-500 text-white"
        >
          Next
        </button>
      </motion.div>
      <BottomNav />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultContent />
    </Suspense>
  );
}
