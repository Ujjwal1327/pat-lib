import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";

const AdminHeader = ({ onMenuClick }) => {
    return (
        <header className="bg-gradient-to-r from-red-700 to-blue-500 text-white p-4 gap-2 flex items-center justify-between">
            {/* Hamburger Menu for Small Screens */}
            <button className="md:hidden flex items-center gap-2" onClick={onMenuClick}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </button>

            {/* Header Title */}
            <h1 className="text-lg font-bold hidden md:block">Admin Panel</h1>

            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-full px-3 p-1 max-w-lg  flex-grow md:flex-grow-0 border border-gray-300">
                <input
                    type="text"
                    className="w-full border-none outline-none text-gray-700 placeholder-gray-500"
                    placeholder="Search students"
                />
                <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition flex items-center justify-center">
                    <FontAwesomeIcon icon={faSearch} className=" text-white" />
                </button>
            </div>

            {/* Logout Button */}
            <Logout />
        </header>
    );
};

export default AdminHeader;


