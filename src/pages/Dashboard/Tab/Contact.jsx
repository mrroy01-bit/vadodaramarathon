import React, { useState, useEffect } from "react";
import { contactService } from "../../../services/api";
import { FaTrash, FaEdit, FaEye, FaTimesCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ContactTab = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  // Fetch all contacts
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await contactService.getAll();
      setContacts(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("Failed to load contacts. Please try again later.");
      toast.error("Failed to load contacts!");
    } finally {
      setLoading(false);
    }
  };

  // Handle contact deletion
  const handleDeleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setLoading(true);
      try {
        await contactService.remove(id);
        toast.success("Contact deleted successfully!");
        fetchContacts();
      } catch (err) {
        console.error("Error deleting contact:", err);
        toast.error("Failed to delete contact!");
      } finally {
        setLoading(false);
      }
    }
  };

  // Open edit modal
  const openEditModal = (contact) => {
    setSelectedContact({
      _id: contact._id,
      fname: contact.fname || "",
      lname: contact.lname || "",
      email: contact.email || "",
      phone: contact.phone || "",
      feedback: contact.feedback || "",
    });
    setShowModal(true);
  };

  // Handle form submission for update
  const handleUpdateContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.update(selectedContact._id, selectedContact);
      toast.success("Contact updated successfully!");
      setShowModal(false);
      fetchContacts();
    } catch (err) {
      console.error("Error updating contact:", err);
      toast.error("Failed to update contact!");
    } finally {
      setLoading(false);
    }
  };

  // View contact details
  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setViewModal(true);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Contact Form Submissions
        </h2>
        <button
          onClick={fetchContacts}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="loader"></div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
      )}

      {!loading && !error && contacts.length === 0 && (
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
          No contact form submissions found.
        </div>
      )}

      {!loading && !error && contacts.length > 0 && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Feedback</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {contact.fname} {contact.lname}
                  </td>
                  <td className="py-3 px-4">{contact.email}</td>
                  <td className="py-3 px-4">{contact.phone}</td>
                  <td className="py-3 px-4 truncate max-w-[200px]">
                    {contact.feedback?.substring(0, 50)}
                    {contact.feedback?.length > 50 && "..."}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleViewContact(contact)}
                        className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => openEditModal(contact)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                        title="Edit Contact"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                        title="Delete Contact"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Contact</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimesCircle size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdateContact}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="fname"
                    value={selectedContact.fname}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lname"
                    value={selectedContact.lname}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={selectedContact.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={selectedContact.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Feedback</label>
                <textarea
                  name="feedback"
                  value={selectedContact.feedback}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 border rounded-md"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Contact Details</h3>
              <button
                onClick={() => setViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimesCircle size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Name</h4>
                <p className="text-gray-900">
                  {selectedContact.fname} {selectedContact.lname}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="text-gray-900">{selectedContact.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                <p className="text-gray-900">
                  {selectedContact.phone || "N/A"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Feedback</h4>
                <p className="text-gray-900 whitespace-pre-line">
                  {selectedContact.feedback || "N/A"}
                </p>
              </div>
              {selectedContact.createdAt && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Submitted on
                  </h4>
                  <p className="text-gray-900">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
