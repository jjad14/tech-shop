import express from 'express';
import dotenv from 'dotenv';

import connectDB from './data/db.js';
import products from './data/products.js';

dotenv.config();

// create express app
const app = express();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));

// Define Routes
// app.use('/api/products', require('./routes/api/products'));

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id);

    res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));