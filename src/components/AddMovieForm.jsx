import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAxiosSecure } from '../hooks/useAxios';
import { toast } from 'react-toastify';

const AddMovieForm = () => {
  // Controlled state fields matching the required /movies payload architecture
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    posterUrl: ''
  });
  const useAxios = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client side validation check
    if (!formData.title || !formData.genre || !formData.releaseYear || !formData.posterUrl) {
      return;
    }

    setLoading(true);

    // Formulating payload according to POST /movies requirements
    const moviePayload = {
      title: formData.title.trim(),
      genre: formData.genre,
      releaseYear: parseInt(formData.releaseYear, 10),
      posterUrl: formData.posterUrl.trim()
    };

    const res = await useAxios.post('/movies', moviePayload);
    console.log(res.data);

    if (res.data.insertedId) {
      toast.success(`${formData.title} added successfully!`, {
        position: "top-center",
        autoClose: 800, 
      });
      setLoading(false);
      setFormData({
        title: '',
        genre: '',
        releaseYear: '',
        posterUrl: ''
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-1" data-aos="fade-up">
      {/* Outer Glow Wrapper Frame */}
      <div className="relative rounded-2xl border border-white/10 bg-[#11141b]/60 backdrop-blur-md p-6 md:p-8 shadow-2xl overflow-hidden">
        
        {/* Subtle Ambient Decorative Neon Blur */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            Track New Cinema Asset
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Dispatch a payload parameters payload index to the <span className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded text-[11px]">POST /movies</span> pipeline.
          </p>
        </div>

        {/* Entry Submission Form Element */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Movie Title Input */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold uppercase tracking-wider text-gray-400">Movie Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Interstellar"
              required
              className="w-full px-4 py-2.5 bg-[#161920]/80 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
            />
          </div>

          {/* Grid Container split layout for Genre and Release Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Genre Select Component Field */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold uppercase tracking-wider text-gray-400">Genre</span>
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#161920]/80 border border-white/10 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
              >
                <option value="" disabled hidden>Select Genre</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Action">Action</option>
                <option value="Thriller">Thriller</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Horror">Horror</option>
              </select>
            </div>

            {/* Release Year Input Field */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold uppercase tracking-wider text-gray-400">Release Year</span>
              </label>
              <input
                type="number"
                name="releaseYear"
                min="1888"
                max="2030"
                value={formData.releaseYear}
                onChange={handleChange}
                placeholder="e.g., 2026"
                required
                className="w-full px-4 py-2.5 bg-[#161920]/80 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Poster Image URL Input Field */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold uppercase tracking-wider text-gray-400">Poster Image URL</span>
            </label>
            <input
              type="url"
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
              placeholder="https://example.com/poster.jpg"
              required
              className="w-full px-4 py-2.5 bg-[#161920]/80 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
            />
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