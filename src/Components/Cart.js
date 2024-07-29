import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Cart = ({ cart, removeFromCart, updateCartQuantity }) => {
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    const handleBuyNow = () => {
        toast.success("Thank you for your purchase", {
            position: "top-center"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500 text-lg">Your cart is empty</p>
            ) : (
                cart.map((product) => (
                    <div key={product.id} className="flex justify-between items-center border p-4 rounded-md mb-4 shadow-sm">
                        <div className="flex items-center">
                            <img src={product.image} alt={product.title} className="w-16 h-16 object-cover mr-4 rounded-md" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">{product.title}</h3>
                                <p className="text-gray-500">${product.price}</p>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => updateCartQuantity(product.id, product.quantity - 1)}
                                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l-md hover:bg-gray-400"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1">{product.quantity}</span>
                                    <button
                                        onClick={() => updateCartQuantity(product.id, product.quantity + 1)}
                                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r-md hover:bg-gray-400"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => removeFromCart(product.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200">
                            Remove
                        </button>
                    </div>
                ))
            )}
            {cart.length > 0 && (
                <>
                    <h3 className="text-xl font-bold mt-6 text-gray-800">Total: ${total.toFixed(2)}</h3>
                    <button onClick={handleBuyNow} className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-md hover:bg-blue-700 transition duration-200">
                        Buy Now
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;




