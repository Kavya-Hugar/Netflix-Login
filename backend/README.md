# Netflix Clone Backend

## Setup Instructions

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your actual database credentials:
   - `DB_PASSWORD`: Your Aiven database password
   - `JWT_SECRET`: Generate a secure random string

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `GET /api/verify` - Verify JWT token

## Database

The backend connects to Aiven MySQL database and creates a `users` table with the following structure:
- `user_id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `user_name` (VARCHAR(50), UNIQUE)
- `email` (VARCHAR(100), UNIQUE)
- `phone_number` (VARCHAR(20), NULLABLE)
- `password` (VARCHAR(255), hashed)
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
