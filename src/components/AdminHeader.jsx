import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { collection, query, orderBy, startAt, endAt, getDocs } from "firebase/firestore";
import { db } from "../Firebase"; // Adjust based on your Firebase setup
import Logout from "./Logout";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook

const AdminHeader = ({ onMenuClick }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false); // Track if search input is focused
    const navigate = useNavigate(); // Initialize the navigate function

    // Ref to keep track of the debounce timer
    const debounceTimer = useRef(null);

    const handleSearch = async (e) => {
        const value = e.target.value.trim().toLowerCase(); // Convert input to lowercase
        setSearchQuery(value);

        if (!value) {
            setSearchResults([]); // Clear results if input is empty
            return;
        }

        // Clear the previous debounce timer if the user is typing again
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set the new debounce timer
        debounceTimer.current = setTimeout(async () => {
            setLoading(true);

            try {
                const studentsRef = collection(db, "students");

                // Query Firestore for names that start with the input value (case-sensitive query)
                const q = query(
                    studentsRef,
                    orderBy("name"),
                    startAt(value),
                    endAt(value + "\uf8ff")
                );

                const querySnapshot = await getDocs(q);

                // After fetching, filter the results for case-insensitive match
                const results = querySnapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .filter((student) =>
                        student.name.toLowerCase().startsWith(value) // Normalize the case of names
                    );
                console.log(results); // Check the results in the console
                setSearchResults(results);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        }, 300); // Wait for 300ms after the last keystroke before making the request
    };

    // Function to handle navigation when a student is clicked
    const handleStudentClick = (id) => {
        navigate(`/admin/students/all/${id}`); // Programmatically navigate to the student's detail page
        setSearchQuery(""); // Clear the search query after selection
    };

    return (
        <header className="bg-gray-800 text-white p-1 sm:p-4 flex items-center justify-between gap-1 md:gap-4 shadow-lg">
            {/* Hamburger Menu for Small Screens */}
            <button
                className="md:hidden flex items-center gap-3 p-2 hover:bg-gray-700 rounded-full text-3xl transition duration-300"
                onClick={onMenuClick}
            >
                <FontAwesomeIcon icon={faBars} size="lg" />
            </button>

            {/* Header Title */}
            <Link to={"/admin"}>
            <h1 className="text-2xl font-semibold hidden md:block">Admin Panel</h1>
            </Link>

            {/* Search Bar */}
            <div className="relative flex items-center bg-white text-gray-700 rounded-full px-3 py-1 min-w-[50%] flex-grow md:flex-grow-0 border border-gray-300 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition">
                <input
                    type="text"
                    className="w-full border-none outline-none text-gray-700 placeholder-gray-500 rounded-full py-1 px-3"
                    placeholder="Search students"
                    value={searchQuery}
                    onChange={handleSearch}
                    onFocus={() => setIsSearchFocused(true)}  // Set focused state to true
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}   // Set focused state to false
                />
                
                {/* Show Loading Spinner */}
                {loading && (
                    <div className="absolute right-3 text-gray-500">
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin text-xl"
                        />
                    </div>
                )}

                {/* Conditionally render search results if input is focused */}
                {isSearchFocused && searchQuery && searchResults.length > 0 && (
                    <div className="absolute top-12 left-0 w-full bg-white text-black shadow-lg rounded-lg max-h-60 overflow-y-auto z-10">
                        {searchResults.map((student) => (
                            <div
                                key={student.id}
                                className="block px-4 py-2 hover:bg-gray-200 transition cursor-pointer"
                                onClick={() => handleStudentClick(student.id)} // Trigger the navigate function on click
                            >
                                {student.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Logout Button */}
            <Logout />
        </header>
    );
};

export default AdminHeader;
