import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase";

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
    const [alert, setAlert] = useState(null); // Alert state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate all fields are filled
        const { title, amount, date, category, paymentMode, description } =
            expenseData;

        if (
            !title.trim() ||
            !amount.trim() ||
            !date.trim() ||
            !category.trim() ||
            !paymentMode.trim() ||
            !description.trim()
        ) {
            setAlert({
                type: "error",
                message: "Please fill out all fields before submitting.",
            });

            setLoading(false); // Reset loading state
            // Clear alert after 3 seconds
            setTimeout(() => {
                setAlert(null);
            }, 1500);
            return;

        }

        try {
            // Add data to Firestore
            await addDoc(collection(db, "expenses"), expenseData);

            // Show success alert
            setAlert({
                type: "success",
                message: "Expense added successfully!",
            });

            // Reset form fields
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

            // Show error alert
            setAlert({
                type: "error",
                message: "Failed to add expense. Please try again.",
            });
        } finally {
            setLoading(false);


        }
             // Clear alert after 3 seconds
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen relative">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Add Expense</h1>

            {/* Alert Box */}
            {alert && (
                <div
                    className={`fixed top-20 left-1/2 -translate-x-1/2 sm:right-0 m-2 mx-auto text-center w-[90%] md:w-1/2 py-5 mb-4 text-white ${alert.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {alert.message}

                    {/* Shrinking Bar */}
                    <div className="h-1 bg-white absolute bottom-0 left-0 animate-shrinkBar"></div>
                </div>
            )}

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="max-w-full bg-white shadow-md rounded-lg p-6"
            >
                {/* Expense Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Expense Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={expenseData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter expense title"
                    />
                </div>

                {/* Expense Amount */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={expenseData.amount}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter amount"
                    />
                </div>

                {/* Expense Date */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={expenseData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Expense Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Category
                    </label>
                    <select
                        name="category"
                        value={expenseData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="">Select category</option>
                        <option value="Office Supplies">Office Supplies</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {/* Payment Mode */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Payment Mode
                    </label>
                    <select
                        name="paymentMode"
                        value={expenseData.paymentMode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={expenseData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter a short description"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white font-bold rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
                        }`}
                    disabled={loading}
                >
                    {loading ? "Adding Expense..." : "Add Expense"}
                </button>
            </form>
        </div>
    );
};

export default AddExpense;
