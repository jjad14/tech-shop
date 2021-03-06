import express from 'express';
import path from 'path';
import pkg from 'cloudinary';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import session from 'express-session';

import connectDB from './data/db.js';
import passport from './config/passport.js';
import { notFound, errorHandler } from './middleware/errors.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/order.js';
import cartRoutes from './routes/cart.js';
import uploadRoutes from './routes/upload.js';
import authRoutes from './routes/auth.js';

const cloudinary = pkg;
dotenv.config();

// create express app
const app = express();

// Connect to database
connectDB();

// Init Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
);
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Define Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/config/paypal', (req, res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
);

// access __dirname with es6 modules
const folder = path.resolve();

// make uploads folder static
app.use('/uploads', express.static(path.join(folder, '/uploads')));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join('client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));