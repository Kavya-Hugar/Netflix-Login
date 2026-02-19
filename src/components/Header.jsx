import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center space-x-8">
          <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition">TV Shows</a>
            <a href="#" className="text-white hover:text-gray-300 transition">Movies</a>
            <a href="#" className="text-white hover:text-gray-300 transition">New & Popular</a>
            <a href="#" className="text-white hover:text-gray-300 transition">My List</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border border-gray-400 rounded px-3 py-1 text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
          <button
            onClick={onLogout}
            className="text-white hover:text-red-500 transition font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
