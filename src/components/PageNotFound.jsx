import { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router";

const PageNotFound = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
const location = useLocation();
  const from = location.state?.from || "/";
  return (
    <div className="min-h-screen bg-[#090b0e] text-gray-100 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div 
        className="max-w-md w-full text-center relative z-10 space-y-6 md:space-y-8"
        data-aos="zoom-in"
      >
        {/* Animated Icon Display */}
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-3xl border border-purple-500/20 bg-purple-500/5 text-purple-400 shadow-2xl shadow-purple-500/5 group">
            <span className="absolute inline-flex h-full w-full rounded-3xl bg-purple-500/10 opacity-60 animate-ping duration-[2000ms]" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:h-12 md:w-12 text-purple-400 transition-transform duration-500 group-hover:rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 4v16M17 4v16M3 8h18M3 16h18M11 4v16M12 4v16"
              />
            </svg>
          </div>
        </div>

        {/* Text Section */}
        <div className="space-y-2">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white">
            Lost in the Dark?
          </h2>
          <p className="text-xs md:text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
            The cinematic page you are trying to track down has slipped out of our stream or doesn't exist anymore.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            to={from}
            className="inline-flex items-center gap-2 btn btn-md md:btn-md rounded-xl text-xs md:text-sm font-semibold tracking-wide transition-all border bg-purple-600 hover:bg-purple-500 text-white border-purple-500/20 shadow-lg shadow-purple-600/20 px-6 py-3 hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;