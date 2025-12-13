import { useAuth } from "../../contexts/AuthContext";

export default function PopupUser({ user, onClose }) {
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
		onClose();
	};

	return (
		<div className="relative flex flex-col p-2 gap-2 w-52 bg-[#1e1e2e] text-white rounded-md shadow-lg">
			<div className="flex flex-col gap-1 items-center mt-3">
				<img
					src={user?.avatar || "/src/imgs/avatars/tablify/default.webp"}
					alt="User Avatar"
					className="w-10 h-10 rounded-full"
				/>
				<span className="text-xl font-semibold">{user?.name || "User"}</span>
				<span className="text-sm text-[#a6adc8]">
					{user?.email || "email@example.com"}
				</span>
			</div>

			<div className="flex flex-col gap-2 mt-2 w-full">
				<div className="flex justify-end mt-2 gap-1">
					<button
						type="button"
						onClick={onClose}
						className="bg-[#45475a] px-3 cursor-pointer"
					>
						<i className="bi bi-x"></i>
					</button>

					<button
						onClick={handleLogout}
						type="button"
						className="bg-[#45475a] px-3 cursor-pointer"
					>
						LogOut
					</button>
				</div>
			</div>
		</div>
	);
}
