# Netflix Clone

A Netflix-like frontend application with complete authentication system built with React, Vite, and Tailwind CSS that fetches movie data from The Movie Database (TMDb) API.

## Features

- **🔐 Complete Authentication System**: Registration, login, and JWT-based authentication
- **🎬 Auto-rotating Featured Carousel**: Showcases trending movies with automatic rotation every 5 seconds
- **🎨 Netflix-Inspired Design**: Dark cinematic background with glassmorphic effects
- **📱 Movie Categories**: Displays trending, popular, top-rated, and upcoming movies
- **🗄️ Database Integration**: Aiven MySQL database with secure password hashing
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **🧪 Test Coverage**: Comprehensive test suite to verify API data fetching and validation

## Tech Stack

### Frontend
- **React 18**, **Vite**, **React Router**
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **Vitest** for testing

### Backend
- **Node.js**, **Express**
- **MySQL2** for database connection
- **bcrypt** for password hashing
- **JWT** for authentication
- **Aiven MySQL Database**

## Quick Start

### Prerequisites
- Node.js 16+
- Aiven MySQL Database (or any MySQL database)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kavya-Hugar/Netflix-Login.git
   cd Netflix-Login
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   
   Update `.env` with your database credentials:
   ```
   DB_HOST=your_mysql_host
   DB_PORT=3306
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the Applications**:
   
   **Backend** (in terminal 1):
   ```bash
   cd backend
   npm start
   ```
   
   **Frontend** (in terminal 2):
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Authentication Flow

1. **Visit** the application → Beautiful Netflix-inspired landing page
2. **Register** → Create account with username, email, phone, password
3. **Login** → Secure authentication with password verification
4. **Success** → Redirect to Netflix movie interface with real TMDb data
5. **Logout** → Return to authentication page

## Project Structure

```
Netflixx/
├── backend/                 # Node.js/Express API server
│   ├── server.js           # Main server file
│   ├── db.js              # Database connection
│   ├── .env.example       # Environment template
│   └── package.json       # Backend dependencies
├── src/
│   ├── components/        # React components
│   │   ├── AuthLanding.jsx    # Authentication landing page
│   │   ├── FeaturedCarousel.jsx # Auto-rotating carousel
│   │   ├── Header.jsx          # Navigation header
│   │   ├── MovieRow.jsx        # Movie rows
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── services/          # API services
│   │   ├── authService.js      # Authentication API
│   │   └── tmdbApi.js          # TMDb movie API
│   ├── tests/             # Test files
│   └── styles/            # Global styles
├── README.md
└── package.json
```

## API Endpoints

### Authentication API (Backend)
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `GET /api/verify` - Verify JWT token

### TMDb Movie API
- `/trending/movie/week` - Fetch trending movies
- `/movie/popular` - Fetch popular movies
- `/movie/top_rated` - Fetch top-rated movies
- `/movie/upcoming` - Fetch upcoming movies

## Database Schema

```sql
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Token-based session management with 24-hour expiration
- **Protected Routes**: Only authenticated users can access movie content
- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: Form validation and sanitization

## Testing

Run the test suite:
```bash
npm test
```

Tests cover:
- ✅ API data fetching functionality
- ✅ Data structure validation
- ✅ Error handling
- ✅ Image URL generation
- ✅ Authentication flow

## Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy using Node.js buildpack
```

## Environment Variables

Create `.env` file in backend directory:
```env
DB_HOST=your_mysql_host
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
JWT_SECRET=your_long_random_secret_key
PORT=5000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is for educational purposes only. Movie data and images are provided by TMDb API.

## Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for movie data
- [Aiven](https://aiven.io/) for database hosting
- [Netflix](https://www.netflix.com/) for design inspiration
