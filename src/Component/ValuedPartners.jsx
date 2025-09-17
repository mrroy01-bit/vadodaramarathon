import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { partnerService } from "../services/api";
import "swiper/css";
import "swiper/css/navigation";

const PartnerSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch partners from the API
        const response = await partnerService.getAllPartners();

        const partnersArray =
          response?.data && Array.isArray(response.data)
            ? response.data
            : Array.isArray(response)
            ? response
            : [];
        setPartners(partnersArray);
      } catch (err) {
        console.error("Error loading partners:", err);
        setError("Failed to load partners. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper component for loading state
  const LoadingSkeleton = () => (
    <div className="animate-pulse bg-gray-200 shadow-md p-4 rounded-lg flex items-center justify-center h-40"></div>
  );

  return (
    <section className="py-10 bg-white">
           {" "}
      <h2 className="text-center text-3xl font-bold text-purple-800 mb-8">
        Valued Partners
      </h2>
           {" "}
      <div className="relative max-w-7xl mx-auto px-4">
                {/* Left Button */}       {" "}
        <button
          ref={prevRef}
          className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-purple-100"
        >
                   {" "}
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
                       {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
                     {" "}
          </svg>
                 {" "}
        </button>
                {/* Right Button */}       {" "}
        <button
          ref={nextRef}
          className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-purple-100"
        >
                   {" "}
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
                       {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
                     {" "}
          </svg>
                 {" "}
        </button>
        {isLoading ? (
          <div className="flex space-x-5">
            {[...Array(5)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
            {error}
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center text-gray-500 bg-gray-100 p-4 rounded-lg">
            No partners to display.
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            loop
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // Fix for React refs with Swiper navigation
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 30 },
            }}
          >
                     {" "}
            {partners.map((partner) => (
              <SwiperSlide key={partner._id || partner.id}>
                             {" "}
                <div className="bg-white shadow-md p-4 rounded-lg flex items-center justify-center h-40">
                                 {" "}
                  <img
                    src={partner.partner_img_url}
                    alt={partner.partner_name}
                    className="max-h-full max-w-full object-contain"
                  />
                               {" "}
                </div>
                           {" "}
              </SwiperSlide>
            ))}
                   {" "}
          </Swiper>
        )}
             {" "}
      </div>
         {" "}
    </section>
  );
};

export default PartnerSlider;
