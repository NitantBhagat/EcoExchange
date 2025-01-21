import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../state/AuthContext';

const HomePage = () => {
    const { isLoggedIn } = useContext(AuthContext);

    console.log(isLoggedIn);

    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gray-100 py-12 text-center">
                <h2 className="text-4xl font-bold mb-4">Empowering the Circular Economy</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Connect contributors of recyclable materials with buyers of upcycled products and make a positive impact on the planet.
                </p>
                {!isLoggedIn && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700"
                            onClick={() => window.location.href = '/signup'}
                        >
                            Get Started
                        </button>
                        <button
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
                            onClick={() => window.location.href = '/login'}
                        >
                            Login
                        </button>
                    </div>
                )}
            </section>

            {/* Key Features Section */}
            <section className="py-12 text-center">
                <h3 className="text-3xl font-bold mb-6">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-lg shadow-md">
                        <h4 className="text-xl font-bold mb-2">Post Materials</h4>
                        <p className="text-gray-600">Easily list recyclable materials to find buyers who can reuse them.</p>
                    </div>
                    <div className="p-4 border rounded-lg shadow-md">
                        <h4 className="text-xl font-bold mb-2">Explore Products</h4>
                        <p className="text-gray-600">Discover innovative upcycled products and contribute to sustainability.</p>
                    </div>
                    <div className="p-4 border rounded-lg shadow-md">
                        <h4 className="text-xl font-bold mb-2">Track Impact</h4>
                        <p className="text-gray-600">Monitor your contributions to the environment through detailed insights.</p>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="bg-green-50 py-10 text-center">
                <h3 className="text-3xl font-bold mb-6">Our Impact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <h4 className="text-3xl font-bold text-green-700">1000+</h4>
                        <p className="text-gray-600">Recycled Materials</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold text-green-700">500+</h4>
                        <p className="text-gray-600">Upcycled Products</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold text-green-700">300+</h4>
                        <p className="text-gray-600">Active Users</p>
                    </div>
                </div>
            </section>

            {/* Call-to-Actions Section */}
            <section className="py-12 flex flex-col items-center">
                <h3 className="text-3xl font-bold mb-6">Join the Movement</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700"
                        onClick={() => window.location.href = '/materials'}
                    >
                        Browse Materials
                    </button>
                    <button
                        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700"
                        onClick={() => window.location.href = '/products'}
                    >
                        Explore Products
                    </button>
                </div>
            </section>
        </Layout>
    );
};

export default HomePage;
