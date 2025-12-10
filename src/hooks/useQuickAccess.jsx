import { useAuth } from "../contexts/AuthContext";
import { useLocalStorage } from "../contexts/LocalStorageContext";
import { nanoid } from "nanoid";
import { useQuickAccessService } from "../contexts/QuickAccessContext";
const API_URL = import.meta.env.VITE_API_URL;

export function useQuickAccess() {
	const { isAuth } = useAuth();
	const { store, setValue } = useLocalStorage();
	const { refreshQuickAccess } = useQuickAccessService();

	const isQuickAccessChanged = (quickAccess = [], quickAccessEditable = []) => {
		const original = quickAccess.find(
			(qa) => qa.quick_access_id === quickAccessEditable.quick_access_id,
		);

		if (!original) return true;

		return (
			quickAccessEditable.name === original.name &&
			quickAccessEditable.url === original.url
		);
	};

	const createQuickAccessLocal = (
		name,
		url,
		icon,
		first_color,
		second_color,
	) => {
		const quickAccessId = nanoid();

		const newQuickAccess = {
			quick_access_id: quickAccessId,
			icon,
			name,
			url,
			first_color,
			second_color,
		};

		setValue("QuickAccess", [...store.QuickAccess, newQuickAccess]);
	};

	const createQuickAccess = async (
		name,
		url,
		icon,
		first_color,
		second_color,
	) => {
		if (!isAuth)
			return createQuickAccessLocal(name, url, icon, first_color, second_color);

		await fetch(`${API_URL}/quick-access`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				url,
				icon,
				first_color,
				second_color,
			}),
			credentials: "include",
		});

		refreshQuickAccess();
	};

	const updateQuickAccessLocal = (id, updates = {}) => {
		const quickAccess = [...store.QuickAccess];
		const index = quickAccess.findIndex((qa) => qa.quick_access_id === id);
		if (index === -1) return;

		quickAccess[index] = {
			...quickAccess[index],
			...updates,
		};

		setValue("QuickAccess", quickAccess);
	};

	const updateQuickAccess = async (id, updates = {}) => {
		if (!isAuth) return updateQuickAccessLocal(id, updates);

		await fetch(`${API_URL}/quick-access/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(updates),
		});

		refreshQuickAccess();
	};

	const deleteQuickAccessLocal = (id) => {
		const newQuickAccess = store.QuickAccess.filter(
			(q) => q.quick_access_id !== id,
		);
		setValue("QuickAccess", newQuickAccess);
	};

	const deleteQuickAccess = async (id) => {
		if (!isAuth) return deleteQuickAccessLocal(id);

		await fetch(`${API_URL}/quick-access/${id}`, {
			method: "DELETE",
			credentials: "include",
		});

		refreshQuickAccess();
	};

	return {
		isQuickAccessChanged,
		createQuickAccess,
		updateQuickAccess,
		deleteQuickAccess,
	};
}
