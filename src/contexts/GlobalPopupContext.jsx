import { createContext, useContext, useState, Fragment } from "react";
import PopupsComponents from "../components/popups";
import NavBar from "../components/NavBar.jsx";

const GlobalPopupContext = createContext();

export function useGlobalPopup() {
	return useContext(GlobalPopupContext);
}

export function GlobalPopupProvider({ children }) {
	const [popupState, setPopupState] = useState({
		name: null,
		props: {},
	});

	const openPopup = (name, props = {}) => {
		if (!PopupsComponents[name]) {
			return;
		}
		setPopupState({ name, props });
	};

	const closePopup = () => {
		setPopupState({ name: null, props: {} });
	};

	const PopupComponent = popupState.name
		? PopupsComponents[popupState.name]
		: null;

	return (
		<GlobalPopupContext.Provider value={{ openPopup, closePopup, popupState }}>
			{children}

			{PopupComponent && (
				<Fragment>
					<div
						onClick={closePopup}
						className="animate-fade animate-duration-100 fixed top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center text-[#cdd6f4]"
					>
						<div
							onClick={(e) => e.stopPropagation()}
							className="animate-open bg-white/20 dark:bg-[#1e1e2e] dark:ring-1 dark:ring-[#45475a] backdrop-blur-2xl p-2 rounded-xl"
						>
							<PopupComponent {...popupState.props} onClose={closePopup} />
						</div>
					</div>
				</Fragment>
			)}
		</GlobalPopupContext.Provider>
	);
}
