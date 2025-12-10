import { useContext, createContext, useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [tablifyUser, setTablifyUser] = useState(null);

	const logout = async () => {
		await fetch(`${API_URL}/logout`, {
			method: "POST",
			credentials: "include",
		});

		refreshAuth();
	};

	const refreshAuth = async () => {
		try {
			const res = await fetch(`${API_URL}/me`, {
				credentials: "include",
			});

			if (!res.ok) {
				setIsAuth(false);
				setTablifyUser(null);
				return;
			}

			const data = await res.json();
			setTablifyUser(data);
			setIsAuth(true);
		} catch {
			setIsAuth(false);
			setTablifyUser(null);
		}
	};

	useEffect(() => {
		refreshAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ isAuth, tablifyUser, refreshAuth, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
