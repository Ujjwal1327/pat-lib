import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import {
    collection, getDocs, getDoc, doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // for cross icon


const Left = () => {
    const [student, setStudent] = useState([]); // Holds student data
    const [loading, setLoading] = useState(false); // Loading state
    const [shifts, setShifts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState("");
    const [alert, setAlert] = useState(null);
    const [renewData, setRenewData] = useState({
        shift: [],
        dateOfPayment: "",
        eligibleTill: "",
        mode: "",
        amount: "",
        seat: "",
        dues: "",
    });

    const handleRenew = (studentId, dues) => {
        setId(studentId)
        if (dues > 0) {
            setAlert({
                type: 'error',
                message: `Please clear the dues amount of  Rs ${dues} first before admiting in new shift. `,
            });
        }
        else {

            setIsModalOpen(true);
        }
        setTimeout(() => setAlert(null), 4000);
    }


    const handleRenewSubmit = async (e) => {
        e.preventDefault();
        const studentId = id; // Assume `id` is the current student ID being updated
    
        // Ensure renewData is valid
        if (!renewData) {
            console.error("Renew data is undefined or null");
            return;
        }
    
        // Safely update the payment object
        const updatedPayment = {
            shift: Array.isArray(renewData.shift) ? renewData.shift : [], // Ensure it's an array
            dateOfPayment: renewData.dateOfPayment || null,
            eligibleTill: renewData.eligibleTill || null,
            mode: renewData.mode || "unknown",
            amount: renewData.amount || 0,
            seat: renewData.seat || "unknown",
            dues: renewData.dues || 0,
        };
    
        console.log("Updated Payment:", updatedPayment);
    
        try {
            // Reference to the specific student document in Firebase
            const studentDocRef = doc(db, "students", studentId);
    
            // Fetch the existing student data
            const studentDoc = await getDoc(studentDocRef);
            if (!studentDoc.exists()) {
                console.error("Student not found");
                return;
            }
    
            const studentData = studentDoc.data();
            if (!studentData) {
                console.error("Student data is undefined or null");
                return;
            }
    
            // Update running shift status
            const updatedRunningShiftStatus = Array.isArray(updatedPayment.shift)
                ? updatedPayment.shift.map((item) => ({
                      shiftName: item,
                      eligibleTill: updatedPayment.eligibleTill,
                  }))
                : [];
    
            // Safely update the student data
            const updatedStudentData = {
                ...studentData,
                runningShiftStatus: updatedRunningShiftStatus,
                seatNo: updatedPayment.seat,
                shifts: Array.isArray(updatedPayment.shift) ? updatedPayment.shift : [],
                payment: {
                    dateOfPayment: updatedPayment.dateOfPayment,
                    eligibleTill: updatedPayment.eligibleTill,
                    mode: updatedPayment.mode,
                    amount: updatedPayment.amount,
                    seat: updatedPayment.seat,
                    dues: updatedPayment.dues,
                },
                // Safely update the history array
                history: [
                    ...(Array.isArray(studentData.history) ? studentData.history : []),
                    {
                        shifts: Array.isArray(updatedPayment.shift) ? updatedPayment.shift : [],
                        payment: {
                            dateOfPayment: updatedPayment.dateOfPayment,
                            amount: updatedPayment.amount,
                            mode: updatedPayment.mode,
                            eligibleTill: updatedPayment.eligibleTill,
                            seat: updatedPayment.seat,
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
                console.log(allStudents)
                // Filter students where the last payment date is more than 15 days before the eligibleTill date
                const leftStudent = allStudents.filter((item) => {
                    const eligibleTillDate = new Date(item.payment.eligibleTill);
                    const diffTime = new Date() - eligibleTillDate; // Difference in milliseconds
                    const diffDays = diffTime / (1000 * 3600 * 24); // Convert milliseconds to days
                    console.log(diffDays)
                    return diffDays > 10; // Only include students where the difference is more than 15 days
                });

                setStudent(leftStudent); // Update the state with filtered students
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
            <PageTitle title="Left Students" />
            {/* Custom Alert */}
            {alert && (
                <div
                    className={`fixed top-10 shadow-lg  border-l-4 border-white right-1 m-2 mx-auto text-center w-full sm:w-[40%] py-5 mb-4 text-white ${alert.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    <p className="text-base">
                        {alert.message}
                    </p>
                    {/* Shrinking Bar */}
                    <div
                        className="h-1 bg-white absolute bottom-0 left-0 animate-shrinkBar"
                    ></div>
                </div>

            )}
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Left  Students</h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-red-500 text-white">
                            <th className="px-4 py-2 text-left">S. No.</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Mobile</th>
                            <th className="px-4 py-2 text-left">Last Enrolled Shift</th>
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
                                        {each.shifts && each.shifts.map((item) => item + "           ")}
                                    </td>
                                    <td className="px-4 py-2">{each.payment.eligibleTill}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleRenew(each.id, each.payment.dues)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                        >
                                            Renew
                                        </button>
                                        {/* Modal popUp */}
                                        {isModalOpen && (
                                            <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
                                                <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[95%] sm:max-h-[70vh] overflow-y-auto">
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

export default Left;
