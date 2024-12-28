import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { serverTimestamp } from "firebase/firestore"; // Import serverTimestamp

import {
    collection, getDocs, getDoc, doc,
    updateDoc,
    addDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // for cross icon

export default function DuesStudent() {
    const [student, setStudent] = useState([]); // Holds student data
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeus = () => {
        setIsModalOpen(true);

    }
    const handleReminderClick = (name, dues, payment, mobile) => {
        const message = `hello ${name} , You have taken admission in library and have a dues of ${dues} rs. Kindly clear it as soon as possible.`;
        const whatsappLink = `https://api.whatsapp.com/send/?phone=${mobile}&text=${message}`;
        window.open(whatsappLink, "_blank");

    }
    const clearDues = async (id) => {

        // Reference to the specific student document
        const studentDocRef = doc(db, "students", id);

        // Fetch the current data of the student
        const studentDoc = await getDoc(studentDocRef);

        // Check if the document exists
        if (!studentDoc.exists()) {
            console.error("Student not found");
            return;
        }

        // Get the existing student data
        const studentData = studentDoc.data();
        try {
            // Update the dues field to 0 in the payment object
            const updatedStudentData = {
                ...studentData,
                payment: {
                    ...studentData.payment,
                    dues: 0,
                },
            };

            // Update the student document in Firestore
            await updateDoc(studentDocRef, updatedStudentData);

            console.log("Dues cleared successfully!");
            // Re-fetch the list of students with dues
            const querySnapshot = await getDocs(collection(db, "students"));
            const allStudents = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const duesStudent = allStudents.filter((item) => Number(item.payment.dues) > 0);
            setStudent(duesStudent);
            setIsModalOpen(false)
        } catch (error) {
            console.error("Error clearing dues:", error);
        }



        try {
          // 4. Add data to the "income" collection
          const incomeData = {
            name: studentData.name, // Student's name
            date: new Date().toISOString(), // Current date (ISO string format)
            amountPaid: studentData.payment.dues, // Amount paid
            mobile: studentData.mobile || "N/A", // Mobile number (add a fallback if undefined)
            message: `Dues clear ${studentData.shifts.join(", ")}`, // Custom message
            timestamp: serverTimestamp(), // Add server-side timestamp for ordering
          };
        
          const incomeRef = collection(db, "income"); // Firestore collection for income
          await addDoc(incomeRef, incomeData);
        
          alert("Income data added successfully!");
        } catch (error) {
          console.error("Error adding income data:", error);
          alert("Failed to add income data. Please try again.");
        }
        

    };

    // Fetch data from Firebase on component mount
    useEffect(() => {
        const fetchEnq = async () => {
            try {
                setLoading(true); // Start loading
                const querySnapshot = await getDocs(collection(db, "students"));
                const allStudents = querySnapshot.docs.map((doc) => ({
                    id: doc.id, // Use the document ID
                    ...doc.data(),
                }));
                // Filter students where the last payment was dues with some money.
                const duesStudent = allStudents.filter((item) => {
                    return Number(item.payment.dues) > 0
                });
                console.log(duesStudent)
                setStudent(duesStudent); // Update the state with filtered students


            } catch (error) {
                console.error("Error fetching student data:", error); // Log any errors
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchEnq();
    }, []);
    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <PageTitle title="Dues Students" />
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Dues  Students</h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-red-500 text-white">
                            <th className="px-4 py-2 text-left">S. No.</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Dues shift</th>
                            <th className="px-4 py-2 text-left">Paid Amount</th>
                            <th className="px-4 py-2 text-left">Due Amount</th>
                            <th className="px-4 py-2 text-left">Action</th>
                            <th className="px-4 py-2 text-left">Reminder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center px-4 py-6">
                                    <Loading /> {/* Show loading spinner */}
                                </td>
                            </tr>
                        ) : student.length > 0 ? (
                            student.map((each, index) => (
                                <tr key={each.id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2 capitalize whitespace-nowrap">{each.name}</td>
                                    <td className="px-4 py-2 capitalize whitespace-nowrap">{each.shifts.join("  ")}</td>
                                    <td className="px-4 py-2 capitalize whitespace-nowrap">{Number(each.payment.amount)}</td>
                                    <td className="px-4 py-2 capitalize whitespace-nowrap">{each.payment.dues}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDeus()}
                                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700"
                                        >
                                            Clear
                                        </button>
                                        {/* Modal popUp */}
                                        {isModalOpen && (
                                            <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                                                <div className="bg-white p-3 rounded-lg shadow-lg w-96">
                                                    <h2 className="text-xl font-semibold text-center mb-6">
                                                        Clear Dues
                                                    </h2>
                                                    <p className="text-gray-600 text-2xl text-center">Clear dues amount of Rs {each.payment.dues}.</p>

                                                    <div className="flex w-32 mx-auto gap-5 mt-5">
                                                        <button
                                                            onClick={() => clearDues(each.id)}
                                                            className="bg-green-500 text-white px-6 font-bold text-xl  cursor-pointer  py-1 rounded-md hover:bg-green-700"
                                                        >
                                                            Yes
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsModalOpen(false)}
                                                            className="bg-red-500 text-white px-6  font-bold text-xl cursor-pointer  py-1 rounded-md hover:bg-red-700"
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsModalOpen(false)}
                                                        className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700"
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                            onClick={() => handleReminderClick(each.name, each.payment.dues, each.payment.amount, each.mobile)}
                                        >
                                            Remind
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center px-4 py-6 text-gray-500">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
