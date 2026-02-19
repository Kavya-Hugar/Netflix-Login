import React from 'react';
import { getImageUrl } from '../services/tmdbApi';

const MovieRow = ({ title, movies }) => {
  return (
    <div className="mb-8">
      <h2 className="text-white text-2xl font-semibold mb-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-48 md:w-56 transform transition-transform hover:scale-105 cursor-pointer"
          >
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-full h-72 object-cover rounded"
            />
            <div className="mt-2">
              <h3 className="text-white text-sm font-medium truncate">{movie.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-green-400 text-xs">
                  {Math.round(movie.vote_average * 10)}%
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
