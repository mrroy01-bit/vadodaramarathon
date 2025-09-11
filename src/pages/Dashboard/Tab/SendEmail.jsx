import React, { useState, useEffect } from 'react';

const SendEmail = ({ initialRecipient, onClose }) => {
  const [form, setForm] = useState({
    to: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    if (initialRecipient) {
      setForm(prev => ({ ...prev, to: initialRecipient }));
    }
  }, [initialRecipient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    alert('Email sent!');
    if (onClose) onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">To:</label>
          <input
            type="email"
            name="to"
            value={form.to}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter recipient email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Subject:</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter email subject"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Message:</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            rows="6"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>
        <div className="flex gap-3 justify-end">
          <button 
            type="button" 
            onClick={onClose}
            className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="bg-blue-600 text-white rounded-lg px-4 py-2"
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
};

// Default props
SendEmail.defaultProps = {
  initialRecipient: '',
  onClose: () => {}
};

export default SendEmail;
