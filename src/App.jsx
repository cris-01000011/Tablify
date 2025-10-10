import ImageStorage from "./components/ImageStorage";
import InputSearch from "./components/InputSearch";
import NavBar from "./components/NavBar";
import QuickAccess from "./components/QuickAccess.jsx";
import { useGlobalPopup } from "./contexts/GlobalPopupContext.jsx";

export default function App() {
  const { openPopup } = useGlobalPopup();  

  return (
    <div className="bg-[#11111b] flex flex-col w-screen h-screen p-2 gap-[1%] overflow-hidden text-[#cdd6f4] animate-fade">
      <nav onClick={(e) => e.stopPropagation()} className="bg-[#1e1e2e] border-2 border-[#313244] flex flex-row items-center w-full h-[35px] gap-2 rounded-2xl px-2 py-4 overflow-x-auto scroll-hide">
        <NavBar />
      </nav>
      <div className="relative flex flex-row flex-1 gap-[0.5%] w-full">
        <ImageStorage />
        <div className="flex flex-col gap-5 flex-1 bg-[#1e1e2e] p-2 rounded-2xl border-2 border-[#313244]">
          
          <InputSearch />

          <QuickAccess />

          <button
            onClick={() => openPopup("PopupInfo")}
            className="absolute bottom-2 right-2 bg-[#313244] rounded-full px-1 cursor-pointer"
          >
            <i className="bi bi-info"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
