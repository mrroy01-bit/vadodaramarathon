import React from 'react';

// Logos
import logoAIMS from '../../../assest/Affiliations/aims.png';
import logoAbbott from '../../../assest/Affiliations/abbott_world_marathon_majors.png';
import logoAFI from '../../../assest/Affiliations/athletics.png';
import logoSAI from '../../../assest/Affiliations/sports_authority_of_India.png';
import logoSAG from '../../../assest/Affiliations/sporth_authority_gujarat.png';
import logoGSAAA from '../../../assest/Affiliations/gsaaa.png';
import logoBDAAA from '../../../assest/Affiliations/bdaaa.png';

const affiliations = [
  {
    logo: logoAIMS,
    title: 'Association of International Marathons and Distance Races (AIMS)',
    desc: 'AIMS is the international certifying body, having 470 members in 123 countries, with its headquarters in Athens, Greece.',
    link: '#',
  },
  {
    logo: logoAbbott,
    title: 'Abbott Wanda Marathon Majors (AbbottWMM)',
    desc: 'Abbott Wanda Marathon Majors has launched AbbottWMM Global Run Club where you can connect, compete and celebrate your achievements as part of the global running community. There are challenges to suit every runner and a leaderboard for anyone running a marathon. The Global Run Club is open for membership and its totally free!',
    link: '#',
  },
  {
    logo: logoAFI,
    title: 'Athletics Federation of India (AFI)',
    desc: 'AFI is the apex body for running and managing athletics in India and affiliated to IAAF, AAA and Indian Olympic Association. The AFI has as many as 32 affiliated state units and institutional units, having come into existence in 1946, with its headquarters in New Delhi, India.',
    link: '#',
  },
  {
    logo: logoSAI,
    title: 'Sports Authority of India (SAI)',
    desc: 'SAI is the apex national sports body of India, established in 1982 by the Ministry of Youth Affairs and Sports of the Government of India, for development of sports in India, with its headquarters in New Delhi, India.',
    link: '#',
  },
  {
    logo: logoSAG,
    title: 'Sports Authority of Gujarat (SAG)',
    desc: 'SAG was established in 1993 as an autonomous body to encourage, promote and develop sports culture in Gujarat, with its headquarters in Gandhinagar, Gujarat, in India. SAG prepares the young sporting talent of the state for various national and international events..',
    link: '#',
  },
  {
    logo: logoGSAAA,
    title: 'Gujarat State Amateur Athletic Association (GSAAA)',
    desc: 'GSAAA was established to provide support for amateur athletics in Gujarat, with its headquarters in Gandhinagar, Gujarat in India.',
    link: '#',
  },
  {
    logo: logoBDAAA,
    title: 'Baroda District Amateur Athletics Association (BDAAA)',
    desc: 'BDAAA supports amateur athletics in and around Vadodara, Gujarat.',
    link: '#',
  },
];

const AffiliationsCard = ({ index, logo, title, desc, link }) => {
  return (
    <div
      key={index}
      className="p-5 w-full max-w-xs bg-white border rounded-lg shadow-md hover:shadow-lg transition duration-300 mx-auto flex flex-col"
    >
      <img
        src={logo}
        alt={title}
        className="object-contain w-32 h-20 mb-4 mx-auto"
      />

      <h3 className="mb-2 text-lg font-semibold text-left">{title}</h3>
      <p className="mb-4 text-sm text-left text-gray-600">{desc}</p>

      <div className="text-left mt-auto">
        <a
          href={link}
          className="inline-flex items-center font-medium text-blue-500 hover:underline"
        >
          KNOW MORE
          <span className="ml-1">→</span>
        </a>
      </div>
    </div>
  );
};

const Affiliations = () => {
  return (
    <div className="p-4 mt-28 sm:p-6">
      <h2 className="mb-8 text-2xl sm:text-3xl font-semibold text-center">Affiliations</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {affiliations.slice(0, 8).map((item, index) => (
          <AffiliationsCard
            key={index}
            logo={item.logo}
            title={item.title}
            desc={item.desc}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Affiliations;
