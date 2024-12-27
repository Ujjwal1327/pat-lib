import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate hook
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { faPhone, faUser, faArrowLeft, faCalendarAlt, faMoneyBillAlt, faEnvelope, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../components/Loading";

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


      {student && (

        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-4xl mx-auto space-y-8">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="text-md  rounded-sm px-3 py-1 bg-blue-600 text-white hover:bg-indigo-500 hover:drop-shadow-lg mb-6 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
            <span>Back</span>
          </button>
          <img
                src={student.documents.aadhaar}
                alt="Student Profile"
                className="w-full h-40 object-cover  border-indigo-500 shadow-lg"
              />
          {/* Profile Image */}
          {student.documents.photo && (
            <div className="flex justify-center mb-8 flex-col gap-3 items-center">
              <img
                src={student.documents.photo}
                alt="Student Profile"
                className="w-40 h-40 rounded-full object-cover border-8 border-indigo-500 shadow-lg"
              />
              <h2 className="text-2xl font-semibold text-indigo-600 flex items-center space-x-2">
                <span>{student.name}</span>
              </h2>
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">

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
            <p className="text-lg text-gray-700">
              <strong>Date of joining:</strong> <FontAwesomeIcon icon={faCalendarAlt} className="inline text-indigo-600 mr-2" />
              {student.dateOfJoining}
            </p>
          </div>


          {/* Running shift  */}
          <div className="space-y-4 overflow-x-auto">
            <h3 className="text-xl font-semibold text-green-600">Shift Enrolled</h3>
            <table className="w-full table-auto border-collapse   bg-white shadow-md rounded-lg border">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="px-4 whitespace-nowrap py-2 text-left">S. No.</th>
                  <th className="px-4 whitespace-nowrap py-2 text-left">Shift Name</th>
                  <th className="px-4 whitespace-nowrap py-2 text-left">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center px-4 py-6">
                      <Loading />
                    </td>
                  </tr>
                ) : student.runningShiftStatus ? (
                  student.runningShiftStatus.map((each, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="px-4 whitespace-nowrap py-2">{index + 1}</td>
                      <td className="px-4 whitespace-nowrap py-2">{each.shiftName}</td>
                      {
                        new Date() > Date(each.eligibleTill) ? <td className="px-4 whitespace-nowrap py-2 text-red-500">{each.eligibleTill}</td> : <td className="px-4 whitespace-nowrap py-2 text-blue-500">{each.eligibleTill}</td>
                      }
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
          {/*  Payment History*/}
          <div className="space-y-4 overflow-x-auto">
            <h3 className="text-xl font-semibold text-green-600">Payment History</h3>
            <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="px-4 whitespace-nowrap py-2 text-left">S. No.</th>
                  <th className="px-4 whitespace-nowrap py-2 text-left">Shift Name</th>
                  <th className="px-4 whitespace-nowrap py-2 text-left">Amount Paid</th>
                  <th className="px-4 whitespace-nowrap py-2 text-left">Payment Date</th>
                  <th className="px-4 whitespace-nowrap py-2 text-left">Expire On</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center px-4 py-6">
                      <Loading />
                    </td>
                  </tr>
                ) : student.history ? (
                  [...student.history].reverse().map((each, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="px-4 whitespace-nowrap py-2">{index + 1}</td>
                      <td className="px-4 whitespace-nowrap py-2">{each.shifts.join(" , ")}</td>
                      <td className="px-4 whitespace-nowrap py-2">{each.payment.amount}</td>
                      <td className="px-4 whitespace-nowrap py-2">{each.payment.dateOfPayment}</td>
                      <td className="px-4 whitespace-nowrap py-2">{each.payment.eligibleTill}</td>
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
      )}
    </div>
  );
}

export default StudentDetails;
