import { useState } from "react";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { useAuthentication } from "../../hooks/useAuthentication";

export default function PopupSignUp({ onClose }) {
	const { openPopup } = useGlobalPopup();
	const { signup } = useAuthentication();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isError, setIsError] = useState(false);

	return (
		<div className="flex flex-col p-2 gap-1 w-auto">
			<div className="bg-[#313244] grid grid-cols-2 w-full mt-1 mb-2">
				<button
					type="button"
					onClick={() => openPopup("PopupSignIn")}
					className="cursor-pointer"
				>
					SignIn
				</button>
				<button type="button" className="bg-[#45475a] cursor-pointer">
					SignUp
				</button>
			</div>

			<div className="flex flex-col gap-1 items-center mt-3">
				<img src="/icon.png" alt="logo" className="w-10 h-10" />
				{isError ? (
					<span
						onAnimationEnd={() => setIsError(false)}
						className="animate-shake-error text-[#eba0ac] text-xl font-semibold"
					>
						User already exist
					</span>
				) : (
					<span className="text-xl font-semibold">Tablify</span>
				)}
			</div>

			<form
				onSubmit={async (e) => {
					e.preventDefault();
					try {
						await signup(username, email, password);
					} catch (error) {
						setIsError(true);
					}
				}}
				className="relative flex flex-col p-2 gap-1 w-64"
			>
				<label htmlFor="username">Usuario</label>
				<input
					autoFocus
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-2"
					required
				/>

				<label htmlFor="email">Correo</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-2"
					required
				/>

				<label htmlFor="password">Contraseña</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-2"
					required
				/>

				<div className="flex items-center justify-end w-full gap-1 mt-2">
					<button
						type="button"
						onClick={onClose}
						className="bg-[#45475a] px-3 cursor-pointer"
					>
						<i className="bi bi-x"></i>
					</button>

					<button type="submit" className="bg-[#45475a] px-3 cursor-pointer">
						SignUp
					</button>
				</div>
			</form>
		</div>
	);
}
