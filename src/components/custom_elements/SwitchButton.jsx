export default function SwitchButton({ state, setState }) {
	return (
		<button
			onClick={() => setState()}
			className="relative grid grid-cols-2 bg-[#313244] w-16 h-4"
		>
			<div
				className={`${state ? "absolute top-0 right-0 w-8 h-4 bg-[#585b70]" : "bg-[#45475a]"}`}
			></div>
		</button>
	);
}
