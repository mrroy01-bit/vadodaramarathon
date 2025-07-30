import React from "react";
import { Images } from "../../../assest/Img/Images";
const BrandAmbassadors = () => {
  return (
    <section className="w-11/12 p-4 mt-28 sm:p-6 mx-auto my-8">
      <h1 className="mt-4 mb-3 text-xl sm:text-2xl font-semibold">Brand Ambassadors</h1>
      <p className="mb-4 text-xl sm:text-3xl font-light text-left text-gray-700">
        Vadodara Marathon is extremely grateful for the support of the Brand
        Ambassadors, who are sporting heroes and role models for society.
      </p>
      <span className="mb-4 text-base sm:text-lg font-normal block">
        Brand Ambassadors of the 11th edition, to be held on 7th January 2024.
      </span>
      <div className="flex flex-wrap gap-4 justify-center">
        <span className="flex flex-col items-center w-32 sm:w-48">
          <img
            src={Images.Img1}
            alt="Brand Ambassador"
            className="object-cover w-32 h-32 sm:w-48 sm:h-48 m-2 rounded-lg shadow"
          />
          <p className="text-center text-sm sm:text-base">Irfan Pathan</p>
        </span>
        <span className="flex flex-col items-center w-32 sm:w-48">
          <img
            src={Images.Img2}
            alt="Brand Ambassador"
            className="object-cover w-32 h-32 sm:w-48 sm:h-48 m-2 rounded-lg shadow"
          />
          <p className="text-center text-sm sm:text-base">Yusuf Pathan</p>
        </span>
        <span className="flex flex-col items-center w-32 sm:w-48">
          <img
            src={Images.Img3}
            alt="Brand Ambassador"
            className="object-cover w-32 h-32 sm:w-48 sm:h-48 m-2 rounded-lg shadow"
          />
          <p className="text-center text-sm sm:text-base">Dr. Bhagwatiben Oza</p>
        </span>
        <span className="flex flex-col items-center w-32 sm:w-48">
          <img
            src={Images.Img4}
            alt="Brand Ambassador"
            className="object-cover w-32 h-32 sm:w-48 sm:h-48 m-2 rounded-lg shadow"
          />
          <p className="text-center text-sm sm:text-base">Mira Erda</p>
        </span>
        <span className="flex flex-col items-center w-32 sm:w-48">
          <img
            src={Images.Img5}
            alt="Brand Ambassador"
            className="object-cover w-32 h-32 sm:w-48 sm:h-48 m-2 rounded-lg shadow"
          />
          <p className="text-center text-sm sm:text-base">Mira Erda</p>
        </span>
      </div>
    </section>
  );
};

export default BrandAmbassadors;
