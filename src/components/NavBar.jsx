import { Fragment } from "react";
import { useGlobalPopup } from "../contexts/GlobalPopupContext";
import { useFolderService } from "../contexts/FolderContext";

export default function NavBar() {
	const { openPopup } = useGlobalPopup();
	const { folders } = useFolderService();

	return (
		<Fragment>
			{folders.map((folder) => (
				<button
					key={folder.folder_id}
					onContextMenu={(e) => {
						e.preventDefault();
						openPopup("PopupCreateFolderItem", {
							folderId: folder.folder_id,
						});
					}}
					onClick={() =>
						openPopup("PopupOpenFolder", {
							folderItems: folder.items,
						})
					}
					className="bg-[#313244] w-auto rounded-full px-2 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
				>
					<i className="bi bi-folder2-open"></i>
					{folder.name}
				</button>
			))}

			<button
				onClick={() => openPopup("PopupCreateFolder")}
				className="bg-[#313244] rounded-full px-1 flex items-center justify-center gap-2 cursor-pointer"
			>
				<i className="bi bi-plus"></i>
			</button>
		</Fragment>
	);
}
