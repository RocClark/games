"use client";
import { useState } from "react";
import Head from "next/head";

export default function Breakout() {
  const [showRules, setShowRules] = useState(false);

  return (
    <>
      <Head>
        <title>Breakout Game</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
        <h1 className="text-4xl text-white mb-6">Breakout!</h1>
        <button
          className="btn rules-btn absolute top-8 left-8 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none"
          onClick={() => setShowRules(true)}
        >
          Show Rules
        </button>
        {showRules && (
          <div className="rules fixed top-0 left-0 bg-gray-900 text-white h-screen w-96 p-6 transform translate-x-0 transition-transform duration-1000">
            <h2 className="text-2xl mb-4">How To Play:</h2>
            <p className="mb-4">
              Use your right and left keys to move the paddle to bounce the ball
              up and break the blocks.
            </p>
            <p className="mb-4">
              If you miss the ball, your score and the blocks will reset.
            </p>
            <button
              className="btn px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none"
              onClick={() => setShowRules(false)}
            >
              Close
            </button>
          </div>
        )}
        <canvas
          id="canvas"
          width="800"
          height="600"
          className="bg-gray-200 rounded"
        ></canvas>
      </div>
    </>
  );
}
