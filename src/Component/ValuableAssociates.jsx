import React, { useState, useEffect } from 'react';
import { associateService } from '../services/api'; // Correct service import

const ValuableAssociates = () => {
  const [associates, setAssociates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch associates from the API
        const response = await associateService.getAllAssociates();

        const associatesArray = response?.data && Array.isArray(response.data) 
          ? response.data 
          : (Array.isArray(response) ? response : []);
        
        setAssociates(associatesArray);

      } catch (err) {
        console.error("Error loading associates:", err);
        setError("Failed to load associates. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative bg-white overflow-hidden py-16">
      {/* Angled Background Layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-100 -rotate-3 origin-top-left" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-green-100 -rotate-3 origin-bottom-left" />
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Left Text */}
        <div className="lg:w-1/3 flex items-center justify-center lg:justify-start">
          <h2 className="text-4xl font-bold text-purple-800 text-center lg:text-left">Valuable Associates</h2>
        </div>

        {/* Masonry Layout */}
        <div className="lg:w-2/3 w-full">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="columns-2 md:columns-5 gap-4 space-y-4">
              {associates.map((associate) => (
                <div key={associate._id || associate.id} className="p-3 bg-white shadow-md rounded-md flex items-center justify-center">
                  <img 
                    src={associate.associate_img_url} 
                    alt={associate.associate_website_url || 'Associate Logo'} 
                    className="w-full h-auto object-contain max-h-28" 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ValuableAssociates;
