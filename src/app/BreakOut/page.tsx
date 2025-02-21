"use client";

import { useState } from "react";
import Head from "next/head";
import GameCanvas from "../../components/breakout/GameCanvas";
import Rules from "../../components/breakout/Rules";

export default function Breakout() {
  const [showRules, setShowRules] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "hard" | null>(null); // TypeScript-friendly

  return (
    <>
      <Head>
        <title>Breakout Game</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 relative">
        <h1 className="text-4xl text-white mb-6">Breakout!</h1>

        {/* Rules Button */}
        <button
          className="btn absolute top-8 left-8 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none"
          onClick={() => setShowRules(true)}
        >
          Show Rules
        </button>

        {/* Rules Component */}
        {showRules && <Rules onClose={() => setShowRules(false)} />}

        {/* Difficulty Selection Modal */}
        {difficulty === null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Choose Difficulty</h2>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded m-2 hover:bg-green-700"
                onClick={() => setDifficulty("easy")}
              >
                Easy
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded m-2 hover:bg-red-700"
                onClick={() => setDifficulty("hard")}
              >
                Hard
              </button>
            </div>
          </div>
        )}

        {/* Game Canvas - Only render if difficulty is chosen */}
        {difficulty && <GameCanvas difficulty={difficulty} />}
      </div>
    </>
  );
}
