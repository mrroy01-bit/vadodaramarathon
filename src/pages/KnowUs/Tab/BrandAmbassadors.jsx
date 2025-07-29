import React from "react";
import {Images } from "../../../assest/Img/Images";
const BrandAmbassadors = () => {
  return (
    <section className="w-11/12 p-6 mx-auto my-8 ">
      <h1 className="mt-4 mb-3 text-2xl font-semibold">Brand Ambassadors</h1>
      <p className="mb-4 text-3xl font-light text-left text-gray-700">
        Vadodara Marathon is extremely grateful for the support of the Brand
        Ambassadors, who are sporting heroes and role models for society.
      </p>
      <span className="mb-4 text-lg font-normal">
        Brand Ambassadors of the 11th edition, to be held on 7th January 2024.
      </span>
      <div className="flex flex-wrap gap-4">
        <span>
          <img
            src={Images.Img1}
            alt="Brand Ambassador"
            className="object-cover w-48 h-48 m-2 rounded-lg shadow"
          />
          <p className="text-center">Irfan Pathan</p>
        </span>
        <span>
          <img
            src={Images.Img2}
            alt="Brand Ambassador"
            className="object-cover w-48 h-48 m-2 rounded-lg shadow"
          />
          <p className="text-center">Yusuf Pathan</p>
        </span>
        <span>
          <img
            src={Images.Img3}
            alt="Brand Ambassador"
            className="object-cover w-48 h-48 m-2 rounded-lg shadow"
          />
          <p className="text-center">Dr. Bhagwatiben Oza</p>
        </span>
        <span>
          <img
            src={Images.Img4}
            alt="Brand Ambassador"
            className="object-cover w-48 h-48 m-2 rounded-lg shadow"
          />
          <p className="text-center">Mira Erda</p>
        </span>
        <span>
          <img
            src={Images.Img5}
            alt="Brand Ambassador"
            className="object-cover w-48 h-48 m-2 rounded-lg shadow"
          />
          <p className="text-center">Mira Erda</p>
        </span>
      </div>
    </section>
  );
};

export default BrandAmbassadors;
