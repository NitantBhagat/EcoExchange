import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const MaterialFormPage = ({ material }) => {
    const [formData, setFormData] = useState({
        name: material?.name || '',
        category: material?.category || '',
        quantity: material?.quantity || '',
        unit: material?.unit || '',
        location: material?.location || '',
        description: material?.description || '',
        imageUrl: material?.imageUrl || '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Fetch user ID from the token
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to perform this action');
            return;
        }

        try {
            const userResponse = await fetch('http://localhost:5000/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user data');
            }

            const user = await userResponse.json();
            const userId = user._id;

            // Add the userId to formData and set default imageUrl if not provided
            const materialData = {
                ...formData,
                userId,
                imageUrl: formData.imageUrl || 'https://img.freepik.com/premium-photo/material-word-wooden-block-flat-lay-view-blue-background_446269-288.jpg',
            };

            // Determine the API endpoint (add or update)
            const apiUrl = material
                ? `http://localhost:5000/api/materials/${material._id}` // Update
                : 'http://localhost:5000/api/materials'; // Add
            const method = material ? 'PUT' : 'POST';

            const response = await fetch(apiUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(materialData),
            });

            if (response.ok) {
                alert(material ? 'Material updated successfully' : 'Material added successfully');
                navigate('/dashboard'); // Navigate back to dashboard after success
            } else {
                throw new Error('Failed to save material');
            }
        } catch (error) {
            console.error('Error saving material:', error);
            alert('An error occurred while saving the material.');
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        {material ? 'Update Material' : 'Add Material'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Unit</label>
                            <input
                                type="text"
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                rows="4"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Image URL</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                        >
                            {material ? 'Update Material' : 'Add Material'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default MaterialFormPage;
