import { useState } from "react";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { useAuthentication } from "../../hooks/useAuthentication";

export default function PopupSignIn({ onClose }) {
	const { openPopup } = useGlobalPopup();
	const { signin } = useAuthentication();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="relative flex flex-col p-2 gap-1 w-auto">
			<div className="bg-[#313244] grid grid-cols-2 w-full mt-1 mb-2">
				<button type="button" className="bg-[#45475a] cursor-pointer">
					SignIn
				</button>
				<button
					type="button"
					onClick={() => openPopup("PopupSignUp")}
					className="cursor-pointer"
				>
					SignUp
				</button>
			</div>

			<div className="flex flex-col gap-1 items-center mt-3">
				<img src="/icon.png" alt="logo" className="w-10 h-10" />
				<span className="text-xl font-semibold">Tablify</span>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					signin(email, password);
				}}
				className="relative flex flex-col p-2 gap-1 w-64"
			>
				<label htmlFor="email">Email</label>
				<input
					autoFocus
					type="email"
					id="email"
					name="email"
					autoComplete="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-2"
					required
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-2"
					required
				/>

				<div className="flex items-center justify-end w-full gap-1 mt-2">
					<button
						onClick={onClose}
						type="button"
						className="bg-[#45475a] px-3 cursor-pointer"
					>
						<i className="bi bi-x"></i>
					</button>

					<button type="submit" className="bg-[#45475a] px-3 cursor-pointer">
						LogIn
					</button>
				</div>
			</form>
		</div>
	);
}
