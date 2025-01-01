import React, { useEffect } from "react";

const Alert = ({ type, message, onClose }) => {
    if (!message) return null;

    useEffect(() => {
        // Auto-hide alert after 3 seconds
        const timer = setTimeout(() => {
            onClose && onClose();
        }, 3000);

        // Clear timeout if the component unmounts before 3 seconds
        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div
            className={`fixed top-20 right-1/2 translate-x-1/2 sm:right-5 sm:translate-x-0 m-4 w-[90%] sm:w-[50%] max-w-md py-4 px-6 rounded-lg text-white shadow-lg transition-all transform duration-300 ease-in-out ${type === "success"
                ? "bg-green-600"
                : "bg-red-600"
                }`}
            style={{ zIndex: 9999 }}
        >
            <div className="flex items-center justify-between">
                <span className="font-medium">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-4 text-xl font-bold text-white opacity-75 hover:opacity-100 focus:outline-none"
                >
                    ×
                </button>
            </div>

            {/* Optional shrinking animation */}
            <div
                className="h-1 bg-white absolute bottom-0 left-0 animate-shrinkBar"
            ></div>
        </div>
    );
};

export default Alert;
