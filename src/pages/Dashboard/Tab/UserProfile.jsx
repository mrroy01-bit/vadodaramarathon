import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEdit, FaSave, FaTimes, FaCamera, FaSpinner } from 'react-icons/fa';
import { userService } from '../../../services/api';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    id: '', // FIX: Added id to store the user's ID
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await userService.getUserProfile();

        const data = response?.data || response;

        if (data) {
          const profileData = {
            id: data._id || data.id || '', // FIX: Mapped the user ID from the API response
            firstName: data.firstName || data.fname || '',
            lastName: data.lastName || data.lname || '',
            email: data.email || '',
            phone: data.phone || data.phone_number || '',
            dob: data.dob || '',
            gender: data.gender || '',
          };

          setFormData(profileData);
          localStorage.setItem('userProfile', JSON.stringify(profileData));
        } else {
          const savedProfile = localStorage.getItem('userProfile');
          if (savedProfile) setFormData(JSON.parse(savedProfile));
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(
          err.response?.data?.message ||
            'Failed to load profile data. Please try again later.'
        );

        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) setFormData(JSON.parse(savedProfile));
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = [];
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      errors.push('Please enter a valid phone number');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      setSaving(false);
      return;
    }

    try {
      // map frontend → backend
      const profileData = {
        fname: formData.firstName,
        lname: formData.lastName,
        email: formData.email,
        phone_number: formData.phone,
        dob: formData.dob || undefined,
        gender: formData.gender || undefined,
      };

      const cleanedFormData = Object.fromEntries(
        Object.entries(profileData).filter(([_, value]) => value !== '' && value !== undefined)
      );

      // FIX: Passed formData.id as the first argument to match the API service definition
      const response = await userService.updateUserProfile(formData.id, cleanedFormData);

      setSuccess('Profile updated successfully!');
      setIsEditing(false);

      // Refresh updated profile
      const updatedData = response?.data || (await userService.getUserProfile());
      if (updatedData) {
        const newProfileData = {
          id: updatedData._id || updatedData.id || formData.id, // Keep the ID
          firstName: updatedData.firstName || updatedData.fname || '',
          lastName: updatedData.lastName || updatedData.lname || '',
          email: updatedData.email || '',
          phone: updatedData.phone || updatedData.phone_number || '',
          dob: updatedData.dob || '',
          gender: updatedData.gender || '',
        };

        setFormData(newProfileData);
        localStorage.setItem('userProfile', JSON.stringify(newProfileData));
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Server error. Please try again.'
      );
    } finally {
      setSaving(false);
      // Use a function callback with setTimeout to avoid stale state issues
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 disabled:bg-blue-400"
            >
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                disabled={saving}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-300 disabled:bg-gray-100"
              >
                <FaTimes /> Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700 disabled:bg-green-400"
              >
                {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="mx-6 mt-4 p-3 bg-green-100 text-green-700 border border-green-200 rounded-md">
          {success}
        </div>
      )}

      {/* Body */}
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-blue-600 text-3xl" />
            <span className="ml-3 text-gray-600">Loading profile data...</span>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Avatar */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <FaUserCircle className="w-full h-full text-gray-400" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                    <FaCamera />
                  </button>
                )}
              </div>
              <h4 className="text-xl font-semibold">
                {formData.firstName} {formData.lastName}
              </h4>
              <p className="text-gray-600">{formData.email}</p>
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-2/3">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 py-2">{formData.firstName || 'Not Provided'}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 py-2">{formData.lastName || 'Not Provided'}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 py-2">{formData.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 py-2">{formData.phone || 'Not Provided'}</p>
                    )}
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 py-2">
                        {formData.dob ? new Date(formData.dob).toLocaleDateString('en-IN') : 'Not Provided'}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    {isEditing ? (
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-800 py-2">{formData.gender || 'Not Provided'}</p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;