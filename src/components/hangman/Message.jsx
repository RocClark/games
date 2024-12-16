

function Message({ gameOverMessage, resetGame }) {
  if (!gameOverMessage) return null;
  
      return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-blue-600 text-white p-8 rounded text-center">
        <h2>{gameOverMessage}</h2>
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