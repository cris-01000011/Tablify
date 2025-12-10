import { useAuth } from "../contexts/AuthContext";
import { useGlobalPopup } from "../contexts/GlobalPopupContext";
const API_URL = import.meta.env.VITE_API_URL;

export function useAuthentication() {
	const { refreshAuth } = useAuth();
	const { closePopup } = useGlobalPopup();

	const signup = async (name, email, password) => {
		const res = await fetch(`${API_URL}/signup`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
				avatar: "/src/imgs/avatars/avatar-default.png",
			}),
			credentials: "include",
		});

		if (!res.ok) return;

		refreshAuth();
		closePopup();
	};

	const signin = async (email, password) => {
		const res = await fetch(`${API_URL}/signin`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
			credentials: "include",
		});

		if (!res.ok) return;

		refreshAuth();
		closePopup();
	};

	return { signin, signup };
}
