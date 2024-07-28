import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">E-Commerce</Link>
                <div className="flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">Products</Link>
                    <Link to="/cart" className="text-white hover:text-gray-300">Cart</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
