import { useContext, useState } from "react";
import { Link, useLocation } from "react-router"; // Using useLocation to match ongoing routes
import { UseContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Track active route changes

  const { searchMovie, setSearchMovie } = useContext(UseContext);

  const handleSearch = (value) => {
    setSearchMovie(value);
  };

  // Helper mapping rule configuration to evaluate styling states dynamically
  const getLinkClass = (path, baseClasses) => {
    const isActive = location.pathname === path;
    return `${baseClasses} transition-all duration-300 relative overflow-hidden group ${
      isActive 
        ? "text-purple-400 bg-purple-500/10 border border-purple-500/20 font-semibold shadow-lg shadow-purple-500/5" 
        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
    }`;
  };

  return (
    <div className="sticky top-0 z-50 px-4 py-3" data-aos="fade-down">
      {/* Glassmorphic Navbar Shell */}
      <div className="navbar max-w-7xl mx-auto rounded-2xl border border-white/10 bg-[#0d0f14]/70 backdrop-blur-md shadow-2xl text-white px-4 md:px-6">
        
        {/* Navbar Start: Brand Logo */}
        <div className="navbar-start">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-90 transition"
          >
            Cine<span className="text-purple-400">Track</span>
          </Link>
        </div>

        {/* Navbar Center: Desktop Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2 px-1 text-sm font-medium">
            <li>
              <Link to="/" className={getLinkClass("/", "px-4 py-2 rounded-xl")}>
                Dashboard
                {/* Micro-Interaction Sliding Indicator Line */}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-purple-500 transition-all duration-300 ${location.pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </li>
            <li>
              <Link to="/add-movie" className={getLinkClass("/add-movie", "px-4 py-2 rounded-xl")}>
                Add Movie
                <span className={`absolute bottom-0 left-0 h-[2px] bg-purple-500 transition-all duration-300 ${location.pathname === "/add-movie" ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </li>
            <li>
              <Link to="/explore" className={getLinkClass("/explore", "px-4 py-2 rounded-xl")}>
                Explore
                <span className={`absolute bottom-0 left-0 h-[2px] bg-purple-500 transition-all duration-300 ${location.pathname === "/explore" ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </li>
            <li>
              <Link to="/analytics" className={getLinkClass("/analytics", "px-4 py-2 rounded-xl")}>
                Analytics
                <span className={`absolute bottom-0 left-0 h-[2px] bg-purple-500 transition-all duration-300 ${location.pathname === "/analytics" ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </li>
            <li>
              <Link to="/settings" className={getLinkClass("/settings", "px-4 py-2 rounded-xl")}>
                Settings
                <span className={`absolute bottom-0 left-0 h-[2px] bg-purple-500 transition-all duration-300 ${location.pathname === "/settings" ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Navbar End: Search, Notification, and Profile */}
        <div className="navbar-end gap-2 md:gap-4">
          {/* Global Search Bar (Hidden on small screens) */}
          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchMovie}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-40 md:w-48 pl-9 pr-4 py-1.5 bg-[#161920]/60 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Quick Chat Icon */}
          <button className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-white hover:bg-white/5 hidden md:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>

          {/* Notification Indicator */}
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-white hover:bg-white/5"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs bg-purple-600 border-none indicator-item text-[9px] text-white p-1">
                  9
                </span>
              </div>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow-2xl bg-[#13161c] border border-white/10 rounded-xl w-52 text-sm mt-2 transition-all duration-200"
            >
              <li>
                <Link className="hover:bg-white/5 py-2">9 new movies tracked</Link>
              </li>
              <li>
                <Link className="hover:bg-white/5 py-2">System up to date</Link>
              </li>
            </ul>
          </div>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar btn-sm ring-1 ring-purple-500/50 ring-offset-2 ring-offset-[#0d0f14]"
            >
              <div className="w-7 rounded-full">
                <img
                  alt="User profile Avatar"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow-2xl bg-[#13161c] border border-white/10 rounded-xl w-52 text-sm mt-2"
            >
              <li>
                <Link className="hover:bg-white/5 py-2">View Profile</Link>
              </li>
              <li>
                <Link className="hover:bg-white/5 py-2">Subscription</Link>
              </li>
              <li>
                <hr className="border-white/10 my-1" />
                <Link className="hover:bg-red-500/20 text-red-400 py-2">
                  Logout
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Hamburg Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-white hover:bg-white/5 lg:hidden transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="transition-all duration-300"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <div 
        className={`lg:hidden fixed inset-x-4 mt-2 p-4 rounded-xl border border-white/10 bg-[#0d0f14]/95 backdrop-blur-xl shadow-2xl z-40 transition-all duration-300 transform origin-top ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-1 text-sm font-medium">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)} className={getLinkClass("/", "block px-4 py-2.5 rounded-lg")}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/add-movie" onClick={() => setIsOpen(false)} className={getLinkClass("/add-movie", "block px-4 py-2.5 rounded-lg")}>
              Add Movie
            </Link>
          </li>
          <li>
            <Link to="/explore" onClick={() => setIsOpen(false)} className={getLinkClass("/explore", "block px-4 py-2.5 rounded-lg")}>
              Explore
            </Link>
          </li>
          <li>
            <Link to="/analytics" onClick={() => setIsOpen(false)} className={getLinkClass("/analytics", "block px-4 py-2.5 rounded-lg")}>
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={() => setIsOpen(false)} className={getLinkClass("/settings", "block px-4 py-2.5 rounded-lg")}>
              Settings
            </Link>
          </li>
          
          {/* Mobile Search Input Field */}
          <li className="pt-2 border-t border-white/10 mt-2 sm:hidden">
            <input
              type="text"
              value={searchMovie}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search movies..."
              className="w-full px-4 py-2 bg-[#161920] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500 transition-all"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;