import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";

import Alert from "../components/Alert";
import { serverTimestamp } from "firebase/firestore";
import {
    collection, getDocs, getDoc, doc,
    updateDoc,
    addDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function DuesStudent() {
    const [student, setStudent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [duesClearLoading, setDuesClearLoading] = useState(false);
    const [waiveLoading, setWaiveLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);
    const [alert, setAlert] = useState(null);

    // Fetch students from Firebase
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, "students"));
                const allStudents = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                const duesStudent = allStudents.filter((item) => Number(item.payment.dues) > 0);
                setStudent(duesStudent);
            } catch (error) {
                console.error("Error fetching student data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Handle clearing dues
    const clearDues = async (id) => {
        setDuesClearLoading(true)
        const studentDocRef = doc(db, "students", id);
        const studentDoc = await getDoc(studentDocRef);
        if (!studentDoc.exists()) {
            console.error("Student not found");
            setDuesClearLoading(false)
            return;
        }
        const studentData = studentDoc.data();
        try {
            const updatedStudentData = {
                ...studentData,
                payment: { ...studentData.payment, dues: 0 },
            };

            await updateDoc(studentDocRef, updatedStudentData);

            const incomeData = {
                name: studentData.name,
                date: new Date().toISOString(),
                amountPaid: studentData.payment.dues,
                mobile: studentData.mobile || "N/A",
                message: `Dues clear ${studentData.shifts.join(", ")}`,
                timestamp: serverTimestamp(),
            };

            await addDoc(collection(db, "income"), incomeData);

            setAlert({ type: "success", message: "Dues paid and Clear" })
            const updatedStudents = student.filter((item) => item.id !== id);
            setStudent(updatedStudents);
            setDuesClearLoading(false)
        } catch (error) {
            console.error("Error clearing dues:", error);
            setAlert({ type: "error", message: "Error in  dues clearance" })
            setDuesClearLoading(false)
        }
        setDuesClearLoading(false)
    };
    const closeAlert = () => {
        setAlert(null);
    };
    const waiveDues = async (id) => {
        setWaiveLoading(true)
        const studentDocRef = doc(db, "students", id);
        const studentDoc = await getDoc(studentDocRef);
        if (!studentDoc.exists()) {
            console.error("Student not found");
            setDuesClearLoading(false)
            return;
        }
        const studentData = studentDoc.data();
        try {
            const updatedStudentData = {
                ...studentData,
                payment: { ...studentData.payment, dues: 0 },
            };
            await updateDoc(studentDocRef, updatedStudentData);
            setAlert({ type: "success", message: "Dues waived Off" })
            const updatedStudents = student.filter((item) => item.id !== id);
            setStudent(updatedStudents);
            setWaiveLoading(false)
        } catch (error) {
            console.error("Error clearing dues:", error);
            setAlert({ type: "error", message: "Error in  waive off" })
            setWaiveLoading(false)
        }
        setWaiveLoading(false)
    };

    // Handle reminder
    const handleReminderClick = (name, dues, mobile) => {
        const message = `Hello ${name}, you have dues of ${dues} Rs. Kindly clear it soon.`;
        const whatsappLink = `https://api.whatsapp.com/send/?phone=${mobile}&text=${message}`;
        window.open(whatsappLink, "_blank");
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = student.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <PageTitle title="Dues Students" />
            {/* Alert Box */}
            {alert && <Alert
                type={alert.type}
                message={alert.message}
                onClose={closeAlert}
            />}
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Dues Students</h1>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-red-500 text-white">
                            <th className="text-left px-4 py-2">S. No.</th>
                            <th className="text-left px-4 py-2">Name</th>
                            <th className="text-left px-4 py-2">Dues Shift</th>
                            <th className="text-left px-4 py-2">Paid Amount</th>
                            <th className="text-left px-4 py-2">Due Amount</th>
                            <th className="text-left px-4 py-2">Action</th>
                            <th className="text-left px-4 py-2">Reminder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="animate-pulse duration-900">
                                    <td className="px-4 py-3">
                                        <div className="bg-gray-300 rounded h-6 w-32"></div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="bg-gray-300 rounded h-6 w-24"></div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="bg-gray-300 rounded h-6 w-20"></div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="bg-gray-300 rounded h-6 w-32"></div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="bg-gray-300 rounded h-6 w-20"></div>
                                    </td>
                                </tr>
                            ))
                        ) : currentItems.length > 0 ? (
                            currentItems.map((each, index) => (
                                <tr key={each.id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-2 capitalize">{each.name}</td>
                                    <td className="px-4 py-2 capitalize">{each.shifts.join(", ")}</td>
                                    <td className="px-4 py-2">{Number(each.payment.amount)}</td>
                                    <td className="px-4 py-2">{each.payment.dues}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            disabled={duesClearLoading}
                                            onClick={() => clearDues(each.id)}
                                            className="bg-green-500 text-white  px-3 py-1 rounded-md hover:bg-green-700"
                                        >
                                            {duesClearLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <FontAwesomeIcon
                                                        icon={faSpinner}
                                                        className="animate-spin  text-white"
                                                    />
                                                </div>
                                            ) : (
                                                "Clear"
                                            )}

                                        </button>
                                        <button className="my-2 md:mx-2 bg-pink-500 text-white  px-3 py-1 rounded-md hover:bg-pink-700"
                                            disabled={waiveLoading}
                                            onClick={() => waiveDues(each.id)}
                                        >
                                            {waiveLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <FontAwesomeIcon
                                                        icon={faSpinner}
                                                        className="animate-spin  text-white"
                                                    />
                                                </div>
                                            ) : (
                                                "Waive Off"
                                            )}

                                        </button>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleReminderClick(each.name, each.payment.dues, each.mobile)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                        >
                                            Remind
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center p-4 text-gray-500">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(student.length / itemsPerPage) }).map(
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 mx-1 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                                }`}
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
