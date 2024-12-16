"use client"
import React from 'react';
import { useState,useEffect } from 'react';
import GameContainer from '../../components/hangman/GameContainer';
import Figure from '../../components/hangman/Figure';
import WrongLetters from '../../components/hangman/WrongLetter';
import Word from '../../components/hangman/Word';
import ErrorMessage from '../../components/hangman/ErrorMessage';
import Message from '../../components/hangman/Message';

export default function Hangman() {
  const words = ['application', 'programming', 'interface', 'wizard'];
  const [selectedWord, setSelectedWord] = useState("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [notification, setNotification] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");

  useEffect(() => {
    const random = Math.floor(Math.random() * words.length);
    setSelectedWord(words[random]);
  }, []);

  const showNotification = () => {
    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
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
      if (word) setGameOverMessage("Congratulations! You won! 😃");
    };

    const handleLose = () => {
      if (wrongLetters.length === 6) {
        setGameOverMessage("Unfortunately, you lost. 😕");
      }
    };

    handleWin();
    handleLose();

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [correctLetters, wrongLetters]);

  const resetGame = () => {
    setCorrectLetters([]);
    setWrongLetters([]);
    setGameOverMessage("");
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white min-h-screen p-6">
      <GameContainer/>
        <div className="relative flex flex-col items-center">
          <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Message gameOverMessage={gameOverMessage} resetGame={resetGame} />
      <ErrorMessage notification={notification}  />        
    </div>
  
  );
}
