import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { pastEventsAtom, faqAtom } from "../../../store/atoms";
import { pastEventService, faqService } from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventFAQPage = () => {
  const [activeTab, setActiveTab] = useState("event");

  // Event state
  const [event, setEvent] = useState({
    event_name: "",
    event_date: "",
    event_desc: [""],
  });

  // FAQ state
  const [faq, setFaq] = useState({
    question: "",
    answer: "",
    type: "faq",
  });

  const [pastEvents, setPastEvents] = useRecoilState(pastEventsAtom);
  const [faqs, setFaqs] = useRecoilState(faqAtom);

  // Handle event input change
  const handleEventChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "event_desc") {
      const updatedDesc = [...event.event_desc];
      updatedDesc[index] = value;
      setEvent({ ...event, event_desc: updatedDesc });
    } else {
      setEvent({ ...event, [name]: value });
    }
  };

  // Add/Remove description field
  const addEventDesc = () =>
    setEvent({ ...event, event_desc: [...event.event_desc, ""] });

  const removeEventDesc = (index) => {
    const updatedDesc = event.event_desc.filter((_, i) => i !== index);
    setEvent({ ...event, event_desc: updatedDesc });
  };

  // Handle FAQ input change
  const handleFaqChange = (e) =>
    setFaq({ ...faq, [e.target.name]: e.target.value });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === "event") {
        // Filter out empty descriptions
        const payload = {
          ...event,
          event_desc: event.event_desc.filter((desc) => desc.trim() !== ""),
        };

        const savedEvent = await pastEventService.add(payload);
        console.log("Fetched events:", event); // <--- Add this

        setPastEvents([...pastEvents, savedEvent]);
        toast.success("Event added successfully!");
        setEvent({ event_name: "", event_date: "", event_desc: [""] });
      } else {
        const savedFaq = await faqService.add(faq);
        setFaqs([...faqs, savedFaq]);
        toast.success("FAQ added successfully!");
        setFaq({ question: "", answer: "", type: "faq" });
      }
    } catch (err) {
      console.error("Error adding past event:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      {/* Tabs */}
      <div className="flex mb-4 border-b">
        <button
          type="button"
          className={`px-4 py-2 ${
            activeTab === "event" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("event")}
        >
          Event
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${
            activeTab === "faq" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {activeTab === "event" && (
          <div className="space-y-4">
            <input
              type="text"
              name="event_name"
              value={event.event_name}
              onChange={handleEventChange}
              placeholder="Event Name"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              name="event_date"
              value={event.event_date}
              onChange={handleEventChange}
              placeholder="Event Date"
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* Event Descriptions */}
            <div className="space-y-2">
              {event.event_desc.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    name="event_desc"
                    value={desc}
                    onChange={(e) => handleEventChange(e, index)}
                    placeholder="Event Description"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {event.event_desc.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEventDesc(index)}
                      className="px-2 bg-red-500 text-white rounded"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addEventDesc}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Description
              </button>
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-4">
            <input
              type="text"
              name="question"
              value={faq.question}
              onChange={handleFaqChange}
              placeholder="Question"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <textarea
              name="answer"
              value={faq.answer}
              onChange={handleFaqChange}
              placeholder="Answer"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default EventFAQPage;
