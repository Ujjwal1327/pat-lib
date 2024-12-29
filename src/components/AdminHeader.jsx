import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";

const AdminHeader = ({ onMenuClick }) => {
    return (
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between gap-4 shadow-lg">
            {/* Hamburger Menu for Small Screens */}
            <button
                className="md:hidden flex items-center gap-3 p-2 hover:bg-gray-700 rounded-full transition duration-300"
                onClick={onMenuClick}
            >
                <FontAwesomeIcon icon={faBars} size="lg" />
            </button>

            {/* Header Title */}
            <h1 className="text-2xl font-semibold hidden md:block">Admin Panel</h1>

            {/* Search Bar */}
            <div className="flex items-center bg-white text-gray-700 rounded-full px-3 py-1 min-w-[50%] flex-grow md:flex-grow-0 border border-gray-300 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition">
                <input
                    type="text"
                    className="w-full border-none outline-none text-gray-700 placeholder-gray-500 rounded-full py-1 px-3"
                    placeholder="Search students"
                />
                <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center ml-2">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            {/* Logout Button */}
            <Logout />
        </header>
    );
};

export default AdminHeader;
