import { useState } from "react";
import PaletteMocha from "../../color_palettes/PaletteMocha.jsx";
import PaletteMochaGradient from "../../color_palettes/PaletteMochaGradient.jsx"
import { useQuickAccess } from "../../contexts/QuickAccessContext.jsx";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";

export default function PopupCreateQuickAccess({ onClose }) {
  const { openPopup } = useGlobalPopup();
  const { quickAccess, setQuickAccess } = useQuickAccess();

  const [quickAccessIcon, setQuickAccessIcon] = useState("");
  const [quickAccessName, setQuickAccessName] = useState("");
  const [quickAccessUrl, setQuickAccessUrl] = useState("");
  const [quickAccessGradientColors, setQuickAccessGradientColors] = useState(PaletteMochaGradient[0]);
  const [quickAccessColor, setQuickAccessColor] = useState(0);

  const [emptyInputWarning, setEmptyInputWarning] = useState(false);

  const handleCreateQuickAccess = () => {
    const quickAccess = {
      quick_access_id: Date.now(),
      quick_access_icon: quickAccessIcon,
      quick_access_name: quickAccessName,
      quick_access_url: quickAccessUrl,
      quick_access_colors: quickAccessGradientColors
    };

    setQuickAccess(prevItems => [...prevItems, quickAccess]);
    onClose();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-1">
      <div className="bg-[#313244] grid grid-cols-2 w-full mt-1 mb-2">
        <button
          type="button"
          onClick={() => openPopup("PopupEditQuickAccess")}
          className="bg-[#45475a] cursor-pointer"
        >
          Create
        </button>
        <button
          type="button"
          onClick={() => openPopup("PopupEditQuickAccess")}
          className="cursor-pointer"
        >
          Edit
        </button>
      </div>

      <div className="flex flex-row lg:flex-col items-center justify-start lg:justify-center w-full gap-3 lg:gap-1">
        <div className={`${PaletteMochaGradient[quickAccessColor]} transition-colors duration-[1000ms] p-[2px] rounded-sm lg:rounded-2xl`}>
          <div className="bg-[#313244] text-[25px] flex items-center justify-center w-[35px] h-[35px] lg:w-[75px] lg:h-[75px] rounded-sm lg:rounded-2xl">
            <i className={`bi bi-${quickAccessIcon}`}></i>
          </div>
        </div>
        <label htmlFor="selectedIcon" className="hidden lg:block">Icon</label>
        <input
          autoFocus
          type="text"
          name="selectedIcon"
          id="selectedIcon"
          value={quickAccessIcon} 
          onChange={(e) => setQuickAccessIcon(e.target.value)}
          className="border-1 focus:border-[#45475a] w-full lg:w-[150px] px-1"
        />
      </div>
      
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="name">NAME</label>
        <input type="text" name="name" id="name"
          value={quickAccessName}
          onChange={(e) => setQuickAccessName(e.target.value)}
          className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1"
        />
        <label htmlFor="url">URL</label>
        <input type="text" name="url" id="url"
        value={quickAccessUrl}
        onChange={(e) => setQuickAccessUrl(e.target.value)}
        className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-1" />
      </div>

      <div className="flex flex-row gap-1">
       {PaletteMocha.map((color, index) => (
        <button
          key={index}
          onClick={() => {
            setQuickAccessColor(index);
            setQuickAccessGradientColors(PaletteMochaGradient[index]);
          }}
          className={`${quickAccessColor === index ? "bg-[#6c7086]" : "bg-[#45475a]"} bi bi-circle-fill ${color} flex items-center justify-center p-1 rounded-sm`}
         >
        </button>
       ))}
      </div>

      <div className="flex items-center justify-end w-full gap-1">
        <div className={emptyInputWarning ? "text-[#eba0ac] flex items-center justify-start gap-1 w-full animate-fade-left" : "hidden"}><i className="bi bi-asterisk"></i>Empty Inputs</div>
        <button onClick={() => onClose()} className="bg-[#45475a] px-3 cursor-pointer">
          <i className="bi bi-x"></i>
        </button>
        <button
          onClick={handleCreateQuickAccess}
          className="bg-[#45475a] px-3 cursor-pointer"
        >
          Create
        </button>
      </div>
    </div>
  );
}
