const express = require('express');
const Material = require('../models/Material');
const router = express.Router();

// Route to add a new material
router.post('/', async (req, res) => {
    try {
        const material = new Material(req.body);
        const savedMaterial = await material.save();
        res.status(201).json(savedMaterial);
    } catch (error) {
        console.error('Error creating material:', error);
        res.status(500).json({ error: 'Failed to create material' });
    }
});


// Route to update an existing material
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMaterial = await Material.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMaterial) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.status(200).json(updatedMaterial);
    } catch (error) {
        console.error('Error updating material:', error);
        res.status(500).json({ error: 'Failed to update material' });
    }
});

// Fetch materials by user ID
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const materials = await Material.find({ userId }).populate('userId', 'name email');
        res.status(200).json(materials);
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).json({ error: 'Failed to fetch materials' });
    }
});


module.exports = router;
