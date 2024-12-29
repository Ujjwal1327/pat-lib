import { db } from "../Firebase"; // Adjust path as necessary
import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";

// Function to fetch today's visitor count
const fetchTodayVisitorsCount = async () => {
  const today = new Date();
  // Set the start and end of today
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  // Convert JavaScript dates to Firestore Timestamps
  const startTimestamp = Timestamp.fromDate(startOfDay);
  const endTimestamp = Timestamp.fromDate(endOfDay);

  const visitorsRef = collection(db, "visitors"); // Firestore collection name
  const q = query(
    visitorsRef,
    where("createdAt", ">=", startTimestamp),  // Use createdAt instead of timestamp
    where("createdAt", "<=", endTimestamp)    // Use createdAt instead of timestamp
  );

  try {
    const querySnapshot = await getDocs(q);
    console.log("%%%%%%%%%%%%%" , querySnapshot.size)
    return querySnapshot.size; // Return the number of documents (visitors)
  } catch (error) {
    console.error("Error getting today's visitors count: ", error);
    return 0; // Return 0 if there's an error
  }
};

export default fetchTodayVisitorsCount;
