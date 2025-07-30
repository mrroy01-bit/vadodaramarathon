import React from "react";

const ObservershipProgram = () => {
  return (
    <>
      <section className="mt-32 mb-6 w-[95%] max-w-4xl mx-auto px-2 sm:mt-16 sm:mb-8 sm:w-[90%] sm:px-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            The MG Nurture Observership Program
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-left text-gray-700">
            MG Motor and Vadodara Marathon launched MG Nurture, an Observership
            program for medical students evacuated from Ukraine. The initiative
            allows displaced students to regain their confidence within a
            medical environment in a two month (15 March to 15 May) allowance
            paid, certificate program as observers in our partner hospitals.
          </p>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-left text-gray-700">
            Tricolor Hospitals, Bhailal Amin General Hospital, Global Hospital,
            Welcare Hospital, and Isha Hospital. Interested students can reach
            us at our Helpdesk{" "}
            <span className="font-bold">+91 93775 38392</span> or write to us at
            <span className="block sm:inline font-bold text-lg sm:text-2xl break-all">
              {" "}
              mgnurture@vadodaramarathon.com
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default ObservershipProgram;
