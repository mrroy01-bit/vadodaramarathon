import React, { useState } from "react";
import { FaUserCircle, FaUserEdit } from "react-icons/fa";
import UserViews from "./Tab/UserViews";

export default function BrandDashboard() {
  const [activeTab, setActiveTab] = useState("userView");
  const user = {
    name: "Brand User",
    email: "brand@example.com",
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <div className="flex items-center gap-2 mb-8">
          <h2 className="text-xl font-bold text-blue-700">Dashboard</h2>
        </div>
        
        <div className="space-y-2">
          
          <button
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
              activeTab === "userView" 
                ? "bg-blue-600 text-white shadow-md" 
                : "hover:bg-blue-50 text-gray-700"
            }`}
            onClick={() => setActiveTab("userView")}
          >
            <FaUserEdit className="text-lg" />
            <span>User Profile</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === "mail" ? "Mail Box" : "User Profile"}
          </h1>
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100">
              <FaUserCircle className="w-8 h-8 text-blue-600" />
              <span className="font-medium text-gray-700">{user.name}</span>
            </div>
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-xl p-4 hidden group-hover:block z-10">
              <div className="flex flex-col items-center mb-3 pb-3 border-b">
                <FaUserCircle className="w-16 h-16 text-blue-600 mb-2" />
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded">
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === "userView" && <UserViews />}
      </div>
    </div>
  );
}
