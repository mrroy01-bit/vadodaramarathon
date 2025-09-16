import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
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

  const roles = [
    { id: "Admin", label: "Admin" },
    { id: "Brand", label: "Brand" },
    { id: "Sponsor", label: "Sponsor" },
    { id: "User", label: "User" },
  ];

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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full border p-2 rounded"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="w-full border p-2 rounded"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 rounded"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full border p-2 rounded"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="w-full border p-2 rounded"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="gender"
              className="w-full border p-2 rounded"
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
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              className="w-full border p-2 rounded"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full border p-2 rounded"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="w-full border p-2 rounded"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {apiError && (
          <p className="text-red-500 text-center mt-4">{apiError}</p>
        )}

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
