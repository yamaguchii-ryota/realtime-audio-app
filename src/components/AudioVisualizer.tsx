import React, { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isMicOn: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isMicOn }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!isMicOn) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let bufferLength: number;

    const handleSuccess = (stream: MediaStream) => {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      analyser.fftSize = 256;
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        analyser.getByteFrequencyData(dataArray);

        context.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight: number;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          const red = barHeight + 25 * (i / bufferLength);
          const green = 250 * (i / bufferLength);
          const blue = 50;

          context.fillStyle = `rgb(${red},${green},${blue})`;
          context.fillRect(
            x,
            canvas.height - barHeight / 2,
            barWidth,
            barHeight / 2
          );

          x += barWidth + 1;
        }

        if (dataArray.every((value) => value === 0)) {
          context.fillStyle = "white";
          context.fillRect(0, 0, canvas.width, canvas.height);
        }

        if (isMicOn) {
          requestAnimationFrame(draw);
        }
      };

      draw();
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess)
      .catch((err) => console.error("Error accessing audio stream:", err));

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isMicOn]);

  return (
    <canvas
      ref={canvasRef}
      width="400"
      height="400"
      className="border-2 border-black"
    />
  );
};

export default AudioVisualizer;
