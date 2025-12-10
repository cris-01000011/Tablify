import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useLocalStorage } from "./LocalStorageContext";

const API_URL = import.meta.env.VITE_API_URL;
const FolderContext = createContext();
export const useFolderService = () => useContext(FolderContext);

export const FolderContextProvider = ({ children }) => {
	const { isAuth } = useAuth();
	const { store } = useLocalStorage();
	const [folders, setFolders] = useState([]);

	const refreshFolders = async () => {
		if (!isAuth) {
			setFolders(store.Folders);
			return;
		}

		try {
			const res = await fetch(`${API_URL}/folders-with-items`, {
				credentials: "include",
			});
			if (!res.ok) throw new Error();
			setFolders(await res.json());
		} catch {
			setFolders([]);
		}
	};

	useEffect(() => {
		refreshFolders();
	}, [isAuth, store.Folders]);

	return (
		<FolderContext.Provider value={{ folders, refreshFolders }}>
			{children}
		</FolderContext.Provider>
	);
};
