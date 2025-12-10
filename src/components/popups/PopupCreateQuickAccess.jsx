import { useState } from "react";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { useQuickAccess } from "../../hooks/useQuickAccess.jsx";
import {
	MochaPaletteFirst,
	MochaPaletteSecond,
} from "../../data/ColorPalette.js";

export default function PopupCreateQuickAccess({
	quickAccessIcon = "box-fill",
	colorIndex = 0,
	onClose,
}) {
	const { openPopup } = useGlobalPopup();
	const { createQuickAccess } = useQuickAccess();

	const [selectedColor, setSelectedColor] = useState(colorIndex);
	const [quickAccessName, setQuickAccessName] = useState("");
	const [quickAccessUrl, setQuickAccessUrl] = useState("");
	const [quickAccessFirstColor, setQuickAccessFirstColor] = useState(
		MochaPaletteFirst[selectedColor],
	);
	const [quickAccessSecondColor, setQuickAccessSecondColor] = useState(
		MochaPaletteSecond[selectedColor],
	);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				createQuickAccess(
					quickAccessName,
					quickAccessUrl,
					quickAccessIcon,
					quickAccessFirstColor,
					quickAccessSecondColor,
				);
				onClose();
			}}
			className="flex flex-col items-center justify-center gap-2 p-1"
		>
			<div className="bg-[#313244] grid grid-cols-2 w-full mt-1 mb-2">
				<button type="button" className="bg-[#45475a]">
					Create
				</button>
				<button type="button" onClick={() => openPopup("PopupEditQuickAccess")}>
					Edit
				</button>
			</div>

			<button
				type="button"
				onClick={() =>
					openPopup("PopupSelectIcon", {
						PopupBack: {
							name: "PopupCreateQuickAccess",
							props: {
								quickAccessIcon,
								colorIndex: selectedColor,
							},
						},
					})
				}
				className="w-20 h-20 p-[2px] rounded-2xl mb-1"
				style={{
					background: `linear-gradient(to right, ${MochaPaletteFirst[selectedColor]}, ${MochaPaletteSecond[selectedColor]})`,
				}}
			>
				<div className="bg-[#313244] text-[25px] flex items-center justify-center w-full h-full rounded-2xl">
					<i className={`bi bi-${quickAccessIcon}`}></i>
				</div>
			</button>

			<div className="flex flex-col gap-1 w-full">
				<label htmlFor="name">Quick Access Name</label>
				<input
					required
					autoComplete="off"
					id="name"
					type="text"
					value={quickAccessName}
					onChange={(e) => setQuickAccessName(e.target.value)}
					className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1"
				/>

				<label htmlFor="url">Quick Access URL</label>
				<input
					required
					autoComplete="off"
					id="url"
					type="text"
					value={quickAccessUrl}
					onChange={(e) => setQuickAccessUrl(e.target.value)}
					className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-1"
				/>
			</div>

			<div className="flex flex-row gap-1">
				{MochaPaletteFirst.map((color, index) => (
					<button
						key={index}
						type="button"
						onClick={() => {
							setSelectedColor(index);
							setQuickAccessFirstColor(MochaPaletteFirst[index]);
							setQuickAccessSecondColor(MochaPaletteSecond[index]);
						}}
						className={`${selectedColor === index ? "bg-[#6c7086]" : "bg-[#45475a]"} bi bi-circle-fill flex items-center justify-center p-1 rounded-sm`}
						style={{ color: color }}
					/>
				))}
			</div>

			<div className="flex items-center justify-end w-full gap-1">
				<button type="button" onClick={onClose} className="bg-[#45475a] px-3">
					<i className="bi bi-x"></i>
				</button>

				<button type="submit" className="bg-[#45475a] px-3">
					Create
				</button>
			</div>
		</form>
	);
}
