import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GlobalPopupProvider } from './contexts/GlobalPopupContext.jsx'
import { QuickAccessProvider } from './contexts/QuickAccessContext.jsx'
import { FoldersContextProvider } from './contexts/FoldersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FoldersContextProvider>
      <QuickAccessProvider>
        <GlobalPopupProvider>
          <App />
        </GlobalPopupProvider>
      </QuickAccessProvider>
    </FoldersContextProvider>
  </StrictMode>,
);
