import React from "react";
import { Images } from "../../../assest/Partners/Images";

const Partners = () => {
  return (
    <section className="py-10 mt-28 bg-white">
      <div className="max-w-4xl px-4 mx-auto">
        <h1 className="mb-8 text-3xl font-extrabold text-center text-gray-900">
          Our Partners
        </h1>
        <div className="grid items-center grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {Images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Partner ${index + 1}`}
              className="object-contain w-full h-24 p-2 rounded shadow-sm bg-gray-50"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
