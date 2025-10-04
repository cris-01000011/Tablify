import { Fragment, useState, useEffect, useRef } from "react";
import { useQuickAccess } from "../../contexts/QuickAccessContext";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import QuickAcccessIcon from "../QuickAccessIcon";

export default function PopupEditQuickAccess({ onClose }) {
  const { openPopup } = useGlobalPopup();
  const { quickAccess, setQuickAccess } = useQuickAccess();

  const  [changeQuickAccessIcon, setChangeQuickAccessIcon] = useState({
    isChanging: false,
    index: 0,
    quickAccessIcon: "",
    quickAccessColors: ""
  });

  const firstLinkRef = useRef(null);
  
  useEffect(() => {
    if (firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [changeQuickAccessIcon]);

  const handleChangeQuickAccess = (index, field, value) => {
    setQuickAccess(prev => {
      const updatedQuickAccess = [...prev];
      updatedQuickAccess[index] = {...updatedQuickAccess[index], [field]: value};
      return updatedQuickAccess;
    });
  }

  const handleDeleteQuickAccess = (quick_access_id) => {
    const updatedQuickAccess = quickAccess.filter(qa => qa.quick_access_id !== quick_access_id);
    setQuickAccess(updatedQuickAccess);
  }

  return (
    <div className="flex flex-col gap-2 max-w-[300px] sm:max-w-[500px] p-2">
      {changeQuickAccessIcon.isChanging ? (
        <QuickAcccessIcon
          index={changeQuickAccessIcon.index}
          quickAccessIcon={changeQuickAccessIcon.quickAccessIcon}
          quickAccessColors={changeQuickAccessIcon.quickAccessColors}
          onBack={() => setChangeQuickAccessIcon(prev => ({...prev, isChanging: false}))}
        />
      ) : (
        <Fragment>
          <div className="bg-[#313244] grid grid-cols-2">
            <button
              type="button"
              onClick={() => openPopup("PopupCreateQuickAccess")}
              className="cursor-pointer"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => openPopup("PopupCreateQuickAccess")}
              className="bg-[#45475a] cursor-pointer"
            >
              Edit
            </button>
          </div>

          <div className="bg-[#313244] flex flex-col items-center max-h-[216px] flex-1 gap-2 overflow-y-auto scroll-hide p-2">
            {quickAccess.map((qa, index) => (
              <div key={index} className="flex flex-row w-full gap-2">
                <div className="w-1/2 flex gap-2">
                  <button
                    ref={index === 0 ? firstLinkRef : null}
                    onClick={() => setChangeQuickAccessIcon({
                      isChanging: true,
                      index: index,
                      quickAccessIcon: qa.quick_access_icon,
                      quickAccessColors: qa.quick_access_colors
                    })}
                    className={`${qa.quick_access_colors} flex items-center justify-center px-1 rounded-sm cursor-pointer`}
                  >
                    <i className={`bi bi-${qa.quick_access_icon}`}></i>
                  </button>
                  <input
                    type="text"
                    value={qa.quick_access_name}
                    onChange={(e) => handleChangeQuickAccess(index, "quick_access_name", e.target.value)}
                    className="w-[100px] lg:w-[200px] px-1 truncate"
                  />
                </div>

                <div className="w-1/2 flex gap-2">
                  <input
                    type="text"
                    value={qa.quick_access_url}
                    onChange={(e) => handleChangeQuickAccess(index, "quick_access_url", e.target.value)}
                    className="w-[100px] lg:w-[200px] px-1 truncate"
                  />
                  <button
                    onClick={() => handleDeleteQuickAccess(qa.quick_access_id)}
                    className="bg-[#45475a] px-1 cursor-pointer"
                  >
                      <i className="bi bi-x"></i>
                  </button>
                </div>

              </div>
            ))}
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              onClick={() => onClose()}
              className="bg-[#45475a] px-5 cursor-pointer"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
}
