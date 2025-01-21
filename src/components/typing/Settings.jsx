export default function Settings({ difficulty, setDifficulty }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setDifficulty(value);
    localStorage.setItem("difficulty", value);
  };

  return (
    <div className="absolute top-0 left-0 w-full bg-black bg-opacity-30 h-20 flex items-center justify-center">
      <form>
        <div>
          <label htmlFor="difficulty" className="text-white mr-4">
            Difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={handleChange}
            className="w-52 p-1 bg-blue-300 rounded focus:outline-none"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </form>
    </div>
  );
}
