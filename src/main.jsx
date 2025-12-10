import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalPopupProvider } from "./contexts/GlobalPopupContext.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { LocalStorageContextProvider } from "./contexts/LocalStorageContext.jsx";
import { FolderContextProvider } from "./contexts/FolderContext.jsx";
import { QuickAccessContextProvider } from "./contexts/QuickAccessContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<LocalStorageContextProvider>
			<AuthContextProvider>
				<QuickAccessContextProvider>
					<FolderContextProvider>
						<GlobalPopupProvider>
							<App />
						</GlobalPopupProvider>
					</FolderContextProvider>
				</QuickAccessContextProvider>
			</AuthContextProvider>
		</LocalStorageContextProvider>
	</StrictMode>,
);
