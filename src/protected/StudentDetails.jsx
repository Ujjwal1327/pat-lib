import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate hook
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { faPhone, faUser, faArrowLeft , faCalendarAlt, faMoneyBillAlt, faEnvelope, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StudentDetails() {
  const { id } = useParams(); // Extract the id from the route parameter
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, "students", id); // Access student document with the ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudent(docSnap.data());
        } else {
          setError("Student not found.");
        }
      } catch (err) {
        setError("Failed to fetch student details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]); // Re-fetch data if the id changes

  if (loading) {
    return <div className="text-center text-xl font-semibold text-indigo-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl font-semibold text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">Student Details</h1>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="text-lg text-indigo-600 hover:text-indigo-800 mb-6 flex items-center space-x-2"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
        <span>Back</span>
      </button>

      {student && (
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-4xl mx-auto space-y-8">
          {/* Profile Image */}
          {student.documents.photo && (
            <div className="flex justify-center mb-8">
              <img
                src={student.documents.photo}
                alt="Student Profile"
                className="w-40 h-40 rounded-full object-cover border-8 border-indigo-500 shadow-lg"
              />
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-indigo-600 flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} className="text-3xl text-indigo-600" />
              <span>Name: {student.name}</span>
            </h2>
            <p className="text-lg text-gray-700">
              <strong>Father's Name:</strong> {student.fatherName}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Mobile:</strong> <FontAwesomeIcon icon={faPhone} className="inline text-indigo-600 mr-2" />
              {student.mobile}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Address:</strong> <FontAwesomeIcon icon={faLocation} className="inline text-indigo-600 mr-2" />
              {student.address}
            </p>
          </div>

          {/* Course & Enrollment Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-indigo-600">Course & Enrollment</h3>
            <p className="text-lg text-gray-700">
              <strong>Course:</strong> {student.course}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Enrollment Date:</strong> <FontAwesomeIcon icon={faCalendarAlt} className="inline text-indigo-600 mr-2" />
              {student.dateOfJoining}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Status:</strong> {student.status}
            </p>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-600">Payment Details</h3>
            <p className="text-lg text-gray-700">
              <strong>Amount Paid:</strong> ₹{student.payment.amount}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Mode of Payment:</strong> {student.payment.mode}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Payment Date:</strong> {student.payment.dateOfPayment}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Eligible Till:</strong> {student.payment.eligibleTill}
            </p>
          </div>

          {/* Seat Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-indigo-500">Seat Information</h3>
            <p className="text-lg text-gray-700">
              <strong>Seat No:</strong> {student.seat}
            </p>
          </div>

          {/* Student ID */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600">Student ID</h3>
            <p className="text-lg text-gray-700">{student.studentId}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
