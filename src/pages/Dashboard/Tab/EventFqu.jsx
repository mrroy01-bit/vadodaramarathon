import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { pastEventsAtom, faqAtom, noticeAtom } from "../../../store/atoms";
import { pastEventService, faqService, noticeService } from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaPlus, FaList } from "react-icons/fa";

const EventFAQPage = () => {
  const [activeTab, setActiveTab] = useState("event"); 
  const [showAll, setShowAll] = useState(false);
  const [editingItem, setEditingItem] = useState(null); 

  const [event, setEvent] = useState({
    event_name: "",
    event_date: "",
    event_desc: [""],
  });

  const [faq, setFaq] = useState({
    question: "",
    answer: "",
    type: "faq",
  });

  const [notice, setNotice] = useState({
    question: "",
    answer: "",
    type: "privacy-notice",
  });

  const [pastEvents, setPastEvents] = useRecoilState(pastEventsAtom);
  const [faqs, setFaqs] = useRecoilState(faqAtom);
  const [notices, setNotices] = useRecoilState(noticeAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await pastEventService.getAll();
        setPastEvents(Array.isArray(eventsRes) ? eventsRes : eventsRes.data || []);

        const faqsRes = await faqService.getAll();
        setFaqs(Array.isArray(faqsRes) ? faqsRes : faqsRes.data || []);

        const noticesRes = await noticeService.getAll();
        console.log("Fetched notices:", noticesRes);
        setNotices(Array.isArray(noticesRes) ? noticesRes : noticesRes.data || []);
      } catch {
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, [setPastEvents, setFaqs, setNotices]);

  // -------- Handlers --------
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

  const addEventDesc = () => setEvent({ ...event, event_desc: [...event.event_desc, ""] });
  const removeEventDesc = (index) => {
    const updatedDesc = event.event_desc.filter((_, i) => i !== index);
    setEvent({ ...event, event_desc: updatedDesc });
  };

  const handleFaqChange = (e) => setFaq({ ...faq, [e.target.name]: e.target.value });
  const handleNoticeChange = (e) => setNotice({ ...notice, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === "event") {
        const payload = { ...event, event_desc: event.event_desc.filter(d => d.trim()) };
        if (editingItem) {
          const updated = await pastEventService.update(editingItem._id || editingItem.id, payload);
          setPastEvents(pastEvents.map(ev => (ev._id || ev.id) === (updated._id || updated.id) ? updated : ev));
          toast.success("Event updated successfully!");
        } else {
          const savedEvent = await pastEventService.add(payload);
          setPastEvents([...pastEvents, savedEvent]);
          toast.success("Event added successfully!");
        }
        setEvent({ event_name: "", event_date: "", event_desc: [""] });
      } else if (activeTab === "faq") {
        if (editingItem) {
          const updated = await faqService.update(editingItem._id || editingItem.id, faq);
          setFaqs(faqs.map(f => (f._id || f.id) === (updated._id || updated.id) ? updated : f));
          toast.success("FAQ updated successfully!");
        } else {
          const savedFaq = await faqService.add(faq);
          setFaqs([...faqs, savedFaq]);
          toast.success("FAQ added successfully!");
        }
        setFaq({ question: "", answer: "", type: "faq" });
      } else if (activeTab === "notice") {
        if (editingItem) {
          const updated = await noticeService.update(editingItem._id || editingItem.id, notice);
          setNotices(notices.map(n => (n._id || n.id) === (updated._id || updated.id) ? updated : n));
          toast.success("Notice updated successfully!");
        } else {
          const savedNotice = await noticeService.add(notice);
          setNotices([...notices, savedNotice]);
          toast.success("Notice added successfully!");
        }
        setNotice({ title: "", description: "" });
      }
      setEditingItem(null);
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "event") {
        await pastEventService.delete(id);
        setPastEvents(pastEvents.filter(e => (e._id || e.id) !== id));
      } else if (type === "faq") {
        await faqService.delete(id);
        setFaqs(faqs.filter(f => (f._id || f.id) !== id));
      } else if (type === "notice") {
        await noticeService.delete(id);
        setNotices(notices.filter(n => (n._id || n.id) !== id));
      }
      toast.success("Deleted successfully!");
    } catch {
      toast.error("Delete failed!");
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setActiveTab(type);
    setShowAll(false);
    if (type === "event") {
      setEvent({ ...item, event_desc: item.event_desc || [""] });
    } else if (type === "faq") {
      setFaq({ ...item });
    } else if (type === "notice") {
      setNotice({ ...item });
    }
  };

  // -------- JSX --------
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      {/* Tabs */}
      <div className="flex mb-4 border-b gap-2">
        <button
          className={`flex items-center px-4 py-2 ${activeTab === "event" && !showAll ? "border-b-2 border-blue-500 font-bold" : ""}`}
          onClick={() => { setActiveTab("event"); setShowAll(false); }}
        >
          Event
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeTab === "faq" && !showAll ? "border-b-2 border-blue-500 font-bold" : ""}`}
          onClick={() => { setActiveTab("faq"); setShowAll(false); }}
        >
          FAQ
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeTab === "notice" && !showAll ? "border-b-2 border-blue-500 font-bold" : ""}`}
          onClick={() => { setActiveTab("notice"); setShowAll(false); }}
        >
          Notice
        </button>
        <button
          className={`flex items-center px-4 py-2 ${showAll ? "border-b-2 border-blue-500 font-bold" : ""}`}
          onClick={() => setShowAll(!showAll)}
        >
          See All
        </button>
      </div>

      {/* Form */}
      {!showAll && (
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
                      <button type="button" onClick={() => removeEventDesc(index)} className="px-2 bg-red-500 text-white rounded">
                        X
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addEventDesc} className="px-4 py-2 bg-green-500 text-white rounded flex items-center">
                  <FaPlus className="mr-1" /> Add Description
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

          {activeTab === "notice" && (
            <div className="space-y-4">
              <input
                type="text"
                name="question"
                value={notice.question}
                onChange={handleNoticeChange}
                placeholder="Notice Question"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                name="answer"
                value={notice.answer}
                onChange={handleNoticeChange}
                placeholder="Notice Answer"
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          )}

          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
            <FaPlus className="mr-1" /> {editingItem ? "Update" : "Save"}
          </button>
        </form>
      )}

      {/* See All */}
      {showAll && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2"><FaList /> All Events</h2>
          {pastEvents.length > 0 ? (
            pastEvents.map((e) => (
              <div key={e._id || e.id} className="flex justify-between items-center border p-2 rounded">
                <div>
                  <p className="font-semibold">{e.event_name}</p>
                  <p>{e.event_date}</p>
                  <p>{e.event_desc?.join(", ")}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(e, "event")} className="px-2 py-1 bg-yellow-400 text-white rounded flex items-center">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(e._id || e.id, "event")} className="px-2 py-1 bg-red-500 text-white rounded flex items-center">
                    <FaTrash /> 
                  </button>
                </div>
              </div>
            ))
          ) : <p>No events available</p>}

          <h2 className="text-xl font-bold mt-4 flex items-center gap-2"><FaList /> All FAQs</h2>
          {faqs.length > 0 ? (
            faqs.map((f) => (
              <div key={f._id || f.id} className="flex justify-between items-center border p-2 rounded">
                <div>
                  <p className="font-semibold">{f.question}</p>
                  <p>{f.answer}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(f, "faq")} className="px-2 py-1 bg-yellow-400 text-white rounded flex items-center">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(f._id || f.id, "faq")} className="px-2 py-1 bg-red-500 text-white rounded flex items-center">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : <p>No FAQs available</p>}

          <h2 className="text-xl font-bold mt-4 flex items-center gap-2"><FaList /> All Notices</h2>
          {notices.length > 0 ? (
            notices.map((n) => (
              <div key={n._id || n.id} className="flex justify-between items-center border p-2 rounded">
                <div>
                  <p className="font-semibold">{n.question}</p>
                  <p>{n.answer}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(n, "notice")} className="px-2 py-1 bg-yellow-400 text-white rounded flex items-center">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(n._id || n.id, "notice")} className="px-2 py-1 bg-red-500 text-white rounded flex items-center">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : <p>No Notices available</p>}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default EventFAQPage;
