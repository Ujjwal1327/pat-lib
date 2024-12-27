
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ onMenuClick }) => {
  const [dropdown, setDropdown] = useState(""); // To handle dropdown visibility

  const toggleDropdown = (menu) => setDropdown(dropdown === menu ? "" : menu);

  return (
    <div className="flex flex-col bg-gradient-to-r  from-blue-700 to-blue-500 scroll-smooth text-white h-full overflow-y-auto  pb-5">
      {/* Sidebar Links */}
      <ul className="mx-2 mt-2 space-y-2">
        {/* Dashboard */}
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "block px-4 py-2 bg-gradient-to-r via-transparent from-blue-900 to-slate-300 rounded"
                : "block px-4 py-2 hover:bg-gradient-to-r via-transparent from-blue-900 to-slate-300 rounded"
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
            className=" w-full px-4 py-2 text-left hover:bg-gradient-to-r from-blue-900 to-blue-200 rounded flex items-center justify-between"
          >
            Expenses <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {dropdown === "expenses" && (
            <ul className="mx-4">
              <li className="mb-2">
                <NavLink
                  to="expenses/overview"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                      : "block px-4 py-2 hover:bg-gradient-to-r from-blue-900 to-blue-200 rounded"
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
                      ? "block px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                      : "block px-4 py-2 hover:bg-gradient-to-r from-blue-900 to-blue-200 rounded"
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
                ? "block px-4 py-2 bg-gradient-to-r via-transparent from-blue-900 to-slate-300 rounded"
                : "block px-4 py-2 hover:bg-gradient-to-r via-transparent from-blue-900 to-slate-300 rounded"
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
            className="w-full px-4 py-2 text-left hover:bg-gradient-to-r from-blue-900 to-blue-200 rounded flex items-center justify-between"
          >
            Students <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {dropdown === "students" && (
            <ul className="mx-4">
              {/* Dues Students */}
              <li className="mb-2">
                <NavLink
                  to="students/dues"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                      : "block px-4 py-2 hover:bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Dues Students
                </NavLink>
              </li>
              {/* Active Students */}
              <li className="mb-2">
                <NavLink
                  to="students/active"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                      : "block px-4 py-2 hover:bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Active Students
                </NavLink>
              </li>

              {/* Pending Students */}
              <li className="mb-2">
                <NavLink
                  to="students/pending"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                      : "block px-4 py-2 hover:bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Pending Students
                </NavLink>
              </li>

              {/* Left Students */}
              <li className="mb-2">
                <NavLink
                  to="students/left"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                      : "block px-4 py-2 hover:bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Left Students
                </NavLink>
              </li>
              {/* all Students */}
              <li className="mb-2">
                <NavLink
                  to="students/all"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                      : "block px-4 py-2 hover:bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                  }
                  onClick={onMenuClick}
                >
                  All Students
                </NavLink>
              </li>

              {/* Add New Student */}
              <li className="mb-2">
                <NavLink
                  to="students/add"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                      : "block px-4 py-2 hover:bg-gradient-to-r from-blue-900 to-blue-200 rounded"
                  }
                  onClick={onMenuClick}
                >
                  Add New Student
                </NavLink>
              </li>
            </ul>
          )}
        </li>



        {/* Seat */}
        <li>
          <NavLink
            to="seat"
            className={({ isActive }) =>
              isActive
                ? "block px-4 py-2 bg-gradient-to-r via-transparent from-blue-900 to-slate-300 rounded"
                : "block px-4 py-2 hover:bg-gradient-to-r via-transparent from-blue-900 to-slate-300 rounded"
            }
            onClick={onMenuClick}
          >
            Seat Management
          </NavLink>
        </li>



        {/* Shift */}
        <li>
          <NavLink
            to="shift"
            className={({ isActive }) =>
              isActive
                ? "block px-4 py-2 bg-gradient-to-r via-transparent from-blue-900 to-slate-300 rounded"
                : "block px-4 py-2 hover:bg-gradient-to-r via-transparent from-blue-900 to-slate-300 rounded"
            }
            onClick={onMenuClick}
          >
            Shift Management
          </NavLink>
        </li>
        {/* Enquiries */}
        <li>
          <NavLink
            to="enquiries"
            className={({ isActive }) =>
              isActive
                ? "block px-4 py-2 bg-gradient-to-r via-transparent from-blue-900 to-slate-300 rounded"
                : "block px-4 py-2 hover:bg-gradient-to-r via-transparent from-blue-900 to-slate-300 rounded"
            }
            onClick={onMenuClick}
          >
            Inquiries
          </NavLink>
        </li>

        {/* Empty */}
        <li className="min-h-28">
          
        </li>


        {/* Similar structure for Income, Students, etc. */}
      </ul>
    </div>
  );
};

export default Sidebar;
