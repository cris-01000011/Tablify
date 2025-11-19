export default function PopupOpenFolder({ folder }) {
  return (
    <div className="relative flex flex-col items-center min-w-52 p-1 gap-1">
      {folder.map((item, index) => (
        <div key={index} className="flex justify-start w-full">
          <a
            href={item.itemURL}
            className="hover:bg-[#45475a] px-2 w-full"
          >
            <i className={`${item.itemColor} bi bi-circle-fill mr-2`}></i>
            {item.folderItem}
          </a>
        </div>
      ))}
    </div>
  );
}
