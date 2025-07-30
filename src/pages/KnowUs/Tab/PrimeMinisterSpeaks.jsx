import React from 'react';

import thumb2021 from '../../../assest/Pdf/pm_minister_2021_img.jpg';
import thumb2020 from '../../../assest/Pdf/pm_minister_2020_img.jpg';
import thumb2019 from '../../../assest/Pdf/pm_minister_2019_img.jpg';
import thumb2018 from '../../../assest/Pdf/pm_minister_2018_img.jpg';
import thumb2017 from '../../../assest/Pdf/pm_minister_2017_img.jpg'; 
import thumb2016 from '../../../assest/Pdf/pm_minister_2016_img.jpg'; 

// PDF files
import pdf2021 from '../../../assest/Pdf/pm_message_2021.pdf';
import pdf2020 from '../../../assest/Pdf/pm_message_2020.pdf';
import pdf2019 from '../../../assest/Pdf/pm_message_2019.pdf';
import pdf2018 from '../../../assest/Pdf/pm_message_2018.pdf';
import pdf2017 from '../../../assest/Pdf/pm_message_2017.pdf'; 
import pdf2016 from '../../../assest/Pdf/pm_message_2016.pdf'; 

const messages = [
  { year: 2021, thumbnail: thumb2021, pdf: pdf2021 },
  { year: 2020, thumbnail: thumb2020, pdf: pdf2020 },
  { year: 2019, thumbnail: thumb2019, pdf: pdf2019 },
  { year: 2018, thumbnail: thumb2018, pdf: pdf2018 },
  { year: 2017, thumbnail: thumb2017, pdf: pdf2017 },
  { year: 2016, thumbnail: thumb2016, pdf: pdf2016 },
];

const PrimeMinisterSpeaks = () => {
  return (
    <div className="p-4 mt-28 sm:p-6">
      <h1 className="mb-6 text-2xl sm:text-3xl font-semibold text-center">Prime Minister Speaks</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {messages.map((msg, index) => (
          <a
            key={index}
            href={msg.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden transition duration-300 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl"
          >
            <img
              src={msg.thumbnail}
              alt={`PM Message ${msg.year}`}
              className="object-cover w-full h-48 sm:h-64 md:h-72 lg:h-80"
            />
            <div className="py-3 text-base sm:text-lg font-medium text-center text-gray-800 bg-white">
              PM Message {msg.year}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PrimeMinisterSpeaks;
