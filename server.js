const express = require('express');
const products = require('./data/products');

// create express app
const app = express();

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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));