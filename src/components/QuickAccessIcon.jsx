import { useState } from "react";
import PaletteMochaGradient from "../color_palettes/PaletteMochaGradient";
import PaletteMocha from "../color_palettes/PaletteMocha";
import { useQuickAccess } from "../contexts/QuickAccessContext";

export default function QuickAcccessIcon({ index, quickAccessIcon, quickAccessColors, onBack }) {
  const { setQuickAccess } = useQuickAccess();

  const [selectedIcon, setSelectedIcon] = useState(quickAccessIcon);
  const [selectedColor, setSelectedColor] = useState(PaletteMochaGradient.indexOf(quickAccessColors));
  
  const [emptyInputWarning, setEmptyInputWarning] = useState(false);

  const handleChangeQuickAccess = () => {
    setQuickAccess(prev => {
      const updatedQuickAccess = [...prev];
      updatedQuickAccess[index] = {
        ...updatedQuickAccess[index],
        quick_access_icon: selectedIcon,
        quick_access_colors: PaletteMochaGradient[selectedColor]
      };
      return updatedQuickAccess;
    });

    onBack();
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <div className={`${PaletteMochaGradient[selectedColor]} transition-colors duration-[1000ms] p-[2px] rounded-2xl`}>
        <div className="bg-[#313244] text-[25px] flex items-center justify-center w-[75px] h-[75px] rounded-2xl">
          <i className={`bi bi-${selectedIcon}`}></i>
        </div>
      </div>
      <label htmlFor="selectedIcon">Icon</label>
      <input
        autoFocus
        type="text"
        name="selectedIcon"
        id="selectedIcon"
        value={selectedIcon}
        onChange={(e) => setSelectedIcon(e.target.value)}
        className="border-1 focus:border-[#45475a] w-[150px] px-1"
      />

      <div className="flex flex-row gap-1">
       {PaletteMocha.map((color, index) => (
        <button
          key={index}
          onClick={() => setSelectedColor(index)}
          className={`${selectedColor === index ? "bg-[#6c7086]" : "bg-[#45475a]"} bi bi-circle-fill ${color} flex items-center justify-center p-1 rounded-sm`}
         >
        </button>
       ))}
      </div>

      <div className="flex flex-row gap-1 items-center justify-end w-full">
        <div className={emptyInputWarning ? "text-[#eba0ac] flex items-center justify-start gap-1 w-full animate-fade-left" : "hidden"}><i className="bi bi-asterisk"></i>Empty Inputs</div>
        <button
          onClick={() => onBack()}
          className="bg-[#45475a] px-3 cursor-pointer"
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <button
          onClick={handleChangeQuickAccess}
          className="bg-[#45475a] px-3 cursor-pointer"
        >
          Change
        </button>
      </div>
    </div>
  );
}
