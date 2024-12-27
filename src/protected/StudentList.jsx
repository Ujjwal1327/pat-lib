import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { collection, getDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Link } from "react-router-dom";

function StudentList() {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchEnq = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'students'));
        const allStudents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudent(allStudents);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnq();
  }, []);
console.log(student)
  return (  
    <div className="p-6 bg-gray-100 min-h-full">
      <PageTitle title="All Students" />
      <h1 className="text-2xl font-bold text-gray-700 mb-4">All Students</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 text-left">S. No.</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="flex flex-col items-center">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <p className="text-lg text-gray-600 mt-4">Fetching data, please wait...</p>
              </div>
            </div>
          ) : (
            // Render table rows when loading is complete
            <tbody>
              {student.length > 0 ? (
                student.map((each , index) => (
                  <tr key={each.studentId} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{each.name}</td>
                    <td className="px-4 py-2">{each.mobile}</td>
                    <td className="px-4 py-2">{each.address}</td>
                    <td className="px-4 py-2">
                      {/* Add a Link to view student details */}
                      <Link
                        to={`${each.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center px-4 py-6 text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          )}

        </table>
      </div>
    </div>
  )
}

export default StudentList