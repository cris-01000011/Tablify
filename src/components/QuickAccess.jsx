import { useGlobalPopup } from "../contexts/GlobalPopupContext.jsx";
import { useQuickAccess } from "../contexts/QuickAccessContext.jsx";

export default function QuickAccess() {
  const { openPopup } = useGlobalPopup();
  const { quickAccess, setQuickAccess } = useQuickAccess();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 place-items-center max-h-[calc(100vh-135px)] overflow-y-auto scroll-hide">
      {quickAccess.map(qa => (
        <a
          key={qa.quick_access_id}
          href={qa.quick_access_url}
          className={`${qa.quick_access_colors} flex items-center justify-center w-[100px] min-h-[85px] max-h-[85px] px-[2px] rounded-2xl`}
        >
          <div className="hover:backdrop-blur-3xl hover:bg-[rgba(49,50,68,0.2)] transition-colors duration-500 bg-[#313244] flex flex-col w-full h-[81px] rounded-[15px]">
            <div className="flex items-center justify-center text-3xl w-full h-2/3">
              <i className={`bi bi-${qa.quick_access_icon}`}></i>
            </div>
            <div className="w-full h-1/3 text-center text-sm truncate px-2">
              <span>{qa.quick_access_name}</span>
            </div>
          </div>
        </a>
      ))}
      <button
        onClick={() => openPopup("PopupCreateQuickAccess", { setQuickAccess: setQuickAccess })}
        onContextMenu={(e) => {
          e.preventDefault();
          openPopup("PopupEditQuickAccess");
        }}
        className="bg-[#313244] flex items-center justify-center w-[100px] h-[85px] rounded-2xl cursor-pointer"
      >
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
}
