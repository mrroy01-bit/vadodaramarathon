import React, { useState } from 'react';
import Header from '../Header';
import Footer from './Footer';

const faqs = [
  {
    question: "What is the last date of registration?",
    answer: "31st October 2025"
  },
  {
    question: "Can I participate in multiple race categories?",
    answer: "No"
  },
  {
    question: "There was a problem during registration. I have been charged but did not receive a confirmation. What should I do?",
    answer: "Please contact - support@vadodaramarathon.com"
  },
  {
    question: "I have made a mistake in one of my registration fields. How do I correct it?",
    answer: "Please write an email - support@vadodaramarathon.com"
  },
  {
    question: "Can I change my category once I have registered?",
    answer: "No"
  },
  {
    question: "Can I transfer/cancel my registration? Will there be any refund?",
    answer: "No."
  },
  {
    question: "Is there a minimum/maximum age for participants?",
    answer: "Time Run- FM and HM- 18yrs and above, 10K -16yrs and above and 5Km- 12yrs and above."
  },
  {
    question: "Can I register manually (offline)?",
    answer: "No"
  },
  {
    question: "Is there any Early bird offer or group discount for participants?",
    answer: "Early bird discount- 25% till 31st August, 2024."
  },
  {
    question: "Does the race have cut off times?",
    answer: "Yes"
  },
  {
    question: "Are t-shirts available for all race categories?",
    answer: "For all Time runners\n\n."
  },
  {
    question: "When is the BIB Distribution?",
    answer: "29th to 31st Jan 2025"
  },
  {
    question: "Where is the event going to be conducted?",
    answer: "Vadodara"
  },
  {
    question: "What will I get in my Racer Kit?",
    answer: "T shirt and bib with timing chip."
  },
  {
    question: "Will the timing chip be provided?",
    answer: "Yes"
  },
  {
    question: "Are there cash prizes?",
    answer: "Yes"
  },
  {
    question: "Are there age categories for prizes?",
    answer: "Yes"
  },
  {
    question: "Will there be a baggage counter?",
    answer: "Yes near start line"
  },
  {
    question: "What’s the start time of the race?",
    answer: "Reporting time is 4.00am for all time runners"
  },
 
  {
    "question": "What will be the route map?",
    "answer": "Visit our website http://www.vadodaramarathon.com/"
  },
  {
    "question": "Number of water and hydration station available and at what distance?",
    "answer": "As per AFI norms."
  },
  {
    "question": "Number of Medical Stations available?",
    "answer": "As per the AFI norms"
  },
  {
    "question": "Will there be a Medical Base Camps?",
    "answer": "Yes"
  },
  {
    "question": "Will fruits and biscuits be provided on the route?",
    "answer": "Yes"
  },
  {
    "question": "Number of Mobile Toilets available?",
    "answer": "As per the AFI norms"
  },
  {
    "question": "Will there be any signage board or volunteers available for direction?",
    "answer": "Yes"
  },
  {
    "question": "Will Refreshments or breakfast be available?",
    "answer": "Yes"
  },
  {
    "question": "Will the finisher get the certificate, medal?",
    "answer": "Yes"
  }
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-[#f3f9ff] px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 text-[#333]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#4C2671] mb-4 sm:mb-6 text-center sm:text-left">FAQs</h2>
        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3 bg-[#27AAE1] text-white text-sm sm:text-base font-medium hover:bg-[#1c91c7] transition duration-200"
              >
                <span className="text-left pr-4">{faq.question}</span>
                <span className="text-xl sm:text-2xl font-bold flex-shrink-0">
                  {openIndex === index ? '–' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="bg-white text-gray-800 px-3 sm:px-4 py-3 sm:py-4">
                  <p className="text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default FAQAccordion;
