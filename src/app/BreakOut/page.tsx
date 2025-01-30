"use client";

import { useState } from "react";
import Head from "next/head";
import GameCanvas from "../../components/breakout/GameCanvas";
import Rules from "../../components/breakout/Rules";

export default function Breakout() {
  const [showRules, setShowRules] = useState(false);

  console.log("showRules state:", showRules); // Debugging

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
        {showRules && (
          <Rules
            onClose={() => {
              console.log("Closing rules..."); // Debugging
              setShowRules(false);
            }}
          />
        )}

        {/* Game Canvas */}
        <GameCanvas />
      </div>
    </>
  );
}
