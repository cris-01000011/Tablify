import { useState } from "react";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { useFolderItem } from "../../hooks/useFolderItem";
import { useFolder } from "../../hooks/useFolder";
import { MochaPaletteFirst } from "../../data/ColorPalette";

export default function PopupCreateFolderItem({ folderId, onClose }) {
	const { openPopup } = useGlobalPopup();
	const { deleteFolder } = useFolder();
	const { createFolderItem } = useFolderItem();

	const [folderItemName, setFolderItemName] = useState("");
	const [folderItemUrl, setFolderItemUrl] = useState("");
	const [folderItemColor, setFolderItemColor] = useState(MochaPaletteFirst[0]);

	return (
		<div className="flex flex-col gap-2 max-w-[300px] sm:max-w-[500px] p-2">
			<div className="bg-[#313244] grid grid-cols-2 w-full mt-1 mb-2">
				<button type="button" className="bg-[#45475a]">
					Create
				</button>
				<button
					type="button"
					onClick={() => openPopup("PopupEditFolder", { folderId })}
					className="cursor-pointer"
				>
					Edit
				</button>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					createFolderItem(
						folderId,
						folderItemName,
						folderItemUrl,
						folderItemColor,
					);
					onClose();
				}}
				className="flex flex-col pl-2 gap-2 w-full"
			>
				<label htmlFor="folder_item">Folder Item</label>
				<input
					autoFocus
					required
					type="text"
					id="folder_item"
					autoComplete="off"
					value={folderItemName}
					onChange={(e) => setFolderItemName(e.target.value)}
					className="border-1 focus:border-[#45475a] px-1"
				/>
				<label htmlFor="folder_item_url">Folder Item URL</label>
				<input
					required
					type="text"
					id="folder_item_url"
					autoComplete="off"
					value={folderItemUrl}
					onChange={(e) => setFolderItemUrl(e.target.value)}
					className="border-1 focus:border-[#45475a] px-1 mb-1"
				/>
				<div className="flex flex-row gap-1">
					{MochaPaletteFirst.map((color, index) => (
						<button
							type="button"
							key={index}
							onClick={() => setFolderItemColor(color)}
							className={`${
								folderItemColor === color ? "bg-[#6c7086]" : "bg-[#45475a]"
							} bi bi-circle-fill flex items-center justify-center p-1 rounded-sm`}
							style={{ color: color }}
						></button>
					))}
				</div>

				<div className="flex flex-row w-ful gap-1">
					<button
						type="button"
						onClick={() => {
							deleteFolder(folderId);
							onClose();
						}}
						title="Delete Folder"
						className="px-2"
					>
						Delete
					</button>
					<button type="submit" className="bg-[#45475a] flex-1">
						Add Item
					</button>
				</div>

				<div className="flex flex-1 items-center justify-end w-full">
					<button type="button" onClick={onClose} className="bg-[#45475a] px-5">
						<i className="bi bi-x"></i>
					</button>
				</div>
			</form>
		</div>
	);
}
