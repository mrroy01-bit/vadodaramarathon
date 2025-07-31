import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Sample sponsor images
const sponsors = [
  { src: '/images/sponsor1.png', alt: 'Joy e-bike' },
  { src: '/images/sponsor2.png', alt: 'AMI Lifesciences' },
  { src: '/images/sponsor3.png', alt: 'Conmat' },
  { src: '/images/sponsor4.png', alt: 'Indian Oil' },
  { src: '/images/sponsor5.png', alt: 'Nippon Mutual Fund' },
   { src: '/images/sponsor3.png', alt: 'Conmat' },
  { src: '/images/sponsor4.png', alt: 'Indian Oil' },
  { src: '/images/sponsor5.png', alt: 'Nippon Mutual Fund' },
];

const SponsorSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-10 bg-white">
      <h2 className="text-center text-3xl font-bold text-purple-800 mb-8">Valued Partners</h2>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Left Button */}
        <button
          ref={prevRef}
          className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-purple-100"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Button */}
        <button
          ref={nextRef}
          className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-purple-100"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

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
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {sponsors.map((sponsor, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md p-4 rounded-lg flex items-center justify-center h-40">
                <img src={sponsor.src} alt={sponsor.alt} className="max-h-full max-w-full object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SponsorSlider;
