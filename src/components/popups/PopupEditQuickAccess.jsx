import { useState, useEffect } from "react";
import { useLocalStorage } from "../../contexts/LocalStorageContext.jsx";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { MochaPaletteFirst } from "../../data/ColorPalette.js";
import { useQuickAccessService } from "../../contexts/QuickAccessContext.jsx";
import { useQuickAccess } from "../../hooks/useQuickAccess.jsx";

export default function PopupEditQuickAccess({ onClose }) {
	const { openPopup } = useGlobalPopup();
	const { store, setValue } = useLocalStorage();
	const { quickAccess } = useQuickAccessService();
	const { isQuickAccessChanged, updateQuickAccess, deleteQuickAccess } =
		useQuickAccess();

	const [quickAccessEditable, setQuickAccessEditable] = useState([]);

	useEffect(() => {
		setQuickAccessEditable(quickAccess);
	}, [quickAccess]);

	const handleChangeName = (id, value) => {
		setQuickAccessEditable((prev) =>
			prev.map((qa) =>
				qa.quick_access_id === id ? { ...qa, name: value } : qa,
			),
		);
	};

	const handleChangeUrl = (id, value) => {
		setQuickAccessEditable((prev) =>
			prev.map((qa) =>
				qa.quick_access_id === id ? { ...qa, url: value } : qa,
			),
		);
	};

	return (
		<div className="flex flex-col gap-2 w-auto p-1">
			<div className="bg-[#313244] grid grid-cols-2 mt-1">
				<button
					type="button"
					onClick={() => openPopup("PopupCreateQuickAccess")}
				>
					Create
				</button>

				<button type="button" className="bg-[#45475a]">
					Edit
				</button>
			</div>

			<div className="bg-[#313244] flex flex-col items-center min-w-69 min-h-62 max-h-62 flex-1 gap-2 overflow-y-auto scroll-hide p-2">
				{quickAccessEditable.map((qa) => (
					<div key={qa.quick_access_id} className="flex flex-row w-auto gap-2">
						<button
							type="button"
							onClick={() =>
								openPopup("PopupQuickAccessIcon", {
									quickAccessId: qa.quick_access_id,
									quickAccessIcon: qa.icon,
									colorIndex: MochaPaletteFirst.indexOf(qa.first_color),
								})
							}
							className="flex items-center justify-center text-[#585b70] px-1"
							style={{
								background: `linear-gradient(to right, ${qa.first_color}, ${qa.second_color})`,
							}}
						>
							<span
								className={`bi bi-${qa.icon} flex items-center justify-center`}
							></span>
						</button>

						<input
							id={`name-${qa.quick_access_id}`}
							type="text"
							autoComplete="off"
							value={qa.name}
							onChange={(e) =>
								handleChangeName(qa.quick_access_id, e.target.value)
							}
							className="w-24 lg:w-42 px-1 truncate outline-none"
						/>

						<input
							id={`url-${qa.quick_access_id}`}
							type="text"
							autoComplete="off"
							value={qa.url}
							onChange={(e) =>
								handleChangeUrl(qa.quick_access_id, e.target.value)
							}
							className="w-24 lg:w-42 px-1 truncate outline-none"
						/>

						<button
							type="button"
							disabled={isQuickAccessChanged(quickAccess, qa)}
							onClick={() =>
								updateQuickAccess(qa.quick_access_id, {
									name: qa.name,
									url: qa.url,
								})
							}
							className="disabled:text-[#6c7086] bg-[#45475a] px-1"
						>
							<span className="bi bi-check flex items-center"></span>
						</button>

						<button
							type="button"
							onClick={() => deleteQuickAccess(qa.quick_access_id)}
							className="bg-[#45475a] px-1"
						>
							<span className="bi bi-x flex items-center"></span>
						</button>
					</div>
				))}
			</div>

			<div className="flex items-center justify-end w-full">
				<button onClick={onClose} className="bg-[#45475a] px-5">
					<span className="bi bi-x flex items-center py-1"></span>
				</button>
			</div>
		</div>
	);
}
