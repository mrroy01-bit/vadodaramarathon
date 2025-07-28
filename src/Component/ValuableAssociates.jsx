import React from 'react';

// Import images from assets folder
import assoc2 from '../assest/gujarat_police.jpg';
import assoc3 from '../assest/accessible_india.jpg';
import assoc4 from '../assest/sports_gujarat.jpg';
import assoc5 from '../assest/swatch_bharat.jpg';
import assoc6 from '../assest/gujarat_police.jpg';
import assoc7 from '../assest/gujarat_police.jpg';
import assoc8 from '../assest/gujarat_police.jpg';
import assoc9 from '../assest/accessible_india.jpg';
import assoc10 from '../assest/accessible_india.jpg';
import assoc11 from'../assest/accessible_india.jpg';
import assoc12 from  '../assest/sports_gujarat.jpg';
import assoc13 from  '../assest/sports_gujarat.jpg';
import assoc14 from  '../assest/sports_gujarat.jpg';
import assoc15 from  '../assest/sports_gujarat.jpg';

const associates = [
    assoc2,
    assoc3,
    assoc4,
    assoc5,
    assoc6,
    assoc7,
    assoc8,
    assoc9,
    assoc10,
    assoc11,
    assoc12,
    assoc13,
    assoc14,
    assoc15,
];

const ValuableAssociates = () => {
    return (
        <section className="relative bg-white overflow-hidden py-16">
            {/* Angled Background Layers */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-100 -rotate-3 origin-top-left" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-green-100 -rotate-3 origin-bottom-left" />
            </div>

            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
                {/* Left Text */}
                <div className="lg:w-1/3 mt-[20vh]">
                    <h2 className="text-4xl font-bold text-purple-800">Valuable Associates</h2>
                </div>

                {/* Masonry Layout */}
                <div className="lg:w-2/3 w-full">
                    <div className="columns-2 md:columns-5 gap-4 space-y-4">
                        {associates.map((src, i) => (
                            <div key={i} className=" p-3 bg-white shadow-md rounded-md flex items-center justify-center">
                                <img src={src} alt={`Associate ${i + 2}`} className="w-full h-auto object-contain max-h-28" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValuableAssociates;
