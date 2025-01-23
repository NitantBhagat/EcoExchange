import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Product from '../components/Product';
import { useNavigate } from 'react-router-dom';

const ProductListPage = () => {
    const [products, setProducts] = useState([]); // All products
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
    const [searchQuery, setSearchQuery] = useState(''); // Search input
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [selectedSellerEmail, setSelectedSellerEmail] = useState(''); // Seller's email for modal
    const navigate = useNavigate();

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('You must be logged in to view products.');
                    navigate('/login');
                    return;
                }

                const response = await fetch('http://localhost:5000/api/products/get/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                    setFilteredProducts(data); // Initialize with all products
                } else {
                    console.error('Failed to fetch products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [navigate]);

    // Filter products whenever the search query changes
    useEffect(() => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    // Handle search input
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle request product (open modal)
    const handleRequestProduct = (email) => {
        setSelectedSellerEmail(email);
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedSellerEmail('');
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
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Available Products</h1>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search products by name..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Filtered Products */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <Product
                                key={product._id}
                                product={product}
                                onRequestProduct={() => handleRequestProduct(product.seller?.email)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">No products match your search.</p>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                            <h2 className="text-xl font-bold mb-4 text-center">Contact Seller</h2>
                            <p className="text-gray-700 text-center mb-4">
                                You can contact the seller at:
                            </p>
                            <p className="text-green-600 text-center font-bold">{selectedSellerEmail}</p>
                            <button
                                className="mt-6 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ProductListPage;
