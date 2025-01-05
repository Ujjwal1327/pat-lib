import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../Firebase"; // Ensure Firebase is configured correctly
import PageTitle from "../components/PageTitle";

const Transactions = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [filteredTransactionsList, setFilteredTransactionsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Set items per page
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(""); // Selected filter date

  // Fetch transactions data from Firestore in order of the `timestamp` field
  const fetchTransactions = async () => {
    try {
      const transactionsCollection = collection(db, "transactions"); // Reference to the 'transactions' collection
      const q = query(transactionsCollection, orderBy("timestamp", "desc")); // Order by timestamp in descending order
      const snapshot = await getDocs(q);
      const transactionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactionsList(transactionsData);
      setFilteredTransactionsList(transactionsData); // Default: show all data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle daily filter change
  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);

    if (!selectedDate) {
      setFilteredTransactionsList(transactionsList); // Reset to full list if no filter
    } else {
      const filtered = transactionsList.filter((transaction) => {
        if (transaction.timestamp) {
          const date = new Date(transaction.timestamp.toDate());
          return (
            date.toISOString().split("T")[0] === selectedDate // Compare dates
          );
        }
        return false;
      });
      setFilteredTransactionsList(filtered);
      setCurrentPage(1); // Reset pagination
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactionsList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactionsList.length / itemsPerPage);

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
      <PageTitle title="Transaction Details" />
      <div className="max-w-full mx-auto overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Transactions</h1>

        {/* Daily Filter */}
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="dateFilter" className="text-gray-600 font-medium mr-2">
            Filter by Date:
          </label>
          <input
            type="date"
            id="dateFilter"
            value={filterDate}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {loading ? (
          <div className="animate-pulse">
            <p className="text-center text-gray-500">Loading...</p>
          </div>
        ) : filteredTransactionsList.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : (
          <div>
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="sticky top-0 bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">S. No.</th>
                  <th className="px-4 py-2 text-left">R. No.</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200"
                  >
                    <td className="px-4 py-2 border">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-4 py-2 border">
                      {transaction.registrationNumber || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {transaction.name || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {transaction.timestamp
                        ? new Date(transaction.timestamp.toDate()).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      Rs {transaction.amount || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {transaction.message || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
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
                    className={`px-3 py-1 rounded-md ${
                      currentPage === index + 1
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
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
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

export default Transactions;
