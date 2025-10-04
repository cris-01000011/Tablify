import { createContext, useState, useContext, useEffect } from "react";

const FoldersContext = createContext();

export const useFolders = () => useContext(FoldersContext);

export const FoldersContextProvider = ({ children }) => {
  const [folders, setFolders] = useState(() => {
    const isFolders = localStorage.getItem("Folders");
    return isFolders ? JSON.parse(isFolders) : []; 
  });

  useEffect(() => {
    localStorage.setItem("Folders", JSON.stringify(folders))
  }, [folders])

  return (
    <FoldersContext.Provider value={{ folders, setFolders }}>
      { children }
    </FoldersContext.Provider>
  );
}
