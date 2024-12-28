import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    updateDoc,
    addDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // for cross icon

import { serverTimestamp } from "firebase/firestore"; // Import serverTimestamp





const PendingStudents = () => {
    const [student, setStudent] = useState([]); // Holds student data
    const [loading, setLoading] = useState(false); // Loading state
    const [shifts, setShifts] = useState([]);
    const [id, setId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
    const [renewData, setRenewData] = useState({
        shift: [],
        dateOfPayment: "",
        eligibleTill: "",
        mode: "",
        amount: "",
        dues: "",
        seat: "",
    });
    const handleRenew = (studentId) => {
        setId(studentId);
        setIsModalOpen(true);
        // Fetch existing payment details for the student if needed to populate the form
    };

    const handleRenewSubmit = async (e) => {
        e.preventDefault();
        const studentId = id; // Assume `id` is the current student ID being updated
        // Update the payment, including the new `seat` field
        const updatedPayment = {
            shift: renewData.shift,
            dateOfPayment: renewData.dateOfPayment,
            eligibleTill: renewData.eligibleTill,
            mode: renewData.mode,
            amount: renewData.amount,
            seat: renewData.seat, // Include the seat number in the payment data
            dues: renewData.dues, // Include the seat number in the payment data
        };

        console.log("Updated Payment:", updatedPayment);


        // Reference to the specific student document in Firebase
        const studentDocRef = doc(db, "students", studentId);

        // Fetch the existing student data
        const studentDoc = await getDoc(studentDocRef);
        if (!studentDoc.exists()) {
            console.error("Student not found");
            return;
        }

        const studentData = studentDoc.data();
        try {
            // Assuming `updatedPayment.shift` contains the list of shifts to renew (e.g., ["Evening"])
            const updatedRunningShiftStatus = studentData.runningShiftStatus.map((item) => {
                // Check if the current shift needs to be renewed
                if (updatedPayment.shift.includes(item.shiftName)) {
                    // Renew the eligibleTill date for this shift
                    return {
                        ...item,
                        eligibleTill: updatedPayment.eligibleTill, // Set the new eligibility date
                    };
                }
                // Return the existing shift as-is
                return item;
            });

            // Add any new shifts not already in `runningShiftStatus` (optional, if applicable)
            updatedPayment.shift.forEach((newShift) => {
                if (!updatedRunningShiftStatus.some((item) => item.shiftName === newShift)) {
                    updatedRunningShiftStatus.push({
                        shiftName: newShift,
                        eligibleTill: updatedPayment.eligibleTill,
                    });
                }
            });


            // Update the student data to include the new `seat` field
            const updatedStudentData = {
                ...studentData,
                runningShiftStatus: updatedRunningShiftStatus,
                seatNo: updatedPayment.seat,
                shifts: updatedPayment.shift, // Overwrite the outer `shifts`
                payment: {
                    dateOfPayment: updatedPayment.dateOfPayment,
                    eligibleTill: updatedPayment.eligibleTill,
                    mode: updatedPayment.mode,
                    dues: updatedPayment.dues,
                    amount: updatedPayment.amount,
                    seat: updatedPayment.seat, // Add `seat` to the payment object
                },
                // Append a new entry to the history array
                history: [
                    ...(Array.isArray(studentData.history) ? studentData.history : []),
                    {
                        shifts: updatedPayment.shift,
                        payment: {
                            dateOfPayment: updatedPayment.dateOfPayment,
                            amount: updatedPayment.amount,
                            mode: updatedPayment.mode,
                            eligibleTill: updatedPayment.eligibleTill,
                            seat: updatedPayment.seat, // Track the seat in the history as well
                        },
                    },
                ],
            };

            // Update the student document in Firebase
            await updateDoc(studentDocRef, updatedStudentData);

            console.log("Student data updated successfully");
            setIsModalOpen(false); // Close the modal after submitting
        } catch (error) {
            console.error("Error updating student data:", error);
        }


        try {
          // 4. Add data to the "income" collection
          const incomeData = {
            name: studentData.name, // Student's name
            date: new Date().toISOString(), // Current date (ISO string format)
            amountPaid: studentData.payment.amount, // Amount paid
            mobile: studentData.mobile || "N/A", // Mobile number (add a fallback if undefined)
            message: `Renew in ${studentData.shifts.join(", ")}`, // Custom message
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

    const handleShiftChange = (e) => {
        const { value, checked } = e.target;
        setRenewData((prevData) => {
            const updatedShifts = checked
                ? [...prevData.shift, value] // Add the shift if checked
                : prevData.shift.filter((shift) => shift !== value); // Remove the shift if unchecked
            return { ...prevData, shift: updatedShifts };
        });
    };

    // Function to check if the expiry date is within 10 days
    const isPending = (expiryDate) => {
        const currentDate = new Date();
        const expiry = new Date(expiryDate);
        const diffInTime = currentDate.getTime() - expiry.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);
        console.log(expiryDate, diffInDays);
        return diffInDays <= 10 && diffInDays >= 0;
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

                // Filter students whose expiry date is within 10 days of today
                const pendingStudent = allStudents.filter((item) =>
                    item.runningShiftStatus.some((item) => isPending(item.eligibleTill))
                );
                // console.log(pendingStudent)
                setStudent(pendingStudent); // Update the state with filtered students
            } catch (error) {
                console.error("Error fetching student data:", error); // Log any errors
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchEnq();
    }, []);

    // Fetch shifts from Firestore on component mount
    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "shifts"));
                const shiftsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setShifts(shiftsData);
                // console.log(shiftsData)
                // console.log(shifts)
            } catch (error) {
                console.error("Error fetching shifts: ", error);
            }
        };
        fetchShifts();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <PageTitle title="Pending Students" />
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
                Pending Students
            </h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-yellow-500 text-white">
                            <th className="px-4 py-2 text-left">S. No.</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Mobile</th>
                            <th className="px-4 py-2 text-left">Pending State</th>
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
                                    <td className="px-4 py-2">
                                        {each.runningShiftStatus
                                            .filter(
                                                (item) => new Date() > new Date(item.eligibleTill)
                                            )
                                            .map((item) => <span> {item.shiftName} </span>)}
                                    </td>
                                    <td className="px-4 py-2 text-red-500 font-semibold">
                                        {each.runningShiftStatus
                                            .filter(
                                                (item) => new Date() > new Date(item.eligibleTill)
                                            )
                                            .map((item) => item.eligibleTill)}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleRenew(each.id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700"
                                        >
                                            Renew
                                        </button>
                                        {/* Modal popUp */}
                                        {isModalOpen && (
                                            <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
                                                <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-screen overflow-y-auto">
                                                    <h2 className="text-xl font-semibold">
                                                        Renew Payment
                                                    </h2>
                                                    <form onSubmit={handleRenewSubmit}>
                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="shift"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Shift
                                                            </label>
                                                            <div className="flex gap-2">
                                                                {shifts &&
                                                                    shifts.map((shift) => (
                                                                        <div key={shift.name}>
                                                                            <input
                                                                                type="checkbox"
                                                                                value={shift.name}
                                                                                checked={renewData.shift.includes(
                                                                                    shift.name
                                                                                )}
                                                                                onChange={handleShiftChange}
                                                                            />
                                                                            <label>{shift.name}</label>
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        </div>

                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="dateOfPayment"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Date of Payment
                                                            </label>
                                                            <input
                                                                type="date"
                                                                id="dateOfPayment"
                                                                value={renewData.dateOfPayment}
                                                                onChange={(e) =>
                                                                    setRenewData({
                                                                        ...renewData,
                                                                        dateOfPayment: e.target.value,
                                                                    })
                                                                }
                                                                className="mt-1 p-2 border rounded-md w-full"
                                                                required
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="eligibleTill"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Eligible Till
                                                            </label>
                                                            <input
                                                                type="date"
                                                                id="eligibleTill"
                                                                value={renewData.eligibleTill}
                                                                onChange={(e) =>
                                                                    setRenewData({
                                                                        ...renewData,
                                                                        eligibleTill: e.target.value,
                                                                    })
                                                                }
                                                                className="mt-1 p-2 border rounded-md w-full"
                                                                required
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="mode"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Mode
                                                            </label>
                                                            <select
                                                                id="mode"
                                                                value={renewData.mode}
                                                                onChange={(e) =>
                                                                    setRenewData({
                                                                        ...renewData,
                                                                        mode: e.target.value,
                                                                    })
                                                                }
                                                                className="mt-1 p-2 border rounded-md w-full"
                                                                required
                                                            >
                                                                <option value="" disabled>
                                                                    Select Mode
                                                                </option>
                                                                <option value="Online">Online</option>
                                                                <option value="Cash">Cash</option>
                                                                <option value="Cheque">Cheque</option>
                                                            </select>
                                                        </div>

                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="amount"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Amount
                                                            </label>
                                                            <input
                                                                type="number"
                                                                id="amount"
                                                                value={renewData.amount}
                                                                onChange={(e) =>
                                                                    setRenewData({
                                                                        ...renewData,
                                                                        amount: e.target.value,
                                                                    })
                                                                }
                                                                className="mt-1 p-2 border rounded-md w-full"
                                                                required
                                                            />
                                                        </div>

                                                        {/* New Input Field for Dues */}
                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="dues"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Dues
                                                            </label>
                                                            <input
                                                                type="number"
                                                                id="dues"
                                                                value={renewData.dues || ''}
                                                                onChange={(e) =>
                                                                    setRenewData({
                                                                        ...renewData,
                                                                        dues: e.target.value,
                                                                    })
                                                                }
                                                                className="mt-1 p-2 border rounded-md w-full"
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="seat"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Seat
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="seat"
                                                                value={renewData.seat}
                                                                onChange={(e) =>
                                                                    setRenewData({
                                                                        ...renewData,
                                                                        seat: e.target.value,
                                                                    })
                                                                }
                                                                className="mt-1 p-2 border rounded-md w-full"
                                                                required
                                                            />
                                                        </div>

                                                        <button
                                                            type="submit"
                                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                                        >
                                                            Submit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsModalOpen(false)}
                                                            className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700"
                                                        >
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        )}

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
    );
};

export default PendingStudents;
