import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-xl text-gray-600 mt-4">
                Oops! The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFound;
