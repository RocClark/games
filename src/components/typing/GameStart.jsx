"use client";

export default function GameStart({ setDifficulty, onStart }) {
  return (
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h2 className="text-xl mb-4">Select Difficulty</h2>
      <div className="space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setDifficulty("easy");
            onStart();
          }}
        >
          Easy
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setDifficulty("medium");
            onStart();
          }}
        >
          Medium
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setDifficulty("hard");
            onStart();
          }}
        >
          Hard
        </button>
      </div>
    </div>
  );
}
