import { useState, useEffect } from "react";

export default function PopupWidthImage({ imageWidth, setImageWidth, onClose }) {
  const [inputValue, setInputValue] = useState(imageWidth || ""); 

  const handleSubmit = () => {
    setImageWidth(inputValue);

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-[#1e1e2e] p-2 rounded-xl w-[200px]"
    >
      <label className="text-sm">Width Image (% or px)</label>
      <input
        autoFocus
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ej. 50% o 400px"
        className="bg-[#11111b] border border-[#45475a] px-2 py-1"
      />
      <button
        type="submit"
        className="bg-[#45475a] px-2 py-1"
      >
        Apply
      </button>
    </form>
  );
}

