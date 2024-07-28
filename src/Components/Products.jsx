import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Product = () => {
    const API_URL = 'https://fakestoreapi.com/products';
    const CATEGORY_URL = 'https://fakestoreapi.com/products/categories';

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const fetchProductData = async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setProducts([]);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(CATEGORY_URL);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchProductData();
        fetchCategories();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => handleCategoryChange('all')}
                    className={`px-4 py-2 m-1 rounded ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 m-1 rounded capitalize ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="border rounded-md p-4 flex flex-col justify-between shadow-md">
                            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
                            <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                            <p className="text-gray-500 mb-2 capitalize">{product.category}</p>
                            <p className="text-gray-900 font-semibold mb-4">${product.price}</p>
                            <Link to={`/products/${product.id}`} className="bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-700">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Product;
