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
            className={`border-l-8 fixed top-20 w-[98%] right-[1%] md:w-1/2 md:right-[1%] py-4 px-6 rounded-sm text-white shadow-lg transition-all transform duration-300 ease-in-out ${type === "success" ? "border-x-green-300  bg-green-500" : "border-x-red-300  bg-red-500"
                }`}

            style={{ zIndex: 9999 }}
        >
            <div className="flex items-center justify-between">
                <span className="font-medium text-xl">{message}</span>
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
