import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import fetchTodayVisitorsCount from "../components/fetchTodayVisitorsCount";
import fetchTotalDues from "../components/fetchTotalDues";
import { fetchCurrentMonthIncome } from "../components/fetchCurrentMonthIncome";
import { fetchCurrentMonthExpenses } from "../components/fetchCurrentMonthExpenses";
import { fetchLatestStudents } from "../components/fetchLatestStudents";
import CardComponent from "../components/CardComponent";
import StudentTableComponent from "../components/StudentTableComponent";
import { faArrowAltCircleDown, faEye, faIndianRupee, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalDues, setTotalDues] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [students, setStudents] = useState([]);
  const [visitors] = useState([...Array(10)]); // Simulated visitors data

  useEffect(() => {
    const fetchData = async () => {
      const visitorCount = await fetchTodayVisitorsCount();
      setTodayVisitors(visitorCount);
      const dues = await fetchTotalDues();
      setTotalDues(dues);
      const income = await fetchCurrentMonthIncome();
      setTotalIncome(income);
      const expense = await fetchCurrentMonthExpenses();
      setTotalExpense(expense);
      const latestStudents = await fetchLatestStudents();
      setStudents(latestStudents);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-50 p-5 flex flex-col gap-10">
      {/* Cards Section */}
      <div id="card-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardComponent
          title="Today's Visitors"
          amount={loading ? "Loading..." : todayVisitors}
          icon={faEye}
          link="enquiries"
          bgColor="bg-gradient-to-r from-blue-100 to-blue-50"
          textColor="text-blue-700"
        />

        <CardComponent
          title="Total Dues"
          amount={loading ? "Loading..." : totalDues}
          icon={faSkullCrossbones}
          link="enquiries"
          bgColor="bg-gradient-to-r from-red-100 to-red-50"
          textColor="text-red-700"
        />
        <CardComponent
          title="Profit This Month"
          amount={loading ? "Loading..." : totalIncome}
          icon={faIndianRupee}
          link="enquiries"
          bgColor="bg-gradient-to-r from-green-100 to-green-50"
          textColor="text-green-700"
        />
        <CardComponent
          title="Expenditure"
          amount={loading ? "Loading..." : totalExpense}
          icon={faArrowAltCircleDown}
          link="enquiries"
          bgColor="bg-gradient-to-r from-yellow-100 to-yellow-50"
          textColor="text-yellow-700"
        />
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
          <StudentTableComponent students={students} loading={loading} />
        </div>

        {/* Right Container */}
        <div id="right" className="w-full lg:w-2/5 bg-white shadow-lg rounded-lg py-6 px-3 max-h-[400px] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-blue-700 font-bold text-lg sm:text-2xl">Latest Visitors</p>
            <Link to="visitors/overview" className="text-white text-sm sm:text-lg px-4 py-2 bg-blue-700 hover:bg-blue-600 transition rounded-lg">
              More
            </Link>
          </div>
          {/*<VisitorTableComponent visitors={visitors} /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
