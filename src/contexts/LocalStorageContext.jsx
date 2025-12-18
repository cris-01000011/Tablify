import { createContext, useContext, useState, useEffect } from "react";

const LocalStorageContext = createContext();
export const useLocalStorage = () => useContext(LocalStorageContext);

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
