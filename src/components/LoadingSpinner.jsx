import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const LoadingSpinner = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-[#090b0e] text-gray-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Cinematic Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Main Loading Box */}
      <div 
        className="flex flex-col items-center space-y-6 max-w-xs text-center z-10"
        data-aos="fade-up"
      >
        {/* Animated Custom Dual-Ring Spinner */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-purple-500/10 border-t-purple-500 rounded-full animate-spin"></div>
          {/* Inner Counter-Rotating Ring */}
          <div className="absolute w-10 h-10 border-4 border-cyan-400/10 border-b-cyan-400 rounded-full animate-spin [animation-duration:1s] [animation-direction:reverse]"></div>
        </div>

        {/* Text Metadata Panel */}
        <div className="space-y-1.5">
          <h2 className="text-sm font-bold tracking-widest text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Syncing Assets
          </h2>
          <p className="text-[11px] text-gray-400 font-medium tracking-wide animate-pulse">
            Fetching cinematic database stream...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;