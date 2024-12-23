import React, { useState, useEffect } from 'react';
import { db } from '../Firebase.js'; // Import Firebase configuration
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { Helmet } from 'react-helmet';



const ManageShifts = () => {
  const [shiftName, setShiftName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state to manage button disable
  const [alert, setAlert] = useState(null); // State for alert message

  // Firebase collection reference
  const shiftsCollectionRef = collection(db, 'shifts');

  // Fetch shifts from Firestore on component mount
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const querySnapshot = await getDocs(shiftsCollectionRef);
        const shiftsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setShifts(shiftsData);
      } catch (error) {
        console.error("Error fetching shifts: ", error);
      }
    };
    fetchShifts();
  }, []);

  // Handle adding a new shift
  const handleAddShift = async () => {
    if (shiftName && startTime && endTime) {
      setLoading(true); // Set loading to true before starting async operation
      try {
        const newShift = {
          name: shiftName,
          startTime: startTime,
          endTime: endTime
        };
        // Add shift to Firestore
        const docRef = await addDoc(shiftsCollectionRef, newShift);
        setShifts([...shifts, { id: docRef.id, ...newShift }]);
        setShiftName('');
        setStartTime('');
        setEndTime('');
        setAlert({
          type: 'success',
          message: 'Shift added successfully!'
        });
      } catch (error) {
        console.error("Error adding shift: ", error);
        setAlert({
          type: 'error',
          message: 'Error adding shift. Please try again.'
        });
      } finally {
        setLoading(false); // Set loading to false once the async operation is finished
      }

      // Hide alert after 5 seconds
      setTimeout(() => setAlert(null), 2000);
    } else {
      setAlert({
        type: 'error',
        message: 'Please fill in all fields.'
      });
      setTimeout(() => setAlert(null), 2000);
    }
  };

  // Handle deleting a shift
  const handleDeleteShift = async (id) => {
    try {
      await deleteDoc(doc(db, 'shifts', id)); // Delete shift from Firestore
      setShifts(shifts.filter(shift => shift.id !== id));
      setAlert({
        type: 'success',
        message: 'Shift deleted successfully!'
      });
    } catch (error) {
      console.error("Error deleting shift: ", error);
      setAlert({
        type: 'error',
        message: 'Error deleting shift. Please try again.'
      });
    }
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Patna library - Shift</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Manage Shifts</h2>

      {/* Custom Alert */}
      {alert && (
        <div
          className={`fixed top-20 right-5 sm:right-10 m-2 mx-auto w-[80%] sm:w-fit text-center p-2 mb-4 rounded-2xl text-white ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
        >
          {alert.message}
        </div>
      )} 

      <div className='flex gap-10 flex-col md:flex-row w-full'>
        {/* Shift Form */}
        <div className="flex-1 w-full space-y-6 max-w-md mx-auto">
          <div>
            <label className="block text-lg font-medium text-gray-700">Shift Name</label>
            <input
              type="text"
              value={shiftName}
              onChange={(e) => setShiftName(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Morning, Evening"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleAddShift}
            className="w-full p-4 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} // Disable the button if loading is true
          >
            {loading ? 'Adding...' : 'Add Shift'}
          </button>
        </div>
        {/* Display Current Shifts */}
        <div className=" flex-1 mt-10 max-w-md mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800">Current Shifts</h3>
          <table className="min-w-full mt-6 table-auto border-collapse shadow-md">
            <thead>
              <tr>
                <th className="border-b p-3 text-left text-lg font-medium text-gray-700">Shift Name</th>
                <th className="border-b p-3 text-left text-lg font-medium text-gray-700">Start Time</th>
                <th className="border-b p-3 text-left text-lg font-medium text-gray-700">End Time</th>
                <th className="border-b p-3 text-left text-lg font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-gray-50">
                  <td className="border-b p-3">{shift.name}</td>
                  <td className="border-b p-3">{shift.startTime}</td>
                  <td className="border-b p-3">{shift.endTime}</td>
                  <td className="border-b p-3">
                    <button
                      onClick={() => handleDeleteShift(shift.id)}
                      className="text-red-600 hover:text-red-800 font-semibold focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
};

export default ManageShifts;
