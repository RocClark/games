export default function Settings() {
  return (
    <div className="absolute top-0 left-0 w-full bg-black bg-opacity-30 h-20 flex items-center justify-center transition-transform duration-300">
      <form>
        <div>
          <label htmlFor="difficulty" className="text-white mr-4">
            Difficulty
          </label>
          <select
            id="difficulty"
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
