import { useState, useEffect, useRef, Fragment } from "react";
import PaletteMocha from "../../color_palettes/PaletteMocha";
import { useFolders } from "../../contexts/FoldersContext";
import { useGlobalPopup } from "../../contexts/GlobalPopupContext";

export default function PopupEditFolder({ folderIndex, onClose }) {
  const { folders, setFolders } = useFolders();
  const { openPopup } = useGlobalPopup();

  const [folderItems, setFolderItems] = useState(folders[folderIndex].folder_items);

  const [isEditingFolder, setIsEditingFolder] = useState(false);
  const [folderItem, setFolderItem] = useState("");
  const [itemURL, setItemURL] = useState("");
  const [itemColor, setItemColor] = useState(PaletteMocha[0]);

  const [emptyInputWarning, setEmptyInputWarning] = useState(false);

  const firstLinkRef = useRef(null);
  
  useEffect(() => {
    if (firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isEditingFolder, folderIndex]);

  useEffect(() => {
    setFolderItems(folders[folderIndex].folder_items);
  }, [folders])
    
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...folderItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };

    const updatedFolders = [...folders];
    updatedFolders[folderIndex] = {
      ...updatedFolders[folderIndex],
      folder_items: updatedItems
    };

    setFolders(updatedFolders);
  };

  const addItemToFolder = () => {
    if (!folderItem || !itemURL) {
      setEmptyInputWarning(true);
      setTimeout(() => {
        setEmptyInputWarning(false);
      }, 1500);
      return;
    };

    const newItem = {
      folderItem,
      itemURL,
      itemColor
    };

    const updatedFolders = [...folders];
    updatedFolders[folderIndex] = {
      ...updatedFolders[folderIndex],
      folder_items: [...updatedFolders[folderIndex].folder_items, newItem]
    };

    setFolders(updatedFolders);
    setFolderItem("");
    setItemURL("");
    setItemColor(PaletteMocha[0]);
  };

  const deleteItem = (itemIndex) => {
    const updatedItems = folderItems.filter((_, i) => i !== itemIndex);

    const updatedFolders = [...folders];
    updatedFolders[folderIndex] = {
      ...updatedFolders[folderIndex],
      folder_items: updatedItems
    };

    setFolders(updatedFolders);
  };

  const deleteFolder = (folderId) => {
    const updatedFolders = folders.filter(f => f.folder_id !== folderId);
    setFolders(updatedFolders);
    onClose();
  };

  return(
    <div className="flex flex-col gap-2 max-w-[300px] sm:max-w-[500px] p-2">
      <div className="bg-[#313244] grid grid-cols-2">
        <button
          type="button"
          onClick={() => setIsEditingFolder(false)}
          className={`${!isEditingFolder && "bg-[#45475a]"} cursor-pointer`}
        >
          Create
        </button>
        <button
          type="button"
          onClick={() => setIsEditingFolder(true)}
          className={`${isEditingFolder && "bg-[#45475a]"} cursor-pointer`}
        >
          Edit
        </button>
      </div>

      {isEditingFolder ? (
        <Fragment>
          <div className="bg-[#313244] flex flex-col max-h-[216px] flex-1 gap-2 overflow-y-auto scroll-hide p-2">
            {folderItems.map((item, index) => (
              <div key={index} className="flex flex-row items-center w-full gap-2">
                <button
                  ref={index === 0 ? firstLinkRef : null}
                  className="bg-[#45475a] flex items-center justify-center p-1 rounded-sm"
                >
                  <i className={`${item.itemColor} bi bi-circle-fill leading-none`}></i>
                </button>
                <div className="w-1/2 flex items-center gap-1">
                  <input
                    type="text"
                    value={item.folderItem}
                    onChange={(e) => handleItemChange(index, "folderItem", e.target.value)}
                    className="flex-1 w-full px-1 truncate"
                  />
                </div>
                <div className="w-1/2 flex items-center gap-1">
                  <input
                    type="text"
                    value={item.itemURL}
                    onChange={(e) => handleItemChange(index, "itemURL", e.target.value)}
                    className="w-full px-1 truncate"
                  />
                  <button
                    onClick={() => deleteItem(index)}
                    className={`bi bi-x bg-[#45475a] px-1`}
                  ></button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              onClick={() => onClose()}
              className="bg-[#45475a] px-5 cursor-pointer"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        </Fragment>  
      ) : (
        <div className="flex flex-col pl-2 gap-2 w-full">
          <label htmlFor="folder_item">Folder Item</label>
          <input autoFocus type="text" name="folder_item" id="folder_item" value={folderItem} onChange={(e) => setFolderItem(e.target.value)}
          className="border-1 focus:border-[#45475a] px-1" />
          <label htmlFor="folder_item_url">Folder Item URL</label>
          <input type="text" name="folder_item_url" id="folder_item_url" value={itemURL} onChange={(e) => setItemURL(e.target.value)}
          className="border-1 focus:border-[#45475a] px-1 mb-1" />
          <div className="flex flex-row gap-1">
          {PaletteMocha.map((color, index) => (
            <button key={index} onClick={() => setItemColor(color)} className={`${itemColor === color ? "bg-[#6c7086]" : "bg-[#45475a]"} bi bi-circle-fill ${color} flex items-center justify-center p-1 rounded-sm`}></button>
          ))}
          </div>
          
          <div className="flex flex-row w-ful gap-1">
            <button
              onClick={() => deleteFolder(folders[folderIndex].folder_id)}
              className="px-2 cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={addItemToFolder}
              className="bg-[#45475a] cursor-pointer flex-1"
            >
              Add Item
            </button>
          </div>

          <div className="flex flex-1 items-center justify-end w-full">
            <div className={emptyInputWarning ? "text-[#eba0ac] flex items-center justify-start gap-1 animate-fade-left" : "hidden"}>
              <i className="bi bi-asterisk"></i>
              <span className="truncate">Empty Inputs</span>
            </div>
            <button
              onClick={() => onClose()}
              className="bg-[#45475a] px-5 cursor-pointer"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        </div>
      )}            
    </div>
  );
}
