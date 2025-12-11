import ImageStorage from "./components/ImageStorage";
import NavBar from "./components/NavBar";
import QuickAccess from "./components/QuickAccess.jsx";
import InputSearch from "./components/InputSearch.jsx";
import FloatNavBar from "./components/main_ui/FloatNavBar.jsx";
import DraggableMenu from "./components/main_ui/DraggableMenu.jsx";

export default function App() {
	return (
		<div className="animate-fade animate-duration-100 bg-[#11111b] flex flex-col w-dvw h-dvh p-2 gap-[1%] overflow-hidden text-[#cdd6f4]">
			<nav
				onClick={(e) => e.stopPropagation()}
				className="bg-[#1e1e2e] border-2 border-[#313244] flex flex-row items-center w-full h-[35px] gap-2 rounded-2xl px-2 py-4 overflow-x-auto scroll-hide"
			>
				<NavBar />
			</nav>
			<div className="relative flex flex-row flex-1 gap-[0.5%] w-full">
				<ImageStorage />
				<div className="flex flex-col gap-3 flex-1 bg-[#1e1e2e] p-2 rounded-2xl border-2 border-[#313244]">
					<InputSearch />
					<QuickAccess />
				</div>
			</div>

			<FloatNavBar />
			<DraggableMenu />
		</div>
	);
}
