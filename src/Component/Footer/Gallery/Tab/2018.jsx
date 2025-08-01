import React, { useState, useEffect } from 'react';

import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import img1 from '../../../../assest/Gallery/2018/016088882808.jpg';
import img2 from '../../../../assest/Gallery/2018/116088882808.jpg';
import img3 from '../../../../assest/Gallery/2018/216088882818.jpg';
import img4 from '../../../../assest/Gallery/2018/316088882818.jpg';
import img5 from '../../../../assest/Gallery/2018/416088882818.jpg';
import img6 from '../../../../assest/Gallery/2018/516088882818.jpg';



const galleryImages = [
  {
    id: 1,
    src: img1,
    alt: 'Runners in a night marathon',
    year: '2022',
  },
  {
    id: 2,
    src: img2,
    alt: 'A person running past a historic building at night',
    year: '2022',
  },
  {
    id: 3,
    src: img3,
    alt: 'A crowd of supporters at a marathon event',
    year: '2019',
  },
  {
    id: 4,
    src: img4,
    alt: 'Dignitaries on a stage at an event',
    year: '2019',
  },
  {
    id: 5,
    src: img5,
    alt: 'An award ceremony on stage with a Fit India logo',
    year: '2018',
  },
  {
    id: 6,
    src: img6,
    alt: 'A large crowd at a marathon starting line',
    year: '2018',
  },
];

const ImageGallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- Event Handlers ---
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const showPrevImage = (e) => {
    e.stopPropagation(); // Prevent closing lightbox when clicking on buttons
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'ArrowLeft') {
        showPrevImage(e);
      }
      if (e.key === 'ArrowRight') {
        showNextImage(e);
      }
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Gallery</h2>
      
      {/* --- Image Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className="group relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* --- Lightbox Modal --- */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 text-white hover:text-gray-300"
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          <button
            onClick={showPrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next Button */}
          <button
            onClick={showNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75"
          >
            <ChevronRight size={32} />
          </button>
          
          {/* Image Counter */}
          <div className="absolute top-4 left-4 text-white text-lg bg-black bg-opacity-50 px-3 py-1 rounded-lg">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>

          {/* Image Display */}
          <div className="relative max-w-4xl max-h-[90vh] w-full px-12" onClick={(e) => e.stopPropagation()}>
             <img
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;