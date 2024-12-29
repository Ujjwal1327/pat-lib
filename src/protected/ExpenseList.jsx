import React, { useEffect, useState } from "react";
import { collection, getDocs , query, orderBy} from "firebase/firestore";
import { db } from "../Firebase";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Date filter state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch expenses from Firestore
  const fetchExpenses = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      // Query expenses in ascending order by date
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

  // Re-filter expenses whenever the date range changes
  useEffect(() => {
    filterExpensesByDate();
  }, [startDate, endDate]);

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
console.log(expenses)
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Expense List</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500 text-white text-center p-4 rounded-lg mb-4">
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
      {loading && <div className="text-center text-gray-500">Loading...</div>}

      {/* Expenses List */}
      {!loading && filteredExpenses.length === 0 && (
        <div className="text-center text-gray-500">No expenses found.</div>
      )}

      {!loading && filteredExpenses.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                {/* S. No. Column */}
                <th className="py-2 px-4">S. No.</th>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Payment Mode</th>
                <th className="py-2 px-4">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  {/* S. No. */}
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{expense.title}</td>
                  <td className="py-2 px-4"> ₹{expense.amount}</td>
                  <td className="py-2 px-4">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{expense.category}</td>
                  <td className="py-2 px-4">{expense.paymentMode}</td>
                  <td className="py-2 px-4">{expense.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Total Amount */}
      <div className="mt-4 text-right font-semibold text-lg">
        Total Amount:  ₹
        {isNaN(calculateTotalAmount()) ? "0.00" : calculateTotalAmount().toFixed(2)}
      </div>
    </div>
  );
};

export default ExpenseList;
