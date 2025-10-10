import { createContext, useContext, useState, Fragment } from "react";
import PopupsComponents from "../components/popups"
import NavBar from "../components/NavBar.jsx";

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
    <GlobalPopupContext.Provider value={{ openPopup, closePopup }}>
      {children}
      
      {PopupComponent && (
        <Fragment>
        <div onClick={closePopup} className="fixed top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center z-1 text-[#cdd6f4]">
            <nav onClick={(e) => e.stopPropagation()} className="hidden lg:flex lg:fixed top-2 bg-[#1e1e2e] border-2 border-[#313244] flex-row items-center w-[calc(100%-16px)] h-[35px] gap-2 rounded-2xl px-2 py-4 overflow-x-auto scroll-hide">
              <NavBar />
            </nav>
            <div onClick={(e) => e.stopPropagation()} className="bg-white/20 dark:bg-[#1e1e2e] dark:ring-1 dark:ring-[#45475a] backdrop-blur-2xl p-2 rounded-xl z-2">
            <PopupComponent {...popupState.props} onClose={closePopup} />
          </div>
        </div>
        </Fragment>
      )}
    </GlobalPopupContext.Provider>
  );
}
