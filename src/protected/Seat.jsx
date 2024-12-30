import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import Loading from "../components/Loading";
function SeatingLayout() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const totalSeats = 125; // Define the total number of seats in your library
  const rowsPerColumn = 8; // Define how many rows per column

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "students"));
        const allStudents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(allStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const occupiedSeats = students.map((student) => parseInt(student.seatNo, 10)); // Ensure numbers are parsed

  // Generate seat numbers in a column-first layout
  const generateColumnFirstLayout = () => {
    const layout = [];
    const columns = Math.ceil(totalSeats / rowsPerColumn);

    for (let col = 0; col < columns; col++) {
      const columnSeats = [];
      for (let row = 0; row < rowsPerColumn; row++) {
        const seatNumber = col * rowsPerColumn + row + 1;
        if (seatNumber > totalSeats) break; // Prevent excess seat numbers
        columnSeats.push(seatNumber);
      }
      layout.push(columnSeats);
    }

    return layout;
  };

  const seatLayout = generateColumnFirstLayout();

  const getStudentDetails = (seatNumber) =>
    students.find((student) => parseInt(student.seatNo, 10) === seatNumber);

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Seating Layout</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex gap-4"> {/* Flex container for columns */}
          {seatLayout.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-2">
              {column.map((seatNumber) => {
                const student = getStudentDetails(seatNumber);
                const isOccupied = !!student;

                return (
                  <div
                    key={seatNumber}
                    className={`w-16 h-16 flex items-center justify-center rounded-md font-bold relative group ${
                      isOccupied ? "bg-red-500 text-white" : "bg-green-200 text-gray-700"
                    }`}
                  >
                    {seatNumber}
                    {/* Tooltip */}
                    {isOccupied && (
                      <div className="z-10 cursor-pointer min-w-24 hvoer:shadow-lg absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="font-semibold text-xl capitalize">{student.name}</p>
                        <p> {student.registrationNumber}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SeatingLayout;
