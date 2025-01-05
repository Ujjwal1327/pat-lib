
import React, { useState, useEffect } from "react";
import { storage, db } from "../Firebase"; // Import Firebase config
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { query, serverTimestamp, where } from "firebase/firestore"; // Import serverTimestamp
import Alert from "../components/Alert";
import { collection, addDoc, getDocs } from "firebase/firestore";
import PageTitle from "../components/PageTitle";

const AddStudent = () => {
  const [shifts, setShifts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [studentData, setStudentData] = useState({
    name: "",
    mobile: "",
    address: "",
    seatNo: "",
    aadhaar: "",
    shifts: [], // Array to store selected shifts
    payment: {
      amount: "",
      dues: 0, // Initialize dues with 0
      mode: "",
      dateOfPayment: "",
      eligibleTill: "",
    },
    dateOfJoining: "",
    history: [], // Empty initially, will store shift and payment history
  });


  const [files, setFiles] = useState({
    photo: null,

  });

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("payment.")) {
      const field = name.split(".")[1];
      setStudentData((prev) => ({
        ...prev,
        payment: { ...prev.payment, [field]: value },
      }));
    } else {
      setStudentData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
  };

  // Handle shift checkbox change
  const handleShiftChange = (e) => {
    const { value, checked } = e.target;
    setStudentData((prev) => {
      const updatedShifts = checked
        ? [...prev.shifts, value] // Add the shift if checked
        : prev.shifts.filter((shift) => shift !== value); // Remove the shift if unchecked
      return { ...prev, shifts: updatedShifts };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validate form inputs
    const error = validateForm()
    if (error) {
      setAlert({ type: "error", message: error });
      setLoading(false);
      setTimeout(() => setAlert(null), 2500);
      return;
    }

    const runningShiftStatus = studentData.shifts.map((item) => ({
      shiftName: item,
      eligibleTill: studentData.payment.eligibleTill,
    }));

    try {
      // Check if the student is already registered using the mobile number
      const studentRef = collection(db, "students");
      const querySnapshot = await getDocs(
        query(studentRef, where("mobile", "==", studentData.mobile))
      );

      if (!querySnapshot.empty) {
        const registeredStudent = querySnapshot.docs[0].data(); // Get the first matching document
        const registrationNumber = registeredStudent.registrationNumber;

        setAlert({
          type: "error",
          message: `A student with this mobile number is already registered. Registration Number: ${registrationNumber}`,
        });
        setLoading(false);
        return;
      }

      // Upload photo and add data to Firestore
      const photoUrl = await uploadFileToStorage(files.photo, "photos");
      const studentId = `STU${Date.now()}`;
    

      const finalData = {
        studentId,
        registrationNumber,
        ...studentData, // Spread the remaining properties of studentData
        name: studentData.name.toLowerCase(),  // Convert the name to lowercase here
        documents: { photo: photoUrl },
        history: [
          {
            shifts: studentData.shifts,
            payment: studentData.payment,
          },
        ],
        runningShiftStatus,
      };
      

      const incomeRef = collection(db, "income");
      const transactionRef = collection(db, "transactions");

      await Promise.all([
        addDoc(studentRef, finalData),
        addDoc(incomeRef, {
          name: studentData.name,
          registrationNumber,
          date: new Date().toISOString(),
          amountPaid: studentData.payment.amount,
          mobile: studentData.mobile || "N/A",
          message: `New Admission for ${studentData.shifts.join(", ")}`,
          timestamp: serverTimestamp(),
        }),
        addDoc(transactionRef, {
          name: studentData.name,
          timestamp: serverTimestamp(),
          amount: Number(studentData.payment.amount),
          message: `Received amount ${studentData.payment.amount} for new admission of ${studentData.name}`,
          type: "profit",
        }),
      ]);

      fetchStudentCount();
      setAlert({ type: "success", message: "Data added successfully!" });
      resetForm(e);
    } catch (error) {
      console.error("Error during submission:", error);
      setAlert({
        type: "error",
        message: "Failed to submit data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };



  const resetForm = (e) => {
    setStudentData({
      name: "",
      shifts: [],
      payment: {
        amount: "",
        dateOfPayment: "",
        eligibleTill: "",
        dues: "",
      },
      mobile: "",
    });
    setFiles({ photo: null });
    if (e && e.target) e.target.reset();
  };



  //form validation
  const validateForm = () => {
    const errors = {};

    if (!studentData.name) return "Student name is required.";
    if (!studentData.mobile) return "Mobile number is required.";
    if (!/^\d{10}$/.test(studentData.mobile)) return "Mobile number must be 10 digits.";
    if (!studentData.address) return 'Please enter Address';
    if (!studentData.seatNo) return 'Please enter seat Number or either 0';
    if (studentData.shifts.length == 0) return 'Please Choose any shift.';
    if (!studentData.payment.mode) {
      return "Payment select mode of Payment";
    }
    if (!studentData.payment.amount) {
      return "Please enter amount of payment";
    }
    if (!studentData.payment.amount || studentData.payment.amount < 0) {
      return "Payment amount must be greater than 0.";
    }
    if (studentData.payment.dues && studentData.payment.dues < 0) {
      return "Dues must be less than the total payment amount.";
    }
    if (!studentData.payment.dateOfPayment) return "Payment date is required.";
    if (!studentData.dateOfJoining) return "Date Of Joining is required.";
    if (!studentData.payment.eligibleTill) return "Eligible till date is required.";
    if (new Date(studentData.payment.eligibleTill) <= new Date(studentData.payment.dateOfPayment)) {
      return "Eligible till date must be after the payment date.";
    }
    if (!files.photo) return "Photo is required.";
  };



  // Upload a file to Firebase Storage
  const uploadFileToStorage = async (file, folder) => {
    if (!file) return null;

    // Create a reference to the storage location
    const fileRef = ref(storage, `${folder}/${file.name}-${Date.now()}`);

    // Upload the file to Firebase Storage
    await uploadBytes(fileRef, file);

    // Get the download URL of the uploaded file
    const fileUrl = await getDownloadURL(fileRef);

    return fileUrl;
  };
  // Fetch shifts from Firestore on component mount
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'shifts'));
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
  //count student for registration number.
  const fetchStudentCount = async () => {
    try {
      const studentRef = collection(db, "students");
      const querySnapshot = await getDocs(studentRef);

      // Check if the collection is empty
      if (querySnapshot.empty) {
        setRegistrationNumber("Reg-1"); // If no students, start with Reg-1
      } else {
        const count = querySnapshot.size;
        setRegistrationNumber(`Reg-${count + 1}`); // Increment based on current count
      }
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };
  useEffect(() => {
    fetchStudentCount();
  }, []);
  const closeAlert = () => {
    setAlert(null);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[90%] p-4 mx-auto my-10">
      <PageTitle title="Add student" />
      {alert && <Alert
        type={alert.type}
        message={alert.message}
        onClose={closeAlert}
      />}
      <h2 className="text-2xl font-medium text-gray-600">Basic Details</h2>
      {/* Text Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={studentData.name}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="registrationNumber"
          value={registrationNumber}
          disabled
          placeholder="Registration Number"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="mobile"
          placeholder="Whatsapp Number"
          value={studentData.mobile}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="aadhaar"
          placeholder="Aadhaar Number"
          value={studentData.aadhaar}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={studentData.address}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="seatNo"
          placeholder="Seat No."
          value={studentData.seatNo}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Shift & Payment Details */}
      <h2 className="text-lg font-medium text-gray-600">Shift & Payment Details</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Checkbox for selecting multiple shifts */}
        <div>
          <h3 className="text-gray-700 mb-2">Select Shifts</h3>
          {shifts.map((shift) => (
            <div key={shift.name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={shift.name}
                checked={studentData.shifts.includes(shift.name)}
                onChange={handleShiftChange}
                className="form-checkbox"
              />
              <label>{shift.name}</label>
            </div>
          ))}
        </div>
        <select
          name="payment.mode"
          value={studentData.payment.mode}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Payment Mode</option>
          <option value="Cash">Cash</option>
          <option value="Paytm">Paytm</option>
          <option value="PhonePe">PhonePe</option>
          <option value="GPay">GPay</option>
          <option value="Online-Others">Online-Others</option>
        </select>
        <input
          type="number"
          name="payment.amount"
          placeholder="Payment Amount"
          value={studentData.payment.amount}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="payment.dues"
          placeholder="Dues"
          value={studentData.payment.dues}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div>
          <p className="text-gray-700 mb-1">Date of payment:</p>
          <input
            type="date"
            name="payment.dateOfPayment"
            value={studentData.payment.dateOfPayment}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <p className="text-gray-700 mb-1">Date of Joining:</p>
          <input
            type="date"
            name="dateOfJoining"
            value={studentData.dateOfJoining}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <p className="text-gray-700 mb-1">Date of Expiration:</p>
          <input
            type="date"
            name="payment.eligibleTill"
            value={studentData.payment.eligibleTill}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* File Uploads */}
      <h2 className="text-lg font-medium text-gray-600">Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-gray-700">Upload Photo:</span>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="mt-1 text-gray-700"
          />
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full focus:outline-none"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AddStudent;
