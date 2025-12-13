import { useLocalStorage } from "../../contexts/LocalStorageContext";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";
import SwitchButton from "../custom_elements/SwitchButton";

export default function PopupSettings() {
	const { openPopup } = useGlobalPopup();
	const { store, setValue } = useLocalStorage();

	return (
		<div className="relative flex flex-col p-2 gap-1 w-84">
			<div className="bg-[#313244] grid grid-cols-2 w-full mt-1 mb-2">
				<button type="button" className="bg-[#45475a]">
					System UI
				</button>
				<button onClick={() => openPopup("PopupBackup", {})} type="button">
					Backup
				</button>
			</div>

			<span>Auto-Hide FloatNavBar</span>
			<SwitchButton
				state={store.AutoHideFloatNavBar}
				setState={() =>
					setValue("AutoHideFloatNavBar", !store.AutoHideFloatNavBar)
				}
			/>
		</div>
	);
}
