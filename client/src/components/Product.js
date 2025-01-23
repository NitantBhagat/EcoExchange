import React from 'react';

const Product = ({ product, onEdit, onRequestProduct }) => {
    const {
        name = 'Unknown Product',
        category = 'Uncategorized',
        price = 0,
        description = 'No description available.',
        imageUrl = 'https://www.printwand.com/blog/media/2012/01/ultimate-guide-to-your-product-launch.jpg',
        userId,
        isAvailable = true,
    } = product;

    // const postedByName = userId?.name || 'Unknown';
    // const postedByEmail = userId?.email || 'Unknown';

    const postedByName = product.seller?.name || 'Unknown';
    const postedByEmail = product.seller?.email || 'Unknown';


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
                <strong>Price:</strong> ${price}
            </p>
            <p className="text-gray-700 mb-4">
                <strong>Description:</strong> {description}
            </p>
            <p className="text-gray-700 mb-4">
                <strong>Posted By:</strong> {postedByName} 
            </p>
            <p className={`text-sm font-bold ${isAvailable ? 'text-green-600' : 'text-red-600'} mb-4`}>
                {isAvailable ? 'Available' : 'Not Available'}
            </p>
            {onEdit ? (
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    onClick={onEdit}
                >
                    Edit Product
                </button>
            ) : onRequestProduct ? (
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    onClick={onRequestProduct}
                >
                    Request Product
                </button>
            ) : null}
        </div>
    );
};

export default Product;
