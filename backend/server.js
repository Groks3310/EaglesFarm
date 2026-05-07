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

// MongoDB — Railway has no local MongoDB; without MONGO_URI the app exits and the proxy shows "failed to respond"
// MongoDB config
const isRailway = Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);

const MONGO_URI =
  process.env.MONGO_URI || (isRailway ? null : 'mongodb://127.0.0.1:27017/pigfarm');

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not set.');
  console.error('   Railway → Service → Variables → add MONGO_URI');
  process.exit(1);
}

const PORT = process.env.PORT || 5001;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port ${PORT}`));