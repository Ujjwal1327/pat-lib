import { db } from "../Firebase"; // Adjust the path as necessary
import { collection, getDocs } from "firebase/firestore";

export const fetchCurrentMonthIncome = async () => {
    const incomeRef = collection(db, "income"); // Firestore collection name
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // Note: Month is 0-indexed (0 = January)

    try {
        const querySnapshot = await getDocs(incomeRef);
        let totalIncome = 0;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const { timestamp, amountPaid } = data;

            if (timestamp && amountPaid) {
                // Convert Firestore timestamp to a JavaScript Date
                const incomeDate = new Date(timestamp.seconds * 1000);

                // Check if the income date is in the current month and year
                if (
                    incomeDate.getFullYear() === currentYear &&
                    incomeDate.getMonth() === currentMonth
                ) {
                    totalIncome += parseFloat(amountPaid); // Convert string to float and add
                }
            }
        });

        return totalIncome; // Return the total income value
    } catch (error) {
        console.error("Error fetching current month's income: ", error);
        return 0; // Return 0 if there's an error
    }
};

