import { useState } from "react";

export default function PopupCommands({ searchCommands, setSearchCommands, onClose }) {
  const [isAddingCommand, setIsAddingCommand] = useState(false);
  const [commandName, setCommandName] = useState("");
  const [commandLaunch, setCommandLaunch] = useState("");
  const [commandURL, setCommandURL] = useState("");

  const handleAddCommand = () => {
    if (commandName !== "" && commandLaunch !== "" && commandURL !== "") {
      const newCommand = {
        commandId: Date.now(),
        commandName,
        commandLaunch,
        commandURL
      }

      setSearchCommands(prev => [...prev, newCommand]);
    }

    setCommandName("");
    setCommandLaunch("");
    setCommandURL("");
    setIsAddingCommand(false);
  }

  const handleDeleteCommand = (commandId) => {
    setSearchCommands(prev => prev.filter(cmd => cmd.commandId !== commandId));
  };

  const handleIsAddingCommand = () => {
    if (isAddingCommand) {
      handleAddCommand();
    } else {
      setIsAddingCommand(true);
    }
  }

  return (
    <div className="flex flex-col gap-2 p-1">
      <div className="flex flex-col gap-1 min-w-[350px] max-w-[350px] lg:min-w-[500px] lg:max-w-[500px] h-[150px] lg:h-[300px] gap-2 p-2">
        {searchCommands.length > 0 && (
          <div className="w-full overflow-y-auto scroll-hide">
            <div className="grid grid-cols-4 bg-[#45475a] px-2 py-1">
              <span className="w-full">Name</span>
              <span className="w-full">Command</span>
              <span className="w-full col-span-1">URL</span>
              <span className="w-full"></span>
            </div>

            {searchCommands.map(sc => (
              <div
                key={sc.commandId}
                className="grid grid-cols-4 items-center bg-[#313244] border-b border-[#45475a] pl-1 py-1"
              >
                <span className="truncate pl-1">{sc.commandName}</span>
                <span className="truncate">{sc.commandLaunch}</span>
                <span className="truncate">{sc.commandURL}</span>
                <div className="text-right pr-1">
                  <button
                    onClick={() => handleDeleteCommand(sc.commandId)}
                    className="bg-[#45475a] px-1 cursor-pointer"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isAddingCommand && (
          <div className="flex flex-row w-full gap-1 pr-2">
            <input
              autoFocus
              type="text"
              name="commandName"
              value={commandName}
              onChange={(e) => setCommandName(e.target.value)}
              placeholder="Name"
              className="px-1 max-w-[25%]"
            />
            <input
              type="text"
              name="commandLaunch"
              value={commandLaunch}
              onChange={(e) => setCommandLaunch(e.target.value)}
              placeholder="Command"
              className="px-1 max-w-[25%]"
            />
            <input
              type="text"
              name="commandURL"
              value={commandURL}
              onChange={(e) => setCommandURL(e.target.value)}
              placeholder="URL"
              className="px-1 max-w-[50%]"
            />
          </div>
        )}
        <button
          autoFocus
          onClick={handleIsAddingCommand}
          className="bg-[#45475a] px-5 cursor-pointer"
        >
          {isAddingCommand ? (
            <span>Add</span>
          ) : (
            <i className="bi bi-plus"></i>
          )}
        </button>
      </div>
      <div className="flex items-center justify-end w-full">
        <button
          onClick={onClose}
          className="bg-[#45475a] px-5 cursor-pointer"
        >
          <i className="bi bi-x"></i>
        </button>
      </div>
    </div>
  );
}
