import React from "react";

const JobForm = () => {
  return (
    <div className="min-h-screen mt-28 bg-white px-4 py-10">
      <h2 className="text-4xl font-bold text-purple-800 mb-6">Jobs</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        <input
          type="text"
          placeholder="First Name"
          className="p-4 bg-gray-100 placeholder-italic focus:outline-none"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="p-4 bg-gray-100 placeholder-italic focus:outline-none"
        />
        <input
          type="text"
          placeholder="Phone No."
          className="p-4 bg-gray-100 placeholder-italic focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email ID"
          className="p-4 bg-gray-100 placeholder-italic focus:outline-none"
        />
        <select className="p-4 bg-gray-100 placeholder-italic focus:outline-none">
          <option>--- Select Position ---</option>
          <option>Manager</option>
          <option>Accountant</option>
          <option>Admin Staff</option>
          <option>Operator</option>
          <option>Other</option>
        </select>
        <input
          type="date"
          className="p-4 bg-gray-100 placeholder-italic focus:outline-none"
        />
        <input
          type="url"
          placeholder="Link your resume url"
          className="md:col-span-2 p-4 bg-gray-100 placeholder-italic focus:outline-none"
        />
        <button
          type="submit"
          className="bg-sky-500 text-white px-6 py-3 font-semibold mt-2 hover:bg-sky-600 transition-all duration-200"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default JobForm;
