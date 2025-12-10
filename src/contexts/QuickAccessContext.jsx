import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useLocalStorage } from "./LocalStorageContext";

const API_URL = import.meta.env.VITE_API_URL;
const QuickAccessContext = createContext();
export const useQuickAccessService = () => useContext(QuickAccessContext);

export const QuickAccessContextProvider = ({ children }) => {
	const { isAuth } = useAuth();
	const { store } = useLocalStorage();
	const [quickAccess, setQuickAccess] = useState([]);

	const refreshQuickAccess = async () => {
		if (!isAuth) return setQuickAccess(store.QuickAccess);

		try {
			const res = await fetch(`${API_URL}/quick-access`, {
				credentials: "include",
			});
			if (!res.ok) throw new Error();
			setQuickAccess(await res.json());
		} catch {
			setQuickAccess([]);
		}
	};

	useEffect(() => {
		refreshQuickAccess();
	}, [isAuth, store.QuickAccess]);

	return (
		<QuickAccessContext.Provider value={{ quickAccess, refreshQuickAccess }}>
			{children}
		</QuickAccessContext.Provider>
	);
};
