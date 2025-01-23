import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const MaterialFormPage = ({ material }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: '',
        unit: '',
        location: '',
        description: '',
        imageUrl: '',
        isAvailable: true,
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams(); // Get the material ID from the URL

    useEffect(() => {
        const fetchMaterial = async () => {
            if (!id) {
                // If no ID, it's an add operation
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/api/materials/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData(data); // Populate form data with fetched material
                } else {
                    console.error('Failed to fetch material');
                    alert('Failed to fetch material details.');
                }
            } catch (error) {
                console.error('Error fetching material:', error);
                alert('An error occurred while fetching the material details.');
            } finally {
                setLoading(false);
            }
        };

        fetchMaterial();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to perform this action');
            return;
        }

        try {
            const materialData = {
                ...formData,
                imageUrl: formData.imageUrl || 'https://img.freepik.com/premium-photo/material-word-wooden-block-flat-lay-view-blue-background_446269-288.jpg',
            };

            const apiUrl = id
                ? `http://localhost:5000/api/materials/${id}`
                : 'http://localhost:5000/api/materials';
            const method = id ? 'PUT' : 'POST';

            const response = await fetch(apiUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(materialData),
            });

            if (response.ok) {
                alert(id ? 'Material updated successfully' : 'Material added successfully');
                navigate('/dashboard');
            } else {
                throw new Error('Failed to save material');
            }
        } catch (error) {
            console.error('Error saving material:', error);
            alert('An error occurred while saving the material.');
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <p>Loading...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        {id ? 'Update Material' : 'Add Material'}
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
                        <div>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="isAvailable"
                                    checked={formData.isAvailable}
                                    onChange={handleChange}
                                    className="form-checkbox text-green-600"
                                />
                                <span className="ml-2 text-gray-700">Available</span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                        >
                            {id ? 'Update Material' : 'Add Material'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default MaterialFormPage;
