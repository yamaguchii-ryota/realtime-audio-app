import React, { useState } from "react";
import AudioVisualizer from "./components/AudioVisualizer.jsx";
import ToggleButton from "./components/ToggleButton.jsx";

const App: React.FC = () => {
  const [isMicOn, setIsMicOn] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="mt-20">
        <h1 className="text-2xl">リアルタイム音声可視化</h1>
      </div>
      <div className="mt-8">
        <ToggleButton onToggle={setIsMicOn} />
      </div>
      <div className="relative mt-8">
        {isMicOn ? (
          ""
        ) : (
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            マイクをオフです
          </h1>
        )}
        <AudioVisualizer isMicOn={isMicOn} />
      </div>
    </div>
  );
};

export default App;
