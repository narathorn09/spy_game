"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

export default function GameScreen() {
    const [players, setPlayers] = useState<{ name: string; isSpy: boolean; role: string; hasSeenRole: boolean }[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<{ Location: string; roles: string[] }>({ Location: "", roles: [""] });
    const [selectedPlayer, setSelectedPlayer] = useState<{ name: string; isSpy: boolean; role: string } | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [allSeen, setAllSeen] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // 👈 เพิ่ม state สำหรับเช็คว่าหยุดอยู่ไหม
    const [timeLeft, setTimeLeft] = useState(0);
    const [timeLast, setTimeLast] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);

    useEffect(() => {
        const playersData = localStorage.getItem("players");
        const locationData = localStorage.getItem("selectedLocation");
        if (playersData) {
            const loadedPlayers = JSON.parse(playersData).map((p: any) => ({ ...p, hasSeenRole: false }));
            setPlayers(loadedPlayers);
        }
        if (locationData) setSelectedLocation(JSON.parse(locationData));
    }, []);

    useEffect(() => {
        if (timeLast === 0) {
            const timeLimit = localStorage.getItem("timeLimit") || '""';
            setTimeLeft(parseInt(timeLimit, 10) * 60);
        }

        if (!isRunning || isPaused) {
            setTimeLeft(timeLast);
            return; // 👈 เช็คว่าต้อง isRunning และ !isPaused
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsRunning(false);
                    setGameEnded(true);
                    return 0;
                }
                setTimeLast(prev - 1);
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, isPaused]); // 👈 ต้องใส่ isPaused ใน dependency ด้วย

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

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            {!gameEnded && <div>
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-400">🔍 ดูบทบาทของคุณ</h1>
                </header>

                {/* Main player list */}
                <main className="max-w-xl mx-auto flex flex-col gap-4">
                    {players.map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow">
                            <span>{player.name}</span>
                            {!player.hasSeenRole && (
                                <button
                                    onClick={() => handleViewRole(idx)}
                                    className="text-green-300 hover:text-green-400"
                                >
                                    <Eye className="w-6 h-6" />
                                </button>
                            )}
                        </div>
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
                            className="bg-gray-800 p-6 rounded-xl max-w-sm w-full text-center"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">ข้อมูลของคุณ</h2>
                            {selectedPlayer?.isSpy ? (
                                <>
                                    <p className="text-red-400 text-xl mb-2">
                                        คุณคือ <b>Spy</b> 🕵️‍♂️
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
                <div className="text-6xl font-mono mb-8 flex items-center justify-center p-4 mt-10">
                    {formatTime(timeLeft)}
                </div>
            )}

            {/* Running buttons */}
            {isRunning && !gameEnded && (
                <div className="mt-10 text-center">
                    {!isPaused ? (
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded text-xl font-bold"
                            onClick={stopTimer}
                        >
                            หยุดเวลา ⏸️
                        </button>
                    ) : (
                        <button
                            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded text-xl font-bold"
                            onClick={resumeTimer}
                        >
                            นับเวลาต่อ ▶️
                        </button>
                    )}
                    <button
                        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded text-xl font-bold ml-4"
                        onClick={endGame}
                    >
                        จบเกม 🚨
                    </button>
                </div>
            )}


            {/* Game ended reveal */}
            {gameEnded && (
                <div className="mt-10 text-center">
                    <h2 className="text-2xl font-bold text-white">เกมจบแล้ว! 🎉</h2>
                    <p className="text-xl text-white mt-4">
                        สถานที่คือ: <b>{selectedLocation?.Location}</b>
                    </p>
                    <div className="mt-6 flex justify-center items-center">
                        <div className="p-4 bg-gray-800 p-4 rounded-lg shadow">
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
                        className="mt-8 bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-xl font-bold"
                        onClick={() => window.location.href = "/"} // กลับไปหน้าหลัก
                    >
                        กลับไปหน้าหลัก
                    </button>
                </div>
            )}
        </div>
    );
}
