import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { serverTimestamp } from "firebase/firestore";
import {
    collection, getDocs, getDoc, doc,
    updateDoc,
    addDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function DuesStudent() {
    const [student, setStudent] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [selectedMonth, setSelectedMonth] = useState("");

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
                setFilteredStudents(duesStudent);
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
        const studentDocRef = doc(db, "students", id);
        const studentDoc = await getDoc(studentDocRef);

        if (!studentDoc.exists()) {
            console.error("Student not found");
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

            alert("Dues cleared and income data added successfully!");

            const updatedStudents = student.filter((item) => item.id !== id);
            setStudent(updatedStudents);
            setFilteredStudents(updatedStudents);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error clearing dues:", error);
        }
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
    const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Filter students by month
    const handleMonthChange = (e) => {
        const month = e.target.value;
        setSelectedMonth(month);

        if (month) {
            const filtered = student.filter((item) => {
                const lastPaymentDate = item.payment?.lastPaymentDate?.toDate();
                if (lastPaymentDate) {
                    const formattedDate = `${lastPaymentDate.getFullYear()}-${(lastPaymentDate.getMonth() + 1).toString().padStart(2, '0')}`;
                    return formattedDate.startsWith(month); // comparing YYYY-MM format
                }
                return false;
            });
            setFilteredStudents(filtered);
            setCurrentPage(1);
        } else {
            setFilteredStudents(student);
        }
    };


    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <PageTitle title="Dues Students" />
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Dues Students</h1>

            {/* Month Filter */}
            <div className="mb-4 flex justify-end">
                <select
                    className="border border-gray-300 rounded-md p-2"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                >
                    <option value="">All Months</option>
                    <option value="2024-12">December 2024</option>
                    <option value="2024-11">November 2024</option>
                    {/* Add more months as needed */}
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-red-500 text-white">
                            <th className="px-4 py-2">S. No.</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Dues Shift</th>
                            <th className="px-4 py-2">Paid Amount</th>
                            <th className="px-4 py-2">Due Amount</th>
                            <th className="px-4 py-2">Action</th>
                            <th className="px-4 py-2">Reminder</th>
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
                                        <              div className="bg-gray-300 rounded h-6 w-20"></div>
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
                                            onClick={() => setIsModalOpen(true)}
                                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700"
                                        >
                                            Clear
                                        </button>
                                        {isModalOpen && (
                                            <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                                                <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                                                    <h2 className="text-xl font-semibold mb-4">Clear Dues</h2>
                                                    <p className="mb-4">
                                                        Are you sure you want to clear dues of Rs. {each.payment.dues}?
                                                    </p>
                                                    <button
                                                        onClick={() => clearDues(each.id)}
                                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        onClick={() => setIsModalOpen(false)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        )}
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
                {Array.from({ length: Math.ceil(filteredStudents.length / itemsPerPage) }).map(
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
