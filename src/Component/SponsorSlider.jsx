import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { sponsorService } from '../services/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const SponsorSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [sponsors, setSponsors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch sponsors from the API
        const response = await sponsorService.getAllSponsors();

        
        const sponsorsArray = response?.data && Array.isArray(response.data) 
          ? response.data 
          : (Array.isArray(response) ? response : []);
        
        setSponsors(sponsorsArray);

      } catch (err) {
        console.error("Error loading sponsors:", err);
        setError("Failed to load sponsors. Please try again later.");
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
      <h2 className="text-center text-3xl font-bold text-purple-800 mb-8">Valued Sponsors</h2>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-purple-100 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          ref={nextRef}
          className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-purple-100 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Conditional Rendering based on state */}
        {isLoading ? (
          <div className="flex space-x-5">
            {[...Array(5)].map((_, i) => <LoadingSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>
        ) : sponsors.length === 0 ? (
          <div className="text-center text-gray-500 bg-gray-100 p-4 rounded-lg">No sponsors to display.</div>
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
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 30 },
            }}
          >
            {sponsors.map((sponsor) => (
              <SwiperSlide key={sponsor._id || sponsor.id}>
                <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer">
                  <div className="  flex items-center justify-center h-40  hover:shadow-lg transition-all duration-200">
                    {sponsor.sponsor_img_url ? (
                      <img
                        src={sponsor.sponsor_img_url}
                        alt={sponsor.sponsor_name}
                        className="max-h-full max-w-full object-contain rounded-md drop-shadow-sm transition-transform duration-200 hover:scale-105"
                        style={{ background: '#f6f6fa', padding: '8px' }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                        <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 14.5l2.5-3 2.5 3M14 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="mt-2 text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default SponsorSlider;