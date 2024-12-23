import { useNavigate } from "react-router-dom";  // Import the useNavigate hook for navigation
import { getAuth, signOut } from "firebase/auth";  // Import Firebase Authentication methods
import { auth } from '../Firebase';  // Import auth from your firebase.js file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowUp, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Logout() {
    const navigate = useNavigate();  // Use useNavigate for programmatic navigation

    const handleLogout = () => {
        signOut(auth)  // Use Firebase's signOut method to log out the user
            .then(() => {
                // If sign out is successful, navigate to the login page
                navigate("/admin");  // Redirect to the login page ("/admin")
            })
            .catch((error) => {
                // Handle any errors during sign out
                console.error("Error during logout: ", error);
            });
    };
    return (
        <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-blue-900 to-blue-800  text-white px-5 py-2 rounded hover:bg-red-700"
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )
}
