import { useLocalStorage } from "../contexts/LocalStorageContext";
import { useAuth } from "../contexts/AuthContext";
import { useFolderService } from "../contexts/FolderContext";
import { useQuickAccessService } from "../contexts/QuickAccessContext";
const API_URL = import.meta.env.VITE_API_URL;

export function useBackup() {
	const { store, setValue } = useLocalStorage();
	const { isAuth } = useAuth();
	const { folders, refreshFolders } = useFolderService();
	const { quickAccess, refreshQuickAccess } = useQuickAccessService();

	const downloadJson = (backupObject) => {
		const keys = Object.keys(backupObject);
		const backupItems = keys.length;

		const jsonString = JSON.stringify(backupObject, null, 0);
		const blob = new Blob([jsonString], { type: "application/json" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;

		a.download =
			backupItems === 1
				? `tablify_${keys[0].toLowerCase()}.json`
				: "tablify_backup.json";

		a.click();
		URL.revokeObjectURL(url);
	};

	const exportBackupLocal = (keys) => {
		const backupObject = keys.reduce((acumulator, key) => {
			if (store[key] !== undefined) acumulator[key] = store[key];

			return acumulator;
		}, {});

		downloadJson(backupObject);
	};

	const dataSources = {
		Folders: () => folders,
		QuickAccess: () => quickAccess,
	};

	const exportBackup = (keys) => {
		if (!isAuth) return exportBackupLocal(keys);

		const backupObject = {};

		for (const key of keys) {
			const resolver = dataSources[key];

			if (typeof resolver !== "function") continue;

			const data = resolver();
			if (data !== undefined) {
				backupObject[key] = data;
			}
		}

		downloadJson(backupObject);
	};

	const importBackupReplaceLocal = (data) => {
		if (data.Folders) setValue("Folders", data.Folders);
		if (data.QuickAccess) setValue("QuickAccess", data.QuickAccess);
	};

	const importBackup = async (file) => {
		try {
			const text = await file.text();
			const data = JSON.parse(text);

			if (typeof data !== "object" || Array.isArray(data)) {
				throw new Error("Invalid format");
			}

			if (!isAuth) return importBackupReplaceLocal(data);

			if (data.Folders) {
				await fetch(`${API_URL}/folders/replace`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data.Folders),
					credentials: "include",
				});

				refreshFolders();
			}

			if (data.QuickAccess) {
				await fetch(`${API_URL}/quick-access/replace`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data.QuickAccess),
					credentials: "include",
				});

				refreshQuickAccess();
			}
		} catch (err) {
			console.error("Import error", err);
		}
	};

	return { exportBackup, importBackup };
}
