export default function GameContainer() {
  return (
    <div className="bg-gray-800 p-5 rounded shadow-md text-white text-center w-[500px] relative">
      <h2 className="bg-black bg-opacity-30 p-2 rounded mb-10">
        👩‍💻 Speed Typer 👨‍💻
      </h2>
      <small className="block mb-5">Type the following:</small>
      <h1 id="word" className="text-3xl font-bold"></h1>
      <input
        type="text"
        id="text"
        className="border-none rounded p-3 text-lg w-[300px] mt-2"
        placeholder="Type the word here..."
        autoComplete="off"
      />
      <p className="absolute top-16 left-5">
        Time left: <span id="time">10s</span>
      </p>
      <p className="absolute top-16 right-5">
        Score: <span id="score">0</span>
      </p>
      <div
        id="end-game-container"
        className="flex items-center justify-center flex-col absolute top-0 left-0 w-full h-full z-10 bg-gray-800 bg-opacity-90"
      ></div>
    </div>
  );
}
