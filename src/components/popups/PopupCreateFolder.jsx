import { useState } from "react";
import PaletteMocha from "../../color_palettes/PaletteMocha";

export default function PopupCreateFolder({ createFolder, onClose }) {
  const [folderName, setFolderName] = useState("");
  const [folderItem, setFolderItem] = useState("");
  const [folderItemURL, setFolderItemURL] = useState("");
  const [itemColor, setItemColor] = useState(PaletteMocha[0]);
  const [emptyInputWarning, setEmptyInputWarning] = useState(false);

  const folderId = (() => {
    const isFolders = localStorage.getItem("Folders");
    if (isFolders) {
      const foldersJson = JSON.parse(isFolders);
      return foldersJson.length + 1;
    } else {
      return 1;
    }
  })();

  const handleCreateFolder = () => {
    if (folderName !== "" && folderItem !== "" && folderItemURL !== "") {
      createFolder([], {
        folder_id: folderId,
        folder_name: folderName,
        sub_folders: [],
        folder_items: [{folderItem: folderItem, itemColor: itemColor, itemURL: folderItemURL}],
      });

      onClose();
    } else {
      setEmptyInputWarning(true);
      setTimeout(() => {
        setEmptyInputWarning(false);
      }, 1500);
    }
  }

  return(
    <div className="relative flex flex-col p-2 gap-1">
      <label htmlFor="folder_name">Folder Name</label>
      <input
        autoFocus
        type="text"
        name="folder_name"
        id="folder_name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-2"
      />
      <label htmlFor="folder_item">Folder Item</label>
      <input type="text" name="folder_item" id="folder_item" value={folderItem} onChange={(e) => setFolderItem(e.target.value)}
      className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-2" />
      <label htmlFor="folder_item_url">Folder Item URL</label>
      <input type="text" name="folder_item_url" id="folder_item_url" value={folderItemURL} onChange={(e) => setFolderItemURL(e.target.value)}
      className="focus:text-[#a6adc8] border-1 focus:border-[#45475a] px-1 mb-2" />
      <div className="flex flex-row gap-1 mb-2">
        {PaletteMocha.map((color, index) => (
          <button key={index} onClick={() => setItemColor(color)} className={`${itemColor === color ? "bg-[#6c7086]" : "bg-[#45475a]"} bi bi-circle-fill ${color} flex items-center justify-center p-1 rounded-sm`}></button>
        ))}
      </div>
      <div className="flex items-center justify-end w-full gap-1">
        <div className={emptyInputWarning ? "text-[#eba0ac] flex items-center justify-start gap-1 w-full animate-fade-left" : "hidden"}><i className="bi bi-asterisk"></i>Empty Inputs</div>
        <button onClick={() => onClose()} className="bg-[#45475a] px-3 cursor-pointer"><i className="bi bi-x"></i></button>
        <button onClick={handleCreateFolder} className="bg-[#45475a] px-3 cursor-pointer">Create</button>
      </div>
    </div>
  );
}
