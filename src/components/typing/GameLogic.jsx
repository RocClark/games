export default function GameLogic({
  randomWord,
  inputText,
  score,
  time,
  onInputChange,
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{randomWord}</h1>
      <input
        type="text"
        value={inputText}
        onChange={onInputChange}
        className="border-none rounded p-3 text-lg w-[300px] mt-2"
        placeholder="Type the word here..."
        autoComplete="off"
      />
      <p className="absolute top-16 left-5">
        Time left: <span>{time}s</span>
      </p>
      <p className="absolute top-16 right-5">
        Score: <span>{score}</span>
      </p>
    </div>
  );
}
