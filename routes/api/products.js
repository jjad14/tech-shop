import express from 'express';
// import { body, validationResult } from 'express-validator';
// import jwt from 'jsonwebtoken';

import products from '../../data/products.js';

require('dotenv').config();

const router = express.Router();

 
router.get('/api/products', (req, res) => {
    res.json(products);
});

router.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id);

    res.json(product);
});