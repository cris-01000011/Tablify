import { useEffect, useRef } from "react";

export default function PopupOpenFolder({ folder, onClose }) {
  const firstLinkRef = useRef(null);
  
  useEffect(() => {
    if (firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [folder]);

  return (
    <div className="relative flex flex-col items-center min-w-52 p-2 gap-1">
      {folder.map((item, index) => (
        <div key={index} className="flex justify-start w-full">
          <a
            href={item.itemURL}
            ref={index === 0 ? firstLinkRef : null}
            className="focus:bg-[#45475a] px-2 w-full"
          >
            <i className={`${item.itemColor} bi bi-circle-fill mr-2`}></i>
            {item.folderItem}
          </a>
        </div>
      ))}
    </div>
  );
}
