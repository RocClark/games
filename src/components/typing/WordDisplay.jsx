"use client";

export default function WordDisplay({ word }) {
  return (
    <div className="mb-4 text-center text-white">
      <h2 className="text-2xl">{word}</h2>
    </div>
  );
}
