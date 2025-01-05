import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import { db } from "../Firebase";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function StudentList() {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchStudents = async () => {
        try {
            setLoading(true);
            // Create a query with ordering by registrationNumber in descending order
            const q = query(collection(db, 'students'), orderBy('registrationNumber', 'desc'));
            const querySnapshot = await getDocs(q);
            const allStudents = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setStudent(allStudents);
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchStudents();
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
              <th className="px-4 py-2 text-left">R. No.</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          {loading ? <Loading/> : (
            // Render table rows when loading is complete
            <tbody>
              {student.length > 0 ? (
                student.map((each , index) => (
                  <tr key={each.studentId} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{each.registrationNumber}</td>
                    <td className="px-4 py-2">{each.name}</td>
                    <td className="px-4 py-2">{each.mobile}</td>
                    <td className="px-4 py-2">{each.address.slice(0,10) + "....."}</td>
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