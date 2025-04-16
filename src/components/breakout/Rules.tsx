import React from "react";

interface RulesProps {
  onClose: () => void; // Prop type definition
}

const Rules: React.FC<RulesProps> = ({ onClose }) => {
  return (
    <div className="rules fixed top-0 left-0 bg-gray-900 text-white h-screen w-96 p-6 transform translate-x-0 transition-transform duration-500 z-50">
      <h2 className="text-2xl mb-4">How To Play:</h2>
      <p className="mb-4">
        Use your right and left keys to move the paddle to bounce the ball up
        and break the blocks.
      </p>
      <p className="mb-4">
        If you miss the ball, your score and the blocks will reset.
      </p>
      <button
        className="btn px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none"
        onClick={onClose} // Call the onClose function on click
      >
        Close
      </button>
    </div>
  );
};

export default Rules;
