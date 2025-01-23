"use client";

export default function ScoreDisplay({ score }) {
  return (
    <div className="text-center text-white mb-4">
      <h2 className="text-lg">Score: {score}</h2>
    </div>
  );
}
