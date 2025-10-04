import { useState, useRef, useEffect, Fragment } from "react";
import { useGlobalPopup } from "../contexts/GlobalPopupContext";

export default function InputSearch() {
  const { openPopup } = useGlobalPopup();

  const [inputValue, setInputValue] = useState("");

  const [searchMethodIndex, setSearchMethodIndex] = useState(() => {
    const isSearchMethodIndex = localStorage.getItem("SearchMethodIndex");
    return isSearchMethodIndex ? JSON.parse(isSearchMethodIndex) : 0;
  });

  const [searchCommands, setSearchCommands] = useState(() => {
    const isSearchCommands = localStorage.getItem("SearchCommands");
    return isSearchCommands ? JSON.parse(isSearchCommands) : [];
  });

  const [fontBigBlue, setFontBigBlue] = useState(() => {
    const saved = localStorage.getItem("FontBigBlue");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [commandName, setCommandName] = useState("Search");
  const [commandsLength, setCommandsLength] = useState(searchCommands.length);

  const [searchMethodOptions, setSearchMethodOptions] = useState([
    { icon: "google", url: "https://www.google.com/search?q=" },
    { icon: "bing", url: "https://www.bing.com/search?q=" },
  ]);

  const [prefixURL, setPrefixURL] = useState(searchMethodOptions[searchMethodIndex].url);

  const linkRef = useRef(null); 

  useEffect(() => {
    localStorage.setItem("SearchMethodIndex", JSON.stringify(searchMethodIndex));
    setPrefixURL(searchMethodOptions[searchMethodIndex].url);
  }, [searchMethodIndex]);

  useEffect(() => {
    localStorage.setItem("SearchCommands", JSON.stringify(searchCommands));

    if (commandsLength !== searchCommands.length) {
      openPopup("PopupCommands", { searchCommands: searchCommands, setSearchCommands: setSearchCommands });
      setCommandsLength(prev => prev + 1);
    }
  }, [searchCommands]);

  useEffect(() => {
    if (fontBigBlue) {
      document.body.style.fontFamily = "'BigBlueTerm', monospace";
    } else {
      document.body.style.fontFamily = "";
    }
    localStorage.setItem("FontBigBlue", JSON.stringify(fontBigBlue));
  }, [fontBigBlue]);

  const handleChangeSearchMethod = () => {
    setCommandName("Search");

    if ((searchMethodIndex + 1) === searchMethodOptions.length) {
      setSearchMethodIndex(0);
    } else {
      setSearchMethodIndex(prev => prev + 1);
    }
  }

  const handleInputKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const trimmedInput = inputValue.trim();

    const specialCommands = {
      ":c": () => openPopup("PopupCommands", { searchCommands, setSearchCommands }),
      ":f": () => setFontBigBlue(prev => !prev),
      ":n": () => {
        setCommandName("Search");
        setPrefixURL("https://www.google.com/search?q=");
      },
    };

    if (specialCommands[trimmedInput]) {
      specialCommands[trimmedInput]();
      setInputValue("");
      return;
    }

    const matchedCommand = searchCommands.find(cmd => cmd.commandLaunch === trimmedInput);

    if (matchedCommand) {
      setCommandName(matchedCommand.commandName);
      setPrefixURL(matchedCommand.commandURL);
      setInputValue("");
      return;
    }

    linkRef.current.click();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      autoComplete="off"
      className="flex items-center w-full"
    >
      <a
        hidden
        ref={linkRef}
        href={`${prefixURL + inputValue}`}
      ></a>
      <div
        className="flex flex-row border-2 border-[#585b70] w-full px-2 rounded-l-xl cursor-text"
      >
        <span className="text-[#585b70] mr-[2px]">{commandName}:</span>
        <input
          autoComplete="off"
          type="text"
          name="searchBar"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(e)}
          className="outline-none w-full"
        />
      </div>
      <button
        type="button"
        onClick={handleChangeSearchMethod}
        className="outline-none bg-[#313244] focus:bg-[#585b70] border-2 border-[#585b70] flex items-center h-full px-5 rounded-r-xl cursor-pointer"
      >
        <i className={`bi bi-${commandName === "Search" && searchMethodOptions[searchMethodIndex].icon} leading-none`}></i>
      </button>
    </form>
  );
}

