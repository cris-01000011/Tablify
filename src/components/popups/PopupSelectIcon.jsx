import { useState, useRef, useEffect, useMemo } from "react";
import { BootstrapIcons } from "../../data/BootstrapIcons";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";

export default function PopupSelectIcon({ PopupBack }) {
	const { openPopup } = useGlobalPopup();

	const [search, setSearch] = useState("");
	const [visibleCount, setVisibleCount] = useState(108);
	const scrollRef = useRef(null);

	const filteredIcons = useMemo(() => {
		const text = search.toLowerCase().trim();
		if (!text) return BootstrapIcons;

		return BootstrapIcons.filter((icon) =>
			icon.name.toLowerCase().includes(text),
		);
	}, [search]);

	useEffect(() => {
		setVisibleCount(108);
		if (scrollRef.current) {
			scrollRef.current.scrollTop = 0;
		}
	}, [search]);

	useEffect(() => {
		const element = scrollRef.current;

		function handleScroll() {
			if (!element) return;

			const bottom =
				element.scrollTop + element.clientHeight >= element.scrollHeight - 50;

			if (bottom) {
				setVisibleCount((prev) => {
					if (prev >= filteredIcons.length) return prev;
					return prev + 108;
				});
			}
		}

		element.addEventListener("scroll", handleScroll);
		return () => element.removeEventListener("scroll", handleScroll);
	}, [filteredIcons]);

	return (
		<div className="w-72 lg:w-125 flex flex-col gap-2">
			{/* search */}
			<div className="flex items-end gap-3">
				<input
					autoFocus
					id="icon"
					autoComplete="off"
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search"
					className="focus:text-[#a6adc8] w-full outline-none"
				/>
			</div>

			{/* scroll */}
			<div
				ref={scrollRef}
				className="w-full min-h-42 max-h-42 overflow-x-hidden overflow-y-auto scroll-black pr-1"
			>
				<ul className="grid grid-cols-5 lg:grid-cols-9 gap-1">
					{filteredIcons.slice(0, visibleCount).map((icon, index) => (
						<li key={index}>
							<button
								type="button"
								onClick={() =>
									openPopup(PopupBack.name, {
										...PopupBack.props,
										quickAccessIcon: icon.name,
									})
								}
								title={icon.name}
								className="bg-[#313244] w-full flex flex-col items-center justify-center p-2 text-xl"
							>
								<span className={`bi bi-${icon.name}`}></span>
							</button>
						</li>
					))}
				</ul>
			</div>

			<div className="flex items-center justify-end gap-1 w-full">
				<button
					type="button"
					onClick={() => openPopup(PopupBack.name, PopupBack.props)}
					className="bg-[#45475a] px-3"
				>
					<i className="bi bi-arrow-left"></i>
				</button>
			</div>
		</div>
	);
}
