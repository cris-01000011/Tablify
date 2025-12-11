import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { useAuth } from "../../contexts/AuthContext";

export default function FloatNavBar() {
	const { openPopup } = useGlobalPopup();
	const { isAuth, tablifyUser } = useAuth();

	return (
		<div hidden className="fixed bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
			{isAuth ? (
				<button
					type="button"
					onClick={() => openPopup("PopupUser", { user: tablifyUser })}
					className="hover:scale-125 hover:-translate-y-2 transition-all duration-400"
				>
					<img src="/src/imgs/avatars/avatar-default.png" alt="avatar" />
				</button>
			) : (
				<button
					type="button"
					onClick={() => openPopup("PopupSignIn")}
					className="bg-[#313244] border-1 border-[#45475a] px-2 py-1 rounded-full hover:scale-125 hover:-translate-y-2 transition-all duration-400"
				>
					<span className="bi bi-person-fill text-xl"></span>
				</button>
			)}

			<div className="bg-[#313244] flex items-center justify-center border-1 border-[#45475a] px-2 py-1 rounded-full">
				<button
					title="Notifications"
					type="button"
					className="hover:scale-125 hover:-translate-y-2 transition-all duration-400 px-2"
				>
					<span className="bi bi-bell-fill text-xl"></span>
				</button>

				<button
					title="Configurations"
					type="button"
					className="hover:scale-125 hover:-translate-y-2 transition-all duration-400 px-2"
				>
					<span className="bi bi-gear-fill text-xl"></span>
				</button>

				<button
					title="Edit Mode"
					type="button"
					className="hover:scale-125 hover:-translate-y-2 transition-all duration-400 px-2"
				>
					<span className="bi bi-pencil-square text-xl"></span>
				</button>
			</div>
		</div>
	);
}
