import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const VMConnect = () => {
  return (
    <>
      <section className="mt-32 mb-8 w-[90%] max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold">VM Connect</h1>
        <p className="mt-4 text-lg text-left text-gray-700">
          VM Connect is a platform to connect local NGO’s with corporate
          sponsors, funding agencies, and individual donors, was launched on
          18th February 2020, with a symposium to provide a better understanding
          of CSR and also facilitate engagement between corporate organizations
          and NGOs associated with the Marathon. The symposium included address
          by Chief Guest Mr. Rajeev Chaba (MD, MG Motor India); and Key Note
          Address by PadmaShri Dr. M.H.Mehta (Chairman, Gujarat Life Sciences)
          on the theme “Water Conservation and Ecological Impact”.
        </p>
        <p className="mt-4 text-lg text-left text-gray-700">
          Mr. Nishith Dand (Founder, Pagdand) gave a presentation on the VM-
          Pagdand collaboration - “Chalo Recharge Karein”- for recharging of
          ground water levels in Vadodara. This was followed by a Panel
          Discussion on Catalyzing Synergies”, which shed light on all aspects
          of CSR- compliance & regulatory issues related to CSR funding, sharing
          of industry & NGO experiences and expectations.
        </p>
        <p className="mt-4 text-lg text-left text-gray-700">
          The panelists included representation from industry, NGO, as well as
          legal compliance of CSR, with PadmaShri Dr. Subroto Das (Managing
          Trustee, Lifeline Foundation), Mr. Deepak Asher (Director & Group
          Head, INOX Group of Companies), Mr. Samir Parikh (C.A., Amin Parikh &
          Co), Mr. Rikesh Desai (Managing Trustee, Mook Dhwani Trust), Mrs.
          Tejal Amin (Chairperson, Vadodara Marathon & Navrachana Education
          Society); and moderated by Mr. Harsh Purohit (Founder Director,
          Cognito). The symposium ended with 15 NGO’s projects for CSR being
          presented, with these NGO’s connecting with corporate CSR Heads and
          funding agencies.
        </p>
        <p className="mt-4 text-lg text-left text-gray-700 mb-4">
          Dedication of 4 High Volume Rainwater Recharge Systems was held by
          Vadodara Marathon via a virtual event on 29th July 2020, in the
          virtual presence of PadmaShri Dr. M.H.Mehta (Chairman, Gujarat Life
          Sciences). Vadodara Marathon has created 4 high volume rainwater
          recharge systems, in collaboration with Pagdand, a local NGO that is
          specialized in biodiversity and conservation. These 4 rainwater
          recharge systems are located at Sama Sports Complex, Manjalpur Sports
          Complex, and Atithigruh and Sambhavnath Marg in Diwalipura.
        </p>
        <span className="font-bold ">Details of the project include:</span>
        <ul className="list-disc list-inside mt-4 text-lg text-left text-gray-700">
          <li className="mt-2">
            Storage Capacity:
            <p className="mt-2 flex items-center gap-2">
              <IoIosArrowForward />
              <span>Silt Trap: 2,500 litres</span>
            </p>
            <p className="mt-2 flex items-center gap-2">
              <IoIosArrowForward />
              <span>Storage Tank: 5,000 litres</span>
            </p>
          </li>
          <li className="mt-2">
            Underground Percolation Speed: 15,000 litres/hour
          </li>
          <li className="mt-2">
            Total Recharge in a Season: 25,00,000 litres
          </li>
        </ul>
      </section>
    </>
  );
};

export default VMConnect;
