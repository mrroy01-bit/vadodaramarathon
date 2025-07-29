import React from 'react';
import Sponsor1 from '../../../assest/Sponsors/1609220290.png';
import Sponsor2 from '../../../assest/Sponsors/1672808880.jpg';
import Sponsor3 from '../../../assest/Sponsors/1693283186.png';
import Sponsor4 from '../../../assest/Sponsors/1703667333.jpg';
import Sponsor5 from '../../../assest/Sponsors/1734415364.png';
import Sponsor6 from '../../../assest/Sponsors/1734431653.jpg';
import Sponsor7 from '../../../assest/Sponsors/1736425099.jpg';
import Sponsor8 from '../../../assest/Sponsors/1736509226.png';
import Sponsor9 from '../../../assest/Sponsors/1736510210.png';
import Sponsor10 from '../../../assest/Sponsors/1742808717.png';


const Sponsors = () => {
  const sponsors = [
    { src: Sponsor1, alt: "Sponsor 1" },
    { src: Sponsor2, alt: "Sponsor 2" },
    { src: Sponsor3, alt: "Sponsor 3" },
    { src: Sponsor4, alt: "Sponsor 4" },
    { src: Sponsor5, alt: "Sponsor 5" },
    { src: Sponsor6, alt: "Sponsor 6" },
    { src: Sponsor7, alt: "Sponsor 7" },
    { src: Sponsor8, alt: "Sponsor 8" },
    { src: Sponsor9, alt: "Sponsor 9" },
    { src: Sponsor10, alt: "Sponsor 10" },
  ];

  return (
    <section className="w-[90%] mx-auto my-8 p-8 bg-white ">
      <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl">Sponsors</h1>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center">
        {sponsors.map((s, i) => (
          <div key={i} className="flex items-center justify-center p-4 transition rounded-lg shadow-sm bg-gray-50 hover:shadow-md">
            <img
              src={s.src}
              alt={s.alt}
              className="object-contain w-auto max-h-24"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sponsors;
