import React from "react";
import Link from "next/link";

export default function Home() {
  console.log("Root page is rendering");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div className="bg-white h-3/4 p-8 rounded-2xl shadow-lg text-center flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6 text-black">
          Welcome to My Simple Games Page
        </h1>
        <div className="flex flex-col space-y-4">
          <Link
            href="/Hangman"
            className="text-blue-600 hover:underline text-lg"
          >
            Hangman
          </Link>
          <Link
            href="/Typing"
            className="text-blue-600 hover:underline text-lg"
          >
            Typing Game
          </Link>
          <Link
            href="/BreakOut"
            className="text-blue-600 hover:underline text-lg"
          >
            BreakOut Game
          </Link>
        </div>
      </div>
    </div>
  );
}
