import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../Firebase";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 10; // Number of expenses per page

  // Date filter state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch expenses from Firestore
  const fetchExpenses = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const q = query(collection(db, "expenses"), orderBy("date", "desc")); // Use "desc" for reverse order
      const querySnapshot = await getDocs(q);
      const expensesData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Capture the document ID
        ...doc.data(), // Spread the document data
      }));

      setExpenses(expensesData);
      setFilteredExpenses(expensesData); // Initially, show all expenses
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError("Failed to fetch expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Filter expenses based on the selected date range
  const filterExpensesByDate = () => {
    if (!startDate || !endDate) {
      setFilteredExpenses(expenses); // Show all expenses if no date is selected
      return;
    }

    const filtered = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date); // Convert expense date to Date object
      return (
        expenseDate >= new Date(startDate) &&
        expenseDate <= new Date(endDate)
      );
    });

    setFilteredExpenses(filtered);
  };

  useEffect(() => {
    filterExpensesByDate();
  }, [startDate, endDate]);

  // Pagination logic to slice expenses for current page
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirstExpense, indexOfLastExpense);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredExpenses.length / expensesPerPage);

  // Calculate total amount of filtered expenses
  const calculateTotalAmount = () => {
    const total = filteredExpenses.reduce(
      (total, expense) => total + (parseFloat(expense.amount) || 0), // Ensure it's a number
      0
    );
    return total;
  };

  // Reset date filters
  const resetDateFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  // Handle page number click
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination button handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Expense List</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-300 text-white text-center p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Date Pickers */}
      <div className="flex items-end gap-4 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Start Date:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            End Date:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={resetDateFilters}
          className="px-4 py-2 bg-red-500 font-bold text-white rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* Loading State */}
      {loading && <div>Loading...</div>}

      {/* Expenses List */}
      {!loading && currentExpenses.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white shadow-md rounded-lg table-auto">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-lg">
              <tr>
                <th className="py-3 px-6">S. No.</th>
                <th className="py-3 px-6">Title</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Payment Mode</th>
                <th className="py-3 px-6">Description</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{expense.title}</td>
                  <td className="py-4 px-6">₹{expense.amount}</td>
                  <td className="py-4 px-6">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">{expense.category}</td>
                  <td className="py-4 px-6">{expense.paymentMode}</td>
                  <td className="py-4 px-6">{expense.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex mx-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-700 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      {/* Total Amount */}
      <div className="mt-4 text-right font-semibold text-lg">
        Total Amount: ₹
        {isNaN(calculateTotalAmount()) ? "0.00" : calculateTotalAmount().toFixed(2)}
      </div>
    </div>
  );
};

export default ExpenseList;
