import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../Firebase"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth"; // Import the listener for auth state changes

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means we are still checking

  useEffect(() => {
    // Firebase auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsAuthenticated(true);
      } else {
        // User is logged out
        setIsAuthenticated(false);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    // Waiting for the authentication status check (optional loading state)
    return <div>Loading...</div>;
  }

  // Redirect if not authenticated
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
