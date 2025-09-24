import React, { useState, } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { authService,  } from "../../../services/api";
import { setAuthToken } from "../../../services/auth";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [/*userData*/, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Call login API
      const response = await authService.login(formData);
      
      // Debug response
      console.log("Login response:", response);
      
      // 2. Check if we have a valid response with token and user data
      if (!response || !response.token) {
        throw new Error("Invalid response from server: Missing token");
      }

      // 3. Save token
      setAuthToken(response.token);

      // 4. Extract user data from login response
      const user = response.data || response.user;
      
      if (!user) {
        throw new Error("No user data in response");
      }

      // 5. Set user data
      setUserData(user);
      
      // 6. Extract role from user data
      const userRole = user.role || user.ROLE;

      console.log("User role:", userRole); // Debug log

      if (!userRole) {
        throw new Error("User role not found in response");
      }

      // 7. Save user role for ProtectedRoute
      localStorage.setItem('userRole', userRole);
      console.log('Admin role saved:', userRole);

      // 8. Redirect based on role
      const roleLower = userRole.toLowerCase();
      switch (roleLower) {
        case "admin":
          navigate("/admin/dashboard");
          break;
       
        case "brand":
          navigate("/brand/dashboard");
          break;
        default:
          setError("Invalid role: " + userRole);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.message || 
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 py-6 px-8 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10,30 C30,10 70,10 90,30 C110,50 110,80 90,100 C70,120 30,120 10,100 C-10,80 -10,50 10,30 Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="relative z-10">
            <div className="inline-flex justify-center items-center bg-white p-3 rounded-full mb-3 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold tracking-wide">Admin Login</h2>
            <p className="mt-1 text-blue-100">
              Welcome back to Vadodara Marathon
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="px-8 py-6 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div className="space-y-5">
            {/* Email */}
            <div className="relative">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
              >
                Email Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-blue-500" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-3 pl-10 rounded-lg text-gray-900 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
              >
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-blue-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-3 pl-10 rounded-lg text-gray-900 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>Sign in</>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t text-center">
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/admin-register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hidden lg:block absolute top-0 right-0 mt-32 mr-20">
        <div className="w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
      </div>
      <div className="hidden lg:block absolute bottom-0 left-0 mb-20 ml-10">
        <div className="w-40 h-40 bg-blue-300 rounded-full opacity-10"></div>
      </div>
    </div>
  );
}
