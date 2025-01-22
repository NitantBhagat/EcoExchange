const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    imageUrl: {
        type: String,
        default: 'https://img.freepik.com/premium-photo/material-word-wooden-block-flat-lay-view-blue-background_446269-288.jpg',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Material', MaterialSchema);
