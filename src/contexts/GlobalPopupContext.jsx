import { createContext, useContext, useState } from "react";
import PopupsComponents from "../components/popups"

const GlobalPopupContext = createContext();

export function useGlobalPopup() {
  return useContext(GlobalPopupContext);
}

export function GlobalPopupProvider({ children }) {
  const [popupState, setPopupState] = useState({
    name: null,
    props: {}
  });

  const openPopup = (name, props = {}) => {
    if (!PopupsComponents[name]) {
      return
    }
    setPopupState({ name, props });
  };

  const closePopup = () => {
    setPopupState({ name: null, props: {} });
  };

  const PopupComponent = popupState.name ? PopupsComponents[popupState.name] : null;

  return (
    <GlobalPopupContext.Provider value={{openPopup, closePopup }}>
      {children}
      
      {PopupComponent && (
        <div onClick={closePopup} className="fixed top-0 left-0 w-full h-full bg-black/50 text-black/60 dark:text-white/60 flex items-center justify-center z-1">
          <div onClick={(e) => e.stopPropagation()} className="bg-white/20 dark:bg-[#1e1e2e] dark:ring-1 dark:ring-[#45475a] backdrop-blur-2xl p-2 rounded-xl z-2">
            <PopupComponent {...popupState.props} onClose={closePopup} />
          </div>
        </div>
      )}
    </GlobalPopupContext.Provider>
  );
}
