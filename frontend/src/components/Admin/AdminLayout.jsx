import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Toggle button */}
      <div className="flex md:hidden p-4 text-white z-20 bg-gray-900">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="text-xl ml-4 font-medium">Admin Dashboard</h1>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`bg-gray-900 w-64 min-h-screen absolute text-white md:relative ${isSidebarOpen ? "translate-x-0" :"-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}>
        {/* Sidebar */}
        <AdminSidebar/>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 overflow-auto">
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;
