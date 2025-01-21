const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true }, // e.g., "Plastic", "Metal", "Paper"
        quantity: { type: Number, required: true }, // e.g., 500
        unit: { type: String, required: true }, // e.g., "kg", "pieces"
        location: { type: String, required: true }, // e.g., "New York, NY"
        description: { type: String }, // Optional description of the material
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User schema
            required: true,
        },
        imageUrl: { 
            type: String, 
            default: 'https://img.freepik.com/premium-photo/material-word-wooden-block-flat-lay-view-blue-background_446269-288.jpg' // Default image URL if not provided
        },
        isAvailable: { type: Boolean, default: true }, // Whether the material is still available
    },
    { timestamps: true }
);

module.exports = mongoose.model('Material', MaterialSchema);
