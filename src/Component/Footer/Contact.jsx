import React from "react";
import Header from "../Header";
import Footer from "./Footer";

const ContactPage = () => {
  return (
    <>
    <Header/>
    <div className="bg-white text-[#3b2352] font-sans min-h-screen">
      {/* Feedback Section */}
      <div className="px-4 sm:px-6 py-8 sm:py-10 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Give your Feedback</h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="text"
              placeholder="First Name"
              className="p-3 sm:p-4 bg-gray-100 italic w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-3 sm:p-4 bg-gray-100 italic w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="tel"
              placeholder="Phone No."
              className="p-3 sm:p-4 bg-gray-100 italic w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email ID"
              className="p-3 sm:p-4 bg-gray-100 italic w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              rows="5"
              placeholder="Feedback"
              className="p-3 sm:p-4 bg-gray-100 italic w-full md:col-span-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 sm:px-6 py-2 sm:py-3 uppercase font-semibold w-32 sm:w-40 rounded-md shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
      </div>

      {/* Contact Info Section */}
      <div className="grid md:grid-cols-2 gap-6 p-4 sm:p-6 bg-gradient-to-br from-blue-100 to-green-100">
        {/* Contact Details */}
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-lg sm:text-xl font-semibold">Email address</h3>
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
            <p className="text-xs sm:text-sm text-gray-600">(Mon–Fri: 9am–8pm, Sat: 9am–3pm)</p>
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

