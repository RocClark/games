"use client";
import { useState, useEffect } from "react";
import GameStart from "../../components/typing/GameStart";
import GameOver from "../../components/typing/GameOver";
import GameTimer from "../../components/typing/GameTimer";
import WordInput from "../../components/typing/WordInput";
import WordDisplay from "../../components/typing/WordDisplay";
import ScoreDisplay from "../../components/typing/ScoreDisplay";

const fallbackWords = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

export default function TypingGame() {
  const [difficulty, setDifficulty] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);
  const [randomWord, setRandomWord] = useState("");
  const [inputText, setInputText] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const getRandomWord = async () => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      const data = await response.json();
      return data[0];
    } catch (error) {
      return fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    }
  };

  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameOver(true);
          setFinalScore(score);
        }
        return prevTime - 1;
      });
    }, 1000);

    const gameGoalTimer = setTimeout(() => {
      clearInterval(timer);
      setGameWon(true);
      setFinalScore(score);
    }, 60000);

    return () => {
      clearInterval(timer);
      clearTimeout(gameGoalTimer);
    };
  }, [score, gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      getRandomWord().then(setRandomWord);
    }
  }, [gameStarted]);

  const handleRestart = () => {
    setGameOver(false);
    setGameWon(false);
    setFinalScore(0);
    setScore(0);
    setTime(10);
    setRandomWord("");
    setInputText("");
    setGameStarted(false);
  };

  const handleInputChange = (value: string) => {
    setInputText(value); // Update inputText state to reflect user input

    if (value === randomWord) {
      setScore((prev) => prev + 1);
      getRandomWord().then(setRandomWord);
      setInputText(""); // Clear input box after a correct word
      const timeBonus =
        difficulty === "hard" ? 2 : difficulty === "medium" ? 3 : 5;
      setTime((prev) => prev + timeBonus);
    }
  };
  if (!gameStarted) {
    return (
      <GameStart
        setDifficulty={setDifficulty}
        onStart={() => setGameStarted(true)}
      />
    );
  }

  if (gameOver || gameWon) {
    return (
      <GameOver
        score={finalScore}
        onRestart={handleRestart}
        gameWon={gameWon}
      />
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center font-sans">
      <GameTimer time={time} />
      <WordDisplay word={randomWord} />
      <WordInput value={inputText} onChange={handleInputChange} />
      <ScoreDisplay score={score} />
    </div>
  );
}
