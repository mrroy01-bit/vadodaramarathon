import React from "react";
import { Images } from "../../../assest/NGO Partner/images";
const NGOPartner = () => {
  return (
    <>
      <section className="mt-32 mb-8 w-[90%] max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">NGO Partner</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Images.map((img, idx) => (
            <div key={idx} className="card bg-white rounded shadow p-2 flex items-center justify-center">
              <img src={img} alt="NGO Partner" className="object-contain h-24 w-full" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default NGOPartner;
