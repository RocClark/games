function Message({ gameOverMessage, resetGame }) {
  if (!gameOverMessage) return null;

  // Splitting the message to separate the main message from the description
  const [mainMessage, description] = gameOverMessage.split("\n\n");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-blue-600 text-white p-8 rounded text-center max-w-lg">
        <h2 className="text-2xl font-bold">{mainMessage}</h2>
        {description && <p className="mt-4 text-sm">{description}</p>}
        <button
          onClick={resetGame}
          className="mt-4 bg-white text-blue-600 px-4 py-2 rounded"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Message;
