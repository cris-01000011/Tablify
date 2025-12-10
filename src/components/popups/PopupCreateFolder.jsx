import { useState } from "react";
import { useFolder } from "../../hooks/useFolder";
import { MochaPaletteFirst } from "../../data/ColorPalette";

export default function PopupCreateFolder({ onClose }) {
	const { createFolder } = useFolder();
	const [folderName, setFolderName] = useState("");
	const [folderItemName, setFolderItemName] = useState("");
	const [folderItemURL, setFolderItemURL] = useState("");
	const [folderItemColor, setFolderItemColor] = useState(MochaPaletteFirst[0]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				createFolder(
					folderName,
					folderItemName,
					folderItemURL,
					folderItemColor,
				);
				onClose();
			}}
			className="relative flex flex-col p-2 gap-1"
		>
			<label htmlFor="folder_name">Folder Name</label>
			<input
				autoFocus
				required
				type="text"
				id="folder_name"
				autoComplete="off"
				value={folderName}
				onChange={(e) => setFolderName(e.target.value)}
				className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-2"
			/>
			<label htmlFor="folder_item">Folder Item</label>
			<input
				type="text"
				id="folder_item"
				autoComplete="off"
				value={folderItemName}
				onChange={(e) => setFolderItemName(e.target.value)}
				className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-2"
			/>
			<label htmlFor="folder_item_url">Folder Item URL</label>
			<input
				type="text"
				id="folder_item_url"
				autoComplete="off"
				value={folderItemURL}
				onChange={(e) => setFolderItemURL(e.target.value)}
				className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-2"
			/>
			<div className="flex flex-row gap-1 mb-2">
				{MochaPaletteFirst.map((color, index) => (
					<button
						type="button"
						key={index}
						onClick={() => setFolderItemColor(color)}
						className={`${folderItemColor === color ? "bg-[#6c7086]" : "bg-[#45475a]"} bi bi-circle-fill flex items-center justify-center p-1 rounded-sm`}
						style={{ color: color }}
					></button>
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
