const express = require('express');
const Product = require('../models/Product');
const protect = require('../middleware/auth');
const router = express.Router();

// Route to add a new product
router.post('/', protect, async (req, res) => {
    try {
        const productData = { ...req.body, seller: req.user.id }; // Attach the logged-in user's ID
        const product = new Product(productData);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});


router.put('/:id', protect, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Ensure the logged-in user is the owner of the product
        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({ error: 'You are not authorized to update this product' });
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});



// Fetch all products for a user
router.get('/user/:userId', protect, async (req, res) => {
    const { userId } = req.params;

    try {
        // Ensure the logged-in user matches the requested user ID
        if (req.user.id !== userId) {
            return res.status(403).json({ error: 'You are not authorized to access these products' });
        }

        const products = await Product.find({ seller: userId }).populate('seller', 'name email'); // Populate user details
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


// Fetch a single product by ID
router.get('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        // Check if product exists
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Ensure the logged-in user is the owner of the product
        if (!product.seller || product.seller.toString() !== req.user.id) {
            return res.status(403).json({ error: 'You are not authorized to access this product' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});


// Fetch all available products
router.get('/get/all', protect, async (req, res) => {
    try {
        // Fetch only products that are available
        const products = await Product.find({ isAvailable: true })
            .populate('seller', 'name email') // Populate seller info
            .select('-__v'); // Exclude unnecessary fields

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = router;
