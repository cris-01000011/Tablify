import { nanoid } from "nanoid";
import { useAuth } from "../contexts/AuthContext";
import { useFolderService } from "../contexts/FolderContext";
import { useLocalStorage } from "../contexts/LocalStorageContext";
const API_URL = import.meta.env.VITE_API_URL;

export function useFolderItem() {
	const { isAuth } = useAuth();
	const { store, setValue } = useLocalStorage();
	const { refreshFolders } = useFolderService();

	const isItemChanged = (item, folderItems = []) => {
		const original = folderItems.find(
			(fi) => fi.folder_item_id === item.folder_item_id,
		);

		if (!original) return true;

		return item.name === original.name && item.url === original.url;
	};

	const createFolderItemLocal = (
		folderId,
		folderItemName,
		folderItemUrl,
		folderItemColor,
	) => {
		if (!folderItemName.trim() || !folderItemUrl.trim()) return;

		const folders = [...store.Folders];

		const folder = folders.find((f) => f.folder_id === folderId);

		folder.items.push({
			folder_item_id: nanoid(),
			name: folderItemName,
			url: folderItemUrl,
			color: folderItemColor,
		});

		setValue("Folders", folders);
	};

	const createFolderItem = async (
		folderId,
		folderItemName,
		folderItemUrl,
		folderItemColor,
	) => {
		if (!isAuth)
			return createFolderItemLocal(
				folderId,
				folderItemName,
				folderItemUrl,
				folderItemColor,
			);

		if (!folderItemName.trim() || !folderItemUrl.trim())
			return refreshFolders();

		await fetch(`${API_URL}/folders/${folderId}/items`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: folderItemName,
				url: folderItemUrl,
				color: folderItemColor,
			}),
			credentials: "include",
		});

		refreshFolders();
	};

	const updateFolderItemsLocal = (folderId, folderItemId, name, url, color) => {
		const folders = [...store.Folders];

		const folder = folders.find((f) => f.folder_id === folderId);
		if (!folder) return;

		const items = folder.items || [];
		const itemIndex = items.findIndex((i) => i.folder_item_id === folderItemId);
		if (itemIndex === -1) return;

		folder.items[itemIndex] = {
			...folder.items[itemIndex],
			name,
			url,
			color,
		};

		setValue("Folders", folders);
	};

	const updateFolderItems = async (
		folderId,
		folderItemId,
		name,
		url,
		color,
	) => {
		if (!isAuth)
			return updateFolderItemsLocal(folderId, folderItemId, name, url, color);

		const res = await fetch(
			`${API_URL}/folders/${folderId}/items/${folderItemId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ name, url, color }),
			},
		);

		if (!res.ok) throw new Error("Update failed");

		refreshFolders();
	};

	const deleteFolderItemLocal = (folderItemId) => {
		const newFolders = store.Folders.map((folder) => {
			const items = folder.items || [];
			const exists = items.some((i) => i.folder_item_id === folderItemId);

			if (!exists) return folder;

			return {
				...folder,
				items: items.filter((i) => i.folder_item_id !== folderItemId),
			};
		});

		setValue("Folders", newFolders);
	};

	const deleteFolderItem = async (folderId, folderItemId) => {
		if (!isAuth) return deleteFolderItemLocal(folderItemId);
		await fetch(`${API_URL}/folders/${folderId}/items/${folderItemId}`, {
			method: "DELETE",
			credentials: "include",
		});
		refreshFolders();
	};

	return {
		createFolderItem,
		updateFolderItems,
		deleteFolderItem,
		isItemChanged,
	};
}
