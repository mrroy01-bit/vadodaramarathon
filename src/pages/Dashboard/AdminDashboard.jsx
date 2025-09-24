import React, { useState, useEffect } from "react";
import { RaceTab } from "./Tab/RaceCategory";
import BannerTab from "./Tab/Banner";
import { FaUserCircle, FaImages, FaImage, FaUsers, FaUserPlus, FaSpinner, FaBars } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";

import AllUser from "./Tab/allUser";
import AddNewuser from "./Tab/addNewuser";
import { setAuthToken } from "../../services/auth";
import { SponsorTab } from "./Tab/Sponsors";
import { PartnersTab } from "./Tab/Partners";
import { AssociateTab } from "./Tab/Associate";
import { userService } from "../../services/api";
import BlogEditor from "./Tab/BlogEditor";
import EventFqu   from "./Tab/EventFqu";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("race");
  const [userTab, setUserTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
  });

  useEffect(() => {
    const fetchAdminProfile = async () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setAdminProfile({
            name:
              userData.fname && userData.lname
                ? `${userData.fname} ${userData.lname}`
                : userData.name || "Admin User",
            email: userData.email || "admin@example.com",
          });
        }
        const response = await userService.getUserProfile();
        if (response?.data) {
          const userData = response.data;
          setAdminProfile({
            name:
              userData.fname && userData.lname
                ? `${userData.fname} ${userData.lname}`
                : userData.name || "Admin User",
            email: userData.email || "admin@example.com",
          });
        }
      } catch (err) {
        console.error("Error fetching admin profile:", err);
        setError(err.message || "Failed to load admin profile");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminProfile();
  }, []);

 const handleSignOut = () => {
    setAuthToken(null);
    navigate("/admin-login");
  };
 const tabs = [
    { id: "race", icon: <FaImages />, label: "Photo Gallery" },
    { id: "banner", icon: <FaImage />, label: "Banner Management" },
    { id: "sponsor", icon: <FaImage />, label: "Sponsor Management" },
    { id: "user", icon: <FaUsers />, label: "User Management" },
    { id: "partner", icon: <FaImage />, label: "Partner Management" },
    { id: "associate", icon: <FaImage />, label: "Associate Management" },
    { id: "blog", icon: <TfiWrite />, label: "Blog Management" },
    { id: "eventfqu", icon: <TfiWrite />, label: "Events & FAQs" },
  ];
  

  

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg rounded-r-xl p-4 flex flex-col transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          {!collapsed && <h2 className="text-2xl font-bold text-blue-700 tracking-wide">Dashboard</h2>}
          <button
            className="p-2 rounded hover:bg-gray-100 transition-all"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FaBars className="text-gray-700 w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all font-medium ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "hover:bg-blue-50 text-gray-700"
              } justify-center ${collapsed ? "justify-center" : "justify-start"}`}
              onClick={() => setActiveTab(tab.id)}
              title={collapsed ? tab.label : ""}
            >
              {tab.icon}
              {!collapsed && <span>{tab.label}</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
            {activeTab === "race"
              ? "Photo Gallery Management"
              : activeTab === "banner"
              ? "Banner Management"
              : activeTab === "sponsor"
              ? "Sponsor Management"
              : activeTab === "partner"
              ? "Partner Management"
              : activeTab === "blog"
              ? "Blog Editor"
              : activeTab === "eventfqu"
              ? "Events & FAQs"
              : activeTab === "associate"
              ? "Associate Management"
              : "User Management"}
          </h1>
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-all">
              <FaUserCircle className="w-10 h-10 text-blue-600" />
              {loading ? (
                <FaSpinner className="w-5 h-5 animate-spin text-blue-600" />
              ) : error ? (
                <span className="font-medium text-red-600">Error</span>
              ) : (
                <span className="font-medium text-gray-700">{adminProfile.name}</span>
              )}
            </div>
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-xl p-4 hidden group-hover:block z-10 transition-all">
              <div className="flex flex-col items-center mb-4 pb-4 border-b">
                <FaUserCircle className="w-16 h-16 text-blue-600 mb-2" />
                <p className="text-sm font-medium text-gray-800">
                  {loading ? <FaSpinner className="w-4 h-4 animate-spin" /> : adminProfile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : adminProfile.email}
                </p>
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              </div>
              <button
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        <div className="bg-white p-6 rounded-xl shadow-lg transition-all">
          {activeTab === "race" && <RaceTab />}
          {activeTab === "banner" && <BannerTab />}
          {activeTab === "sponsor" && <SponsorTab />}
          {activeTab === "partner" && <PartnersTab />}
          {activeTab === "associate" && <AssociateTab />}
          {activeTab === "blog" && <BlogEditor />}
          {activeTab === "eventfqu" && <EventFqu />}
          {activeTab === "user" && (
            <div className="space-y-6">
              <div className="flex gap-4 mb-6">
                <button
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all ${
                    userTab === "all"
                      ? "bg-blue-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                  }`}
                  onClick={() => setUserTab("all")}
                >
                  <FaUsers /> All Users
                </button>
                <button
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all ${
                    userTab === "add"
                      ? "bg-blue-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                  }`}
                  onClick={() => setUserTab("add")}
                >
                  <FaUserPlus /> Add New User
                </button>
              </div>
              <div>
                {userTab === "all" && <AllUser />}
                {userTab === "add" && <AddNewuser />}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
