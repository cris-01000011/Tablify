import { useState } from "react";
import { MochaPaletteFirst, MochaPaletteSecond } from "../../data/ColorPalette";
import { useLocalStorage } from "../../contexts/LocalStorageContext";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { useQuickAccess } from "../../hooks/useQuickAccess.jsx";

export default function PopupQuickAccessIcon({
	quickAccessId,
	quickAccessIcon,
	colorIndex,
}) {
	const { openPopup } = useGlobalPopup();
	const { store, setValue } = useLocalStorage();
	const { updateQuickAccess } = useQuickAccess();

	const [selectedColor, setSelectedColor] = useState(colorIndex);
	const [quickAccessFirstColor, setQuickAccessFirstColor] = useState(
		MochaPaletteFirst[colorIndex],
	);
	const [quickAccessSecondColor, setQuickAccessSecondColor] = useState(
		MochaPaletteSecond[colorIndex],
	);

	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
			<button
				type="button"
				onClick={() =>
					openPopup("PopupSelectIcon", {
						PopupBack: {
							name: "PopupQuickAccessIcon",
							props: {
								quickAccessId,
								quickAccessIcon,
								colorIndex: selectedColor,
							},
						},
					})
				}
				className={`transition-colors duration-[1000ms] p-[2px] rounded-2xl`}
				style={{
					background: `linear-gradient(to right, ${quickAccessFirstColor}, ${quickAccessSecondColor})`,
				}}
			>
				<div className="bg-[#313244] text-[25px] flex items-center justify-center w-[75px] h-[75px] rounded-2xl">
					<i className={`bi bi-${quickAccessIcon}`}></i>
				</div>
			</button>

			<div className="flex flex-row gap-1">
				{MochaPaletteFirst.map((color, index) => (
					<button
						key={index}
						onClick={() => {
							setSelectedColor(index);
							setQuickAccessFirstColor(MochaPaletteFirst[index]);
							setQuickAccessSecondColor(MochaPaletteSecond[index]);
						}}
						className={`${selectedColor === index ? "bg-[#6c7086]" : "bg-[#45475a]"} bi bi-circle-fill flex items-center justify-center p-1 rounded-sm`}
						style={{ color: color }}
					></button>
				))}
			</div>

			<div className="flex flex-row gap-1 items-center justify-end w-full">
				<button
					onClick={() => openPopup("PopupEditQuickAccess")}
					className="bg-[#45475a] px-3"
				>
					<i className="bi bi-arrow-left"></i>
				</button>

				<button
					onClick={() => {
						updateQuickAccess(quickAccessId, {
							icon: quickAccessIcon,
							first_color: quickAccessFirstColor,
							second_color: quickAccessSecondColor,
						});
						openPopup("PopupEditQuickAccess");
					}}
					className="bg-[#45475a] px-3"
				>
					Change
				</button>
			</div>
		</div>
	);
}
