import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ActiveStudents = () => {
    const [student, setStudent] = useState([]); // Holds student data
    const [loading, setLoading] = useState(false); // Loading state

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

                // Filter students whose 'eligibleTill' date is greater than today
                const eligibleStudent = allStudents.filter((item) =>
                    new Date(item.payment.eligibleTill) > new Date()
                );

                setStudent(eligibleStudent); // Update the state with filtered students
            } catch (error) {
                console.error("Error fetching student data:", error); // Log any errors
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchEnq();
    }, []);

    console.log(student)
    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <PageTitle title="Active Students" />
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Active Students</h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2 text-left">S. No.</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Mobile</th>
                            <th className="px-4 py-2 text-left">Active Shift</th>
                            <th className="px-4 py-2 text-left">Due Date</th>
                            <th className="px-4 py-2 text-left">Action</th>
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
                                    <td className="px-4 py-2 capitalize">{each.name}</td>
                                    <td className="px-4 py-2">{each.mobile}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        {each.runningShiftStatus && each.runningShiftStatus.map((item) => " | " + item.shiftName + " | ")}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        {each.runningShiftStatus &&
                                            each.runningShiftStatus.map((item) => {
                                                const isValid = new Date(item.eligibleTill) > new Date();
                                                console.log(isValid ? "valid" : "crossed"); // Debug log
                                                return (
                                                    <span key={item.eligibleTill}  className={isValid ? "text-black" : "text-red-500"}>
                                                        {" | " + item.eligibleTill + " | "}
                                                    </span>
                                                );
                                            })}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Link
                                            to={`${each.id}`}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                        </Link>
                                    </td>
                                </tr>

                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center px-4 py-6 text-gray-500"
                                >
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiveStudents;
