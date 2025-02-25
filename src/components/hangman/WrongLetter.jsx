function WrongLetters({ wrongLetters }) {
  return (
    <div className="absolute top-0 right-0 text-right">
      <p>Wrong:</p>
      <p className="text-red-500">
        {wrongLetters.filter((letter) => letter !== " ").join(", ")}
      </p>
    </div>
  );
}

export default WrongLetters;
