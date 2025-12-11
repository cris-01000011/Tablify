import { useRef, useState, useEffect } from "react";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { useAuth } from "../../contexts/AuthContext";

export default function DraggableMenu() {
	const { openPopup } = useGlobalPopup();
	const { isAuth, tablifyUser } = useAuth();
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
		setDraggableMenuPosition({
			x: window.innerWidth - rect.width - 20,
			y: window.innerHeight - rect.height - 20,
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
				el.setPointerCapture(e.pointerId);
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
			style={{
				position: "fixed",
				left: 0,
				top: 0,
				transform: `translate3d(${draggableMenuPosition.x}px, ${draggableMenuPosition.y}px, 0)`,
				touchAction: "none",
				zIndex: 9999,
			}}
			onClick={() => {
				if (isDraggableMenuMoved) return;

				if (!isAuth) return openPopup("PopupSignIn");

				openPopup("PopupUser", { user: tablifyUser });
			}}
		>
			{isAuth ? (
				<button type="button" className="w-10 h-10">
					<img
						draggable="false"
						className="w-full h-full "
						src="/src/imgs/avatars/avatar-default.png"
						alt="avatar"
					/>
				</button>
			) : (
				<button
					type="button"
					className="bg-[#313244] border-1 border-[#45475a] flex items-center justify-center w-10 h-10 rounded-full"
				>
					<span className="bi bi-person-fill flex items-center justify-center text-xl"></span>
				</button>
			)}
		</div>
	);
}
