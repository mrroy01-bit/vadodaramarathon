import React, { useState } from "react";

export default function MailForm() {
  const [form, setForm] = useState({
    userEmail: "",
    userName: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:4000/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", msg: "Email sent successfully!" });
        setForm({ userEmail: "", userName: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", msg: data.error || "Failed to send email" });
      }
    } catch (err) {
      setStatus({ type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Send Mail</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Your Name</label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Your Email</label>
            <input
              type="email"
              name="userEmail"
              value={form.userEmail}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Subject"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Write your message..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-center font-medium ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.msg}
          </p>
        )}
      </div>
    </div>
  );
}
