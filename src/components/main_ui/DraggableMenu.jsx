import { useRef, useState, useEffect } from "react";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { useLocalStorage } from "../../contexts/LocalStorageContext";
import { useAuth } from "../../contexts/AuthContext";

export default function DraggableMenu() {
	const { openPopup } = useGlobalPopup();
	const { store, setValue } = useLocalStorage();
	const { isAuth, tablifyUser } = useAuth();

	const [isMenuHidden, setIsMenuHidden] = useState(true);
	const [isMenuAtRight, setIsMenuAtRight] = useState(true);

	const ref = useRef(null);
	const dragDelayRef = useRef(null);
	const draggingRef = useRef(false);
	const pointerIdRef = useRef(null);
	const offsetRef = useRef({ x: 0, y: 0 });

	const [draggableMenuPosition, setDraggableMenuPosition] = useState({
		x: 0,
		y: 0,
	});
	const [isDraggableMenuMoved, setIsDraggableMenuMoved] = useState(false);

	function clampPosition(x, y, elRect) {
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		const width = elRect.width;
		const height = elRect.height;

		return {
			x: Math.min(vw - width, Math.max(0, x)),
			y: Math.min(vh - height, Math.max(0, y)),
		};
	}

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		let x = store.DraggableMenuPos.x !== -1 ? store.DraggableMenuPos.x : 0;
		let y = store.DraggableMenuPos.y !== -1 ? store.DraggableMenuPos.y : 0;

		if (x > window.innerWidth - rect.width || x === 0)
			x = window.innerWidth - rect.width - 20;

		if (y > window.innerHeight - rect.height || y === 0)
			y = window.innerHeight - rect.height - 20;
		setDraggableMenuPosition({
			x,
			y,
		});
	}, []);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		function onPointerDown(e) {
			if (e.pointerType === "mouse" && e.button !== 0) return;
			setIsDraggableMenuMoved(false);
			dragDelayRef.current = setTimeout(() => {
				draggingRef.current = true;
				pointerIdRef.current = e.pointerId;
				const rect = el.getBoundingClientRect();
				offsetRef.current = {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				};
			}, 100);
		}

		function onPointerMove(e) {
			if (!draggingRef.current || pointerIdRef.current !== e.pointerId) return;
			setIsDraggableMenuMoved(true);
			setIsMenuHidden(true);
			const rect = el.getBoundingClientRect();
			const clamped = clampPosition(
				e.clientX - offsetRef.current.x,
				e.clientY - offsetRef.current.y,
				rect,
			);
			setDraggableMenuPosition(clamped);
		}

		function onPointerUp(e) {
			clearTimeout(dragDelayRef.current);
			if (pointerIdRef.current !== e.pointerId) return;
			const rect = el.getBoundingClientRect();
			const clamped = clampPosition(
				e.clientX - offsetRef.current.x,
				e.clientY - offsetRef.current.y,
				rect,
			);
			setValue("DraggableMenuPos", { x: clamped.x, y: clamped.y });
			draggingRef.current = false;
			pointerIdRef.current = null;
			try {
				el.releasePointerCapture(e.pointerId);
			} catch {}
		}

		el.addEventListener("pointerdown", onPointerDown);
		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp);
		window.addEventListener("pointercancel", onPointerUp);

		return () => {
			clearTimeout(dragDelayRef.current);
			el.removeEventListener("pointerdown", onPointerDown);
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerUp);
		};
	}, []);

	useEffect(() => {
		function handleResize() {
			const el = ref.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			setDraggableMenuPosition((p) => clampPosition(p.x, p.y, rect));
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div
			ref={ref}
			className="relative lg:hidden flex items-center justify-center"
			style={{
				position: "fixed",
				left: 0,
				top: 0,
				transform: `translate3d(${draggableMenuPosition.x}px, ${draggableMenuPosition.y}px, 0)`,
				touchAction: "none",
				zIndex: 9999,
			}}
			onClick={(e) => {
				if (isDraggableMenuMoved) return;

				if (e.clientX > window.innerWidth / 2) setIsMenuAtRight(true);

				if (e.clientX < window.innerWidth / 2) setIsMenuAtRight(false);

				setIsMenuHidden((prev) => !prev);
			}}
		>
			{!isAuth ? (
				<button type="button" className="w-10 h-10">
					<img
						draggable="false"
						className="w-full h-full "
						src={
							tablifyUser?.avatar || "/src/imgs/avatars/tablify/default.webp"
						}
						alt="avatar"
					/>
				</button>
			) : (
				<button
					type="button"
					className="bg-[#313244] border-1 border-[#45475a] flex items-center justify-center w-10 h-10 rounded-full"
				>
					<span className="bi bi-list flex items-center justify-center text-xl"></span>
				</button>
			)}
			<div
				hidden={isMenuHidden}
				onClick={(e) => e.stopPropagation()}
				className={`${isMenuAtRight ? "right-12" : "left-12"} absolute top-0 bg-[#313244] border border-[#45475a] flex flex-row items-center justify-center gap-2 px-2 py-1 rounded-full w-auto h-auto`}
			>
				<button
					hidden
					title="Login"
					type="button"
					onClick={() => {
						if (!isAuth) openPopup("PopupSignIn");

						if (isAuth) openPopup("PopupUser", { user: tablifyUser });

						setIsMenuHidden(true);
					}}
					className="hover:scale-125 hover:-translate-y-2 transition-all duration-400 px-2"
				>
					<span className="bi bi-person-fill text-xl"></span>
				</button>

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
					onClick={() => openPopup("PopupSettings")}
					className="hover:scale-125 hover:-translate-y-2 transition-all duration-400 px-2"
				>
					<span className="bi bi-gear-fill text-xl"></span>
				</button>

				<button
					title="Backup"
					type="button"
					onClick={() => openPopup("PopupBackup")}
					className="hover:scale-125 hover:-translate-y-2 transition-all duration-400 px-2"
				>
					<span className="bi bi-floppy-fill text-xl"></span>
				</button>
			</div>
		</div>
	);
}
