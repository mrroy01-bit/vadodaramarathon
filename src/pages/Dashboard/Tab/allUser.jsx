import React, { useEffect, useRef, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { userService } from '../../../services/api';
import { FaSpinner, FaTrash, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AllUser = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

const fetchUsers = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await userService.getAllUsers();
    console.log("Users response:", response);

    let usersList = [];

    if (Array.isArray(response)) {
      usersList = response;
    } else if (response?.data && Array.isArray(response.data)) {
      usersList = response.data;
    } else if (response?.users && Array.isArray(response.users)) {
      usersList = response.users;
    } else if (response && typeof response === "object" && response._id) {
      usersList = [response];
    }

    const mappedUsers = usersList.map((user) => ({
      id: user._id || user.id,
      fname: user.fname || "",
      lname: user.lname || "",
      name:
        user.name ||
        `${user.fname || ""} ${user.lname || ""}`.trim() ||
        "N/A",
      email: user.email || "N/A",
      phone_number: user.phone_number || "N/A",
      role: user.role || user.ROLE || "N/A",
      gender: user.gender || "N/A",
      dob: user.dob ? new Date(user.dob).toLocaleDateString() : "N/A",
      createdAt: user.createdAt || user.created_at || user.registeredAt || null,
    }));

    console.log("Processed users:", mappedUsers);
    setUsers(mappedUsers);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    const errorMsg = err.message || "Failed to load users. Please try again later.";
    setError(errorMsg);
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};


  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = async (userId) => {
    // if (!window.confirm('Are you sure you want to delete this user?')) {
    //   return;
    // }

    try {
      setLoading(true);
      setError(null);

      setOpenDropdownId(null);

      await userService.deleteUser(userId);

      setUsers((users) => users.filter((user) => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (err) {
      console.error('Failed to delete user:', err);
      const errorMsg = err.message || 'Failed to delete user. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    fetchUsers();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-700">All Users</h2>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center p-8">
          <FaSpinner className="animate-spin h-8 w-8 text-blue-600" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center p-8 text-gray-500">No users found</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Contact Info</th>
              <th className="py-2 px-4 border-b">Personal Info</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b font-medium">{user.name}</td>
                <td className="py-2 px-4 border-b">
                  <div>
                    <div className="text-gray-600">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone_number}</div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div>
                    <div className="text-gray-600">{user.gender}</div>
                    <div className="text-sm text-gray-500">{user.dob}</div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      user.role?.toLowerCase() === 'admin'
                        ? 'bg-blue-100 text-blue-800'
                        : user.role?.toLowerCase() === 'user'
                        ? 'bg-green-100 text-green-800'
                        : user.role?.toLowerCase() === 'brand'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-2 px-4 border-b relative">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={(e) => toggleDropdown(user.id, e)}
                  >
                    <EllipsisVertical className="w-4 h-4" />
                  </button>

                  {openDropdownId === user.id && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border"
                    >
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewUserDetails(user);
                        }}
                      >
                        <FaEye className="text-blue-500" /> View Details
                      </button>
                    
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user.id);
                        }}
                      >
                        <FaTrash className="text-red-500" /> Delete User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">User Details</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowUserModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{selectedUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">{selectedUser.phone_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    selectedUser.role?.toLowerCase() === 'admin'
                      ? 'bg-blue-100 text-blue-800'
                      : selectedUser.role?.toLowerCase() === 'user'
                      ? 'bg-green-100 text-green-800'
                      : selectedUser.role?.toLowerCase() === 'brand'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {selectedUser.role}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{selectedUser.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{selectedUser.dob}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">First Name</p>
                <p className="font-medium">{selectedUser.fname || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Name</p>
                <p className="font-medium">{selectedUser.lname || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium text-sm">{selectedUser.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registered On</p>
                <p className="font-medium">
                  {selectedUser.createdAt
                    ? new Date(selectedUser.createdAt).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => setShowUserModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUser;