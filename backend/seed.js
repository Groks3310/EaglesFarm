
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('./models/product');

const isRailway = Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);
const MONGO_URI =
  process.env.MONGO_URI || (isRailway ? null : 'mongodb://127.0.0.1:27017/pigfarm');

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not set. Add it to backend/.env or Railway Variables, then run: npm run seed');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await Product.deleteMany({});
    console.log('🗑️ Old products cleared');
    
    await Product.insertMany([
      { name: 'Red Duroc Pig (50kg)', price: 400000, description: 'Healthy Red Duroc breed, 50kg live weight. Known for excellent meat quality and fast growth.', image: '/images/pig1.jpg', category: 'pig', weight: '50kg', breed: 'Red Duroc', stock: 5 },
      { name: 'Red Duroc Pig (70kg)', price: 500000, description: 'Premium Red Duroc breed, 70kg live weight. Excellent temperament, fully vaccinated.', image: '/images/pig2.jpg', category: 'pig', weight: '70kg', breed: 'Red Duroc', stock: 4 },
      { name: 'Marbled Berkshire Pig', price: 600000, description: 'Rare Marbled Berkshire breed, 56kg. Famous for its superior marbled meat — the wagyu of pork.', image: '/images/pig3.jpg', category: 'pig', weight: '56kg', breed: 'Marbled Berkshire', stock: 3 },
      { name: 'Red Duroc Pig (50kg)', price: 400000, description: 'Quality Red Duroc breed, 50kg. Strong immune system, raised on natural feed.', image: '/images/pig4.jpg', category: 'pig', weight: '50kg', breed: 'Red Duroc', stock: 6 },
      { name: 'Red Duroc Pig (70kg)', price: 700000, description: 'Premium mature Red Duroc, 70kg. Top-tier genetics with superior growth rate.', image: '/images/pig5.jpg', category: 'pig', weight: '70kg', breed: 'Red Duroc', stock: 2 },
      { name: 'Premium Pig Feed (50kg Bag)', price: 25000, description: 'High-protein balanced pig feed. Contains essential vitamins and minerals for optimal growth.', image: '/images/frontBag.jpg', category: 'feed', weight: '50kg', stock: 100 },
      { name: 'Starter Pig Feed (25kg Bag)', price: 14000, description: 'Specially formulated starter feed for piglets. Promotes healthy early development.', image: '/images/frontBag.jpg', category: 'feed', weight: '25kg', stock: 80 },
      { name: 'Grower Pig Feed (50kg Bag)', price: 22000, description: 'Optimized grower feed for maximum weight gain at reduced cost.', image: '/images/frontBag.jpg', category: 'feed', weight: '50kg', stock: 120 },
    ]);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });