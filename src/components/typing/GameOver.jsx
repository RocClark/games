"use client";

export default function GameOver({ score, onRestart, gameWon }) {
  return (
    <div className="text-center text-white">
      {gameWon ? (
        <h1 className="text-2xl mb-4">Congratulations! You Won!</h1>
      ) : (
        <h1 className="text-2xl mb-4">Game Over</h1>
      )}
      <p className="mb-4">Final Score: {score}</p>
      <button
        className="bg-green-500 px-4 py-2 rounded text-white"
        onClick={onRestart}
      >
        Play Again
      </button>
    </div>
  );
}
