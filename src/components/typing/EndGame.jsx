export default function EndGame({ score, onRestart }) {
  return (
    <div className="flex items-center justify-center flex-col absolute top-0 left-0 w-full h-full z-10 bg-gray-800 bg-opacity-90">
      <h1 className="text-4xl font-bold">Time ran out</h1>
      <p className="text-lg">Your final score is {score}</p>
      <button
        onClick={onRestart}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Play Again
      </button>
    </div>
  );
}
