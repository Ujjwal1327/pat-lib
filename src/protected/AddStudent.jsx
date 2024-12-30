
import React, { useState, useEffect } from "react";
import { storage, db } from "../Firebase"; // Import Firebase config
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore"; // Import serverTimestamp

import { collection, addDoc, getDocs } from "firebase/firestore";
import PageTitle from "../components/PageTitle";

const AddStudent = () => {
  const [shifts, setShifts] = useState([]);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [studentData, setStudentData] = useState({
    name: "",
    mobile: "",
    address: "",
    seatNo: 0,
    shifts: [], // Array to store selected shifts
    payment: {
      amount: "",
      dues: "", // Initialize dues with 0
      mode: "",
      dateOfPayment: "",
      eligibleTill: "",
    },
    dateOfJoining: "",
    history: [], // Empty initially, will store shift and payment history
  });


  const [files, setFiles] = useState({
    photo: null,
    aadhaar: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("payment.")) {
      const field = name.split(".")[1];
      setStudentData((prev) => ({
        ...prev,
        payment: { ...prev.payment, [field]: value },
      }));
    } else {
      setStudentData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
  };

  // Handle shift checkbox change
  const handleShiftChange = (e) => {
    const { value, checked } = e.target;
    setStudentData((prev) => {
      const updatedShifts = checked
        ? [...prev.shifts, value] // Add the shift if checked
        : prev.shifts.filter((shift) => shift !== value); // Remove the shift if unchecked
      return { ...prev, shifts: updatedShifts };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const runningShiftStatus = [];

    // Generate running shift status
    studentData.shifts.map((item) => {
      runningShiftStatus.push({
        shiftName: item,
        eligibleTill: studentData.payment.eligibleTill,
      });
    });

    try {
      // 1. Upload files (photo and Aadhaar) to Firebase Storage
      const photoUrl = await uploadFileToStorage(files.photo, "photos");
      const aadhaarUrl = await uploadFileToStorage(files.aadhaar, "aadhaars");

      // 2. Prepare student data for Firestore
      const studentId = `STU${Date.now()}`; // Generate a unique student ID
      const finalData = {
        studentId,
        registrationNumber, // Add registration number here
        ...studentData,
        documents: {
          photo: photoUrl,
          aadhaar: aadhaarUrl,
        },
        history: [
          {
            shifts: studentData.shifts, // Store selected shifts
            payment: {
              amount: studentData.payment.amount,
              dateOfPayment: studentData.payment.dateOfPayment,
              eligibleTill: studentData.payment.eligibleTill,
              dues: studentData.payment.dues,
            },
          },
        ],
        runningShiftStatus,
      };

      // 3. Add student data to Firestore
      const studentRef = collection(db, "students"); // Firestore collection name
      await addDoc(studentRef, finalData);

      alert("Student data added successfully!");
    } catch (error) {
      console.error("Error adding student data:", error);
      alert("Failed to add student data. Please try again.");
      setIsSubmitting(false); // Stop submission flow if student data fails
      return; // Exit early if this step fails
    }

    try {
      // 4. Add data to the "income" collection
      const incomeData = {
        name: studentData.name, // Student's name
        date: new Date().toISOString(), // Current date (ISO string format)
        amountPaid: studentData.payment.amount, // Amount paid
        mobile: studentData.mobile || "N/A", // Mobile number (add a fallback if undefined)
        message: `New Admission for ${studentData.shifts.join(", ")}`, // Custom message
        timestamp: serverTimestamp(), // Add server-side timestamp for ordering
      };

      const incomeRef = collection(db, "income"); // Firestore collection for income
      await addDoc(incomeRef, incomeData);

      alert("Income data added successfully!");
    } catch (error) {
      console.error("Error adding income data:", error);
      alert("Failed to add income data. Please try again.");
    }

    setIsSubmitting(false); // Reset submission state after both operations
  };


  // Upload a file to Firebase Storage
  const uploadFileToStorage = async (file, folder) => {
    if (!file) return null;

    // Create a reference to the storage location
    const fileRef = ref(storage, `${folder}/${file.name}-${Date.now()}`);

    // Upload the file to Firebase Storage
    await uploadBytes(fileRef, file);

    // Get the download URL of the uploaded file
    const fileUrl = await getDownloadURL(fileRef);

    return fileUrl;
  };
  // Fetch shifts from Firestore on component mount
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'shifts'));
        const shiftsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setShifts(shiftsData);
        console.log(shifts)
      } catch (error) {
        console.error("Error fetching shifts: ", error);
      }
    };
    fetchShifts();
  }, []);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const studentRef = collection(db, "students");
        const querySnapshot = await getDocs(studentRef);

        // Check if the collection is empty
        if (querySnapshot.empty) {
          setRegistrationNumber("Reg-1"); // If no students, start with Reg-1
        } else {
          const count = querySnapshot.size;
          setRegistrationNumber(`Reg-${count + 1}`); // Increment based on current count
        }
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    fetchStudentCount();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[90%] p-4 mx-auto my-10">
      <PageTitle title="Add student" />
      <h2 className="text-2xl font-medium text-gray-600">Basic Details</h2>
      {/* Text Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={studentData.name}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="registrationNumber"
          value={registrationNumber}
          disabled
          placeholder="Registration Number"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={studentData.mobile}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={studentData.address}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="seatNo"
          placeholder="Seat No."
          value={studentData.seatNo}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Shift & Payment Details */}
      <h2 className="text-lg font-medium text-gray-600">Shift & Payment Details</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Checkbox for selecting multiple shifts */}
        <div>
          <h3 className="text-gray-700 mb-2">Select Shifts</h3>
          {shifts.map((shift) => (
            <div key={shift.name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={shift.name}
                checked={studentData.shifts.includes(shift.name)}
                onChange={handleShiftChange}
                className="form-checkbox"
              />
              <label>{shift.name}</label>
            </div>
          ))}
        </div>

        <select
          name="payment.mode"
          value={studentData.payment.mode}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Payment Mode</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>
        <input
          type="number"
          name="payment.amount"
          placeholder="Payment Amount"
          value={studentData.payment.amount}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="payment.dues"
          placeholder="Dues"
          value={studentData.payment.dues}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div>
          <p className="text-gray-700 mb-1">Date of payment:</p>
          <input
            type="date"
            name="payment.dateOfPayment"
            value={studentData.payment.dateOfPayment}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <p className="text-gray-700 mb-1">Date of Joining:</p>
          <input
            type="date"
            name="dateOfJoining"
            value={studentData.dateOfJoining}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <p className="text-gray-700 mb-1">Date of Expiration:</p>
          <input
            type="date"
            name="payment.eligibleTill"
            value={studentData.payment.eligibleTill}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* File Uploads */}
      <h2 className="text-lg font-medium text-gray-600">Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-gray-700">Upload Photo:</span>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            required
            className="mt-1 text-gray-700"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-gray-700">Upload Aadhaar:</span>
          <input
            type="file"
            name="aadhaar"
            onChange={handleFileChange}
            required
            className="mt-1 text-gray-700"
          />
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full focus:outline-none"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AddStudent;
