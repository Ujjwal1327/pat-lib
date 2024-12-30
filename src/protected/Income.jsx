import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../Firebase"; // Ensure Firebase is configured correctly
import PageTitle from "../components/PageTitle";

const Income = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [filteredIncomeList, setFilteredIncomeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set items per page
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState(""); // Selected filter month

  // Fetch income data from Firestore in order of the `timestamp` field
  const fetchIncome = async () => {
    try {
      const incomeCollection = collection(db, "income"); // Reference to the 'income' collection
      const q = query(incomeCollection, orderBy("timestamp", "desc")); // Order by timestamp in descending order
      const snapshot = await getDocs(q);
      const incomeData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIncomeList(incomeData);
      setFilteredIncomeList(incomeData); // Default: show all data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching income data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  // Get unique month-year options from the income data
  const getMonthOptions = () => {
    const months = incomeList.map((income) => {
      if (income.timestamp) {
        const date = new Date(income.timestamp.toDate());
        return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
      }
      return null;
    });
    return Array.from(new Set(months)).filter((month) => month !== null); // Remove duplicates
  };

  // Handle month filter change
  const handleFilterChange = (e) => {
    const selectedMonth = e.target.value;
    setFilterMonth(selectedMonth);

    if (selectedMonth === "") {
      setFilteredIncomeList(incomeList); // Reset to full list if no filter
    } else {
      const filtered = incomeList.filter((income) => {
        if (income.timestamp) {
          const date = new Date(income.timestamp.toDate());
          const monthYear = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
          return monthYear === selectedMonth;
        }
        return false;
      });
      setFilteredIncomeList(filtered);
      setCurrentPage(1); // Reset pagination
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIncomeList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredIncomeList.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
    <PageTitle title="Income Details"/>
      <div className="max-w-full mx-auto overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Income Records</h1>

        {/* Monthly Filter */}
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="monthFilter" className="text-gray-600 font-medium mr-2">
            Filter by Month:
          </label>
          <select
            id="monthFilter"
            value={filterMonth}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">All</option>
            {getMonthOptions().map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="animate-pulse duration-900">
              <td className="px-4 py-3">
                <div className="bg-gray-300 rounded h-6 w-32"></div>
              </td>
              <td className="px-4 py-3">
                <div className="bg-gray-300 rounded h-6 w-24"></div>
              </td>
              <td className="px-4 py-3">
                <              div className="bg-gray-300 rounded h-6 w-20"></div>
              </td>
              <td className="px-4 py-3">
                <div className="bg-gray-300 rounded h-6 w-32"></div>
              </td>
              <td className="px-4 py-3">
                <div className="bg-gray-300 rounded h-6 w-20"></div>
              </td>
              <td className="px-4 py-3">
                <div className="bg-gray-300 rounded h-6 w-20"></div>
              </td>
              <td className="px-4 py-3">
                <div className="bg-gray-300 rounded h-6 w-20"></div>
              </td>
              <td className="px-4 py-3">
                <div className="bg-gray-300 rounded h-6 w-20"></div>
              </td>
              <td className="px-4 py-3">
                <div className="bg-gray-300 rounded h-6 w-20"></div>
              </td>
            </tr>
          ))
        ) : filteredIncomeList.length === 0 ? (
          <p className="text-center text-gray-500">No income records found.</p>
        ) : (
          <div>
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="sticky top-0 bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">S. No.</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Amount Paid</th>
                  <th className="px-4 py-2 text-left">Mobile</th>
                  <th className="px-4 py-2 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((income, index) => (
                  <tr
                    key={income.id}
                    className="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200"
                  >
                    <td className="px-4 py-2 border">{indexOfFirstItem + index + 1}</td>
                    <td className="px-4 py-2 border">{income.name || "N/A"}</td>
                    <td className="px-4 py-2 border">
                      {income.timestamp
                        ? new Date(income.timestamp.toDate()).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border">Rs {income.amountPaid || "N/A"}</td>
                    <td className="px-4 py-2 border">{income.mobile || "N/A"}</td>
                    <td className="px-4 py-2 border">{income.message || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
              >
                Previous
              </button>
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageClick(index + 1)}
                    className={`px-3 py-1 rounded-md ${currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Income;
