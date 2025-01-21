"use client";
import { useState, useEffect } from "react";
import Settings from "../../components/typing/Settings";
import GameLogic from "../../components/typing/GameLogic";
import EndGame from "../../components/typing/EndGame";

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

  // Fetch a random word from the API or fallback to local
  const getRandomWord = async () => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      const data = await response.json();
      return data[0]; // Return the fetched word
    } catch (error) {
      console.error("Error fetching random word, using fallback:", error);
      return fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    }
  };

  // Start the timer
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
    }, 60000); // 1-minute game goal

    return () => {
      clearInterval(timer);
      clearTimeout(gameGoalTimer);
    };
  }, [score, gameStarted]);

  // Initialize the first word
  useEffect(() => {
    if (gameStarted) {
      getRandomWord().then(setRandomWord);
    }
  }, [gameStarted]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);

    if (value === randomWord) {
      setScore((prevScore) => prevScore + 1);
      getRandomWord().then(setRandomWord);
      setInputText("");

      const timeBonus =
        difficulty === "hard" ? 2 : difficulty === "medium" ? 3 : 5;
      setTime((prevTime) => prevTime + timeBonus);
    }
  };

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

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans relative">
      {!gameStarted ? (
        <div className="bg-white p-6 rounded shadow-md text-center">
          <h2 className="text-xl mb-4">Select Difficulty</h2>
          <div className="space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setDifficulty("easy");
                handleStartGame();
              }}
            >
              Easy
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setDifficulty("medium");
                handleStartGame();
              }}
            >
              Medium
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setDifficulty("hard");
                handleStartGame();
              }}
            >
              Hard
            </button>
          </div>
        </div>
      ) : gameOver ? (
        <EndGame score={finalScore} onRestart={handleRestart} />
      ) : gameWon ? (
        <div className="text-center text-white">
          <h1 className="text-2xl mb-4">Congratulations! You Won!</h1>
          <p className="mb-4">Final Score: {finalScore}</p>
          <button
            className="bg-green-500 px-4 py-2 rounded text-white"
            onClick={handleRestart}
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <Settings difficulty={difficulty} setDifficulty={setDifficulty} />
          <GameLogic
            randomWord={randomWord}
            inputText={inputText}
            score={score}
            time={time}
            onInputChange={handleInputChange}
          />
        </>
      )}
    </div>
  );
}
