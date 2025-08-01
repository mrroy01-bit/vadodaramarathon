import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "./Footer";
import {images } from "../../assest/Media Houses/Images";

const pressData = [
  {
    year: "2024",
    edition: "MG Vadodara International Marathon 2024",
    articles: [
      {
        id: "2024-marathon",
        date: "05.01.2024",
        title:
          "Gujarat Chief Minister Shri Bhupendra Patel To Flag Off MG Vadodara International Marathon 2024 - Record Breaking 1.30 Lakh Registrations",
        summary:
          "Gujarat Chief Minister Shri Bhupendra Patel To Flag Off MG Vadodara International Marathon 2024 - Record Breaking 1.30 Lakh Registrations",
        full: "Full article content for 2024 goes here...",
      },
    ],
  },
  {
    year: "2021",
    edition: "Virtual Marathon",
    articles: [
      {
        id: "2021-virtual",
        date: "04.12.2020",
        title:
          "MGVM Virtual Marathon To Take Place Between 4th To 10th January 2021 Virtual Strides Toward's The Nation's Fitness",
        summary:
          "MGVM Virtual Marathon To Take Place Between 4th To 10th January 2021 Virtual Strides Toward's The Nation's Fitness",
        full: "Full article content for 2021 goes here...",
      },
    ],
  },
  {
    year: "2020",
    edition: "9th edition of MG Vadodara International Marathon",
    articles: [
      {
        id: "2020-note",
        date: "12.12.2020",
        title: "Press Note",
        summary: "Press Note",
        full: "Press note full content for 2020",
      },
      {
        id: "2020-announcement-1",
        date: "16.09.2019",
        title:
          "9th Edition Of MG Vadodara International Marathon To Be Conducted On 5th January 2020",
        summary:
          "9th Edition Of MG Vadodara International Marathon To Be Conducted On 5th January 2020",
        full: "Full details of 16.09.2019 press conference",
      },
      {
        id: "2020-announcement-2",
        date: "02.01.2020",
        title:
          "9th Edition Of MG Vadodara International Marathon To Be Flagged Off On 5th January 2020",
        summary:
          "9th Edition Of MG Vadodara International Marathon To Be Flagged Off On 5th January 2020",
        full: "Full details of 02.01.2020 press conference",
      },
    ],
  },
  {
    year: "2019",
    edition: "8th edition of MG Vadodara International Marathon",
    articles: [
      {
        id: "2019-announce-1",
        date: "08.10.2018",
        title:
          "8th Edition Of MG Vadodara International Marathon To Be Held On 6th January 2019",
        summary:
          "8th Edition Of MG Vadodara International Marathon To Be Held On 6th January 2019",
        full: "Full article content for 08.10.2018",
      },
      {
        id: "2019-announce-2",
        date: "16.12.2018",
        title:
          "8th MG Vadodara International Marathon Will Be Held On January 6, 2019",
        summary:
          "8th MG Vadodara International Marathon Will Be Held On January 6, 2019",
        full: "Full article content for 16.12.2018",
      },
      {
        id: "2019-announce-3",
        date: "01.03.2019",
        title:
          "8th Edition Of MG Vadodara International Marathon To Be Flagged Off On 6th January 2019",
        summary:
          "8th Edition Of MG Vadodara International Marathon To Be Flagged Off On 6th January 2019",
        full: "Full article content for 01.03.2019",
      },
    ],
  },
];

const PressPage = () => {
  const navigate = useNavigate();

  const handleReadMore = (article) => {
    navigate(`/press/${article.id}`, { state: { article } });
  };

  return (
    <>
      <Header />
      <div className="bg-white mt-6 sm:mt-8 md:mt-10 mx-4 sm:mx-8 md:mx-12 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 text-[#3b2352] rounded-lg shadow-sm">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Press</h1>
        {pressData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8 sm:mb-10 md:mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">
              {section.year} Year - {section.edition}
            </h2>
            <div className="grid gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.articles.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md hover:shadow-lg rounded-lg p-4 sm:p-5 md:p-6 border border-gray-100 transition-all duration-200 flex flex-col"
                >
                  <p className="text-green-700 font-medium mb-2 text-sm sm:text-base">
                    Press Conference on {item.date}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg mb-3 flex-1 leading-relaxed">{item.summary}</p>
                  <button
                    onClick={() => handleReadMore(item)}
                    className="text-blue-700 font-semibold hover:underline self-start text-sm sm:text-base transition-colors duration-200"
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <section className="mt-8 sm:mt-10 md:mt-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Media Houses</h2>
          <p className="mb-4 text-sm sm:text-base leading-relaxed">
            Vadodara Marathon expresses gratitude to all the media houses for
            extending support to us over all these years
          </p>
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {images.map((image, index) => (
                <div key={index} className="flex bg-white shadow-md hover:shadow-lg rounded-lg p-2 sm:p-3 justify-center items-center transition-shadow duration-200">
                  <img
                    src={image}
                    alt={`Media House ${index + 1}`}
                    className="w-24 sm:w-28 md:w-32 h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PressPage;
