// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const ProductDetail = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    if (!product) {
        return <div className="flex justify-center items-center h-screen"><div>Loading...</div></div>;
    }

    const handleAddToCart = () => {
        addToCart(product);
        toast.success('Your product has been added to the cart!', {
            position: "top-center"
        });
        setTimeout(() => {
            navigate('/cart');
        }, 0);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img className="w-full h-96 object-cover" src={product.image} alt={product.title} />
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                    <p className="text-gray-500 text-lg mb-4">${product.price}</p>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <button
                        onClick={handleAddToCart}
                        className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-700 transition duration-200"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
