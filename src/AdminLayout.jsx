import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AdminHeader from "./components/AdminHeader";

const AdminLayout = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Admin Header */}
      <AdminHeader onMenuClick={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden ">
        {/* Sidebar */}
        <div
          className={`fixed md:relative z-40 bg-gradient-to-r from-blue-700 to-blue-500 h-full w-64 transition-transform  duration-300 ease-in-out ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <Sidebar onMenuClick={toggleSidebar} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto ml-0 md:ml-0">
          <div className="flex-1">
            <Outlet />
          </div>

          {/* Footer
            
            <div className="min-h-20 w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-900">
            <h1 className="text-white text-3xl">This is footer for all pages</h1>
          </div>
            
            */}

        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
