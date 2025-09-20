import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authService } from "../../../services/api";

export default function AdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const genders = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
    { id: "other", label: "Other" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      formErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      formErrors.lastName = "Last name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      formErrors.email = "Valid email is required";
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      formErrors.phone = "Valid 10-digit phone number is required";
      isValid = false;
    }

    if (!formData.dob) {
      formErrors.dob = "Date of birth is required";
      isValid = false;
    }

    if (!formData.gender) {
      formErrors.gender = "Gender is required";
      isValid = false;
    }

    if (!formData.role) {
      formErrors.role = "Please select a role";
      isValid = false;
    }

    if (formData.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const registrationData = {
        fname: formData.firstName,
        lname: formData.lastName,
        phone_number: formData.phone,
        email: formData.email,
        dob: formData.dob,
        gender:
          formData.gender.charAt(0).toUpperCase() +
          formData.gender.slice(1).toLowerCase(),
        password: formData.password,
        confirm_password: formData.confirmPassword,
        role: formData.role.toUpperCase(),
      };

      console.log("Submitting data:", registrationData);

      const response = await authService.register(registrationData);
      console.log("Registration successful:", response);

      alert("Registration successful! Please login with your credentials.");

      if (formData.role === "Admin") {
        navigate("/admin/dashboard");
      } else if (formData.role === "Brand") {
        navigate("/brand/dashboard");
      } else if (formData.role === "Sponsor") {
        navigate("/sponsor/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setApiError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 border border-gray-100">
        {/* Left Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-8">
          <img
            src="https://cdn1.iconfinder.com/data/icons/open-doodles/1024/RunningDoodle-512.png"
            alt="Admin Register Illustration"
            className="w-80 h-80 object-contain animate-pulse"
          />
        </div>

        {/* Right Form */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Admin Registration
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Create your account to manage and explore
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                {genders.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Brand">Brand</option>
                <option value="Sponsor">Sponsor</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 pr-10"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 pr-10"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.01]"
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          {apiError && (
            <p className="text-red-500 text-center mt-4">{apiError}</p>
          )}

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/admin-login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
