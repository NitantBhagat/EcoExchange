const express = require('express');
const Material = require('../models/Material');
const protect = require('../middleware/auth'); // Correctly importing the auth middleware
const router = express.Router();

// Route to add a new material
router.post('/', protect, async (req, res) => {
    try {
        // Attach user ID from the verified token
        const materialData = { ...req.body, userId: req.user.id };
        const material = new Material(materialData);
        const savedMaterial = await material.save();
        res.status(201).json(savedMaterial);
    } catch (error) {
        console.error('Error creating material:', error);
        res.status(500).json({ error: 'Failed to create material' });
    }
});

// Route to update an existing material
router.put('/:id', protect, async (req, res) => {
    try {
        const { id } = req.params;
        const material = await Material.findById(id);

        // Check if material exists
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }

        // Ensure the logged-in user is the owner of the material
        if (material.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'You are not authorized to update this material' });
        }

        // Update the material
        const updatedMaterial = await Material.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json(updatedMaterial);
    } catch (error) {
        console.error('Error updating material:', error);
        res.status(500).json({ error: 'Failed to update material' });
    }
});

// Fetch materials by user ID
router.get('/user/:userId', protect, async (req, res) => {
    const { userId } = req.params;

    try {
        // Ensure the logged-in user matches the requested user ID
        if (req.user.id !== userId) {
            return res.status(403).json({ error: 'You are not authorized to access these materials' });
        }

        const materials = await Material.find({ userId })
            .populate('userId', 'name email'); // Populate the userId field with name and email

        res.status(200).json(materials);
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).json({ error: 'Failed to fetch materials' });
    }
});


// Fetch a single material by ID
router.get('/:id', protect, async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);

        // Check if material exists
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }

        // Ensure the logged-in user is the owner of the material
        if (material.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'You are not authorized to access this material' });
        }

        res.status(200).json(material);
    } catch (error) {
        console.error('Error fetching material:', error);
        res.status(500).json({ error: 'Failed to fetch material' });
    }
});

module.exports = router;
