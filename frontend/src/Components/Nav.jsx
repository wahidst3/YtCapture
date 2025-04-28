import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-xl sticky top-0 z-50">
    <nav className="bg-gradient-to-r from-indigo-400 to-blue-400 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <a href="#" className="text-3xl font-extrabold text-white tracking-tight hover:text-indigo-100 transition duration-300">
            Transcriptofy
          </a>
          <div className="hidden md:flex space-x-10">
            <a href="#home" className="text-white font-medium hover:bg-indigo-700 px-3 py-2 rounded-md transition duration-300">
              Home
            </a>
            <a href="#features" className="text-white font-medium hover:bg-indigo-700 px-3 py-2 rounded-md transition duration-300">
              Features
            </a>
            <a href="#how-it-works" className="text-white font-medium hover:bg-indigo-700 px-3 py-2 rounded-md transition duration-300">
              How It Works
            </a>
            <a href="#cta" className="text-white font-medium bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md transition duration-300">
              Get Started
            </a>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none hover:bg-indigo-700 p-2 rounded-md transition duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-indigo-700 bg-opacity-95 rounded-b-lg">
            <a
              href="#home"
              className="block px-4 py-3 text-white font-medium hover:bg-indigo-800 rounded-md transition duration-300"
            >
              Home
            </a>
            <a
              href="#features"
              className="block px-4 py-3 text-white font-medium hover:bg-indigo-800 rounded-md transition duration-300"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-4 py-3 text-white font-medium hover:bg-indigo-800 rounded-md transition duration-300"
            >
              How It Works
            </a>
            <a
              href="#cta"
              className="block px-4 py-3 text-white font-medium bg-indigo-800 hover:bg-indigo-900 rounded-md transition duration-300"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}