import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchMovieDetails,
  getImageUrl
} from '../services/tmdbApi';

// Mock axios
vi.mock('axios');

describe('TMDb API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTrendingMovies', () => {
    it('should fetch trending movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            { id: 1, title: 'Movie 1', backdrop_path: '/path1.jpg' },
            { id: 2, title: 'Movie 2', backdrop_path: '/path2.jpg' }
          ]
        }
      };

      axios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse)
      });

      const result = await fetchTrendingMovies();
      
      expect(result).toEqual(mockResponse.data);
      expect(result.results).toHaveLength(2);
      expect(result.results[0]).toHaveProperty('id');
      expect(result.results[0]).toHaveProperty('title');
      expect(result.results[0]).toHaveProperty('backdrop_path');
    });

    it('should handle API errors gracefully', async () => {
      const errorMessage = 'Network Error';
      axios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(new Error(errorMessage))
      });

      await expect(fetchTrendingMovies()).rejects.toThrow(errorMessage);
    });
  });

  describe('fetchPopularMovies', () => {
    it('should fetch popular movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            { id: 3, title: 'Popular Movie 1', poster_path: '/poster1.jpg' },
            { id: 4, title: 'Popular Movie 2', poster_path: '/poster2.jpg' }
          ]
        }
      };

      axios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse)
      });

      const result = await fetchPopularMovies();
      
      expect(result).toEqual(mockResponse.data);
      expect(result.results).toHaveLength(2);
      expect(result.results[0].title).toBe('Popular Movie 1');
    });
  });

  describe('fetchTopRatedMovies', () => {
    it('should fetch top rated movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            { id: 5, title: 'Top Rated Movie', vote_average: 9.5 }
          ]
        }
      };

      axios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse)
      });

      const result = await fetchTopRatedMovies();
      
      expect(result.results[0].vote_average).toBe(9.5);
    });
  });

  describe('fetchUpcomingMovies', () => {
    it('should fetch upcoming movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            { id: 6, title: 'Upcoming Movie', release_date: '2024-12-01' }
          ]
        }
      };

      axios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse)
      });

      const result = await fetchUpcomingMovies();
      
      expect(result.results[0].release_date).toBe('2024-12-01');
    });
  });

  describe('fetchMovieDetails', () => {
    it('should fetch specific movie details', async () => {
      const movieId = 123;
      const mockResponse = {
        data: {
          id: movieId,
          title: 'Specific Movie',
          overview: 'Movie description',
          runtime: 120
        }
      };

      axios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse)
      });

      const result = await fetchMovieDetails(movieId);
      
      expect(result.id).toBe(movieId);
      expect(result.title).toBe('Specific Movie');
      expect(result.runtime).toBe(120);
    });
  });

  describe('getImageUrl', () => {
    it('should generate correct image URL with default size', () => {
      const path = '/movie_poster.jpg';
      const expectedUrl = 'https://image.tmdb.org/t/p/original/movie_poster.jpg';
      
      expect(getImageUrl(path)).toBe(expectedUrl);
    });

    it('should generate correct image URL with custom size', () => {
      const path = '/movie_poster.jpg';
      const size = 'w500';
      const expectedUrl = 'https://image.tmdb.org/t/p/w500/movie_poster.jpg';
      
      expect(getImageUrl(path, size)).toBe(expectedUrl);
    });

    it('should return null for empty path', () => {
      expect(getImageUrl(null)).toBeNull();
      expect(getImageUrl(undefined)).toBeNull();
      expect(getImageUrl('')).toBeNull();
    });
  });
});

describe('API Data Validation', () => {
  it('should validate movie data structure', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            id: 1,
            title: 'Test Movie',
            overview: 'Test overview',
            backdrop_path: '/backdrop.jpg',
            poster_path: '/poster.jpg',
            vote_average: 8.5,
            release_date: '2024-01-01',
            adult: false
          }
        ]
      }
    };

    axios.create.mockReturnValue({
      get: vi.fn().mockResolvedValue(mockResponse)
    });

    const result = await fetchTrendingMovies();
    const movie = result.results[0];

    // Validate required fields
    expect(movie).toHaveProperty('id');
    expect(movie).toHaveProperty('title');
    expect(movie).toHaveProperty('overview');
    expect(movie).toHaveProperty('vote_average');
    expect(movie).toHaveProperty('release_date');
    expect(movie).toHaveProperty('adult');

    // Validate data types
    expect(typeof movie.id).toBe('number');
    expect(typeof movie.title).toBe('string');
    expect(typeof movie.overview).toBe('string');
    expect(typeof movie.vote_average).toBe('number');
    expect(typeof movie.adult).toBe('boolean');

    // Validate vote_average range
    expect(movie.vote_average).toBeGreaterThanOrEqual(0);
    expect(movie.vote_average).toBeLessThanOrEqual(10);
  });

  it('should handle empty results gracefully', async () => {
    const mockResponse = {
      data: { results: [] }
    };

    axios.create.mockReturnValue({
      get: vi.fn().mockResolvedValue(mockResponse)
    });

    const result = await fetchTrendingMovies();
    expect(result.results).toEqual([]);
    expect(result.results).toHaveLength(0);
  });
});
