import { useEffect, useState } from "react";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { useFolderItem } from "../../hooks/useFolderItem";
import { useFolderService } from "../../contexts/FolderContext";

export default function PopupEditFolder({ folderId, onClose }) {
	const { openPopup } = useGlobalPopup();
	const { updateFolderItems, deleteFolderItem, isItemChanged } =
		useFolderItem();
	const { folders } = useFolderService();

	const [items, setItems] = useState([]);
	const folder = folders.find((f) => f.folder_id === folderId);

	useEffect(() => {
		if (folder) setItems(folder.items);
	}, [folder]);

	const handleChangeName = (id, value) => {
		setItems((prev) =>
			prev.map((it) =>
				it.folder_item_id === id ? { ...it, name: value } : it,
			),
		);
	};

	const handleChangeURL = (id, value) => {
		setItems((prev) =>
			prev.map((it) => (it.folder_item_id === id ? { ...it, url: value } : it)),
		);
	};

	return (
		<div className="flex flex-col gap-2 w-auto p-2">
			<div className="bg-[#313244] grid grid-cols-2 w-full">
				<button
					type="button"
					onClick={() => openPopup("PopupCreateFolderItem", { folderId })}
				>
					Create
				</button>
				<button type="button" className="bg-[#45475a]">
					Edit
				</button>
			</div>

			<div className="bg-[#313244] flex flex-col min-h-52 max-h-52 flex-1 gap-2 overflow-y-auto scroll-hide p-2">
				{items.map((item) => (
					<div
						key={item.folder_item_id}
						className="flex flex-row items-center w-full gap-2"
					>
						<button className="bg-[#45475a] flex-1 rounded-sm">
							<i
								className="bi bi-circle-fill p-1"
								style={{ color: item.color }}
							></i>
						</button>

						<div className="w-24 lg:w-42 flex items-center gap-1">
							<input
								id={`name-${item.folder_item_id}`}
								autoComplete="off"
								type="text"
								value={item.name}
								onChange={(e) =>
									handleChangeName(item.folder_item_id, e.target.value)
								}
								className="w-full px-1 truncate outline-none"
							/>
						</div>

						<div className="w-24 lg:w-42 flex items-center gap-1">
							<input
								id={`url-${item.folder_item_id}`}
								autoComplete="off"
								type="text"
								value={item.url}
								onChange={(e) =>
									handleChangeURL(item.folder_item_id, e.target.value)
								}
								className="w-full px-1 truncate outline-none"
							/>
						</div>

						<button
							type="button"
							disabled={isItemChanged(item, folder.items)}
							onClick={() =>
								updateFolderItems(
									folderId,
									item.folder_item_id,
									item.name,
									item.url,
									item.color,
								)
							}
							className="disabled:text-[#6c7086] bg-[#45475a] px-1"
						>
							<i className="bi bi-check"></i>
						</button>

						<button
							type="button"
							onClick={() => deleteFolderItem(folderId, item.folder_item_id)}
							className="bg-[#45475a] px-1"
						>
							<i className="bi bi-x"></i>
						</button>
					</div>
				))}
			</div>
			<div className="flex items-center justify-end w-full">
				<button onClick={onClose} className="bg-[#45475a] px-5">
					<i className="bi bi-x"></i>
				</button>
			</div>
		</div>
	);
}
