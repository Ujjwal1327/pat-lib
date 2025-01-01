import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase";
import Alert from "../components/Alert";

const AddExpense = () => {
    const [expenseData, setExpenseData] = useState({
        title: "",
        amount: "",
        date: "",
        category: "",
        paymentMode: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseData((prevData) => ({
            ...prevData,
            [name]: value.trimStart(), // Prevents leading spaces
        }));
    };
    const closeAlert = () => {
        setAlert(null);
    };
    // Enhanced Validation Function
    const validateForm = () => {
        const { title, amount, date, category, paymentMode, description } = expenseData;
        if (!title) return "Expense Title is required.";
        if (title.length < 3) return "Expense Title must be at least 3 characters long.";

        if (!amount) return "Amount is required.";
        if (isNaN(amount) || Number(amount) <= 0)
            return "Amount should be a positive number.";
        if (!date) return "Date is required.";
        const currentDate = new Date().toISOString().split("T")[0];
        if (date > currentDate) return "Date cannot be in the future.";
        if (!category) return "Please select a category.";
        if (!paymentMode) return "Please select a payment mode.";

        if (!description) return "Description is required.";
        if (description.length < 10) return "Description must be at least 10 characters long.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate form inputs
        const error = validateForm();
        if (error) {
            setAlert({ type: "error", message: error });
            setLoading(false);
            setTimeout(() => setAlert(null), 2500);
            return;
        }

        // Add expense to Firestore
        try {
            await addDoc(collection(db, "expenses"), expenseData);

            setAlert({ type: "success", message: "Expense added successfully!" });

            // Reset form
            setExpenseData({
                title: "",
                amount: "",
                date: "",
                category: "",
                paymentMode: "",
                description: "",
            });
        } catch (error) {
            console.error("Error adding expense: ", error);
            setAlert({ type: "error", message: "Failed to add expense. Please try again." });
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }


        setTimeout(() => setAlert(null), 1500);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">

            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Add Expense
                </h1>

                {/* Alert Box */}
                {alert && <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={closeAlert}
                />}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Expense Title */}
                        <div className="form-group">
                            <label className="text-gray-700 font-medium">Expense Title</label>
                            <input
                                type="text"
                                name="title"
                                value={expenseData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                                placeholder="Enter expense title"
                            />
                        </div>

                        {/* Expense Amount */}
                        <div className="form-group">
                            <label className="text-gray-700 font-medium">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={expenseData.amount}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                                placeholder="Enter amount"
                            />
                        </div>

                        {/* Expense Date */}
                        <div className="form-group">
                            <label className="text-gray-700 font-medium">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={expenseData.date}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>

                        {/* Expense Category */}
                        <div className="form-group">
                            <label className="text-gray-700 font-medium">Category</label>
                            <select
                                name="category"
                                value={expenseData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                <option value="">Select category</option>
                                <option value="Office Supplies">Office Supplies</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        {/* Payment Mode */}
                        <div className="form-group">
                            <label className="text-gray-700 font-medium">Payment Mode</label>
                            <select
                                name="paymentMode"
                                value={expenseData.paymentMode}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                <option value="">Select payment mode</option>
                                <option value="Cash">Cash</option>
                                <option value="Paytm">Paytm</option>
                                <option value="PhonePe">PhonePe</option>
                                <option value="GPay">GPay</option>
                                <option value="Online-Others">Online-Others</option>
                                <option value="Card">Card</option>
                            </select>
                        </div>

                        {/* Expense Description */}
                        <div className="form-group">
                            <label className="text-gray-700 font-medium">Description</label>
                            <textarea
                                name="description"
                                value={expenseData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
                                placeholder="Enter a short description"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-700 w-full py-2 rounded-md text-white text-xl mt-5 hover:bg-blue-500 hover:shadow-lg transition duration-300 flex items-center justify-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 200 200"
                                        className="w-6 h-6 animate-spin"
                                    >
                                        <circle
                                            fill="white"
                                            stroke="white"
                                            strokeWidth="15"
                                            r="15"
                                            cx="40"
                                            cy="65"
                                        >
                                            <animate
                                                attributeName="cy"
                                                calcMode="spline"
                                                dur="2"
                                                values="65;135;65;"
                                                keySplines=".5 0 .5 1;.5 0 .5 1"
                                                repeatCount="indefinite"
                                                begin="-.4"
                                            />
                                        </circle>
                                    </svg>
                                ) : (
                                    "Add Expense"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
