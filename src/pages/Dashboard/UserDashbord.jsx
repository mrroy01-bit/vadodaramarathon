import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaRunning,
  FaHistory,
  FaMedal,
  FaImage,
  FaBars,
  FaTimes,
  FaCertificate,
} from "react-icons/fa";
import UserProfile from "./Tab/UserProfile";
import { UserTab } from "./Tab/User";
import UserCert from "./Tab/UserCert";
import { userService } from "../../services/api";
import { setAuthToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await userService.getUserProfile();
        const userObj = userData?.data?.user || userData?.data || userData;

        // ✅ Same logic as Admin Dashboard
        setUser({
          ...userObj,
          name:
            userObj?.fname && userObj?.lname
              ? `${userObj.fname} ${userObj.lname}`
              : userObj?.name || "User",
          email: userObj?.email || "No Email",
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSignOut = () => {
    setAuthToken(null);
    navigate("/");
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 via-white to-blue-50 relative">
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
        </div>
      ) : error ? (
        <div className="w-full flex items-center justify-center text-center p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      ) : (
        <>
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Sidebar */}
          <div
            className={`
              fixed md:sticky top-0 left-0 h-screen bg-white shadow-xl z-30
              transform transition-transform duration-300 ease-in-out
              w-[80%] max-w-[300px] md:w-64
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0 overflow-y-auto rounded-r-2xl
            `}
          >
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-orange-500 to-blue-600 text-white">
              <h2 className="text-lg font-bold">Dashboard</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-2"
                aria-label="Close menu"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {[
                {
                  name: "profile",
                  label: "My Profile",
                  icon: <FaUserCircle className="w-5 h-5" />,
                },
                {
                  name: "events",
                  label: "Events",
                  icon: <FaRunning className="w-5 h-5" />,
                },
                {
                  name: "history",
                  label: "History",
                  icon: <FaHistory className="w-5 h-5" />,
                },
                {
                  name: "photos",
                  label: "My Photos",
                  icon: <FaImage className="w-5 h-5" />,
                },
                {
                  name: "achievements",
                  label: "Achievements",
                  icon: <FaMedal className="w-5 h-5" />,
                },
                {
                  name: "certificates",
                  label: "My Certificates",
                  icon: <FaCertificate className="w-5 h-5" />,
                },
              ].map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab.name)}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-all duration-200 font-medium shadow-sm ${
                    activeTab === tab.name
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}

              <div className="pt-4 mt-4 border-t md:hidden">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 font-medium"
                >
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-8">
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-md">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden text-gray-600 hover:text-gray-800"
              >
                <FaBars size={24} />
              </button>

              <h1 className="text-lg md:text-2xl font-bold text-gray-800 flex-1 text-center md:text-left">
                {activeTab === "profile" && "My Profile"}
                {activeTab === "events" && "Events & Registration"}
                {activeTab === "history" && "Registration History"}
                {activeTab === "photos" && "My Photos"}
                {activeTab === "achievements" && "My Achievements"}
                {activeTab === "certificates" && "My Certificates"}
              </h1>

              <div className="relative group hidden md:block">
                <div className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-50">
                  <FaUserCircle className="w-8 h-8 text-blue-600" />
                  <span className="font-medium text-gray-700">
                    {user?.fname && user?.lname
                      ? `${user.fname} ${user.lname}`
                      : user?.name || "User"}
                  </span>
                </div>
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-lg p-4 hidden group-hover:block z-10">
                  <div className="flex flex-col items-center mb-3 pb-3 border-b">
                    <FaUserCircle className="w-16 h-16 text-blue-600 mb-2" />
                    <p className="text-sm font-semibold">
                      {user?.fname && user?.lname
                        ? `${user.fname} ${user.lname}`
                        : user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {user?.email || "loading..."}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Tab Content */}
            <div className="transition-all duration-300">
              {activeTab === "profile" && <UserProfile user={user} />}
              {activeTab === "photos" && <UserTab />}
              {activeTab === "certificates" && (
                <UserCert
                  userName={
                    user?.fname && user?.lname
                      ? `${user.fname} ${user.lname}`
                      : user?.name || "User"
                  }
                  
                  templateUrl="/marathon.certificate.png"
                />
              )}
              {activeTab === "events" && (
                <div className="p-6 bg-white rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Upcoming Events
                  </h3>
                  <p className="text-gray-600">
                    No upcoming events available for registration.
                  </p>
                </div>
              )}
              {activeTab === "history" && (
                <div className="p-6 bg-white rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Your Registration History
                  </h3>
                  <p className="text-gray-600">
                    You haven't registered for any events yet.
                  </p>
                </div>
              )}
              {activeTab === "achievements" && (
                <div className="p-6 bg-white rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Your Achievements
                  </h3>
                  <p className="text-gray-600">
                    Complete events to earn achievements.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
