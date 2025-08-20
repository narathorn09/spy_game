"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  handlePlayerChange,
  addPlayer,
  removePlayer,
  startGame,
  isReadyToStart
} from "../utils/playerUtils";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const KawaiiMascot = dynamic(() => import("./components/KawaiiMascot"), {
  ssr: false,
});

export default function Home() {
  const [players, setPlayers] = useState([
    { name: "", isSpy: false, role: "" },
    { name: "", isSpy: false, role: "" },
    { name: "", isSpy: false, role: "" }
  ]);
  const [spyNum, setSpyNum] = useState<number>(1);
  const [timeLimit, setTimeLimit] = useState<number>(5);
  const router = useRouter();

  const isReadyToStartCheck = isReadyToStart(players);

  const handleStartGame = () => {
    if (isReadyToStartCheck) {
      startGame(players, spyNum);
      localStorage.setItem("timeLimit", timeLimit.toString());
      router.push("/game");
    }
  };

  useEffect(() => {
    const playersData = JSON.parse(localStorage.getItem("players") || "[]");
    if (playersData?.length > 0) {
      setPlayers(playersData);
    }
  }, []);

  return (
    <div className="min-h-screen p-6 sm:p-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Spy Game 🎮
        </h1>
        <p className="text-lg text-gray-300 mt-3">
          ค้นหาสายลับ ทำภารกิจให้สำเร็จ อย่าไว้ใจใครง่าย ๆ
        </p>
      </motion.header>

      <main className="max-w-3xl mx-auto space-y-10">
        {/* ผู้เล่น */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-green-300 mb-4">
            จำนวนผู้เล่น
          </h2>

          {players.map((player, index) => (
            <div key={index} className="flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder={`ผู้เล่นคนที่ ${index + 1}`}
                value={player.name}
                onChange={(e) =>
                  handlePlayerChange(players, index, e.target.value, setPlayers)
                }
                className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              {players.length > 3 && (
                <button
                  onClick={() => removePlayer(players, index, setPlayers)}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition"
                >
                  -
                </button>
              )}
            </div>
          ))}

          {players.length < 10 && (
            <button
              onClick={() => addPlayer(players, setPlayers)}
              className="w-full bg-blue-500 hover:bg-blue-600 p-2 mt-4 rounded-lg transition"
            >
              + เพิ่มผู้เล่น
            </button>
          )}
        </motion.section>

        {/* เลือกจำนวนสายลับ */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-green-300 mb-4">
            จำนวน SPY
          </h2>
          <div className="flex gap-4">
            {[1, 2].map((num) => (
              <label
                key={num}
                className="flex items-center gap-2 cursor-pointer text-white"
              >
                <input
                  type="radio"
                  name="spyNum"
                  value={num}
                  checked={spyNum === num}
                  onChange={() => setSpyNum(num)}
                  className="accent-green-400"
                />
                <span>{num} Spy</span>
              </label>
            ))}
          </div>
        </motion.section>

        {/* ตั้งเวลาเล่นเกม */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-green-300 mb-4">
            กำหนดเวลาเล่น
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min={1}
              value={timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value))}
              className="w-24 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <span className="text-gray-300">นาที</span>
          </div>
        </motion.section>

        {/* ปุ่มเริ่มเกม */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex"
        >
          <button
            onClick={handleStartGame}
            disabled={!isReadyToStart(players)}
            className={`flex-1 p-3 rounded-xl transition text-lg font-semibold ${
              !isReadyToStart(players)
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            เริ่มเกม
          </button>
        </motion.div>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>FNNz</p>
      </footer>
      <KawaiiMascot />
    </div>
  );
}
