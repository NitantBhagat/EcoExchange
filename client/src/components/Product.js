import React from 'react';

const Product = ({ product, onEdit }) => {
    const {
        name = 'Unknown Product',
        price = 'N/A',
        description = 'No description available.',
        imageUrl = 'https://via.placeholder.com/150',
        userId = { name: 'Unknown', email: 'Unknown' },
    } = product;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold text-green-600 mb-4">{name}</h2>
            <p className="text-gray-700 mb-2">
                <strong>Price:</strong> ${price}
            </p>
            <p className="text-gray-700 mb-4">
                <strong>Description:</strong> {description}
            </p>
            <p className="text-gray-700 mb-4">
                <strong>Uploaded By:</strong> {userId.name} ({userId.email})
            </p>
            <button
                className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700`}
                onClick={onEdit || (() => alert('Request Product functionality not implemented yet.'))}
            >
                {onEdit ? 'Edit Product' : 'Request Product'}
            </button>
        </div>
    );
};

export default Product;
