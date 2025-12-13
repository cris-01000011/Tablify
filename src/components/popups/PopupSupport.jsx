import { useState } from "react";

export default function PopupSupport() {
	const [isCoping, setIsCoping] = useState(false);

	const handleCopy = () => {
		navigator.clipboard
			.writeText("https://tablify-lemon.vercel.app/")
			.then(() => setIsCoping(true))
			.catch(() => console.error("Error"));
	};

	return (
		<div className="relative flex flex-col items-center justify-center p-2 gap-1 w-auto">
			<img
				className="w-18 h-18"
				src="/src/imgs/avatars/tablify/default.webp"
				alt="tablify"
			/>
			<span className="text-2xl">Support Tablify</span>
			<div className="grid grid-cols-2 w-84 gap-2">
				<a
					href="https://www.paypal.com/paypalme/cris01000011"
					target="_blank"
					className="bg-[#89b4fa] text-[#313244] text-center w-full font-bold"
				>
					<span className="bi bi-paypal mr-2"></span>
					<span>PayPal</span>
				</a>
				<a
					href="https://ko-fi.com/cris01000011"
					target="_blank"
					className="bg-[#f38ba8] text-[#313244] text-center w-full font-bold"
				>
					<span className="bi bi-cup-hot-fill mr-2"></span>
					<span>Ko-Fi</span>
				</a>
			</div>

			<div className="grid grid-cols-2 w-full text-sm gap-2 mt-1">
				<a
					href="https://github.com/cris-01000011/Tablify"
					target="_blank"
					className="bg-[#313244] text-[#cdd6f4] text-center w-full font-bold px-4"
				>
					<span className="bi bi-github mr-2"></span>
					<span>GitHub Star</span>
				</a>
				<a
					href="https://www.producthunt.com/products/tablify"
					target="_blank"
					className="bg-[#313244] text-[#cdd6f4] text-center w-full font-bold px-4"
				>
					<span className="bi bi-p-circle-fill mr-2"></span>
					<span>Product Hunt</span>
				</a>
				<button
					type="button"
					onClick={handleCopy}
					className="col-span-2 bg-[#313244] text-[#cdd6f4] text-center w-full font-bold px-4"
				>
					<span className="bi bi-share-fill mr-2"></span>
					{isCoping ? (
						<span
							onAnimationEnd={() => setIsCoping(false)}
							className="animate-copy"
						>
							Copied!
						</span>
					) : (
						<span>Share</span>
					)}
				</button>
			</div>
		</div>
	);
}
