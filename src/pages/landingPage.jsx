import React from "react";
import Header from "../Component/Header";
import Banner from "../assest/banner.jpg";
import VideoCard from "../Component/VideoCard";
import SponsorSlider from "../Component/SponsorSlider";
import ValuableAssociates from "../Component/ValuableAssociates";
import Footer from "../Component/Footer";
import {
  FaClipboardList,
  FaQuestionCircle,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const LandingPage = () => {
  const marathonCards = [
    { title: "Full Marathon (42.195kms)", img: "/images/marathon1.jpg" },
    { title: "Half Marathon (21.097kms)", img: "/images/marathon2.jpg" },
    { title: "10kms", img: "/images/marathon3.jpg" },
    { title: "Timed Run (5kms)", img: "/images/marathon4.jpg" },
    { title: "Heritage Fun Run", img: "/images/marathon5.jpg" },
    { title: "Train with Dina for MGVM 2024!", img: "/images/marathon6.jpg" },
  ];

  return (
    <>
      <Header />

      {/* Banner Section */}
      <div className="banner">
        <div className="overlay">
          <img src={Banner} alt="Banner" className="w-full h-auto object-cover" />
        </div>
        <div className="btn-reg flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-[#F2F2F2] text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#542F78]">
            Registrations are now open🏃
          </h2>
          <button className="btn px-4 py-2 bg-[#542F78] text-white uppercase">
            Click Here To Register
          </button>
        </div>
      </div>

      {/* Hero Text Section */}
      <div className="py-16 px-4 sm:px-10 text-center">
        <h2 className="text-2xl sm:text-5xl font-semibold text-[#542F78] leading-snug">
          We are #BackToRun. <br className="hidden sm:block" />
          Thirteenth Edition of the Vadodara Marathon.
        </h2>
        <p className="text-base sm:text-xl mt-8 font-medium leading-7 sm:leading-8 text-gray-700">
          Welcome to the MG Vadodara Marathon 2026. On 1st February become a
          part of history by participating in the 13th Edition of India's
          Largest Marathon. Vadodara Marathon is accredited to AFI, GSAAA, SAG
          and BDAAA and route certified by AIMS. Vadodara Marathon is a World
          Marathon Majors Qualifying Race of the Abbott Wanda World Marathon
          Majors.
          <br />
          <br />
          Vadodara Marathon’s motto of “Sports, Seva, Swachhta” is at the core of all
          the activities, supporting various social and civic causes. Vadodara
          Marathon, or VM, offers a platform to local NGOs and Divyang Associations
          to increase their visibility, raise awareness and funds for their causes.
        </p>
      </div>

      <VideoCard />

      {/* Info Cards */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-sky-600 text-white px-6 py-8 flex flex-col justify-between h-full rounded-md">
            <div>
              <h2 className="text-xl font-bold mb-3">Rules & Regulations</h2>
              <button className="underline text-sm">LEARN MORE →</button>
            </div>
            <FaClipboardList className="text-white/30 text-4xl self-end mt-6" />
          </div>

          {/* Card 2 */}
          <div className="bg-lime-500 text-white px-6 py-8 flex flex-col justify-between h-full rounded-md">
            <div>
              <h2 className="text-xl font-bold mb-3">FAQs</h2>
              <button className="underline text-sm">LEARN MORE →</button>
            </div>
            <FaQuestionCircle className="text-white/30 text-4xl self-end mt-6" />
          </div>

          {/* Card 3 */}
          <div className="bg-purple-800 text-white px-6 py-8 flex flex-col justify-between h-full rounded-md">
            <div>
              <h2 className="text-xl font-bold mb-3">Price Chart</h2>
              <button className="underline text-sm">LEARN MORE →</button>
            </div>
            <FaMoneyCheckAlt className="text-white/30 text-4xl self-end mt-6" />
          </div>
        </div>
      </section>

      {/* Marathon Cards Section */}
      <section className="bg-white px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {marathonCards.map((card, i) => (
            <div
              key={i}
              className="relative h-64 bg-cover bg-center rounded shadow-md"
              style={{ backgroundImage: `url('${card.img}')` }}
            >
              <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-4">
                <h3 className="text-white text-lg sm:text-xl font-semibold text-center">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SponsorSlider />
      <ValuableAssociates />
      <Footer />
    </>
  );
};

export default LandingPage;
