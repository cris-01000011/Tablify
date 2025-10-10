import { Fragment, useEffect, useState } from "react";
import { useGlobalPopup } from "../contexts/GlobalPopupContext";
import { useFolders } from "../contexts/FoldersContext.jsx";

export default function NavBar() {
  const { openPopup } = useGlobalPopup();
  const { folders, setFolders } = useFolders();
  
  const createFolder = (pathArray, newFolder) => {
    const add = (currentFolders, path) => {
      if (path.length === 0) {
        return [...currentFolders, newFolder];
      }
      return currentFolders.map(f => {
        if (f.name === path[0]) {
          return {
            ...f,
            sub_folders: add(f.sub_folders, path.slice(1))
          };
        }
        return f;
      });
    };

    setFolders(prev => add(prev, pathArray));
  };

  const handleEditFolder = (e, folderItems, folderIndex) => {
    e.preventDefault();
    openPopup("PopupEditFolder", { folderItems: folderItems, folderIndex: folderIndex});
  }

  return (
    <Fragment>
      {folders.map((folder, index)=> (
        <Fragment key={folder.folder_id}>
          <button
            onContextMenu={(e) => handleEditFolder(e, folder.folder_items, index)}
            onClick={() => openPopup("PopupOpenFolder", { folder: folder.folder_items })}
            className="bg-[#313244] w-auto rounded-full px-2 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"><i className="bi bi-folder2-open"
          >
            </i>{folder.folder_name}
          </button>
        </Fragment>
      ))}
      <button onClick={() => openPopup("PopupCreateFolder", { createFolder: createFolder })} className="bg-[#313244] rounded-full px-1 flex items-center justify-center gap-2 cursor-pointer"><i className="bi bi-plus"></i></button>
    </Fragment>
  );
}
