import React, { useState, useEffect, useRef } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { userService } from '../../../services/api';
import { FaSpinner } from 'react-icons/fa';

const UserViews = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === id ? null : id);
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await userService.getAllUsers();
        // Filter to only show users with role "user", excluding admins, brands, sponsors
        const filteredUsers = response.data.filter(user => 
          user.role?.toLowerCase() === 'user' || 
          user.userType?.toLowerCase() === 'user'
        );
        setUsers(filteredUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-700">All Users</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-md">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-blue-600 text-3xl mr-2" />
          <span className="text-gray-600">Loading users...</span>
        </div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id || index}>
                  <td className="py-2 px-4 border-b">{user.firstName} {user.lastName}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.phone || 'N/A'}</td>
                  <td className="py-2 px-4 border-b relative">
                    <button 
                      className="text-blue-600 hover:underline"
                      onClick={(e) => toggleDropdown(user._id || index, e)}
                    >
                      <EllipsisVertical className="w-4 h-4" />
                    </button>
                    
                    {openDropdownId === (user._id || index) && (
                      <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                        <button 
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `mailto:${user.email}`;
                          }}
                        >
                          Send Mail
                        </button>
                        <button 
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('View Profile:', user._id);
                            // Handle profile view logic here
                          }}
                        >
                          View Profile
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserViews;

