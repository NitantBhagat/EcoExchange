const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true }, // Name of the product
        price: { type: Number, required: true }, // Price of the product
        description: { type: String }, // Optional description of the product
        category: { type: String, required: true }, // e.g., "Furniture", "Art"
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User schema
            required: true,
        },
        ratings: {
            type: [Number], // Array of ratings (e.g., [4, 5, 3])
            default: [],
        },
        imageUrl: { 
            type: String, 
            default: 'https://www.printwand.com/blog/media/2012/01/ultimate-guide-to-your-product-launch.jpg' // Default image URL if not provided
        },
        isAvailable: { type: Boolean, default: true }, // Whether the product is still available
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
