import { useEffect, useState, Fragment, useRef } from "react";
import { useGlobalPopup } from "../contexts/GlobalPopupContext"

export default function imagetorage() {
  const { openPopup } = useGlobalPopup();

  const [imageWidth, setImageWidth] = useState(() => {
    const isImageWidth = localStorage.getItem("ImageWidthPercent");
    return isImageWidth ? isImageWidth : "30%";
  });

  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const request = indexedDB.open("UserImageDB", 1);

    request.onupgradeneeded = function (e) {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("image")) {
        db.createObjectStore("image");
      }
    };

    request.onsuccess = function () {
      loadImageFromIndexedDB(setImage);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("ImageWidthPercent", imageWidth);
  }, [imageWidth]);

  function saveImageToIndexedDB(file) {
    const request = indexedDB.open("UserImageDB", 1);
    request.onsuccess = function (e) {
      const db = e.target.result;
      const tx = db.transaction("image", "readwrite");
      const store = tx.objectStore("image");
      store.put(file, "myImage");
      tx.oncomplete = () => {
        loadImageFromIndexedDB(setImage);
      };
    };
  }

  function loadImageFromIndexedDB(callback) {
    const request = indexedDB.open("UserImageDB", 1);
    request.onsuccess = function (e) {
      const db = e.target.result;
      const tx = db.transaction("image", "readonly");
      const store = tx.objectStore("image");
      const getRequest = store.get("myImage");
      getRequest.onsuccess = function () {
        const file = getRequest.result;
        if (file) {
          const url = URL.createObjectURL(file);
          callback(url);
        }
      };
    };
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      saveImageToIndexedDB(file);
    }
  }

  return (
    <Fragment>
      {image ? (
        <div
          onClick={() => inputRef.current.click()}
          onContextMenu={(e) => {
            e.preventDefault();
            openPopup("PopupWidthImage", { imageWidth: imageWidth, setImageWidth: setImageWidth });
          }}
          className="group relative h-full cursor-pointer animate-fade animate-delay-[200ms]"
          style={{ width: imageWidth }}
        >
          <img src={image} alt="Imagen guardada" className="absolute w-full h-full object-cover object-center rounded-2xl border-2 border-[#313244]" />
          <div className="absolute bottom-0 w-full p-2">
            <button className="group-hover:block hidden bg-[#1e1e2e] rounded-full px-2 cursor-pointer animate-fade">
              Choose Image / Gif
            </button>
            <input hidden ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>
      ) : (
        <button onClick={() => inputRef.current.click()} className="bg-[#1e1e2e] hover:bg-[#313244] border-2 border-[#313244] flex items-center justify-center w-[30%] h-full rounded-2xl transition-colors duration-500 cursor-pointer">
          <i className="bi bi-image text-3xl sm:text-9xl"></i>
          <input hidden ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
        </button>
      )}
    </Fragment>
  );
}
