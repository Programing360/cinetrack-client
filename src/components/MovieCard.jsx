import { useContext, useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import useAllMovie from "../api/movies";
import { useAxiosSecure } from "../hooks/useAxios";
import { toast } from "react-toastify";
import { UseContext } from "../context/AuthContext";

const MovieCard = () => {
  const [allMovies = [], refetch, isLoading, isPending, error] = useAllMovie();
  const useAxios = useAxiosSecure();
  const { searchMovie, setSearchMovie } = useContext(UseContext);

  // Filter Criteria State: "all" | "watched" | "unwatched"
  const [watchFilter, setWatchFilter] = useState("all");

  // Single-pass Combined Filter for Search String + Watched Criteria
  const filterMoves = allMovies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchMovie.toLowerCase());

    if (watchFilter === "watched") {
      return matchesSearch && movie.isWatched;
    }
    if (watchFilter === "unwatched") {
      return matchesSearch && !movie.isWatched;
    }
    return matchesSearch;
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Action: Toggle Watched status flag
  const handleToggleWatched = async (id, title) => {
    const currentMovie = allMovies.find((movie) => movie._id === id);
    if (!currentMovie) return;

    try {
      const movieToUpdate = await useAxios.patch(`/movies/${id}`, {
        isWatched: !currentMovie.isWatched,
      });
      const updatedMovie = movieToUpdate.data;
      if (updatedMovie) {
        refetch();
        toast.success(
          `${title} marked as ${updatedMovie.isWatched ? "Watched" : "Unwatched"}`,
          {
            position: "top-center",
            autoClose: 800,
          },
        );
      }
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  // Action: Delete film target entry from collections payload
  const handleDeleteMovie = async (id, title) => {
    try {
      const res = await useAxios.delete(`/movies/${id}`);
      if (res.data) {
        refetch();
        toast.success(`${title} deleted successfully!`, {
          position: "top-center",
          autoClose: 800,
        });
      }
    } catch (err) {
      toast.error("Failed to delete movie.");
    }
  };

  if (isLoading || isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090b0e] text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Metadata Section */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          data-aos="fade-up"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Cinematic Collection
            </h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Manage, rate, and track your library dashboard assets.
            </p>
          </div>

          {/* Interactive Filtering and Metrics Control Panel */}
          <div className="flex items-center gap-3 w-full sm:w-auto self-stretch sm:self-auto justify-between sm:justify-end">
            {/* DaisyUI Premium Select Custom Component */}
            <div className="relative group">
              <select
                value={watchFilter}
                onChange={(e) => setWatchFilter(e.target.value)}
                className="select select-sm appearance-none rounded-xl border border-white/10 bg-[#11141b]/80 text-gray-300 text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 pl-4 pr-10 cursor-pointer hover:border-white/20 hover:bg-[#161a23]"
              >
                <option value="all" className="bg-[#11141b] text-gray-300 py-2">
                  🎬 All Movies
                </option>
                <option
                  value="watched"
                  className="bg-[#11141b] text-emerald-400 py-2"
                >
                  ✨ Watched Only
                </option>
                <option
                  value="unwatched"
                  className="bg-[#11141b] text-purple-400 py-2"
                >
                  ⏳ Unwatched Only
                </option>
              </select>

              {/* Custom Elegant Chevron Icon Indicator */}
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 group-hover:text-purple-400 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  
                </svg>
              </div>
            </div>

            {/* Total Badge Counter */}
            <div className="badge badge-md border border-purple-500/30 bg-purple-500/10 text-purple-400 font-medium px-3 py-3.5 rounded-xl shrink-0">
              {filterMoves.length} Displayed
            </div>
          </div>
        </div>

        {/* Responsive CSS Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterMoves.map((movie) => (
            <div
              key={movie._id}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#11141b]/40 backdrop-blur-md overflow-hidden hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-1 shadow-xl hover:delay-300"
              data-aos="zoom-in"
            >
              {/* Media Asset Wrapper (Poster URL Container) */}
              <div className="relative aspect-[14/19] w-full overflow-hidden bg-gray-900">
                <img
                  src={movie.posterUrl}
                  alt={`${movie.title} Movie Poster Cover`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Floating Glassmorphism Semi-Transparent "Watched" Tag Overlay */}
                {movie.isWatched && (
                  <div className="absolute top-3 right-3 z-10 animate-fade-in">
                    <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-md shadow-lg">
                      WATCHED
                    </span>
                  </div>
                )}

                {/* Ambient Dark Poster Shadow Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11141b] via-[#11141b]/10 to-transparent" />
              </div>

              {/* Interface Interactive Metadata Context Panel */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-bold text-base text-white tracking-wide truncate group-hover:text-purple-400 transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-amber-400 bg-amber-400/5 px-2 py-0.5 rounded-md border border-amber-400/10 shrink-0">
                    <span>★</span>
                    <span className="font-semibold text-gray-200">
                      {movie.rating || 0}
                    </span>
                  </div>
                </div>

                {/* Subtext: Genre & Release Year Payload elements */}
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
                  <span>{movie.genre}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span>{movie.releaseYear}</span>
                </div>

                {/* Distinct Grid Card Layout Interface Buttons */}
                <div className="flex gap-2 mt-auto pt-2 border-t border-white/5">
                  <button
                    onClick={() => handleToggleWatched(movie._id, movie.title)}
                    className={`flex-1 btn btn-sm rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                      movie.isWatched
                        ? "bg-neutral-800 hover:bg-neutral-700 text-gray-300 border-white/10"
                        : "bg-purple-600 hover:bg-purple-500 text-white border-purple-500/20 shadow-lg shadow-purple-600/10"
                    }`}
                  >
                    {movie.isWatched ? "Unwatch" : "Mark Watched"}
                  </button>

                  <button
                    onClick={() => handleDeleteMovie(movie._id, movie.title)}
                    className="btn btn-sm btn-square rounded-xl bg-red-950/30 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 transition-all duration-200"
                    title="Delete Entry"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v4M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fallback Empty State View */}
        {filterMoves.length === 0 && (
          <div
            className="relative max-w-md mx-auto text-center py-12 px-6 rounded-2xl border border-white/10 bg-[#11141b]/30 backdrop-blur-md shadow-2xl overflow-hidden group"
            data-aos="zoom-in"
          >
            <div className="absolute -top-10 -left-10 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />

            <div className="flex justify-center mb-5">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-lg shadow-purple-500/5">
                <span className="absolute inline-flex h-full w-full rounded-2xl bg-purple-500/20 opacity-75 animate-ping duration-1000" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 animate-pulse text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 4v16M17 4v16M3 8h18M3 16h18M11 4v16M12 4v16"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-base font-bold text-white tracking-wide mb-1">
              No Media Matches Found
            </h3>
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
              Your cinematic tracker pipeline is currently empty. Try tweaking
              your search string or filter selection criteria.
            </p>

            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setSearchMovie("");
                  setWatchFilter("all");
                }}
                className="btn btn-xs rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 normal-case font-medium tracking-wide transition-all px-3.5 py-1"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
