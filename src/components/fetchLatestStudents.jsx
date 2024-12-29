import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../Firebase";
import { useState } from "react";
export const fetchLatestStudents = async () => {
    try {
        // Query students, ordered by enrollment date in descending order and limit to 5
        const q = query(
            collection(db, "students"),
            orderBy("dateOfJoining", "desc"), // Replace "enrollmentDate" with the correct field name
            limit(5)
        );

        const querySnapshot = await getDocs(q);
        const studentsData = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Capture the document ID
            ...doc.data(), // Spread the document data
        }));

        return studentsData // Store the latest students in state
    } catch (err) {
        console.error("Error fetching students:", err);
    } finally {
    }
};