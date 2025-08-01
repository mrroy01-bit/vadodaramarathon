import React from 'react';
import { ChevronRight } from 'lucide-react';
import Header from '../Header';
import Footer from './Footer';
const timelineData = [
  {
    year: "January 2023",
    edition: "10th EDITION Of Vadodara Marathon on 8th Jan 2023",
    events: [],
    align: "right",
    intermediate: null
  },
  {
    year: "15th Dec 2021 to 31st Jan 2022",
    edition: "MILE BANK Challenge",
    events: [],
    align: "left",
    intermediate: null
  },
  {
    year: "January 2021",
    edition: "Virtual Marathon : This was held from 4th to 10th January 2021",
    events: [],
    align: "right",
    intermediate: null
  },
  {
    year: "January 2020",
    edition: "4th - 10th January 2020 MGVM Virtual Marathon",
    events: [
      "29th July 2020: Dedication of 4 High Volume Rainwater Recharge Systems",
      "18th February 2020: Launch of VM Connect-Syposium \"Catatlyzing Synergies\""
    ],
    align: "left",
    intermediate: null
  },
   {
    year: "January 2020",
    edition: "5th January 2020: 9th edition of MG Vadodara International Marathon",
    events: [
      "21 December 2019: Junior Marathon",
      "17th November 2019: Triathlon Challenge in collaboration with TCCB (The Cycling Club of Baroda)"
    ],
    align: "right",
    intermediate: {
        date: "January 2019",
        title: ""
    }
  },
  {
    year: "January 2019",
    edition: "6th January 2019: 8th edition of MG Vadodara International Marathon",
    events: [
      "8th December 2018: 2nd edition of \"Women at the Wheel\" car rally",
      "7th October 2018: Super Sprint Triathlon, organized by TCCB",
      "22nd April 2018: Epreuve de Force\" - Race to Maachi, organized by TCCB"
    ],
    align: "left",
    intermediate: null
  },
   {
    year: "January 2018",
    edition: "7th January 2018: 7th edition of MG Vadodara International Marathon",
    events: [
      "16th December 2017: \"Women at the Wheel\" car rally, in collaboration with YI (Young Indians)",
      "29th October 2017: The Olympic & Super Sprint Triathlon by TCCB"
    ],
    align: "right",
    intermediate: {
        date: "February 2017",
        title: ""
    }
  },
  {
    year: "February 2017",
    edition: "6th February 2017: 6th edition of Vadodara International Marathon",
    events: [
      "27th November 2016: India's first \"Queens' Neon Run\"",
      "13th November 2016: Triathlon Challenge, organized by TCCB",
      "28th August 2016: Vadodara Marathon Relay Race",
      "21st June 2016: International Yoga Day, with underprivileged children & EME soldiers",
      "1st June 2016: Global Running Day, with 1Km Fun Run and dedicated Vadodara's first hanging sculpture"
    ],
    align: "left",
    intermediate: null
  },
  {
    year: "February 2016",
    edition: "7th February 2016: 5th edition of OPaL Vadodara Half Marathon",
    events: [
        "Launch Parade – a grand launch ceremony was held",
        "National Sports Day was celebrated, with 10Km Marathon relay race being conducted",
        "Vote Vadodara Vote - \"Human Saankal\"- chain of citizens to promote high voter turn-out in Vadodara",
        "FitZus (Fitness Zumbas), Marathon hour in gyms, walks and mini-marathons in Kamatibaug were held regularly"
    ],
    align: "right",
    intermediate: {
        date: "December 2013",
        title: ""
    }
  },
  {
    year: "December 2013",
    edition: "15 December 2013 : 4th edition of Vadodara International Half Marathon",
    events: [
        "Flash mobs were conducted all over the city"
    ],
    align: "left",
    intermediate: null
  },
  {
    year: "February 2012",
    edition: "5th February 2012: 3rd edition of Vadodara Marathon",
    events: [
        "Release of book on Maharaja Sayajirao Gaekwad III",
        "Vadodara City Olympics",
        "Sayajirao Art & Culture Festival",
        "Heritage Walks",
        "Lazer Show on Maharaja Sayajirao Gaekwad III",
        "Seminar on Vision 2023 for Vadodara"
    ],
    align: "right",
    intermediate: {
        date: "January 2011",
        title: ""
    }
  },
  {
    year: "January 2011",
    edition: "23rd January 2011: 2nd edition of Vadodara Marathon",
    events: [
        "23rd January 2011: Musical Night with Sunidhi Chauhan",
        "Cleanathon- the main roads of the city were cleaned by volunteers, with schools, colleges and corporates",
        "Cleanliness campaigns & Tree plantation drives"
    ],
    align: "left",
    intermediate: null
  },
  {
    year: "November 2009",
    edition: "22nd November 2009: 1st edition of Vadodara Marathon",
    events: [
        "Musical Night with Kailash Kher",
        "Torch Bearers Run",
        "2nd October 2009: World Record Event for Guinness World Record (11 categories) for the world's longest canvas painting",
        "Lazer & Sound Show to celebrate the cultural heritage of Vadodara \"Sanskari Nagari\""
    ],
    align: "right",
    intermediate: null
  }
];

// Helper component for the content of each timeline item
const TimelineItemContent = ({ edition, events, align }) => (
    <div className={`w-full p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white ${
        align === 'left' 
            ? 'sm:mr-4' 
            : 'sm:ml-4'
    }`}>
        <h3 className="font-bold text-base sm:text-lg md:text-xl text-slate-800 mb-3 sm:mb-4 leading-tight">{edition}</h3>
        {events.length > 0 && (
            <ul className="space-y-2 sm:space-y-3 text-slate-600">
                {events.map((event, index) => (
                    <li key={index} className="flex items-start group">
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 mt-1 text-slate-400 group-hover:text-blue-500 transition-colors duration-200 flex-shrink-0" />
                        <span className="text-xs sm:text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-200">{event}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);


const MarathonTimeline = () => {
    return (
        <>
        <Header/>
        <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 sm:py-12 md:py-20 px-4 font-sans">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                        Past Events
                    </h2>
                </div>
                
                <div className="relative">
                    {/* The vertical line */}
                    <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-0.5 sm:w-1 h-full bg-gray-500 rounded-full shadow-sm"></div>

                    <div className="space-y-8 sm:space-y-12">
                        {timelineData.map((item, index) => (
                            <React.Fragment key={index}>
                                {/* Intermediate Date Element */}
                                {item.intermediate && (
                                    <div className="flex justify-center items-center w-full mb-6 sm:mb-8">
                                        <div className="z-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded px-4 sm:px-6 py-2 sm:py-3 shadow-lg transform hover:scale-105 transition-transform duration-200">
                                            <div className="text-center">
                                                <div className="text-xs sm:text-sm">{item.intermediate.date}</div>
                                                {item.intermediate.title && (
                                                    <div className="text-xs opacity-90 mt-1">{item.intermediate.title}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Timeline Item */}
                                <div className={`flex flex-col sm:flex-row items-center w-full relative ${
                                    item.align === 'left' ? 'sm:flex-row-reverse' : ''
                                }`}>
                                    {/* Content */}
                                    <div className={`w-full sm:w-5/12 ${
                                        item.align === 'right' ? 'sm:pr-8 md:pr-12' : 'sm:pl-8 md:pl-12'
                                    }`}>
                                        <TimelineItemContent 
                                            edition={item.edition} 
                                            events={item.events} 
                                            align={item.align} 
                                        />
                                    </div>
                                    
                                    {/* Center circle and date */}
                                    <div className="flex sm:absolute sm:left-1/2 transform sm:-translate-x-1/2 flex-col items-center z-20 my-4 sm:my-0">
                                        <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg mb-2 text-xs sm:text-sm whitespace-nowrap">
                                            {item.year}
                                        </div>
                                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white border-3 sm:border-4 border-gradient-to-r from-blue-500 to-emerald-500 rounded-full shadow-lg"></div>
                                    </div>
                                    
                                    {/* Spacer for the other side */}
                                    <div className="hidden sm:block w-5/12"></div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default MarathonTimeline;
