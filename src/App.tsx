import React from "react";
import AudioVisualizer from "./components/AudioVisualizer.jsx";
import ToggleButton from "./components/ToggleButton.jsx";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="mt-8">
        <h1 className="text-2xl">リアルタイム音声可視化</h1>
      </div>
      <div className="mt-4">
        <ToggleButton />
      </div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <AudioVisualizer />
      </div>
    </div>
  );
};

export default App;
