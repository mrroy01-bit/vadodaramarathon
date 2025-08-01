import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "./Footer";


const ArticlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="p-6 text-center text-red-600">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 underline mt-4"
        >
          ← Back to Press Page
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-white px-4 sm:px-6 py-6 sm:py-8 md:py-10 max-w-4xl mx-auto text-[#3b2352] mt-4 sm:mt-6 rounded-lg shadow-sm">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">{article.title}</h1>
        <p className="text-green-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
          Press Conference on {article.date}
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-700">{article.full}</p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm sm:text-base font-medium"
        >
          <span className="mr-2">←</span> Back to All Press Articles
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ArticlePage;
