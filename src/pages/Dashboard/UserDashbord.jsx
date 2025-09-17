import React, { useState, useEffect } from "react";
import { FaUserCircle, FaRunning, FaHistory, FaMedal } from "react-icons/fa";
import UserProfile from "./Tab/UserProfile";
import { userService } from "../../services/api";
import { setAuthToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await userService.getUserProfile();

        // normalize API response shape
        const userObj = userData?.data?.user || userData?.data || userData;
        setUser(userObj);

        console.log("Fetched User Profile:", userObj);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // ✅ run only once

  const handleSignOut = () => {
    setAuthToken(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      ) : error ? (
        <div className="w-full flex items-center justify-center">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      ) : (
        <>
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-md p-6">
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-xl font-bold text-blue-700">Dashboard</h2>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 w-full px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === "profile"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaUserCircle className="w-5 h-5" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("events")}
                className={`flex items-center gap-3 w-full px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === "events"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaRunning className="w-5 h-5" />
                <span>Events & Registration</span>
              </button>

              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-3 w-full px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === "history"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaHistory className="w-5 h-5" />
                <span>Registration History</span>
              </button>

              <button
                onClick={() => setActiveTab("achievements")}
                className={`flex items-center gap-3 w-full px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === "achievements"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaMedal className="w-5 h-5" />
                <span>My Achievements</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold text-gray-800">
                {activeTab === "profile" && "My Profile"}
                {activeTab === "events" && "Events & Registration"}
                {activeTab === "history" && "Registration History"}
                {activeTab === "achievements" && "My Achievements"}
              </h1>
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100">
                  <FaUserCircle className="w-8 h-8 text-blue-600" />
                  <span className="font-medium text-gray-700">
                    {user?.name ||
                      (user?.firstName
                        ? `${user.firstName} ${user.lastName}`
                        : "User")}
                  </span>
                </div>
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-xl p-4 hidden group-hover:block z-10">
                  <div className="flex flex-col items-center mb-3 pb-3 border-b">
                    <FaUserCircle className="w-16 h-16 text-blue-600 mb-2" />
                    <p className="text-sm font-medium">
                      {user?.name ||
                        (user?.firstName
                          ? `${user.firstName} ${user.lastName}`
                          : "User")}
                    </p>
                    <p className="text-xs text-gray-600">
                      {user?.email || "loading..."}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Tab Content */}
            {activeTab === "profile" && <UserProfile user={user} />}
            {activeTab === "events" && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                <p className="text-gray-600">
                  No upcoming events available for registration.
                </p>
              </div>
            )}
            {activeTab === "history" && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Your Registration History
                </h3>
                <p className="text-gray-600">
                  You haven't registered for any events yet.
                </p>
              </div>
            )}
            {activeTab === "achievements" && (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Your Achievements</h3>
                <p className="text-gray-600">
                  Complete events to earn achievements.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
