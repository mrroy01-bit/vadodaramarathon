import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "./Footer";
import { faqService } from "../../services/api";
import { useRecoilState } from "recoil";
import { faqAtom } from "../../store/atoms";

const FAQAccordion = () => {
  const [faqs, setFaqs] = useRecoilState(faqAtom);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await faqService.getAll();

        // Extract the actual FAQ data from the response
        const faqData = response.data || response || [];
        setFaqs(faqData); // ✅ Store FAQs globally
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError("Failed to load FAQs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if atom is empty
    if (faqs.length === 0) {
      fetchFaqs();
    } else {
      setLoading(false);
    }
  }, [faqs, setFaqs]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f3f9ff] px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 text-[#333]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#4C2671] mb-4 sm:mb-6 text-center sm:text-left">
            FAQs
          </h2>

          {loading && <p className="text-center">Loading FAQs...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="space-y-2 sm:space-y-3">
            {faqs.length > 0
              ? faqs.map((faq, index) => (
                  <div
                    key={faq._id || index}
                    className="border-b border-white rounded-lg overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3 bg-[#27AAE1] text-white text-sm sm:text-base font-medium hover:bg-[#1c91c7] transition duration-200"
                    >
                      <span className="text-left pr-4">{faq.question}</span>
                      <span className="text-xl sm:text-2xl font-bold flex-shrink-0">
                        {openIndex === index ? "–" : "+"}
                      </span>
                    </button>
                    {openIndex === index && (
                      <div className="bg-white text-gray-800 px-3 sm:px-4 py-3 sm:py-4">
                        <p className="text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              : !loading && <p className="text-center">No FAQs available.</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQAccordion;
