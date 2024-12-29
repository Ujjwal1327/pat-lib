import { db } from "../Firebase"; // Adjust path as necessary
import { collection, getDocs } from "firebase/firestore";

const fetchTotalDues = async () => {
  const studentsRef = collection(db, "students"); // Firestore collection name

  try {
    const querySnapshot = await getDocs(studentsRef);
    let totalDues = 0;

    querySnapshot.forEach((doc) => {
      // Extract the dues from the payment object and convert it to a number
      const dues = doc.data().payment.dues;
      if (dues) {
        totalDues += parseFloat(dues); // Convert string to float and sum it
      }
    });

    console.log("Total Dues: ", totalDues);
    return totalDues; // Return the total dues value
  } catch (error) {
    console.error("Error fetching total dues: ", error);
    return 0; // Return 0 if there's an error
  }
};

export default fetchTotalDues;
