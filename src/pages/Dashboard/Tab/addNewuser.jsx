import React, { useState } from 'react';
import { userService } from '../../../services/api';
import { FaSpinner } from 'react-icons/fa';

const AddNewuser = () => {
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    // User fields
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    gender: '',
    password: '',
    // Other roles fields
    name: '',
    role: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setForm((prev) => ({ ...prev, role: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    // Format the data according to your API requirements
    const userData = {
      ...form,
      // For users, combine first and last name
      name: role === 'user' ? `${form.firstName} ${form.lastName}` : form.name
    };
    
    try {
      // Call the register API
      await userService.register(userData);
      setSuccess(true);
      
      // Reset the form
      setForm({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        dob: '',
        gender: '',
        password: '',
        name: '',
        role: role, // Keep the current role
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to create user:', err);
      setError(err.message || 'Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Add New User</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
          User created successfully!
        </div>
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            className="w-full border px-3 py-2 rounded"
            name="role"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="brand">Brand</option>
            <option value="viewer">Sponsors</option>
          </select>
        </div>

        {role === 'user' ? (
          <>
            <div>
              <label className="block mb-1 font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter first name"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter last name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="w-full border px-3 py-2 rounded"
                value={form.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Gender</label>
              <select
                name="gender"
                className="w-full border px-3 py-2 rounded"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <button 
          type="submit" 
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <FaSpinner className="animate-spin mr-2" />
              Creating user...
            </span>
          ) : (
            'Add User'
          )}
        </button>
      </form>
    </div>
  );
}

export default AddNewuser;
