import { nanoid } from "nanoid";
import { createContext, useContext, useState, useEffect } from "react";

const LocalStorageContext = createContext();
export const useLocalStorage = () => useContext(LocalStorageContext);

function migrateOldFolderItemColor(color) {
	if (typeof color !== "string") return color;

	const match = color.match(/text-\[#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\]/);
	if (!match) return color;

	return `#${match[1]}`;
}

function migrateOldFolderStructure(folder) {
	if ("name" in folder && "items" in folder) return folder;

	return {
		folder_id: folder.folder_id,
		name: folder.folder_name,
		items: Array.isArray(folder.folder_items)
			? folder.folder_items.map((it) => ({
					folder_item_id: nanoid(),
					name: it.folderItem,
					url: it.itemURL,
					color: migrateOldFolderItemColor(it.itemColor),
				}))
			: [],
	};
}

function parseOldQuickAccessColors(str) {
	if (typeof str !== "string") return { first: null, second: null };

	const from = str.match(/from-\[#([0-9A-Fa-f]{6})\]/);
	const to = str.match(/to-\[#([0-9A-Fa-f]{6})\]/);

	return {
		first: from ? `#${from[1]}` : null,
		second: to ? `#${to[1]}` : null,
	};
}

function migrateOldQuickAccess(item) {
	if ("first_color" in item && "second_color" in item) {
		return item;
	}

	const { first, second } = parseOldQuickAccessColors(item.quick_access_colors);

	return {
		quick_access_id: item.quick_access_id,
		icon: item.quick_access_icon,
		name: item.quick_access_name,
		url: item.quick_access_url,
		first_color: first,
		second_color: second,
	};
}

export const LocalStorageContextProvider = ({ children }) => {
	const [store, setStore] = useState(() => {
		const data = {};

		const keys = [
			"Folders",
			"QuickAccess",
			"DraggableMenuPos",
			"AutoHideFloatNavBar",
			"ActiveFontBigBlueTerm437",
			"SearchCommands",
		];

		keys.forEach((key) => {
			const saved = localStorage.getItem(key);
			let value = saved ? JSON.parse(saved) : [];

			if (key === "Folders" && Array.isArray(value)) {
				value = value.map((f) => migrateOldFolderStructure(f));
			}

			if (key === "QuickAccess" && Array.isArray(value)) {
				value = value.map((qa) => migrateOldQuickAccess(qa));
			}

			if (key === "DraggableMenuPos" && !saved) value = { x: -1, y: -1 };

			if (key === "AutoHideFloatNavBar" && !saved) value = false;

			if (key === "ActiveFontBigBlueTerm437" && !saved) value = false;

			data[key] = value;
		});

		return data;
	});

	useEffect(() => {
		Object.entries(store).forEach(([key, value]) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}, [store]);

	const setValue = (key, newValue) => {
		setStore((prev) => ({ ...prev, [key]: newValue }));
	};

	return (
		<LocalStorageContext.Provider value={{ store, setValue }}>
			{children}
		</LocalStorageContext.Provider>
	);
};
