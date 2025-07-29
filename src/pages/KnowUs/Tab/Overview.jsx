import React from "react";
import OverViewImg from "../../../assest/img_overview.jpg"; 
const Overview = () => {
  return (
    <>
      <section className="w-[90%] mx-auto my-8 p-6 bg-white">
        <h1 className="mt-4 mb-3 text-2xl font-semibold">Overview</h1>
        <p className="mb-4 text-2xl text-left text-gray-700">
          Vadodara Marathon (VM) was incepted in 2009; as a not for profit
          organization under Section 25 of the Companies Act. Vadodara Marathon
          (VM) enthuses and encourages citizens to adopt a fitness oriented and
          healthy lifestyle.
        </p>
        <img src={OverViewImg} alt="Vadodara Marathon" />
        <p className="mb-4 text-lg text-left text-gray-700">
          Each edition of the Marathon attracts elite professional runners from
          all over the world and India; along with citizens from Gujarat.
          Vadodara Marathon has grown from strength to strength, becoming the
          largest international sporting event in Gujarat, and among the top 10
          Marathons in India.
        </p>
        <p className="mb-4 text-lg text-left text-gray-700">
          Vadodara Marathon is an AIMS accredited Marathon, and is also
          accredited to AFI, SAI, SAG, and BDAAA. Vadodara Marathon isalso a
          World Marathon Majors Qualifying Race of the Abbott Wanda World
          Marathon Majors.
        </p>
        <p className="mb-4 text-lg text-left text-gray-700">
          Vadodara Marathon’s motto of “Sports, Seva, Swachhta”is at the core of
          all the activities, supporting various social and civic causes.
          Vadodara Marathon, or VM, offers a platform to local NGOs and Divyang
          Associations to increase their visibility, raise awareness and funds
          for their causes. VM Connect is another focussed initiative to connect
          NGOs with corporate organizations and individual donors, to get the
          requisite support, resources and funding.
        </p>
        <h3 className="mt-4 text-2xl font-bold">Mission Statement</h3>
        <h4 className="mt-2 text-xl font-semibold">SPORTS SEVA SWACHHTA</h4>

        <p className="mb-4 text-lg text-left text-gray-700">
          VM is committed to enhancing and promoting health and wellness of the
          individual and nation of large through the joy of the sport of
          running. Vadodara Marathon aims to be a facilitator to promote civic
          causes by encouraging individuals, corporates and social organizations
          to collaborate with shared time and resources.
        </p>
        <h3 className="mt-4 text-2xl font-bold">Vision Statement</h3>
        <p className="mb-4 text-lg text-left text-gray-700">
          Vadodara Marathon is committed to enhancing and promoting health and
          wellness of the individual and nation at large, through the joy of the
          sport of running. Vadodara Marathon aims to be a facilitator to
          promote civic causes by encouraging individuals, corporates and social
          organizations to collaborate with shared time and resources.
        </p>
      </section>
    </>
  );
};

export default Overview;
