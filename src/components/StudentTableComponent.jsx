import React from "react";
import { Link } from "react-router-dom";

const StudentTableComponent = ({ students, loading }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Name</th>
            <th className="px-4 py-3 text-left font-semibold">Amount</th>
            <th className="px-4 py-3 text-left font-semibold">Mode</th>
            <th className="px-4 py-3 text-left font-semibold">Shift</th>
            <th className="px-4 py-3 text-left font-semibold">Dues</th>
          </tr>
        </thead>
        <tbody>
        {loading ? (
            // Skeleton Loader with multiple pulsating rows
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse duration-900">
                <td className="px-4 py-3">
                  <div className="bg-gray-300 rounded h-6 w-32"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="bg-gray-300 rounded h-6 w-24"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="bg-gray-300 rounded h-6 w-20"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="bg-gray-300 rounded h-6 w-32"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="bg-gray-300 rounded h-6 w-20"></div>
                </td>
              </tr>
            ))
          ) : (
            // Actual Table Data
            students.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100 transition duration-200">
                <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{item.name}</td>
                <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{item.payment.amount}</td>
                <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{item.payment.mode}</td>
                <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{item.shifts.join(", ")}</td>
                <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{item.payment.dues}</td>
              </tr>
            ))
          )}
          
        </tbody>
      </table>
    </div>
  );
};

export default StudentTableComponent;
