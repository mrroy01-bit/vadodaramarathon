import React, { useState } from "react";
import Bhailal from "../../assest/bhailal_amin.png";
import GooglePlay from "../../assest/googleplay.png";
import { FaTimes, FaEnvelope, FaWhatsapp, FaRegCommentDots, FaQuestionCircle, FaHeadset } from "react-icons/fa";
const footerLinks = [
  { name: "Past Events", href: "/past-events" },
  { name: "Privacy Notice", href: "/privacy-notice" },
  { name: "Press", href: "/press" },
  { name: "Gallery", href: "/gallery" },
  { name: "Affiliations", href: "/know-us/affiliations" },
  { name: "FAQs", href: "/faqs" },
  { name: "Contact Us", href: "/contact" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
];

const Footer = () => {
      const [open, setOpen] = useState(false);

  return (
    <>

      {/* Floating Vertical Button */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="fixed top-1/2 right-0 -translate-y-1/2 bg-[#542F78] text-white z-50 font-semibold py-4 px-3 rounded-l-lg shadow-lg cursor-pointer"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Help & Support
        </div>
      )}

      {/* Help Panel */}
      {open && (
        <div className="fixed bottom-4 right-4 w-[300px] rounded-lg shadow-lg bg-white z-50">
          <div className="bg-black text-white p-4 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center gap-2 font-semibold text-base">
              <FaHeadset />
              Help and Support
            </div>
            <button onClick={() => setOpen(false)}>
              <FaTimes size={18} />
            </button>
          </div>

          {/* Options */}
          <div className="divide-y">
            <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100">
              <FaEnvelope className="text-[#542F78]" size={20} />
              <span>Write to us</span>
            </div>
            <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100">
              <FaWhatsapp className="text-[#542F78]" size={20} />
              <span>Chat with us</span>
            </div>
            <div className="grid grid-cols-2 divide-x border-t">
              <div className="flex items-center justify-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                <FaRegCommentDots className="text-[#542F78]" />
                <span className="text-sm">Share Feedback</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-4 cursor-pointer hover:bg-gray-100">
                <FaQuestionCircle className="text-[#542F78]" />
                <span className="text-sm">FAQ</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-zinc-50/95 pt-16 pb-8 text-zinc-800 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
            {footerLinks.map((link) => (
              <a
                href={link.href}
                key={link.name}
                className="text-base sm:text-lg font-medium text-zinc-700 hover:text-primary hover:underline transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Merchandise Button */}
          <div className="flex justify-center my-8">
            <a
              href="https://www.gingercrush.com/collections/vadodara-marathon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#542F78] text-white px-7 py-2.5 rounded text-base font-semibold shadow hover:bg-primary/90 transition">
                Marathon Memories : V M Merchandise
              </button>
            </a>
          </div>

          {/* App Stores & Partner Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 my-10">
            <div className="flex gap-6">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
              >
                <img
                  src={GooglePlay}
                  alt="Google Play Store"
                  className="h-12 sm:h-16"
                />
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Apple App Store"
                  className="h-12 sm:h-16"
                />
              </a>
            </div>
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <div className="w-36 h-14 bg-zinc-200 flex items-center justify-center rounded">
                <img
                  src={Bhailal}
                  alt="Bhailal Hospital Logo"
                  className="max-h-10"
                />
              </div>
              <div className="font-bold text-xs sm:text-sm text-zinc-700 leading-tight">
                BOOK HEALTH
                <br />
                CHECK-UP
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-zinc-200  mb-10" />

          {/* Copyright & Credits */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-500">
            <p className="text-center sm:text-left">
              2024 © Copyright Vadodara International Marathon
            </p>
            <div className="flex items-center gap-2">
              <span>Website Designed By:</span>
              <div className="w-7 h-7 bg-zinc-300 rounded-full" />
            </div>
          </div>
        </div>

        {/* Sticky Footer Offer */}
        <div className="fixed bg-[#00A0E3] bottom-0 left-0 w-full text-white text-sm font-medium py-2 px-4 z-40 shadow-inner overflow-hidden">
          <div className="whitespace-nowrap inline-block animate-marquee">
            <div className="flex items-center gap-3">
              <span>Exclusive Vadodara Marathon offers from our Partner -</span>
              <img
                src="https://vadodaramarathon.com/assets/images/njoycabs.png"
                alt="Njoy Cabs"
                className="h-6 inline-block"
              />
              <span>Njoy Cabs</span>
              <a
                className="ml-2 bg-[#542F78] text-primary px-3 py-1 rounded font-semibold hover:bg-zinc-100 transition"
                href="https://www.njoycabs.com/vm2024/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Offer
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
