import React, { useState } from "react";
import { IoMic, IoMicOff } from "react-icons/io5";

interface ToggleButtonProps {
  onToggle: (isOn: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle }) => {
  const [isMicOn, setIsMicOn] = useState(false);

  const handleClick = () => {
    const newIsMicOn = !isMicOn;
    setIsMicOn(newIsMicOn);
    onToggle(newIsMicOn);
  };

  return (
    <div
      className={`static py-1.5 px-2 w-20 flex items-center bg-gray-300 rounded-full cursor-pointer ${
        isMicOn ? "bg-blue-500" : ""
      }`}
      onClick={handleClick}
    >
      <div className="static flex gap-5 content-between">
        <IoMic size={22} color={"#fff"} />
        <IoMicOff size={22} />
      </div>
      <div
        className={`absolute bg-white w-8 h-6 rounded-full shadow-md transform transition-transform ${
          isMicOn ? "translate-x-full" : ""
        }`}
      ></div>
    </div>
  );
};

export default ToggleButton;
