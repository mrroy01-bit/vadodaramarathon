import React from 'react';
import Bhailal from '../assest/bhailal_amin.png';
import  GooglePlay  from '../assest/googleplay.png';
const footerLinks = [
  { name: 'Past Events', href: '#' },
  { name: 'Privacy Notice', href: '#' },
  { name: 'Press', href: '#' },
  { name: 'Gallery', href: '#' },
  { name: 'Affiliations', href: '#' },
  { name: 'FAQs', href: '#' },
  { name: 'Contact Us', href: '#' },
  { name: 'Terms & Conditions', href: '#' },
];

const Footer = () => {
    return (
        <>
            {/* Help & Support Vertical Button */}
            <div
                className="fixed top-1/2 right-0 -translate-y-1/2 bg-[#542F78] text-white z-50 font-semibold uppercase tracking-wider py-4 px-3 rounded-l-lg shadow-lg cursor-pointer"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
                Help & Support
            </div>

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
                        <button className="bg-[#542F78] text-white px-7 py-2.5 rounded text-base font-semibold shadow hover:bg-primary/90 transition">
                            Marathon Memories : V M Merchandise
                        </button>
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
                                <img src={GooglePlay} alt="Google Play Store" className="h-12 sm:h-16" />
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
                                <img src={Bhailal} alt="Bhailal Hospital Logo" className="max-h-10" />
                            </div>
                            <div className="font-bold text-xs sm:text-sm text-zinc-700 leading-tight">
                                BOOK HEALTH<br />CHECK-UP
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
                <div className="fixed bg-[#00A0E3] bottom-0 left-0 w-full bg-primary text-white text-sm font-medium py-2 px-4 z-40 shadow-inner">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                        <span>
                            Exclusive Vadodara Marathon offers from our Partner -
                        </span>
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
            </footer>
        </>
    );
};

export default Footer;