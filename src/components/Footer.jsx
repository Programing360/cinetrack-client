import { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <footer className="w-full bg-[#090b0e] border-t border-white/5 text-gray-400 text-xs relative overflow-hidden pt-12 pb-6">
      {/* Soft Ambient Background Glows */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Main Links Grid Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          data-aos="fade-up"
        >
          {/* Brand Identity / Pitch */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base tracking-wide">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 4v16M17 4v16M3 8h18M3 16h18M11 4v16M12 4v16"
                  />
                </svg>
              </div>
              <span>CineTracker</span>
            </div>
            <p className="text-gray-500 leading-relaxed text-[11px] max-w-xs">
              Your ultimate personal cinematic pipeline dashboard. Organize workflows, stream watchlists, log deep-dive reviews, and curate your data assets seamlessly.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-[11px] font-bold tracking-widest uppercase">
              Navigation
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/" className="hover:text-purple-400 transition-colors">
                  Dashboard Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-purple-400 transition-colors">
                  All Movies
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-purple-400 transition-colors">
                  Streaming Metrics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Utility / Resources */}
          <div className="space-y-3">
            <h4 className="text-white text-[11px] font-bold tracking-widest uppercase">
              Resources
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#privacy" className="hover:text-purple-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-purple-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-purple-400 transition-colors">
                  Support Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Connect */}
          <div className="space-y-3">
            <h4 className="text-white text-[11px] font-bold tracking-widest uppercase">
              Stay Updated
            </h4>
            <p className="text-gray-500 text-[11px] leading-relaxed">
              Subscribe to collect release schedules and system updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full rounded-xl bg-[#11141b] border border-white/10 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
                required
              />
              <button
                type="submit"
                className="btn btn-sm h-auto rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold px-3 border-none transition-all active:scale-95"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Divider Rule */}
        <hr className="border-white/5 my-6" />

        {/* Bottom Metadata & Social Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} CineTracker. All rights reserved.</p>

          {/* Social Profiles Grid */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400 transition-colors"
              title="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400 transition-colors"
              title="LinkedIn Network"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;