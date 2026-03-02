import { useGlobalPopup } from "../contexts/GlobalPopupContext.jsx";
import { useQuickAccessService } from "../contexts/QuickAccessContext.jsx";

export default function QuickAccess() {
  const { openPopup } = useGlobalPopup();
  const { quickAccess } = useQuickAccessService();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 pt-1 place-items-center place-content-start min-h-[calc(100dvh-125px)] max-h-[calc(100dvh-125px)] overflow-y-auto scroll-hide">
      {[...quickAccess]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((qa) => (
          <a
            key={qa.quick_access_id}
            href={qa.url}
            className="flex items-center justify-center w-[100px] h-22 p-[2px] rounded-2xl"
            style={{
              background: `linear-gradient(to right, ${qa.first_color}, ${qa.second_color})`,
            }}
          >
            <div className="hover:backdrop-blur-3xl hover:bg-[#31324444] transition-colors duration-300 bg-[#313244] flex flex-col w-full h-full rounded-2xl">
              <div className="flex items-center justify-center text-3xl w-full h-2/3">
                <i className={`bi bi-${qa.icon}`}></i>
              </div>
              <div className="w-full h-1/3 text-center text-sm truncate px-2">
                <span>{qa.name}</span>
              </div>
            </div>
          </a>
        ))}

      <button
        onClick={() => openPopup("PopupCreateQuickAccess")}
        onContextMenu={(e) => {
          e.preventDefault();
          openPopup("PopupEditQuickAccess");
        }}
        className="bg-[#313244] hover:bg-[#45475a] transition-colors duration-300 flex items-center justify-center w-[100px] h-[85px] rounded-2xl cursor-pointer"
      >
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
}
