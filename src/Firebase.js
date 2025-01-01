import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBbNZX7MWInhfSyCGK427ftxTBX7CEIeR8",
  authDomain: "patna-library.firebaseapp.com",
  projectId: "patna-library",
  storageBucket: "patna-library.firebasestorage.app",
  messagingSenderId: "613155834355",
  appId: "1:613155834355:web:6746738e632c3339b86a86",
  measurementId: "G-VGV4592DDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Set session persistence
setPersistence(auth, browserSessionPersistence).catch((error) => {
  alert("hello sir , there is a problem in authentication")
  console.error("Failed to set auth persistence:", error);
});

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Optional: Initialize Firebase Analytics
const analytics = getAnalytics(app);

export { auth, db, storage };
