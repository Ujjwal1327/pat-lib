import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 via-gray-50 to-blue-50 text-gray-800 p-6">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-blue-500 animate-bounce">404</h1>
                <p className="text-2xl font-semibold mt-4">
                    Whoops! We couldn't find that page.
                </p>
                <p className="text-lg text-gray-600 mt-2">
                    The page you are looking for might have been moved or doesn't exist.
                </p>
                <Link
                    to="/admin"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
                >
                    Go Back to Homepage
                </Link>
            </div>
            <div className="mt-10">
                <img
                    src="https://via.placeholder.com/400x300?text=Page+Not+Found"
                    alt="Page Not Found Illustration"
                    className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default NotFound;
