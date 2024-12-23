import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const navigate = useNavigate();

  // Sample data for demonstration
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      mobile: "9876543210",
      shift: "Morning",
      currentPayment: "$200",
      latestDues: "$50",
      gender: "Male",
      renewalDate: "2024-12-01",
      doj: "2023-06-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      mobile: "9876543220",
      shift: "Evening",
      currentPayment: "$150",
      latestDues: "$0",
      gender: "Female",
      renewalDate: "2024-11-15",
      doj: "2022-08-10",
    },
    {
      id: 3,
      name: "Michael Brown",
      mobile: "9876543230",
      shift: "Afternoon",
      currentPayment: "$180",
      latestDues: "$20",
      gender: "Male",
      renewalDate: "2024-12-10",
      doj: "2021-09-01",
    },
  ]);

  // Filter states
  const [shiftFilter, setShiftFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  // Filter logic
  const filteredStudents = students.filter((student) => {
    const matchesShift = shiftFilter ? student.shift === shiftFilter : true;
    const matchesGender = genderFilter ? student.gender === genderFilter : true;
    return matchesShift && matchesGender;
  });

  // Handle detail navigation
  const handleDetailsClick = (id) => {
    navigate(`/students/${id}`); // Navigates to the student detail page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Student List</h1>

      {/* Filters */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          {/* Shift Filter */}
          <select
            className="border border-gray-300 rounded-md p-2"
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
          >
            <option value="">All Shifts</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>

          {/* Gender Filter */}
          <select
            className="border border-gray-300 rounded-md p-2"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Add Student Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => navigate("/students/add")}
        >
          Add Student
        </button>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Shift</th>
              <th className="px-4 py-2 text-left">Current Payment</th>
              <th className="px-4 py-2 text-left">Latest Dues</th>
              <th className="px-4 py-2 text-left">Date of Renewal</th>
              <th className="px-4 py-2 text-left">Date of Joining</th>
              <th className="px-4 py-2 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.mobile}</td>
                  <td className="px-4 py-2">{student.shift}</td>
                  <td className="px-4 py-2">{student.currentPayment}</td>
                  <td className="px-4 py-2">{student.latestDues}</td>
                  <td className="px-4 py-2">{student.renewalDate}</td>
                  <td className="px-4 py-2">{student.doj}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                      onClick={() => handleDetailsClick(student.id)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center px-4 py-6 text-gray-500">
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

export default StudentList;
