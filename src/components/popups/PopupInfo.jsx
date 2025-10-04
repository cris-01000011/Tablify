export default function PopupInfo() {
  return (
    <div className="text-center p-2">
      <div className="flex flex-row items-end w-full text-[#b4befe] text-center gap-5 text-4xl lg:text-5xl mb-2">
        <a
          href="https://github.com/cris-01000011/Tablify"
          className="rounded-full focus:bg-[#45475a]"
        >
          <i className="bi bi-github"></i>
        </a>
        <span>How To Use</span>
      </div> 

      <div className="flex flex-row lg:grid lg:grid-cols-2 max-w-[350px] lg:max-w-full gap-2 overflow-x-auto scroll-hide">
        
        <div className="flex flex-col bg-[#313244] min-w-[250px] lg:w-[350px] min-h-[200px] lg:h-[200px] px-2">
          <span className="text-[#89b4fa] text-[25px] lg:text-[35px]">
            <i className="bi bi-"></i>
            NavBar
          </span>
          <div className="flex flex-col text-start gap-1">
            <span className="text-[#cdd6f4] text-[10px] sm:text-sm">Folder[LC]: Open items</span>
            <span className="text-[#cdd6f4] text-[10px] sm:text-sm">Folder[RC]: Create/Edit items</span>
            <span className="text-[#cdd6f4] text-[10px] sm:text-sm">PlusButton[LC]: Create new folder</span>
          </div>
        </div>

        <div className="flex flex-col bg-[#313244] min-w-[250px] lg:w-[350px] min-h-[200px] lg:h-[200px] px-2">
          <span className="text-[#f9e2af] text-[25px] lg:text-[35px]">
            <i className="bi bi-"></i>
            Quick Access
          </span>
          <div className="flex flex-col text-start gap-1">
            <span className="text-[#cdd6f4] text-[10px] sm:text-sm">AddButton[LC]: Create quick access</span>
            <span className="text-[#cdd6f4] text-[10px] sm:text-sm">AddButton[RC]: Edit quick access</span>
            <span className="text-[#cdd6f4] text-[10px] sm:text-sm">LinkButton[LC]: Open link</span>
          </div>
        </div>

        <div className="flex flex-col bg-[#313244] min-w-[250px] lg:w-[350px] min-h-[200px] lg:h-[200px] px-2">
          <span className="text-[#eba0ac] text-[25px] lg:text-[35px]">
            <i className="bi bi-"></i>
            Search Bar
          </span>
          <div className="flex flex-col text-start gap-1">
            <span className="text-[#cdd6f4] text-[10px] sm:text-sm">
              Commands: Type :c press Enter to control your commands
            </span>
            <span className="text-[#cdd6f4] text-[10px] sm:text-sm">
              Toggle Font: Type :f and press Enter
            </span>
          </div>
        </div>

        <div className="flex flex-col bg-[#313244] min-w-[250px] lg:w-[350px] min-h-[200px] lg:h-[200px] px-2">
          <span className="text-[#94e2d5] text-[25px] lg:text-[35px]">
            <i className="bi bi-"></i>
            Image/Icon
          </span>
          <div className="flex flex-col text-start gap-1">
            <span className="text-[#cdd6f4] text-[10px] sm:text-sm">Image[LC]: Set image / gif</span>
            <span className="text-[#cdd6f4] text-[10px] sm:text-sm">Image[RC]: Set width of image</span>
            <span className="text-[#cdd6f4] text-[10px] sm:text-sm">Set icon: view <a href="https://icons.getbootstrap.com/?q=mine">Bootstrap</a> icons</span>
          </div>
        </div>

      </div>
    </div>
  );
}

