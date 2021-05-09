import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './data/db.js';
import { notFound, errorHandler } from './middleware/errors.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';

dotenv.config();

// create express app
const app = express();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));


// Define Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));