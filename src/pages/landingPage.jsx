import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import Banner from "../assest/banner.jpg"; // Fallback image
import VideoCard from "../Component/VideoCard";
import { heroImageService, raceCategoryService, } from "../services/api";
import SponsorSlider from "../Component/SponsorSlider";
import ValuablePartners from "../Component/ValuedPartners";
import ValuableAssociates from "../Component/ValuableAssociates";
import Footer from "../Component/Footer/Footer";
import { FaClipboardList, FaQuestionCircle, FaMoneyCheckAlt } from "react-icons/fa";

const LandingPage = () => {
  const [heroImage, setHeroImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [raceCategories, setRaceCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading state
      try {
        const [ /* heroData */ categoriesData, sponsorsData] = await Promise.all([
          // heroImageService.getHeroImage(),
          raceCategoryService.getAllCategories(),
        ]);

        // console.log("Hero Image API Response:", heroData);
        // console.log("Race Categories API Response:", categoriesData);
        
        // Safely set the hero image URL from the response object
        // if (heroData && heroData.imageUrl) {
        //   setHeroImage(heroData.imageUrl);
        // }

        // Safely set the categories, ensuring it's always an array
        const categories = categoriesData?.data || [];
        setRaceCategories(categories);


      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load page content. Please try again later.");
      } finally {
        setIsLoading(false); // ALWAYS stop loading, even if there's an error
      }
    };




    fetchData();

  }, []);


  // Default marathon cards fallback
  const defaultMarathonCards = [
    { title: "Full Marathon (42.195kms)", img: "/images/marathon1.jpg" },
    { title: "Half Marathon (21.097kms)", img: "/images/marathon2.jpg" },
    { title: "10kms", img: "/images/marathon3.jpg" },
  ];


  return (
    <>
      <Header />

      {/* Banner Section */}
      <div className="banner">
        <div className="overlay relative">
          {isLoading ? (
            <div className="w-full h-64 sm:h-96 bg-gray-200 animate-pulse"></div>
          ) : (
            <img
              src={heroImage || Banner} // Use fetched image, or fallback to the imported one
              alt="Marathon Banner"
              className="w-full h-auto object-cover"
            />
          )}
        </div>
        <div className="btn-reg flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-[#F2F2F2] text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#542F78]">
            Registrations are now open🏃
          </h2>
          <button className="btn px-4 py-2 bg-[#542F78] text-white uppercase">
            Click Here To Register
          </button>
        </div>
      </div>

      {/* Hero Text Section */}
      <div className="py-16 px-4 sm:px-10 text-center">
        <h2 className="text-2xl sm:text-5xl font-semibold text-[#542F78] leading-snug">
          We are #BackToRun. <br className="hidden sm:block" />
          Thirteenth Edition of the Vadodara Marathon.
        </h2>
        <p className="text-base sm:text-xl mt-8 font-medium leading-7 sm:leading-8 text-gray-700">
          Welcome to the MG Vadodara Marathon 2026. On 1st February become a
          part of history by participating in the 13th Edition of India's
          Largest Marathon.
        </p>
      </div>

      <VideoCard />

      {/* Info Cards */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-sky-600 text-white px-6 py-8 flex flex-col justify-between h-full rounded-md">
            <div>
              <h2 className="text-xl font-bold mb-3">Rules & Regulations</h2>
              <button className="underline text-sm">LEARN MORE →</button>
            </div>
            <FaClipboardList className="text-white/30 text-4xl self-end mt-6" />
          </div>
          <div className="bg-lime-500 text-white px-6 py-8 flex flex-col justify-between h-full rounded-md">
            <div>
              <h2 className="text-xl font-bold mb-3">FAQs</h2>
              <button className="underline text-sm">LEARN MORE →</button>
            </div>
            <FaQuestionCircle className="text-white/30 text-4xl self-end mt-6" />
          </div>
          <div className="bg-purple-800 text-white px-6 py-8 flex flex-col justify-between h-full rounded-md">
            <div>
              <h2 className="text-xl font-bold mb-3">Price Chart</h2>
              <button className="underline text-sm">LEARN MORE →</button>
            </div>
            <FaMoneyCheckAlt className="text-white/30 text-4xl self-end mt-6" />
          </div>
        </div>
      </section>

      {/* Marathon Cards Section */}
      <section className="bg-white px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(raceCategories.length > 0
              ? raceCategories
              : defaultMarathonCards
            ).map((card) => (
              <div
                key={card._id || card.title} // Use a unique key from data
                className="relative h-64 bg-cover bg-center rounded shadow-md"
                style={{ backgroundImage: `url('${card.race_category_url}')` }}
              >
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end p-4">
                  <h3 className="text-white text-lg sm:text-xl font-semibold text-center">
                    {card.category_name}
                  </h3>
                  {/* {card.description && (
                    <p className="text-white text-sm mt-2 opacity-80 text-center">
                      {card.description}
                    </p>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <SponsorSlider />
      <ValuablePartners />
      <ValuableAssociates />
      <Footer />
    </>
  );
};

export default LandingPage;