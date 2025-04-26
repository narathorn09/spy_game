"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // <<== เพิ่มตรงนี้
import { motion, AnimatePresence } from "framer-motion";
import {
  handlePlayerChange,
  addPlayer,
  removePlayer,
  startGame,
  isReadyToStart
} from "../utils/playerUtils";

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
      router.push("/game"); // <<== ไปหน้าใหม่ "/game"
    }
  };

  useEffect(() => {
    const playersData = JSON.parse(localStorage.getItem("players"));
    if (playersData?.length > 0) {
      setPlayers(playersData);
    }

  }, []);

  return (
    <div className="min-h-screen p-8 sm:p-16 bg-gray-900 text-white font-sans">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-400">🎮 เกมสายลับ (Spy Game)</h1>
        <p className="text-lg text-gray-300">
          ค้นหาสายลับ ทำภารกิจให้สำเร็จ อย่าไว้ใจใครง่าย ๆ
        </p>
      </header>

      <main className="max-w-2xl mx-auto flex flex-col gap-8">
        {/* ผู้เล่น */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-300 mb-4">
            ใส่ชื่อนักเล่น
          </h2>

          {players.map((player, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder={`ผู้เล่นคนที่ ${index + 1}`}
                value={player.name}
                onChange={(e) =>
                  handlePlayerChange(players, index, e.target.value, setPlayers)
                }
                className="flex-18 p-2 rounded bg-gray-700 border-none text-white"
              />
              {players.length > 3 && (
                <button
                  onClick={() => removePlayer(players, index, setPlayers)}
                  className="flex-1 bg-red-500 hover:bg-red-600 p-2 rounded"
                >
                  -
                </button>
              )}
            </div>
          ))}
          <div className="flex gap-2 mt-5">
            {players.length < 10 && (
              <button
                onClick={() => addPlayer(players, setPlayers)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 p-2 rounded"
              >
                + เพิ่มผู้เล่น
              </button>
            )}
          </div>
        </div>

        {/* เลือกจำนวนสายลับ */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-300 mb-4">
            จำนวน SPY
          </h2>
          <div className="flex flex-wrap gap-4 mt-5">
            {[1, 2].map((num) => (
              <label key={num} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="spyNum"
                  value={num}
                  checked={spyNum === num}
                  onChange={() => setSpyNum(num)}
                  className="accent-green-300"
                />
                <span>{num} Spy</span>
              </label>
            ))}
          </div>
        </div>

        {/* ตั้งเวลาเล่นเกม */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-300 mb-4">
            กำหนดเวลาเล่น
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min={1}
              value={timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value))}
              className="w-24 p-2 rounded bg-gray-700 border-none text-white"
            />
            <span>นาที</span>
          </div>
        </div>


        {/* ปุ่มเริ่มเกม */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleStartGame}
            disabled={!isReadyToStart(players)}
            className={`flex-1 p-2 rounded ${!isReadyToStart(players)
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
              }`}
          >
            เริ่มเกม
          </button>
        </div>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>FNNz</p>
      </footer>
    </div>
  );
}
