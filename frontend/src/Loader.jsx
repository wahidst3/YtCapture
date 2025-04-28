import { useState, useEffect } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("Processing Audio");

  useEffect(() => {
    const stages = ["Processing Audio", "Transcribing Audio"];
    let stageIndex = 0;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          stageIndex = (stageIndex + 1) % stages.length;
          setStage(stages[stageIndex]);
          return 0; // Reset progress for next stage
        }
        return prev + 2; // Increment progress
      });
    }, 700); // Update every 100ms for smooth animation

    return () => clearInterval(progressInterval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center text-white text-lg font-semibold mb-4 animate-pulse">
        {stage}
      </div>
      <div className="relative w-full h-6 bg-white/10 rounded-full overflow-hidden shadow-lg">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-gray-200 text-sm font-medium">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}