# Netflix Clone

A Netflix-like frontend application built with React, Vite, and Tailwind CSS that fetches movie data from The Movie Database (TMDb) API.

## Features

- **Auto-rotating Featured Carousel**: Showcases trending movies with automatic rotation every 5 seconds
- **Movie Categories**: Displays trending, popular, top-rated, and upcoming movies
- **Responsive Design**: Optimized for desktop and mobile devices
- **API Integration**: Fetches real movie data from TMDb API
- **Test Coverage**: Comprehensive test suite to verify API data fetching and validation

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Testing**: Vitest, React Testing Library
- **API**: The Movie Database (TMDb)

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Run Tests**:
   ```bash
   npm test
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## API Configuration

The application uses The Movie Database (TMDb) API with the following configuration:
- **API Key**: `2ac243714eb51a261560fde07afdfaf1`
- **Base URL**: `https://api.themoviedb.org/3`
- **Image Base URL**: `https://image.tmdb.org/t/p/`

## Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Navigation header
│   ├── FeaturedCarousel.jsx # Auto-rotating featured movies
│   └── MovieRow.jsx         # Horizontal movie rows
├── services/
│   └── tmdbApi.js          # API service functions
├── tests/
│   └── tmdbApi.test.js     # API test suite
├── styles/
│   └── globals.css         # Global styles and utilities
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles
```

## API Endpoints Used

- `/trending/movie/week` - Fetch trending movies
- `/movie/popular` - Fetch popular movies
- `/movie/top_rated` - Fetch top-rated movies
- `/movie/upcoming` - Fetch upcoming movies
- `/movie/{id}` - Fetch specific movie details

## Testing

The test suite verifies:
- ✅ API data fetching functionality
- ✅ Data structure validation
- ✅ Error handling
- ✅ Image URL generation
- ✅ Empty response handling

Run tests with:
```bash
npm test
```

## Features Implemented

### 1. Auto-rotating Featured Section
- Displays 5 trending movies in a full-screen carousel
- Automatically rotates every 5 seconds
- Manual navigation with dot indicators
- Smooth transitions and hover effects

### 2. Movie Categories
- **Trending Now**: Weekly trending movies
- **Popular Movies**: All-time popular movies
- **Top Rated**: Highest-rated movies
- **Upcoming**: Soon-to-be-released movies

### 3. Responsive Design
- Mobile-friendly navigation
- Adaptive movie poster sizes
- Scrollable horizontal rows
- Touch-friendly interactions

### 4. Netflix-style UI
- Dark theme with red accent colors
- Gradient overlays for text readability
- Hover effects on movie cards
- Rating badges and release year display

## Environment Variables

For production deployment, you can set the API key as an environment variable:
```
VITE_TMDB_API_KEY=your_api_key_here
```

## Deployment

The application can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

Build the application first:
```bash
npm run build
```

Then deploy the contents of the `dist` folder.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is for educational purposes only. Movie data and images are provided by TMDb API.
