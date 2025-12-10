import { useRef, useState, useEffect } from "react";

export default function DraggableMenu() {
	const ref = useRef(null);
	const draggingRef = useRef(false);
	const pointerIdRef = useRef(null);
	const offsetRef = useRef({ x: 0, y: 0 });

	const [pos, setPos] = useState({ x: 20, y: 20 });

	function clampPosition(x, y, elRect) {
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		const width = elRect.width;
		const height = elRect.height;

		const minX = 0;
		const minY = 0;
		const maxX = Math.max(0, vw - width);
		const maxY = Math.max(0, vh - height);

		return {
			x: Math.min(maxX, Math.max(minX, x)),
			y: Math.min(maxY, Math.max(minY, y)),
		};
	}

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		function onPointerDown(e) {
			if (e.pointerType === "mouse" && e.button !== 0) return;

			draggingRef.current = true;
			pointerIdRef.current = e.pointerId;
			el.setPointerCapture(e.pointerId);

			const rect = el.getBoundingClientRect();
			offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

			document.body.style.userSelect = "none";
		}

		function onPointerMove(e) {
			if (!draggingRef.current || pointerIdRef.current !== e.pointerId) return;
			const rect = el.getBoundingClientRect();
			const newX = e.clientX - offsetRef.current.x;
			const newY = e.clientY - offsetRef.current.y;
			const clamped = clampPosition(newX, newY, rect);
			setPos(clamped);
		}

		function onPointerUp(e) {
			if (!draggingRef.current || pointerIdRef.current !== e.pointerId) return;
			draggingRef.current = false;
			try {
				el.releasePointerCapture(e.pointerId);
			} catch (err) {}
			pointerIdRef.current = null;
			document.body.style.userSelect = "";
		}

		el.addEventListener("pointerdown", onPointerDown);
		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp);
		window.addEventListener("pointercancel", onPointerUp);

		return () => {
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
			const clamped = clampPosition(pos.x, pos.y, rect);
			if (clamped.x !== pos.x || clamped.y !== pos.y) setPos(clamped);
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [pos]);

	return (
		<div
			ref={ref}
			role="dialog"
			aria-label="Draggable menu"
			tabIndex={0}
			style={{
				position: "fixed",
				left: 0,
				top: 0,
				transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
				touchAction: "none", // importante para pointer events en móviles
				zIndex: 9999,
				// estilos de ejemplo
				minWidth: 200,
				padding: 12,
				borderRadius: 8,
				boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
				background: "white",
				cursor: "grab",
				userSelect: "none",
			}}
			onPointerDown={(e) => {
				// si haces click en cualquier parte del menú, se activa el drag
				// también cambiamos el cursor para indicar arrastre
				e.currentTarget.style.cursor = "grabbing";
			}}
			onPointerUp={(e) => {
				e.currentTarget.style.cursor = "grab";
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<strong>DraggableMenu</strong>
				<button
					onClick={() => {
						// ejemplo de acción: centrar en la pantalla
						const vw = window.innerWidth;
						const vh = window.innerHeight;
						const el = ref.current;
						if (!el) return;
						const rect = el.getBoundingClientRect();
						const centerX = Math.max(0, Math.round(vw / 2 - rect.width / 2));
						const centerY = Math.max(0, Math.round(vh / 2 - rect.height / 2));
						setPos({ x: centerX, y: centerY });
					}}
				>
					Center
				</button>
			</div>

			<div style={{ marginTop: 8 }}>
				<p style={{ margin: 0 }}>
					Arrastra este cuadro con mouse o con touch. No puede salirse del
					viewport.
				</p>
			</div>
		</div>
	);
}
