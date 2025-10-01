import React, { useState } from "react";
import Header from "../Header";
import Footer from "./Footer";
import { contactService } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    feedback: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when the user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fname.trim()) newErrors.fname = "First name is required";
    if (!formData.lname.trim()) newErrors.lname = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await contactService.add(formData);
      toast.success("Your feedback has been submitted successfully!");
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        feedback: "",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white text-[#3b2352] font-sans min-h-screen">
        <ToastContainer position="top-right" autoClose={5000} />
        {/* Feedback Section */}
        <div className="px-4 sm:px-6 py-8 sm:py-10 bg-gradient-to-br from-blue-100 to-green-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
              Give your Feedback
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            >
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  className={`p-3 sm:p-4 bg-gray-100 italic w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.fname ? "border-red-500" : ""
                  }`}
                />
                {errors.fname && (
                  <p className="text-red-500 text-sm mt-1">{errors.fname}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  className={`p-3 sm:p-4 bg-gray-100 italic w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.lname ? "border-red-500" : ""
                  }`}
                />
                {errors.lname && (
                  <p className="text-red-500 text-sm mt-1">{errors.lname}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone No."
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="p-3 sm:p-4 bg-gray-100 italic w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email ID"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`p-3 sm:p-4 bg-gray-100 italic w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <textarea
                  rows="5"
                  placeholder="Feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  className={`p-3 sm:p-4 bg-gray-100 italic w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.feedback ? "border-red-500" : ""
                  }`}
                ></textarea>
                {errors.feedback && (
                  <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 sm:px-6 py-2 sm:py-3 uppercase font-semibold w-32 sm:w-40 rounded-md shadow-md disabled:bg-blue-300"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="grid md:grid-cols-2 gap-6 p-4 sm:p-6 bg-gradient-to-br from-blue-100 to-green-100">
          {/* Contact Details */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Contact Us
            </h2>
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold">
                Email address
              </h3>
              <p className="text-sm sm:text-base hover:text-blue-600">
                <a href="mailto:support@vadodaramarathon.com">
                  support@vadodaramarathon.com
                </a>
              </p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold">Call center</h3>
              <p className="text-sm sm:text-base hover:text-blue-600">
                <a href="tel:+919377538392">+91 9377538392</a>
              </p>
              <p className="text-sm sm:text-base hover:text-blue-600">
                <a href="tel:+919920142195">+91 9920142195</a>
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                (Mon–Fri: 9am–8pm, Sat: 9am–3pm)
              </p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold">Office</h3>
              <div className="text-sm sm:text-base space-y-1">
                <p>Vadodara Marathon,</p>
                <p>Inside Jyoti Ltd, Nanubhai Amin Marg,</p>
                <p>Near Shastri Bridge, Vadodara.</p>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full h-64 sm:h-96 mt-4 sm:mt-0">
            <iframe
              title="Vadodara Marathon Office Location"
              className="w-full h-full rounded shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.541406676612!2d73.17733837516534!3d22.246699479735667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8b9f2d223a3%3A0xf3d7d9515ccf963!2sVadodara%20Marathon!5e0!3m2!1sen!2sin!4v1691836482024!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Help & Support Floating Button */}
        <div
          className="fixed top-1/2 right-0 -translate-y-1/2 bg-[#542F78] hover:bg-[#3f2259] transition-colors text-white z-50 font-semibold uppercase tracking-wider py-3 sm:py-4 px-2 sm:px-3 rounded-l-lg shadow-lg cursor-pointer text-sm sm:text-base"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Help & Support
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
