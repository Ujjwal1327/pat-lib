import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { collection, getDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

const Enquiries = () => {
  const [enq, setEnq] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredEnq, setFilteredEnq] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(""); // Month filter state

  useEffect(() => {
    const fetchEnq = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'visitors'));
        const visitorsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEnq(visitorsData);
        setFilteredEnq(visitorsData); // Initialize with all data
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnq();
  }, []);

  useEffect(() => {
    // Filter the data whenever the month changes
    let filteredData = [...enq];

    if (selectedMonth) {
      filteredData = filteredData.filter((enquiry) => {
        const enquiryMonth = new Date(enquiry.date).getMonth() + 1; // Get the month (1-12)
        return enquiryMonth === parseInt(selectedMonth);
      });
    }

    setFilteredEnq(filteredData);
  }, [selectedMonth, enq]);

  const handleReminderClick = async (id, mobile) => {
    console.log(`Reminder button clicked for enquiry ID: ${id}`);
    try {
      const enquiryRef = doc(db, "visitors", id);
      const enquiryDoc = await getDoc(enquiryRef);

      if (enquiryDoc.exists()) {
        const currentReminderCount = enquiryDoc.data().reminder || 0;
        const newReminderCount = currentReminderCount + 1;
        await updateDoc(enquiryRef, { reminder: newReminderCount });

        setEnq((prevEnq) =>
          prevEnq.map((enquiry) =>
            enquiry.id === id ? { ...enquiry, reminder: newReminderCount } : enquiry
          )
        );

        const message = `hello , You have visited to library on ${enquiryDoc.data().date} , kindly took admission you got 10% discount offer. `;
        const whatsappLink = `https://api.whatsapp.com/send/?phone=${mobile}&text=${message}`;
        window.open(whatsappLink, "_blank");
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <PageTitle title="enquiries" />
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Enquiries</h1>

      {/* Filter Section */}
      <div className="mb-4">
        <div className="flex gap-4">
          {/* Month Filter */}
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {[...Array(12)].map((_, index) => (
              <option key={index} value={index + 1}>
                {new Date(0, index).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-center">No. of Reminders</th>
            </tr>
          </thead>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="flex flex-col items-center">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <p className="text-lg text-gray-600 mt-4">Fetching data, please wait...</p>
              </div>
            </div>
          ) : (
            // Render table rows when loading is complete
            <tbody>
              {filteredEnq.length > 0 ? (
                filteredEnq.map((enquiry, index) => (
                  <tr key={enquiry.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{enquiry.name}</td>
                    <td className="px-4 py-2">{enquiry.number}</td>
                    <td className="px-4 py-2">{enquiry.address}</td>
                    <td className="px-4 py-2">{enquiry.date}</td>
                    <td className="px-4 py-2">{enquiry.time}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                        onClick={() => handleReminderClick(enquiry.id, enquiry.number)}
                      >
                        Remind-{enquiry.reminder}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center px-4 py-6 text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          )}

        </table>
      </div>
    </div>
  );
};

export default Enquiries;
