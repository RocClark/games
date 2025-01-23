"use client";

export default function WordInput({ value, onChange }) {
  const handleInputChange = (e) => {
    console.log("Typed value:", e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        placeholder="Type the word here..."
      />
    </div>
  );
}
