
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ onMenuClick }) => {
  const [dropdown, setDropdown] = useState(""); // To handle dropdown visibility

  const toggleDropdown = (menu) => setDropdown(dropdown === menu ? "" : menu);

  return (
    <div className="flex flex-col bg-gray-900 text-white h-full overflow-y-auto pb-5">
      {/* Sidebar Links */}
      <ul className="mx-2 mt-2 space-y-2">
        {/* Dashboard */}
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "block px-4 py-2 bg-blue-700 text-white rounded shadow"
                : "block px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
            }
            onClick={onMenuClick}
          >
            Dashboard
          </NavLink>
        </li>
  
        {/* Expenses Dropdown */}
        <li>
          <button
            onClick={() => toggleDropdown("expenses")}
            className="w-full px-4 py-2 text-left bg-indigo-500 text-white hover:bg-indigo-600 rounded flex items-center justify-between shadow"
          >
            Expenses <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {dropdown === "expenses" && (
            <ul className="m-4 my-2">
              <li className="mb-2">
                <NavLink
                  to="expenses/overview"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-indigo-700 text-white rounded shadow"
                      : "block px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-600 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Overview
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="expenses/add"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-green-700 text-white rounded shadow"
                      : "block px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Add New Expense
                </NavLink>
              </li>
            </ul>
          )}
        </li>
  
        {/* Income */}
        <li>
          <NavLink
            to="income/overview"
            className={({ isActive }) =>
              isActive
                ? "block px-4 py-2 bg-green-700 text-white rounded shadow"
                : "block px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded"
            }
            onClick={onMenuClick}
          >
            Income
          </NavLink>
        </li>
  
        {/* Students Dropdown */}
        <li>
          <button
            onClick={() => toggleDropdown("students")}
            className="w-full px-4 py-2 text-left bg-yellow-500 text-black hover:bg-yellow-600 rounded flex items-center justify-between shadow"
          >
            Students <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {dropdown === "students" && (
            <ul className="m-4 my-2">
              <li className="mb-2">
                <NavLink
                  to="students/dues"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-red-600 text-white rounded shadow"
                      : "block px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Dues Students
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="students/active"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-teal-700 text-white rounded shadow"
                      : "block px-4 py-2 bg-teal-500 text-white hover:bg-teal-600 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Active Students
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="students/pending"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-orange-600 text-white rounded shadow"
                      : "block px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Pending Students
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="students/left"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-gray-700 text-white rounded shadow"
                      : "block px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Left Students
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="students/all"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-purple-700 text-white rounded shadow"
                      : "block px-4 py-2 bg-purple-500 text-white hover:bg-purple-600 rounded"
                  }
                  onClick={onMenuClick}
                >
                  All Students
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="students/add"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-green-700 text-white rounded shadow"
                      : "block px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Add New Student
                </NavLink>
              </li>
            </ul>
          )}
        </li>
  
        {/* Seat Management */}
        <li>
          <NavLink
            to="seat"
            className={({ isActive }) =>
              isActive
                ? "block px-4 py-2 bg-blue-700 text-white rounded shadow"
                : "block px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
            }
            onClick={onMenuClick}
          >
            Seat Management
          </NavLink>
        </li>
  
        {/* Shift Management */}
        <li>
          <NavLink
            to="shift"
            className={({ isActive }) =>
              isActive
                ? "block px-4 py-2 bg-orange-700 text-white rounded shadow"
                : "block px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded"
            }
            onClick={onMenuClick}
          >
            Shift Management
          </NavLink>
        </li>
  
        {/* Inquiries */}
        <li>
          <NavLink
            to="enquiries"
            className={({ isActive }) =>
              isActive
                ? "block px-4 py-2 bg-teal-700 text-white rounded shadow"
                : "block px-4 py-2 bg-teal-500 text-white hover:bg-teal-600 rounded"
            }
            onClick={onMenuClick}
          >
            Inquiries
          </NavLink>
        </li>
  
        {/* Empty */}
        <li className="min-h-28"></li>
      </ul>
    </div>
  );
  
  
};

export default Sidebar;
