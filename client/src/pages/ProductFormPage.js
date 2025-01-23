import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const ProductFormPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        imageUrl: '',
        isAvailable: true,
    });

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // State to store logged-in user
    const navigate = useNavigate();
    const { id } = useParams(); // Get the product ID from the URL

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('You must be logged in to perform this action');
                    navigate('/login'); // Redirect to login if no token
                    return;
                }

                const response = await fetch('http://localhost:5000/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data); // Set the user data
                } else {
                    console.error('Failed to fetch user');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [navigate]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                // If no ID, it's an add operation
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData(data); // Populate form data with fetched product
                } else {
                    console.error('Failed to fetch product');
                    alert('Failed to fetch product details.');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                alert('An error occurred while fetching the product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
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

        if (!user) {
            alert('Failed to identify the logged-in user.');
            return;
        }

        try {
            const productData = {
                ...formData,
                seller: user._id, // Attach the seller ID from the logged-in user
                imageUrl: formData.imageUrl || 'https://www.printwand.com/blog/media/2012/01/ultimate-guide-to-your-product-launch.jpg', // Default image URL
            };

            const apiUrl = id
                ? `http://localhost:5000/api/products/${id}`
                : 'http://localhost:5000/api/products';
            const method = id ? 'PUT' : 'POST';

            const response = await fetch(apiUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                alert(id ? 'Product updated successfully' : 'Product added successfully');
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                console.error('Error saving product:', errorData);
                throw new Error(errorData.error || 'Failed to save product');
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('An error occurred while saving the product.');
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
                        {id ? 'Update Product' : 'Add Product'}
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
                            <label className="block text-gray-700 mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
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
                            {id ? 'Update Product' : 'Add Product'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ProductFormPage;
