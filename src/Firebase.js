// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firestore
import { getStorage } from "firebase/storage"; // Firebase Storage
import { getAnalytics } from "firebase/analytics"; // Optional: Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbNZX7MWInhfSyCGK427ftxTBX7CEIeR8",
  authDomain: "patna-library.firebaseapp.com",
  projectId: "patna-library",
  storageBucket: "patna-library.firebasestorage.app", // Corrected storage bucket
  messagingSenderId: "613155834355",
  appId: "1:613155834355:web:6746738e632c3339b86a86",
  measurementId: "G-VGV4592DDJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Optional: Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Export the initialized Firebase services
export { auth, db, storage };
