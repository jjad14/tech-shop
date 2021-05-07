const express = require('express');
// const { body, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');

const products = require('../../data/products');

require('dotenv').config();

const router = express.Router();

 
router.get('/api/products', (req, res) => {
    res.json(products);
});

router.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id);

    res.json(product);
});