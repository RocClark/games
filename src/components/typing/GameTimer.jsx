"use client";

export default function GameTimer({ time }) {
  return (
    <div className="text-center text-white mb-4">
      <h2 className="text-lg">Time Remaining: {time} seconds</h2>
    </div>
  );
}
