

function Figure({wrongLetters}) {
      return (
        <svg height="250" width="200" className="stroke-white">
        {/* Rod */}
        <line x1="60" y1="20" x2="140" y2="20" />
        <line x1="140" y1="20" x2="140" y2="50" />
        <line x1="60" y1="20" x2="60" y2="230" />
        <line x1="20" y1="230" x2="100" y2="230" />
        {/* Body Parts */}
        <circle cx="140" cy="70" r="20" className={wrongLetters.length > 0 ? "block" : "hidden"} />
        <line x1="140" y1="90" x2="140" y2="150" className={wrongLetters.length > 1 ? "block" : "hidden"} />
        <line x1="140" y1="120" x2="120" y2="100" className={wrongLetters.length > 2 ? "block" : "hidden"} />
        <line x1="140" y1="120" x2="160" y2="100" className={wrongLetters.length > 3 ? "block" : "hidden"} />
        <line x1="140" y1="150" x2="120" y2="180" className={wrongLetters.length > 4 ? "block" : "hidden"} />
        <line x1="140" y1="150" x2="160" y2="180" className={wrongLetters.length > 5 ? "block" : "hidden"} />
      </svg>
    );
        

  }
  
export default Figure;