import { useAuth } from "../contexts/AuthContext";
import { useLocalStorage } from "../contexts/LocalStorageContext";
import { nanoid } from "nanoid";
import { useFolderItem } from "./useFolderItem";
import { useFolderService } from "../contexts/FolderContext";
const API_URL = import.meta.env.VITE_API_URL;

export function useFolder() {
	const { isAuth } = useAuth();
	const { store, setValue } = useLocalStorage();
	const { createFolderItem } = useFolderItem();
	const { refreshFolders } = useFolderService();

	const createFolderLocal = (
		folderName,
		folderItemName,
		folderItemUrl,
		folderItemColor,
	) => {
		const folderId = nanoid();

		const items =
			folderItemName && folderItemUrl
				? [
						{
							folder_item_id: nanoid(),
							name: folderItemName,
							url: folderItemUrl,
							color: folderItemColor,
						},
					]
				: [];

		const newFolder = {
			folder_id: folderId,
			name: folderName,
			items,
		};

		setValue("Folders", [...store.Folders, newFolder]);
	};

	const createFolder = async (
		folderName,
		folderItemName,
		folderItemUrl,
		folderItemColor,
	) => {
		if (!isAuth)
			return createFolderLocal(
				folderName,
				folderItemName,
				folderItemUrl,
				folderItemColor,
			);

		const res = await fetch(`${API_URL}/folders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: folderName }),
			credentials: "include",
		});

		const data = await res.json();
		const folderId = data.folder_id;

		createFolderItem(folderId, folderItemName, folderItemUrl, folderItemColor);
	};

	const deleteFolderLocal = (folderId) => {
		const newFolders = store.Folders.filter((f) => f.folder_id !== folderId);
		setValue("Folders", newFolders);
	};

	const deleteFolder = async (folderId) => {
		if (!isAuth) return deleteFolderLocal(folderId);
		await fetch(`${API_URL}/folders/${folderId}`, {
			method: "DELETE",
			credentials: "include",
		});
		refreshFolders();
	};

	return { createFolder, deleteFolder };
}
