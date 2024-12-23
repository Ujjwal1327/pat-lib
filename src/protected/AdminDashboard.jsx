import { faArrowAltCircleDown, faDollarSign, faEye, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownUpAcrossLine } from "@fortawesome/free-solid-svg-icons/faArrowDownUpAcrossLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

    return (
        <div className="min-h-screen bg-slate-100 p-5 flex flex-col gap-10 ">
            <div id="card-container" className="flex flex-row flex-wrap items-center justify-between gap-3">
                <Link to="enquiries" className="flex-1">
                    <div id="card" className="shadow-lg transition-all hover:-translate-y-1 p-6 flex-1  rounded-2xl flex items-center gap-6 bg-white">
                        <div class="flex flex-1 flex-col">
                            <span className="text-4xl text-blue-600 font-semibold">1,500</span>
                            <span className="text-xl text-gray-600 font-bold">Daily visitors</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faEye} className="text-5xl text-gray-600" />
                        </div>
                    </div>
                </Link>
                <Link to="enquiries" className="flex-1">
                    <div id="card" className="shadow-lg transition-all hover:-translate-y-1 p-6 flex-1  rounded-2xl flex items-center gap-6 bg-white">
                        <div class="flex flex-1 flex-col">
                            <span className="text-4xl text-red-600">1,500</span>
                            <span className="text-xl text-gray-600 font-bold">Total Dues</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSkullCrossbones} className="text-5xl text-gray-600" />
                        </div>
                    </div>
                </Link>
                <Link to="enquiries" className="flex-1">
                    <div id="card" className="shadow-lg transition-all hover:-translate-y-1 p-6 flex-1  rounded-2xl flex items-center gap-6 bg-white">
                        <div class="flex flex-1 flex-col">
                            <span className="text-4xl text-blue-600 font-semibold">1,500</span>
                            <span className="text-xl text-gray-600 font-bold">Profit</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faDollarSign} className="text-5xl text-gray-600" />
                        </div>
                    </div>
                </Link>
                <Link to="enquiries" className="flex-1">
                    <div id="card" className="shadow-lg transition-all hover:-translate-y-1 p-6 flex-1  rounded-2xl flex items-center gap-6 bg-white">
                        <div class="flex flex-1 flex-col">
                            <span className="text-4xl text-red-600">1,500</span>
                            <span className="text-xl text-gray-600 font-bold">Expenditure</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faArrowAltCircleDown} className="text-5xl text-gray-600" />
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-5 overflow-y-auto">
  {/* Left Container */}
  <div className="w-full sm:w-3/5 overflow-y-auto bg-white shadow-lg rounded-lg py-6 px-3">
    <div className="flex items-center justify-between mb-10 sm:mb-20">
      <p className="text-blue-700 font-bold text-lg sm:text-2xl">Recent Admission</p>
      <Link to="students/overview" className="text-white text-lg px-2 p-1 bg-blue-700 rounded-lg">
        More
      </Link>
    </div>

    <table id="left" className="min-w-96 w-full rounded-lg bg-white overflow-y-auto border border-gray-300">
      <thead>
        <tr className="flex items-center justify-between text-xl gap-4 px-3 mx-3 bg-gray-100 border-b border-gray-400">
          <th className="w-[20%] text-left font-semibold">Name</th>
          <th className="w-[20%] text-left font-semibold">Amount</th>
          <th className="w-[20%] text-left font-semibold">Mode</th>
          <th className="w-[20%] text-left font-semibold">Shift</th>
          <th className="w-[20%] text-left font-semibold">Dues</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(10)].map((_, index) => (
          <tr
            key={index}
            className="flex items-center justify-between gap-4 border-b py-3 text-gray-600 mx-6 hover:bg-blue-700 hover:text-white border-gray-300"
          >
            <td className="w-[20%] text-left  font-medium">Ujjwal</td>
            <td className="w-[20%] text-left  font-medium">500</td>
            <td className="w-[20%] text-left  font-medium">Paytm</td>
            <td className="w-[20%] text-left  font-medium">Full</td>
            <td className="w-[20%] text-left  font-medium">50</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Right Container */}
  <div
    id="right"
    className="w-full sm:w-2/5 bg-white shadow-lg rounded-lg py-6 px-3 overflow-y-auto max-h-[400px]"
  >
    <div className="flex items-center justify-between mb-10 sm:mb-20">
      <p className="text-blue-700 font-bold text-lg sm:text-2xl">Latest Visitors</p>
      <Link to="visitors/overview" className="text-white text-lg px-2 p-1 bg-blue-700 rounded-lg">
        More
      </Link>
    </div>

    <table id="right-table" className="min-w-96 w-full rounded-lg bg-white overflow-y-auto border border-gray-300">
      <thead>
        <tr className="flex items-center justify-between text-xl gap-4 px-3 mx-3 bg-gray-100 border-b border-gray-400">
          <th className="w-[50%] text-left font-semibold">Name</th>
          <th className="w-[50%] text-left font-semibold">Number</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(10)].map((_, index) => (
          <tr
            key={index}
            className="flex items-center justify-between gap-4 border-b py-3 mx-6 text-gray-600 hover:bg-blue-700 hover:text-white border-gray-300"
          >
            <td className="w-[50%] text-left  font-medium">Visitor {index + 1}</td>
            <td className="w-[50%] text-left  font-medium">+91 987654321{index}</td>
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
