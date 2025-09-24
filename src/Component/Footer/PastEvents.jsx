import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { pastEventsAtom } from "../../store/atoms";
import { pastEventService } from "../../services/api";
import Header from "../Header";
import Footer from "./Footer";
import { ChevronRight } from "lucide-react";

// Timeline item content component
const TimelineItemContent = ({ edition, events, align }) => (
  <div
    className={`w-full p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white ${
      align === "left" ? "sm:mr-4" : "sm:ml-4"
    }`}
  >
    <h3 className="font-bold text-base sm:text-lg md:text-xl text-slate-800 mb-3 sm:mb-4 leading-tight">
      {edition}
    </h3>
    {events && events.length > 0 && (
      <ul className="space-y-2 sm:space-y-3 text-slate-600">
        {events.map((event, index) => (
          <li key={index} className="flex items-start group">
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 mt-1 text-slate-400 group-hover:text-blue-500 transition-colors duration-200 flex-shrink-0" />
            <span className="text-xs sm:text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-200">
              {event}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const MarathonTimeline = () => {
  const [pastEvents, setPastEvents] = useRecoilState(pastEventsAtom);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await pastEventService.getAll();
        // Extract the data array from the API response
        setPastEvents(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, [setPastEvents]);

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 sm:py-12 md:py-20 px-4 font-sans">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Past Events
            </h2>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-0.5 sm:w-1 h-full bg-gray-500 rounded-full shadow-sm"></div>

            <div className="space-y-8 sm:space-y-12">
              {pastEvents.map((item, index) => (
                <React.Fragment key={item._id}>
                  <div
                    className={`flex flex-col sm:flex-row items-center w-full relative ${
                      index % 2 === 0 ? "" : "sm:flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-full sm:w-5/12 ${
                        index % 2 === 0 ? "sm:pr-8 md:pr-12" : "sm:pl-8 md:pl-12"
                      }`}
                    >
                      <TimelineItemContent
                        edition={item.event_name}
                        events={item.event_desc}
                        align={index % 2 === 0 ? "right" : "left"}
                      />
                    </div>

                    <div className="flex sm:absolute sm:left-1/2 transform sm:-translate-x-1/2 flex-col items-center z-20 my-4 sm:my-0">
                      <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg mb-2 text-xs sm:text-sm whitespace-nowrap">
                        {item.event_date}
                      </div>
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white border-3 sm:border-4 border-gradient-to-r from-blue-500 to-emerald-500 rounded-full shadow-lg"></div>
                    </div>

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
