"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function GameScreen() {
    const [players, setPlayers] = useState<{ name: string; isSpy: boolean; role: string; hasSeenRole: boolean }[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<{ Location: string; roles: string[] }>({ Location: "", roles: [""] });
    const [selectedPlayer, setSelectedPlayer] = useState<{ name: string; isSpy: boolean; role: string } | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [allSeen, setAllSeen] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // 👈 เพิ่ม state สำหรับเช็คว่าหยุดอยู่ไหม
    const [duration, setDuration] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);

    useEffect(() => {
        const playersData = localStorage.getItem("players");
        const locationData = localStorage.getItem("selectedLocation");
        const timeLimit = localStorage.getItem("timeLimit");

        if (playersData) {
            const loadedPlayers = JSON.parse(playersData).map((p: { name: string; isSpy: boolean; role: string; hasSeenRole: boolean }) => ({ ...p, hasSeenRole: false }));
            setPlayers(loadedPlayers);
        }
        if (locationData) setSelectedLocation(JSON.parse(locationData));
        if (timeLimit) {
            const total = parseInt(timeLimit, 10) * 60;
            setDuration(total);
            setTimeLeft(total);
        }
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleViewRole = (index: number) => {
        setSelectedPlayer(players[index]);
        setShowModal(true);

        const updatedPlayers = [...players];
        updatedPlayers[index].hasSeenRole = true;
        setPlayers(updatedPlayers);

        if (updatedPlayers.every((p) => p.hasSeenRole)) {
            setAllSeen(true);
        }
    };

    const stopTimer = () => {
        setIsPaused(true); // 👈 หยุดเวลา (แต่ไม่ set isRunning = false)
    };

    const resumeTimer = () => {
        setIsPaused(false); // 👈 กลับมานับต่อ
    };

    const endGame = () => {
        setIsRunning(false);
        setIsPaused(false);
        setGameEnded(true);
    };

    const shake = timeLeft <= 5 ? 12 : 6;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            {!gameEnded && <div>
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-400">🔍 ดูบทบาทของคุณ</h1>
                </header>

                {/* Main player list */}
                <main className="max-w-xl mx-auto flex flex-col gap-4">
                    {players.map((player, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center justify-between bg-gray-800 p-4 rounded-2xl shadow-md transition duration-300"
                        >
                            <span className="text-lg font-medium">{player.name}</span>
                            {!player.hasSeenRole && (
                                <button
                                    onClick={() => handleViewRole(idx)}
                                    className="text-green-400 hover:text-green-300 hover:cursor-pointer transition duration-200"
                                >
                                    <Eye className="w-6 h-6" />
                                </button>
                            )}
                        </motion.div>

                    ))}
                </main>
            </div>}

            {/* Modal for role viewing */}
            <AnimatePresence>
                {showModal && selectedPlayer && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gray-900 p-6 rounded-2xl text-center shadow-lg border border-gray-700 w-xs"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">ข้อมูลของคุณ</h2>
                            {selectedPlayer?.isSpy ? (
                                <>
                                    <p className="text-red-400 text-xl mb-2">
                                        คุณคือ <b>Spy</b>
                                    </p>
                                    <p className="text-gray-400">คุณไม่รู้สถานที่</p>
                                    {players.filter(p => p.isSpy && p.name !== selectedPlayer.name).length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-red-300">สายลับอีกคนคือ:</p>
                                            {players.filter(p => p.isSpy && p.name !== selectedPlayer.name).map((spy, idx) => (
                                                <p key={idx} className="text-lg font-bold text-white">{spy.name}</p>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p className="text-green-400 text-xl mb-2">
                                        สถานที่: <b>{selectedLocation?.Location}</b>
                                    </p>
                                    <p className="text-gray-300">
                                        คุณคือ {selectedPlayer?.role}
                                    </p>
                                </>
                            )}
                            <button
                                onClick={() => setShowModal(false)}
                                className="mt-6 bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                            >
                                ปิด
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Button section */}
            {allSeen && !isRunning && !gameEnded && (
                <div className="mt-10 text-center">
                    <button
                        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded text-xl font-bold"
                        onClick={() => {
                            setIsRunning(true);
                            setIsPaused(false);
                        }}
                    >
                        เริ่มจับเวลา 🔥
                    </button>
                </div>
            )}

            {/* Countdown */}
            {isRunning && !gameEnded && (
                <motion.div
                    className="flex justify-center mt-10"
                    animate={timeLeft <= 10 ? { x: [0, -shake, shake, -shake, shake, 0] } : {}}
                    transition={timeLeft <= 10 ? { duration: 0.5, repeat: Infinity, repeatType: "loop" } : {}}
                >
                    <CountdownCircleTimer
                        isPlaying={!isPaused}
                        duration={duration}
                        initialRemainingTime={timeLeft}
                        colors={["#10B981", "#FBBF24", "#EF4444"]}
                        colorsTime={[duration, duration / 2, 0]}
                        size={200}
                        strokeWidth={12}
                        onUpdate={(remainingTime) => setTimeLeft(remainingTime)}
                        onComplete={() => {
                            setIsRunning(false);
                            setGameEnded(true);
                        }}
                    >
                        {({ remainingTime }) => (
                            <span className="text-5xl font-mono font-bold">
                                {formatTime(remainingTime)}
                            </span>
                        )}
                    </CountdownCircleTimer>
                </motion.div>
            )}

            {/* Running buttons */}
            {isRunning && !gameEnded && (
                <div className="mt-10 text-center">
                    {!isPaused ? (
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 transition duration-200 px-6 py-3 rounded-xl text-lg font-semibold shadow"
                            onClick={stopTimer}
                        >
                            หยุดเวลา ⏸️
                        </button>

                    ) : (
                        <button
                            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-xl font-bold"
                            onClick={resumeTimer}
                        >
                            นับเวลาต่อ ▶️
                        </button>
                    )}
                    <button
                        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl text-xl font-bold ml-4"
                        onClick={endGame}
                    >
                        จบเกม 🚨
                    </button>
                </div>
            )}


            {/* Game ended reveal */}
            {gameEnded && (
                <div className="mt-10 text-center">

                    <h1 className="text-5xl font-extrabold text-white text-center">
                        เกมจบแล้ว!
                    </h1>
                    <p className="text-xl text-blue-400 mt-4 text-center">
                        สถานที่คือ: <b>{selectedLocation?.Location}</b>
                    </p>
                    <div className="mt-6 flex justify-center items-center">
                        <div className="p-8 bg-gray-800 pl-10 pr-10 rounded-lg shadow">
                            {players.map((player, idx) => (
                                <div key={idx} className="grid grid-cols-2 gap-4 mb-2">
                                    <p className={`text-lg text-start text-red-400 ${player.isSpy
                                        ? "text-red-400"
                                        : "text-white"
                                        }`}>{player.name}</p>
                                    <p className={`text-lg text-start ${player.isSpy
                                        ? "text-red-400"
                                        : "text-white"
                                        }`}>{player.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        className="mt-8 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-xl font-bold"
                        onClick={() => window.location.href = "/"} // กลับไปหน้าหลัก
                    >
                        กลับไปหน้าหลัก
                    </button>
                </div>
            )}
        </div>
    );
}
