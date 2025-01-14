

function Word({selectedWord, correctLetters}) {
      return (
        <div className="mt-8">
        {selectedWord.split("").map((letter, index) => (
          <span
            key={index}
            className="inline-block border-b-4 border-blue-600 mx-1 text-xl w-8 text-center"
          >
            {correctLetters.includes(letter) ? letter : ""}
          </span>
        ))}
      </div>
        
      );
  }
  
export default Word;