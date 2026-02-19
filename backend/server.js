const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createConnection, createUsersTable } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
const initDB = async () => {
  try {
    await createUsersTable();
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

// Helper function to get database connection
const getConnection = async () => {
  return await createConnection();
};

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { user_id, user_name, email, phone_number, password } = req.body;

    // Validate required fields
    if (!user_name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username, email, and password are required' 
      });
    }

    const connection = await getConnection();

    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT user_name, email FROM users WHERE user_name = ? OR email = ?',
      [user_name, email]
    );

    if (existingUsers.length > 0) {
      await connection.end();
      return res.status(400).json({ 
        success: false, 
        message: 'Username or email already exists' 
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const [result] = await connection.execute(
      'INSERT INTO users (user_name, email, phone_number, password) VALUES (?, ?, ?, ?)',
      [user_name, email, phone_number || null, hashedPassword]
    );

    await connection.end();

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      user: {
        user_id: result.insertId,
        user_name,
        email,
        phone_number
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    const connection = await getConnection();

    // Find user by username
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE user_name = ?',
      [user_name]
    );

    if (users.length === 0) {
      await connection.end();
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    const user = users[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      await connection.end();
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        user_id: user.user_id, 
        user_name: user.user_name 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    await connection.end();

    res.json({ 
      success: true, 
      message: 'Login successful',
      token,
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Verify token endpoint
app.get('/api/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    res.json({ 
      success: true, 
      user: decoded 
    });

  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
});

// Start server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
