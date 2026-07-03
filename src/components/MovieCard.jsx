import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import useAllMovie from "../api/movies";
import { useAxiosSecure } from "../hooks/useAxios";
import { toast } from "react-toastify";

const MovieCard = () => {
  const [allMovies = [], refetch, isLoading, isPending, error] = useAllMovie();
 
  const useAxios = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Action: Toggle Watched status flag
  const handleToggleWatched = async (id, title) => {
    const movieToUpdate = await useAxios.patch(`/movies/${id}`, {
      isWatched: !allMovies.find((movie) => movie._id === id).isWatched,
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
  };

  // Action: Delete film target entry from collections payload
  const handleDeleteMovie = async (id, title) => {
    const res = await useAxios.delete(`/movies/${id}`);
    if (res.data) {
      refetch();
      toast.success(`${title} deleted successfully!`, {
        position: "top-center",
        autoClose: 800,
      });
    }

    // setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
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
          className="flex justify-between items-center mb-8"
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
          <div className="badge badge-md border border-purple-500/30 bg-purple-500/10 text-purple-400 font-medium px-3 py-3">
            {allMovies.length} Movies Total
          </div>
        </div>

        {/* Responsive CSS Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allMovies.map((movie) => (
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
        {allMovies.length === 0 && (
          <div
            className="text-center py-20 bg-[#11141b]/20 rounded-2xl border border-dashed border-white/10"
            data-aos="fade-up"
          >
            <p className="text-gray-400 text-sm">
              Your cinematic tracker pipeline is currently empty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
