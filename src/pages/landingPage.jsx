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
  return (
    <>
      <Header />
      <div className="banner">
        <div className="overlay">
          <img src={Banner} alt="Banner" className="w-full h-auto" />
        </div>
        <div className="btn-reg flex justify-between items-center p-7 bg-[#F2F2F2]">
          <h2 className="text-4xl font-bold text-[#542F78]">
            Registrations are now open🏃
          </h2>
          <button className="btn p-3 bg-[#542F78] text-white uppercase">
            Click Here To Register
          </button>
        </div>
      </div>
      <div className="text h-screen flex flex-col justify-center items-center p-10">
        <h2 className="text-5xl font-semibold text-center text-[#542F78]">
          We are #BackToRun. Thirteenth Edition of the Vadodara <br /> Marathon.
        </h2>
        <p
          className="text-xl text-center mt-10 font-semibold leading-8
"
        >
          Welcome to the MG Vadodara Marathon 2026. On 1st February become a
          part of history by participating in the 13th Edition of India's
          Largest Marathon. Vadodara Marathon is accredited to AFI, GSAAA, SAG
          and BDAAA and route certified by AIMS. Vadodara Marathon is a World
          Marathon Majors Qualifying Race of the Abbott Wanda World Marathon
          Majors.
          <br /> Vadodara Marathon’s motto of “Sports, Seva, Swachhta” is at the
          core of all the activities, supporting various social and civic
          causes. Vadodara Marathon, or VM, offers a platform to local NGOs and
          Divyang Associations to increase their visibility, raise awareness and
          funds for their <br /> causes.
        </p>
      </div>
      <VideoCard />
      <section className="w-full max-w-8xl  pl-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-52">
          {/* Card 1: Rules & Regulations */}
          <div className="bg-sky-600 text-white px-8 py-10 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Rules & Regulations</h2>
              <button
                type="button"
                className="text-white font-medium underline-offset-2 hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                LEARN MORE →
              </button>
            </div>
            <FaClipboardList className="text-white/30 text-5xl" />
          </div>

          {/* Card 2: FAQs */}
          <div className="bg-lime-500 text-white px-8 py-10 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">FAQs</h2>
              <button
                type="button"
                className="text-white font-medium underline-offset-2 hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                LEARN MORE →
              </button>
            </div>
            <FaQuestionCircle className="text-white/30 text-5xl" />
          </div>

          {/* Card 3: Price Chart */}
          <div className="bg-purple-800 text-white px-8 py-10 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Price Chart</h2>
              <button
                type="button"
                className="text-white font-medium underline-offset-2 hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                LEARN MORE →
              </button>
            </div>
            <FaMoneyCheckAlt className="text-white/30 text-5xl" />
          </div>
        </div>
      </section>


      <section>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white">
      {/* Card 1 */}
      <div className="relative h-64 bg-cover bg-center rounded overflow-hidden shadow-lg" style={{ backgroundImage: "url('/images/marathon1.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center">
          <h3 className="text-white text-xl font-semibold mb-4">Full Marathon (42.195kms)</h3>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative h-64 bg-cover bg-center rounded overflow-hidden shadow-lg" style={{ backgroundImage: "url('/images/marathon2.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center">
          <h3 className="text-white text-xl font-semibold mb-4">Half Marathon (21.097kms)</h3>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative h-64 bg-cover bg-center rounded overflow-hidden shadow-lg" style={{ backgroundImage: "url('/images/marathon3.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center">
          <h3 className="text-white text-xl font-semibold mb-4">10kms</h3>
        </div>
      </div>

      {/* Card 4 */}
      <div className="relative h-64 bg-cover bg-center rounded overflow-hidden shadow-lg" style={{ backgroundImage: "url('/images/marathon4.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center">
          <h3 className="text-white text-xl font-semibold mb-4">Timed Run (5kms)</h3>
        </div>
      </div>

      {/* Card 5 */}
      <div className="relative h-64 bg-cover bg-center rounded overflow-hidden shadow-lg" style={{ backgroundImage: "url('/images/marathon5.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center">
          <h3 className="text-white text-xl font-semibold mb-4">Heritage Fun Run</h3>
        </div>
      </div>

      {/* Card 6 */}
      <div className="relative h-64 bg-cover bg-center rounded overflow-hidden shadow-lg" style={{ backgroundImage: "url('/images/marathon6.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center">
          <h3 className="text-white text-xl font-semibold mb-4">Train with Dina for MGVM 2024!</h3>
        </div>
      </div>
    </div>
      </section>
      <SponsorSlider />
        <ValuableAssociates />
        <Footer />
    </>
  );
};

export default LandingPage;
