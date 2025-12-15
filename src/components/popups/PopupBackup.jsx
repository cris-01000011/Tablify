import { useLocalStorage } from "../../contexts/LocalStorageContext";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import { useBackup } from "../../hooks/useBackup";
import { useRef } from "react";

export default function PopupBackup() {
	const { openPopup } = useGlobalPopup();
	const { store, setValue } = useLocalStorage();
	const { exportBackup, importBackup } = useBackup();

	const inputFileRef = useRef(null);

	return (
		<div className="relative flex flex-col p-2 gap-1 w-84 lg:w-124">
			<div className="bg-[#313244] grid grid-cols-2 w-full mt-1 mb-2">
				<button onClick={() => openPopup("PopupSettings", {})} type="button">
					System UI
				</button>
				<button type="button" className="bg-[#45475a]">
					Backup
				</button>
			</div>

			<div className="grid grid-cols-2 w-full gap-2 mb-2 lg:mb-4">
				<button
					onClick={() => exportBackup(["Folders"])}
					type="button"
					className="bg-[#313244] w-full px-4 truncate"
				>
					Export Folders
				</button>
				<button
					onClick={() => exportBackup(["QuickAccess"])}
					type="button"
					className="bg-[#313244] w-full px-4 truncate"
				>
					Export Quick Access
				</button>
				<button
					onClick={() => exportBackup(["Folders", "QuickAccess"])}
					type="button"
					className="col-span-2 bg-[#313244] w-full px-4 truncate"
				>
					Export All
				</button>
			</div>

			<button
				type="button"
				onClick={() => inputFileRef.current?.click()}
				className="col-span-2 bg-[#313244] w-full px-4 truncate"
			>
				Import (Replace)
			</button>
			<input
				hidden
				ref={inputFileRef}
				type="file"
				accept="application/json"
				onChange={(e) => importBackup(e.target.files[0])}
			/>
		</div>
	);
}
