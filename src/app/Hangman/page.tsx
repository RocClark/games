"use client"
import React, { useState, useEffect } from 'react';
import GameContainer from '../../components/hangman/GameContainer';
import Figure from '../../components/hangman/Figure';
import WrongLetters from '../../components/hangman/WrongLetter';
import Word from '../../components/hangman/Word';
import ErrorMessage from '../../components/hangman/ErrorMessage';
import Message from '../../components/hangman/Message';

export default function Hangman() {
  const [words, setWords] = useState<string[]>([]); // Store words fetched from API
  const [selectedWord, setSelectedWord] = useState("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [notification, setNotification] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState(""); // Initially empty, no message displayed
  const [hasStarted, setHasStarted] = useState(false); // Track if the game has started

  useEffect(() => {
    fetch("/api/words")
      .then((response) => response.json())
      .then((data) => {
        setWords(data);
        const randomIndex = Math.floor(Math.random() * data.length);
        setSelectedWord(data[randomIndex]);
      })
      .catch((error) => console.error("Error fetching words:", error));
  }, []);

  const showNotification = () => {
    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Only start the game if the user presses a key (i.e., when the user interacts)
    if (!hasStarted) {
      setHasStarted(true);
    }

    const letter = e.key.toLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        setCorrectLetters([...correctLetters, letter]);
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters([...wrongLetters, letter]);
      } else {
        showNotification();
      }
    }
  };

  useEffect(() => {
    const handleWin = () => {
      const word = selectedWord
        .split("")
        .every((letter) => correctLetters.includes(letter));
      if (word) {
        setGameOverMessage("Congratulations! You won! 😃");
      }
    };

    const handleLose = () => {
      if (wrongLetters.length === 6) {
        setGameOverMessage("Unfortunately, you lost. 😕");
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
    setGameOverMessage(""); // Reset the message when restarting
    setHasStarted(false); // Reset the game start state
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white min-h-screen p-6">
      <GameContainer />
      <div className="relative flex flex-col items-center">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      
      {/* Only show the Message component if gameOverMessage is set (game over state) */}
      {gameOverMessage && <Message gameOverMessage={gameOverMessage} resetGame={resetGame} />}

      <ErrorMessage notification={notification} />
    </div>
  );
}