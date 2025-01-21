import React from 'react';

const Material = ({ material }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-green-600 mb-4">{material.name}</h2>
            <p className="text-gray-700 mb-2">
                <strong>Category:</strong> {material.category}
            </p>
            <p className="text-gray-700 mb-2">
                <strong>Quantity:</strong> {material.quantity} {material.unit}
            </p>
            <p className="text-gray-700 mb-2">
                <strong>Location:</strong> {material.location}
            </p>
            <p className="text-gray-700 mb-4">
                <strong>Description:</strong> {material.description}
            </p>
            <p className="text-gray-700 mb-4">
                <strong>Posted By:</strong> {material.postedBy.name} ({material.postedBy.email})
            </p>
            <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={() => alert('Request Material functionality not implemented yet.')}
            >
                Request Material
            </button>
        </div>
    );
};

export default Material;
