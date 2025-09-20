import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(formData);
      console.log("Login successful:", response);

      if (response.user) {
        const userRole = response.user.role || response.user.ROLE || "USER";
        localStorage.setItem("userRole", userRole);
        console.log("User role saved:", userRole);
      }

      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/user/dashboard"), 2000);
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-6 shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center tracking-wide">
          Vadodara Marathon 2026
        </h1>
        <p className="text-center mt-2 text-sm md:text-base">
          Participant Login Portal
        </p>
      </div>

      {/* Login Form with Illustration */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden grid md:grid-cols-2">
          {/* Left Illustration */}
          <div className="hidden md:flex bg-gradient-to-br from-orange-50 to-blue-50 items-center justify-center p-8">
            <img
              src="https://cdn1.iconfinder.com/data/icons/open-doodles/1024/RunningDoodle-512.png"
              alt="Marathon Illustration"
              className="w-72 h-72 object-contain animate-pulse"
            />
          </div>

          {/* Right Form */}
          <div className="p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
              Welcome Back 👋
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Sign in to continue your Marathon journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
                >
                  Email Address
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
                >
                  Password
                </label>
                <div className="flex justify-end mt-2">
                  <Link
                    to="/password-forget"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="mt-6 text-center text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default UserLogin;
