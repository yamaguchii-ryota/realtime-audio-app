import React, { useState } from "react";
import { IoMic, IoMicOff } from "react-icons/io5";

const ToggleButton: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className={`static py-1.5 px-2 w-20 flex items-center bg-gray-300 rounded-full cursor-pointer ${
        isOn ? "bg-blue-500" : ""
      }`}
      onClick={toggle}
    >
      <div className="static flex gap-5 content-between">
        <IoMic size={22} color={"#fff"} />
        <IoMicOff size={22} />
      </div>
      <div
        className={`absolute bg-white w-8 h-6 rounded-full shadow-md transform transition-transform ${
          isOn ? "translate-x-full" : ""
        }`}
      ></div>
    </div>
  );
};

export default ToggleButton;
