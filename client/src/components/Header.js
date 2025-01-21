import React from 'react';

const Header = () => {
    return (
        <header className="bg-green-600 text-white py-4 px-8 flex justify-between items-center">
            <h1 className="text-xl font-bold">EcoExchange</h1>
            <nav>
                <ul className="flex gap-6">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/materials" className="hover:underline">Materials</a></li>
                    <li><a href="/products" className="hover:underline">Products</a></li>
                    <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
