import React from "react";
import Link from "next/link";

export default function Home() {
  console.log("Root page is rendering");
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Under Consturction</h1>
      <Link href="./Hangman">Hangman</Link>
      <Link href="./Typing">Typing Game</Link>
      <Link href="./BreakOut">BreakOut Game</Link>
    </div>
  );
}
