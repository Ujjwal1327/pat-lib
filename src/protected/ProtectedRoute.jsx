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
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header Skeleton */}
        <div className="bg-gray-500 h-16 w-full animate-pulse mb-4  shadow-md"></div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Sidebar Skeleton */}
          <div className="bg-gray-500 h-full w-full md:w-64 p-4 animate-pulse rounded-lg shadow-lg mb-4"></div>
          {/* Main Skeleton */}
          <div className="flex-1 bg-gray-100 animate-pulse p-6 rounded-lg shadow-md">
            <div className="w-full h-8 mb-4 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-full md:w-3/4 h-6 mb-2 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-1/2 h-6 mb-2 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-1/3 h-6 mb-2 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-full h-8 mb-4 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-full md:w-3/4 h-6 mb-2 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-1/2 h-6 mb-2 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-1/3 h-6 mb-2 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-full h-8 mb-4 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-full md:w-3/4 h-6 mb-2 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-1/2 h-6 mb-2 bg-gray-400 animate-pulse rounded-md"></div>
            <div className="w-1/3 h-6 mb-2 bg-gray-400 animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
