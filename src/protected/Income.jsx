import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../Firebase"; // Ensure Firebase is configured correctly

const Income = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching income data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <div className="max-w-full mx-auto overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Income Records</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading income records...</p>
        ) : incomeList.length === 0 ? (
          <p className="text-center text-gray-500">No income records found.</p>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">S. No.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Amount Paid</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Mobile</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {incomeList.map((income, index) => (
                <tr key={income.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{income.name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {income.timestamp
                      ? new Date(income.timestamp.toDate()).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">Rs {income.amountPaid || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{income.mobile || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{income.message || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Income;
