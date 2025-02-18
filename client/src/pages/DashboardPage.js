import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Material from '../components/Material';
import Product from '../components/Product'; // Assuming Product is a separate component
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Material');
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': `application/json`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('User not authenticated');
                    return;
                }

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

                const response = await fetch(`http://localhost:5000/api/${activeTab.toLowerCase()}s/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setItems(data);
                } else {
                    console.error(`Failed to fetch ${activeTab.toLowerCase()}s`);
                }
            } catch (error) {
                console.error(`Error fetching ${activeTab.toLowerCase()}s:`, error);
            }
        };

        fetchItems();
    }, [activeTab]);

    if (loading) {
        return <Layout><div className="min-h-screen flex items-center justify-center">Loading...</div></Layout>;
    }

    if (!user) {
        return <Layout><div className="min-h-screen flex items-center justify-center">Failed to load user data</div></Layout>;
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 flex">
                {/* User Profile Section */}
                <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-md mr-6">
                    <div className="flex flex-col items-center">
                        <img
                            src={user.profileImage || "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_1280.png"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mb-4"
                        />
                        <h1 className="text-2xl font-bold mb-2 text-center">{user.name}</h1>
                        <p className="text-gray-600 mb-4 text-center">{user.email}</p>
                    </div>
                </div>

                {/* Main Dashboard Section */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Dashboard</h2>
                    <div className="bg-green-50 p-4 rounded-lg shadow-md mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome, {user.name}!</h3>
                        <p className="text-gray-700">Here you can view and manage your contributions to the EcoExchange platform.</p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex space-x-4 mb-6">
                        <button
                            className={`px-4 py-2 rounded-lg ${activeTab === 'Material' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setActiveTab('Material')}
                        >
                            Material
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${activeTab === 'Product' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setActiveTab('Product')}
                        >
                            Product
                        </button>
                    </div>

                    {/* Add Item Button */}
                    {activeTab === 'Material' && (
                        <div className="mb-4">
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                onClick={() => navigate('/material/add')}
                            >
                                Add Material
                            </button>
                        </div>
                    )}
                    {activeTab === 'Product' && (
                        <div className="mb-4">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                onClick={() => navigate('/product/add')}
                            >
                                Add Product
                            </button>
                        </div>
                    )}

                    {/* List of Items */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md max-w-md h-[500px] overflow-y-auto">
                        <h4 className="text-lg font-bold mb-4">{activeTab}s</h4>
                        {items.length > 0 ? (
                            <ul className="space-y-4">
                                {items.map((item) => (
                                    <li key={item._id} className="text-left">
                                        {activeTab === 'Material' ? (
                                            <Material material={item} onEdit={() => navigate(`/material/edit/${item._id}`)} />
                                        ) : (
                                            <Product product={item} onEdit={() => navigate(`/product/edit/${item._id}`)} />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No {activeTab.toLowerCase()}s available.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
