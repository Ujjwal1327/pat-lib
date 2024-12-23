import React, { useState } from "react";
import { storage, db } from "../Firebase"; // Import Firebase config
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    address: "",
    seatNo: "",
    shift: "",
    payment: {
      amount: "",
      mode: "",
      dateOfPayment: "",
      eligibleTill: "",
    },
    dateOfJoining: "",
    status: "Active",
    history: [],
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Upload files (photo and Aadhaar) to Firebase Storage
      const photoUrl = await uploadFileToStorage(files.photo, "photos");
      const aadhaarUrl = await uploadFileToStorage(files.aadhaar, "aadhaars");

      // 2. Store data in Firestore
      const finalData = {
        ...studentData,
        documents: {
          photo: photoUrl,
          aadhaar: aadhaarUrl,
        },
      };

      const studentRef = collection(db, "students"); // Firestore collection
      await addDoc(studentRef, finalData);

      alert("Student data added successfully!");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred. Please try again.");
    }

    setIsSubmitting(false);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Text Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          name="fatherName"
          placeholder="Father's Name"
          value={studentData.fatherName}
          onChange={handleInputChange}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="shift"
          value={studentData.shift}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Shift</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
          <option value="Full">Full</option>
        </select>
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
          type="date"
          name="payment.dateOfPayment"
          value={studentData.payment.dateOfPayment}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          name="payment.eligibleTill"
          value={studentData.payment.eligibleTill}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
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

      <input
        type="date"
        name="dateOfJoining"
        value={studentData.dateOfJoining}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 disabled:bg-gray-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Add Student"}
      </button>
    </form>
  );
};

export default AddStudent;
