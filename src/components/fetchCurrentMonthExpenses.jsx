import { db } from "../Firebase"; // Adjust the path as necessary
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const fetchCurrentMonthExpenses = async () => {
  const expensesRef = collection(db, "expenses"); // Firestore collection name
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Note: Month is 0-indexed (0 = January)

  try {
    const querySnapshot = await getDocs(expensesRef);
    let totalExpense = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const { date, amount } = data;

      if (date && amount) {
        // Parse the date field into a JavaScript Date object
        const expenseDate = new Date(date);

        // Check if the expense date is in the current month and year
        if (
          expenseDate.getFullYear() === currentYear &&
          expenseDate.getMonth() === currentMonth
        ) {
          totalExpense += parseFloat(amount); // Convert string to float and add
        }
      }
    });

    console.log("Total Expense for Current Month: ", totalExpense);
    return totalExpense; // Return the total expense value
  } catch (error) {
    console.error("Error fetching current month's expenses: ", error);
    return 0; // Return 0 if there's an error
  }
};


