import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../services/tmdbApi';

const FeaturedCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (movies.length === 0) {
    return null;
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(currentMovie.backdrop_path, 'original')}
          alt={currentMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
      
      <div className="relative z-10 flex items-center h-full px-4 md:px-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {currentMovie.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-3">
            {currentMovie.overview}
          </p>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-green-400 font-semibold">
              {Math.round(currentMovie.vote_average * 10)}% Match
            </span>
            <span className="text-gray-300">
              {new Date(currentMovie.release_date).getFullYear()}
            </span>
            <span className="text-gray-300 border border-gray-400 px-2 py-1 text-sm">
              {currentMovie.adult ? '18+' : '13+'}
            </span>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition flex items-center space-x-2">
              <span>▶</span>
              <span>Play</span>
            </button>
            <button className="bg-gray-600/80 text-white px-8 py-3 rounded font-semibold hover:bg-gray-500 transition flex items-center space-x-2">
              <span>ℹ</span>
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-8' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
