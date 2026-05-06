const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS — explicit allowlist (required when credentials: true)
app.use(cors({
  origin: ['https://eaglesfarm.netlify.app', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/orders', require('./routes/orders'));

// Test route
app.get('/', (req, res) => res.json({ message: 'FarmPrideNg API is running!' }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pigfarm';

const PORT = process.env.PORT || 5001;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Listen immediately so OPTIONS / health checks get CORS headers even while DB connects.
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port ${PORT}`));