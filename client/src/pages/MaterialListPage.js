import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Material from '../components/Material';
import { useNavigate } from 'react-router-dom';

const MaterialListPage = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedMaterialEmail, setSelectedMaterialEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('You must be logged in to view materials.');
                    navigate('/login'); // Redirect to login if no token
                    return;
                }

                const response = await fetch('http://localhost:5000/api/materials/get/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMaterials(data);
                } else {
                    console.error('Failed to fetch materials:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching materials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, [navigate]);

    const handleRequestMaterial = (email) => {
        setSelectedMaterialEmail(email);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMaterialEmail('');
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
            <div className="min-h-screen bg-gray-100 p-6 overflow-auto">
                <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Available Materials</h1>
                {materials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {materials.map((material) => (
                            <Material
                                key={material._id}
                                material={material}
                                onRequestMaterial={() => handleRequestMaterial(material.userId.email)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">No materials available at the moment.</p>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                            <h2 className="text-xl font-bold mb-4 text-center">Contact Uploader</h2>
                            <p className="text-gray-700 text-center mb-4">
                                You can contact the uploader at:
                            </p>
                            <p className="text-green-600 text-center font-bold">{selectedMaterialEmail}</p>
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

export default MaterialListPage;
