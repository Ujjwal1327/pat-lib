import React from 'react'

const Alert = ({ type, message }) => {
    if (!message) return null;

    return (
        <div
            className={`fixed top-20 right-1/2 translate-x-1/2 sm:right-1 sm:translate-x-0 m-2 mx-auto text-center w-[90%] sm:w-[50%] py-5 mb-4 text-white ${type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
        >
            {message}

            {/* Shrinking Bar */}
            <div
                className="h-1 bg-white absolute bottom-0 left-0 animate-shrinkBar"
            ></div>
        </div>
    );
};

export default Alert