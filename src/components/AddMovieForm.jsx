import { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { useAxiosSecure } from "../hooks/useAxios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAllMovie from "../api/movies";

const AddMovieForm = () => {
  const useAxios = useAxiosSecure();
  const [loading, setLoading] = useState(false);
 const [, refetch] = useAllMovie();
  // Initializing React Hook Form parameters
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      genre: "",
      releaseYear: "",
      posterUrl: "",
    },
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Action: Triggered only if React Hook Form client-side validation passes
  const onSubmit = async (data) => {
    setLoading(true);

    // Formulating payload architecture according to POST /movies requirements
    const moviePayload = {
      title: data.title.trim(),
      genre: data.genre,
      releaseYear: parseInt(data.releaseYear, 10),
      posterUrl: data.posterUrl.trim(),
    };
    
    try {
      const res = await useAxios.post('/movies', moviePayload);

      if (res.data?.insertedId) {
        toast.success(`${data.title} added successfully!`, {
          position: "top-center",
          autoClose: 800,
        });

        refetch()
        reset(); // Clear all fields gracefully
      }
    } catch (error) {
      toast.error("Failed to deploy movie asset pipeline.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-1" data-aos="fade-up min-h-screen ">
      {/* Outer Glow Wrapper Frame */}
      <div className="relative rounded-2xl border border-white/10 bg-[#11141b]/60 backdrop-blur-md p-6 md:p-8 shadow-2xl overflow-hidden my-20">
        {/* Subtle Ambient Decorative Neon Blur */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            Track New Cinema Asset
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Dispatch a payload parameters payload index to the{" "}
            <span className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded text-[11px]">
              POST /movies
            </span>{" "}
            pipeline.
          </p>
        </div>

        {/* Entry Submission Form Element */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Movie Title Input */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold uppercase tracking-wider text-gray-400">
                Movie Title
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g., Interstellar"
              className={`w-full px-4 py-2.5 bg-[#161920]/80 border rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-200 ${
                errors.title
                  ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              }`}
              {...register("title", { required: "Movie title is required" })}
            />
            {errors.title && (
              <span className="text-[11px] text-red-400 mt-1 font-medium pl-1">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Grid Container split layout for Genre and Release Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Genre Select Component Field */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Genre
                </span>
              </label>
              <div className="relative group">
                <select
                  className={`w-full appearance-none px-4 py-2.5 bg-[#161920]/80 border rounded-xl text-sm transition-all duration-200 focus:outline-none pr-10 cursor-pointer ${
                    errors.genre
                      ? "border-red-500/60 text-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 text-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  }`}
                  {...register("genre", { required: "Please pick a genre" })}
                >
                  <option value="" hidden>
                    Select Genre
                  </option>
                  <option value="Sci-Fi" className="bg-[#11141b] text-white">
                    Sci-Fi
                  </option>
                  <option value="Action" className="bg-[#11141b] text-white">
                    Action
                  </option>
                  <option value="Thriller" className="bg-[#11141b] text-white">
                    Thriller
                  </option>
                  <option value="Drama" className="bg-[#11141b] text-white">
                    Drama
                  </option>
                  <option value="Comedy" className="bg-[#11141b] text-white">
                    Comedy
                  </option>
                  <option value="Horror" className="bg-[#11141b] text-white">
                    Horror
                  </option>
                </select>
                {/* Clean Custom Droplist Chevron Arrow */}
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500 group-hover:text-purple-400 transition-colors">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {errors.genre && (
                <span className="text-[11px] text-red-400 mt-1 font-medium pl-1">
                  {errors.genre.message}
                </span>
              )}
            </div>

            {/* Release Year Input Field */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Release Year
                </span>
              </label>
              <input
                type="number"
                placeholder="e.g., 2026"
                className={`w-full px-4 py-2.5 bg-[#161920]/80 border rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-200 ${
                  errors.releaseYear
                    ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                }`}
                {...register("releaseYear", {
                  required: "Release year is required",
                  min: { value: 1888, message: "Year must be 1888 or later" },
                  max: { value: 2030, message: "Year cannot exceed 2030" },
                })}
              />
              {errors.releaseYear && (
                <span className="text-[11px] text-red-400 mt-1 font-medium pl-1">
                  {errors.releaseYear.message}
                </span>
              )}
            </div>
          </div>

          {/* Poster Image URL Input Field */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold uppercase tracking-wider text-gray-400">
                Poster Image URL
              </span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/poster.jpg"
              className={`w-full px-4 py-2.5 bg-[#161920]/80 border rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-200 ${
                errors.posterUrl
                  ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              }`}
              {...register("posterUrl", {
                required: "Poster image URL is required",
                validate: (value) => {
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return "Please enter a valid URL";
                  }
                },
              })}
            />
            {errors.posterUrl && (
              <span className="text-[11px] text-red-400 mt-1 font-medium pl-1">
                {errors.posterUrl.message}
              </span>
            )}
          </div>

          {/* Action Interactive Call To Action Container */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-neutral-800 disabled:to-neutral-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border-none shadow-lg shadow-purple-600/20"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs text-purple-400"></span>
              ) : (
                "Deploy Entry Asset"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;
