import React, { useState, useEffect } from "react";
import { faArrowAltCircleDown, faDollarSign, faEye, faIndianRupee, faRupee, faRupeeSign, faRupiahSign, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import fetchTodayVisitorsCount from "../components/fetchTodayVisitorsCount"; // Adjust the path as necessary
import fetchTotalDues from "../components/fetchTotalDues";
import { fetchCurrentMonthIncome } from "../components/fetchCurrentMonthIncome";
import { fetchCurrentMonthExpenses } from "../components/fetchCurrentMonthExpenses";
import { fetchLatestStudents } from "../components/fetchLatestStudents";

const AdminDashboard = () => {
  const [todayVisitors, setTodayVisitors] = useState(0); // State to store today's visitors count
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [totalDues, setTotalDues] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [students, setStudents] = useState([])
  // Fetch today's visitor count on component mount
  useEffect(() => {
    const getVisitorCount = async () => {
      const count = await fetchTodayVisitorsCount();
      setTodayVisitors(count);
      setLoading(false); // Set loading to false after fetching data
    };

    getVisitorCount();
  }, []);
  // sum of all dues
  useEffect(() => {
    const getTotalDues = async () => {
      const dues = await fetchTotalDues();
      setTotalDues(dues);
    };

    getTotalDues();
  }, []);

  //sum of all profit this month
  useEffect(() => {
    const getIncome = async () => {
      const total = await fetchCurrentMonthIncome();
      setTotalIncome(total);
    };

    getIncome();
  }, []);

  //sum of all expenses this month
  useEffect(() => {
    const getExpenses = async () => {
      const total = await fetchCurrentMonthExpenses();
      setTotalExpense(total);
    };

    getExpenses();
  }, []);

  //get 5 latest students 
  useEffect(() => {
    const getStudents = async () => {
      const ss = await fetchLatestStudents();
      setStudents(ss);
    };

    getStudents();
  }, []);
  console.log(students)
return (
  <div className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-50 p-5 flex flex-col gap-10">
    {/* Cards Section */}
    <div id="card-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link to="enquiries" className="flex-1">
        <div id="card" className="shadow-lg transition-all hover:-translate-y-1 p-6 rounded-2xl flex items-center gap-6 bg-gradient-to-r from-blue-100 to-blue-50">
          <div className="flex flex-1 flex-col">
            <span className="text-4xl text-blue-700 font-semibold">{loading ? "Loading..." : todayVisitors}</span>
            <span className="text-lg md:text-xl text-gray-700 font-bold">Today's Visitors</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faEye} className="text-5xl text-blue-600" />
          </div>
        </div>
      </Link>

      <Link to="enquiries" className="flex-1">
        <div id="card" className="shadow-lg transition-all hover:-translate-y-1 p-6 rounded-2xl flex items-center gap-6 bg-gradient-to-r from-red-100 to-red-50">
          <div className="flex flex-1 flex-col">
            <span className="text-4xl text-red-700">₹ {totalDues}</span>
            <span className="text-lg md:text-xl text-gray-700 font-bold">Total Dues</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faSkullCrossbones} className="text-5xl text-red-600" />
          </div>
        </div>
      </Link>

      <Link to="enquiries" className="flex-1">
        <div id="card" className="shadow-lg transition-all hover:-translate-y-1 p-6 rounded-2xl flex items-center gap-6 bg-gradient-to-r from-green-100 to-green-50">
          <div className="flex flex-1 flex-col">
            <span className="text-4xl text-green-700 font-semibold">₹ {totalIncome}</span>
            <span className="text-lg md:text-xl text-gray-700 font-bold">Profit This Month</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faIndianRupee} className="text-5xl text-green-600" />
          </div>
        </div>
      </Link>

      <Link to="enquiries" className="flex-1">
        <div id="card" className="shadow-lg transition-all hover:-translate-y-1 p-6 rounded-2xl flex items-center gap-6 bg-gradient-to-r from-yellow-100 to-yellow-50">
          <div className="flex flex-1 flex-col">
            <span className="text-4xl text-yellow-700">₹ {totalExpense}</span>
            <span className="text-lg md:text-xl text-gray-700 font-bold">Expenditure</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faArrowAltCircleDown} className="text-5xl text-yellow-600" />
          </div>
        </div>
      </Link>
    </div>

    {/* Main Content */}
    <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
      {/* Left Container */}
      <div className="w-full lg:w-3/5 bg-white shadow-lg rounded-lg py-6 px-3">
        <div className="flex items-center justify-between mb-6">
          <p className="text-blue-700 font-bold text-lg sm:text-2xl">Recent Admission</p>
          <Link to="students/overview" className="text-white text-sm sm:text-lg px-4 py-2 bg-blue-700 hover:bg-blue-600 transition rounded-lg">
            More
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Amount</th>
                <th className="px-4 py-3 text-left font-semibold">Mode</th>
                <th className="px-4 py-3 text-left font-semibold">Shift</th>
                <th className="px-4 py-3 text-left font-semibold">Dues</th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-100 transition duration-200">
                  <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{item.name}</td>
                  <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{item.payment.amount}</td>
                  <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{item.payment.mode}</td>
                  <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{item.shifts.join(", ")}</td>
                  <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{item.payment.dues}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Container */}
      <div id="right" className="w-full lg:w-2/5 bg-white shadow-lg rounded-lg py-6 px-3 max-h-[400px] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <p className="text-blue-700 font-bold text-lg sm:text-2xl">Latest Visitors</p>
          <Link to="visitors/overview" className="text-white text-sm sm:text-lg px-4 py-2 bg-blue-700 hover:bg-blue-600 transition rounded-lg">
            More
          </Link>
        </div>

        <table className="min-w-96 w-full bg-white border border-gray-300">
          <thead>
            <tr className="flex items-center justify-between text-lg gap-4 px-3 bg-gray-100 border-b border-gray-400">
              <th className="w-[50%] text-left font-semibold">Name</th>
              <th className="w-[50%] text-left font-semibold">Number</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <tr
                key={index}
                className="flex items-center justify-between gap-4 border-b py-3 px-3 text-gray-600 hover:bg-blue-700 hover:text-white transition border-gray-300"
              >
                <td className="w-[50%] text-left font-medium">Visitor {index + 1}</td>
                <td className="w-[50%] text-left font-medium">+91 987654321{index}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

};

export default AdminDashboard;
