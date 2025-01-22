import React from 'react';

const Material = ({ material, onEdit }) => {
    const {
        name = 'Unknown Material',
        category = 'Uncategorized',
        quantity = 0,
        unit = 'N/A',
        location = 'Unknown Location',
        description = 'No description available.',
        imageUrl = 'https://via.placeholder.com/150',
        userId  = { name: 'Unknown', email: 'Unknown' },
    } = material;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold text-green-600 mb-4">{name}</h2>
            <p className="text-gray-700 mb-2">
                <strong>Category:</strong> {category}
            </p>
            <p className="text-gray-700 mb-2">
                <strong>Quantity:</strong> {quantity} {unit}
            </p>
            <p className="text-gray-700 mb-2">
                <strong>Location:</strong> {location}
            </p>
            <p className="text-gray-700 mb-4">
                <strong>Description:</strong> {description}
            </p>
            <p className="text-gray-700 mb-4">
                <strong>Posted By:</strong> {userId.name} 
            </p>
            <button
                className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700`}
                onClick={onEdit || (() => alert('Request Material functionality not implemented yet.'))}
            >
                {onEdit ? 'Edit Material' : 'Request Material'}
            </button>
        </div>
    );
};

export default Material;
