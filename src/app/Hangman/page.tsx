"use client";
import React, { useState, useEffect } from "react";
import GameContainer from "../../components/hangman/GameContainer";
import Figure from "../../components/hangman/Figure";
import WrongLetters from "../../components/hangman/WrongLetter";
import Word from "../../components/hangman/Word";
import ErrorMessage from "../../components/hangman/ErrorMessage";
import Message from "../../components/hangman/Message";

export default function Hangman() {
  const [categories] = useState<string[]>([
    "Superheroes",
    "Mountains",
    "Place",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Superheroes");
  const [words, setWords] = useState<{ word: string; description: string }[]>(
    []
  );
  const [selectedWord, setSelectedWord] = useState("");
  const [wordDescription, setWordDescription] = useState("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [notification, setNotification] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  // Fetch words based on the selected category and reset game
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(`/api/words?category=${selectedCategory}`);
        const data = await response.json();

        if (data.length > 0) {
          setWords(data);
          const randomIndex = Math.floor(Math.random() * data.length);
          setSelectedWord(data[randomIndex].word);
          setWordDescription(data[randomIndex].description);
        } else {
          console.error("No words found for the selected category.");
        }
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    // Reset game states
    setCorrectLetters([]);
    setWrongLetters([]);
    setGameOverMessage("");
    setHasStarted(false);

    fetchWords();
  }, [selectedCategory]);

  const showNotification = () => {
    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!hasStarted) {
      setHasStarted(true);
    }

    const letter = e.key.toLowerCase();

    if (selectedWord.toLowerCase().includes(letter)) {
      if (!correctLetters.includes(letter)) {
        setCorrectLetters([...correctLetters, letter]);
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter) && letter !== " ") {
        setWrongLetters([...wrongLetters, letter]);
      } else {
        showNotification();
      }
    }
  };

  useEffect(() => {
    const handleWin = () => {
      const word = selectedWord
        .toLowerCase()
        .split("")
        .filter((char) => char !== " ")
        .every((letter) => correctLetters.includes(letter));

      if (word) {
        setGameOverMessage(
          `Congratulations! You won! 😃\n\n${wordDescription}`
        );
      }
    };

    const handleLose = () => {
      if (wrongLetters.length === 6) {
        setGameOverMessage(
          `Unfortunately, you lost. The word was "${selectedWord}". 😕\n\n${wordDescription}`
        );
      }
    };

    if (hasStarted) {
      handleWin();
      handleLose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [correctLetters, wrongLetters, selectedWord, hasStarted]);

  const resetGame = () => {
    setCorrectLetters([]);
    setWrongLetters([]);
    setGameOverMessage("");
    setHasStarted(false);

    // Choose a new word
    const randomIndex = Math.floor(Math.random() * words.length);
    setSelectedWord(words[randomIndex].word);
    setWordDescription(words[randomIndex].description);
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white min-h-screen p-6">
      <div className="mb-4">
        <label htmlFor="category" className="mr-2">
          Select a category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
          className="p-2 rounded bg-gray-700 text-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <GameContainer />
      <div className="relative flex flex-col items-center">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      {gameOverMessage && (
        <Message gameOverMessage={gameOverMessage} resetGame={resetGame} />
      )}
      <ErrorMessage notification={notification} />
    </div>
  );
}
