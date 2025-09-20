import React, { useState, useEffect } from "react";
import {RaceTab}  from "./Tab/RaceCategory";
import  BannerTab  from "./Tab/Banner";
import { FaUserCircle, FaImages, FaImage, FaUsers, FaUserPlus, FaSpinner } from "react-icons/fa";
import AllUser from "./Tab/allUser";
import AddNewuser from "./Tab/addNewuser";
import { setAuthToken } from "../../services/auth";
import   { SponsorTab }  from "./Tab/Sponsors";
import { PartnersTab } from "./Tab/Partners";
import { AssociateTab } from "./Tab/Associate";
import { userService } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("race");
  const [userTab, setUserTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
  });

  useEffect(() => {
    const fetchAdminProfile = async () => {
      setLoading(true);
      try {
        // Try to get profile from localStorage first
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setAdminProfile({
            name: userData.fname && userData.lname ? 
              `${userData.fname} ${userData.lname}` : 
              userData.name || "Admin User",
            email: userData.email || "admin@example.com"
          });
        }

        // Then fetch fresh data from API
        const response = await userService.getUserProfile();
        
        if (response?.data) {
          const userData = response.data;
          setAdminProfile({
            name: userData.fname && userData.lname ? 
              `${userData.fname} ${userData.lname}` : 
              userData.name || "Admin User",
            email: userData.email || "admin@example.com"
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
              activeTab === "race" 
                ? "bg-blue-600 text-white shadow-md" 
                : "hover:bg-blue-50 text-gray-700"
            }`}
            onClick={() => setActiveTab("race")}
          >
            <FaImages className="text-lg" />
            <span>Photo Gallery</span>
          </button>
          <button
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
              activeTab === "banner" 
                ? "bg-blue-600 text-white shadow-md" 
                : "hover:bg-blue-50 text-gray-700"
            }`}
            onClick={() => setActiveTab("banner")}
          >
            <FaImage className="text-lg" />
            <span>Banner Management</span>
          </button>
          <button
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
              activeTab === "sponsor" 
                ? "bg-blue-600 text-white shadow-md" 
                : "hover:bg-blue-50 text-gray-700"
            }`}
            onClick={() => setActiveTab("sponsor")}
          >
            <FaImage className="text-lg" />
            <span>Sponsor Management</span>
          </button>
          <button
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
              activeTab === "user" 
                ? "bg-blue-600 text-white shadow-md" 
                : "hover:bg-blue-50 text-gray-700"
            }`}
            onClick={() => setActiveTab("user")}
          >
            <FaUsers className="text-lg" />
            <span>User Management</span>
          </button>
          <button
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
              activeTab === "partner"
                ? "bg-blue-600 text-white shadow-md"
                : "hover:bg-blue-50 text-gray-700"
            }`}
            onClick={() => setActiveTab("partner")}
          >
            <FaUsers className="text-lg" />
            <span>Partner Management</span>
          </button>
          <button
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
              activeTab === "associate"
                ? "bg-blue-600 text-white shadow-md"
                : "hover:bg-blue-50 text-gray-700"
            }`}
            onClick={() => setActiveTab("associate")}
          >
            <FaUsers className="text-lg" />
            <span>Associate Management</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === "race"
              ? "Photo Gallery Management"
              : activeTab === "banner"
              ? "Banner Management"
              : activeTab === "sponsor"
              ? "Sponsor Management"
              : activeTab === "partner"
              ? "Partner Management"
              : activeTab === "associate"
              ? "Associate Management"
              : "User Management"}
          </h1>
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100">
              <FaUserCircle className="w-8 h-8 text-blue-600" />
              {loading ? (
                <FaSpinner className="w-5 h-5 animate-spin text-blue-600" />
              ) : error ? (
                <span className="font-medium text-red-600">Error loading profile</span>
              ) : (
                <span className="font-medium text-gray-700">{adminProfile.name}</span>
              )}
            </div>
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-xl p-4 hidden group-hover:block z-10">
              <div className="flex flex-col items-center mb-3 pb-3 border-b">
                <FaUserCircle className="w-16 h-16 text-blue-600 mb-2" />
                <p className="text-sm font-medium">
                  {loading ? (
                    <FaSpinner className="w-4 h-4 animate-spin" />
                  ) : (
                    adminProfile?.name || "Admin User"
                  )}
                </p>
                <p className="text-xs text-gray-600">
                  {loading ? (
                    <FaSpinner className="w-3 h-3 animate-spin" />
                  ) : (
                    adminProfile?.email || "Loading..."
                  )}
                </p>
                {error && (
                  <p className="text-xs text-red-500 mt-1">{error}</p>
                )}
              </div>
              <button 
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === "race" && <RaceTab />}
        {activeTab === "banner" && <BannerTab />}
        {activeTab === "sponsor" && <SponsorTab />}
        {activeTab === "partner" && <PartnersTab />}
        {activeTab === "associate" && <AssociateTab />}
        {activeTab === "user" && (
          <div>
            <div className="flex gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                  userTab === "all"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                }`}
                onClick={() => setUserTab("all")}
              >
                <FaUsers /> All Users
              </button>
              <button
                className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                  userTab === "add"
                    ? "bg-blue-600 text-white shadow-md"
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
    </div>
  );
}
