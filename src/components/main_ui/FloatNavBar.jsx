import { useEffect, useState } from "react";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { useLocalStorage } from "../../contexts/LocalStorageContext";
import { useAuth } from "../../contexts/AuthContext";

export default function FloatNavBar() {
	const { openPopup, popupState } = useGlobalPopup();
	const { store } = useLocalStorage();
	const { isAuth, tablifyUser } = useAuth();

	const [floatNavBarAnimation, setFloatNavBarAnimation] = useState(() => {
		if (store.AutoHideFloatNavBar) return "animate-jump-bottom-out";

		return "animate-jump-top-in";
	});

	useEffect(() => {
		if (popupState.name && store.AutoHideFloatNavBar)
			return setFloatNavBarAnimation("animate-jump-bottom-out");

		if (!store.AutoHideFloatNavBar)
			return setFloatNavBarAnimation("animate-jump-top-in");

		const onMove = (e) => {
			const mousePosY = e.clientY;
			const limit = window.innerHeight - 75;

			if (mousePosY >= limit && floatNavBarAnimation !== "animate-jump-top-in")
				return setFloatNavBarAnimation("animate-jump-top-in");

			setFloatNavBarAnimation("animate-jump-bottom-out");
		};

		window.addEventListener("pointermove", onMove);

		return () => {
			window.removeEventListener("pointermove", onMove);
		};
	}, [popupState.name, store.AutoHideFloatNavBar]);

	return (
		<div
			className={`${floatNavBarAnimation} hidden fixed bottom-5 left-1/2 -translate-x-1/2 lg:flex items-center gap-3`}
		>
			{!isAuth ? (
				<button
					type="button"
					onClick={() => {
						return;
						openPopup("PopupUser", { user: tablifyUser });
					}}
					className="w-9 h-9"
				>
					<img
						src={
							tablifyUser?.avatar || "/src/imgs/avatars/tablify/default.webp"
						}
						alt="avatar"
						className="w-full h-full "
					/>
				</button>
			) : (
				<button
					type="button"
					onClick={() => openPopup("PopupSignIn")}
					className="bg-[#313244] border-1 border-[#45475a] px-2 py-1 rounded-full hover:scale-125 hover:-translate-y-2 transition-transform duration-400"
				>
					<span className="bi bi-person-fill text-xl"></span>
				</button>
			)}

			<div className="bg-[#313244] flex items-center justify-center border-1 border-[#45475a] px-2 py-1 rounded-full">
				<button
					title="Support"
					type="button"
					onClick={() => openPopup("PopupSupport")}
					className="hover:scale-125 hover:-translate-y-2 transition-all duration-400 px-2"
				>
					<span className="bi bi-heart-fill text-xl"></span>
				</button>

				<button
					title="Settings"
					type="button"
					onClick={() => openPopup("PopupSettings", {})}
					className="hover:scale-125 hover:-translate-y-2 transition-all duration-400 px-2"
				>
					<span className="bi bi-gear-fill text-xl"></span>
				</button>

				<button
					title="Backup"
					type="button"
					onClick={() => openPopup("PopupBackup", {})}
					className="hover:scale-125 hover:-translate-y-2 transition-all duration-400 px-2"
				>
					<span className="bi bi-floppy-fill text-xl"></span>
				</button>
			</div>
		</div>
	);
}
