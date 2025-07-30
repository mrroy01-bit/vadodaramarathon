import React from "react";
import { Images } from "../../../assest/Img/Images";

const TeamCard = ({ image, alt, title, name }) => (
  <div className="w-36 sm:w-44 flex flex-col items-center text-center">
    <img className="w-48 h-48 object-cover  mb-2" src={image} alt={alt} />
    {title && <p className="text-sm font-semibold">{title}</p>}
    <p className="text-sm">{name}</p>
  </div>
);

const TheTeam = () => {
  return (
    <section className="w-[98%] mt-28 sm:w-[90%] mx-auto my-4 sm:my-8 p-4 sm:p-6 bg-white">
      <h2 className="text-2xl sm:text-4xl font-bold">The Team</h2>
      <p className="mt-5 mb-4 text-3xl font-light text-gray-700">
        Team Vadodara Marathon comprises of Board of Directors, Management & Organizing Committee (MOC), and Front Runners.
      </p>

      {/* Board of Directors */}
      <h3 className="mt-8 mb-4 text-xl font-bold">Board of Directors</h3>
      <div className="flex flex-wrap gap-4">
        <TeamCard image={Images.TejalAmin} alt="Tejal Amin" title="Chairperson" name="Tejal Amin" />
        <TeamCard image={Images.SameerKhera} alt="Sameer Khera" title="Co-Chairperson" name="Sameer Khera" />
      </div>

      {/* Directors */}
      <h3 className="mt-8 mb-4 text-xl font-bold">Directors</h3>
      <div className="flex flex-wrap gap-4">
        {[
          { img: Images.DhanrajNathwani, name: "Dhanraj Nathwani" },
          { img: Images.NileshShukla, name: "Nilesh Shukla" },
          { img: Images.MineshPatel, name: "Minesh Patel" },
          { img: Images.OnkarSingh, name: "Onkar Singh" },
          { img: Images.BarkhaAmin, name: "Barkha Amin" },
          { img: Images.ArushaPatel, name: "Arusha Patel" },
          { img: Images.MilinMehta, name: "Milin Mehta" },
          { img: Images.ChiragPatel, name: "Chirag Patel" }
        ].map((person, i) => (
          <TeamCard key={i} image={person.img} alt={person.name} name={person.name} />
        ))}
      </div>

      {/* Executive Committee */}
      <h3 className="mt-8 mb-4 text-xl font-bold">Executive Committee Members</h3>
      <div className="flex flex-wrap gap-4">
        {[
          { img: Images.DRAmanNarula, name: "DR Aman Narula" },
          { img: Images.AppurvBhatt, name: "DR Appurv Bhatt" },
          { img: Images.AtulGarg, name: "DR Atul Garg" },
          { img: Images.ChirayuKothari, name: "DR Chirayu Kothari" },
          { img: Images.DarshanMadhvani, name: "DR Darshan Madhvani" },
          { img: Images.HarshalGohil, name: "DR Harshal Gohil" },
          { img: Images.DrHirmayPatel, name: "DR Hirmay Patel" },
          { img: Images.Jeninaik, name: "DR Jeni Naik" },
          { img: Images.KalpaRachh, name: "DR Kalpa Rachh" },
          { img: Images.KaushikParekh, name: "DR Kaushik Parekh" },
          { img: Images.DrKavitaJulka, name: "DR Kavita Julka" },
          { img: "", name: "Ketan Patel" },
          { img: Images.MananVora, name: "Manan Vora" },
          { img: "", name: "Monira Patel" },
          { img: Images.NickyJoshi, name: "Nicky Joshi" },
          { img: Images.NikitaMehta, name: "Nikita Mehta" },
          { img: Images.PawanRai, name: "Pawan Rai" },
          { img: Images.RajivBhatia, name: "Rajiv Bhatia" },
          { img: Images.RajenParikh, name: "Rajen Parikh" },
          { img: Images.ReemaNarula, name: "Reema Narula" },
          { img: Images.ReniGeorge, name: "DR Reni George" },
          { img: Images.SamikshaSinha, name: "DR Samiksha Sinha" },
          { img: Images.SavirJhulka, name: "DR Savir Jhulka" },
          { img: Images.Seemagupta, name: "DR Seema Gupta" },
          { img: Images.SuchitraParikh, name: "DR Suchitra Parikh" },
          { img: Images.SunilDalwadi, name: "DR Sunil Dalwadi" },
          { img: Images.UpendraSoni, name: "DR Upendra Soni" },
          { img: Images.UtpalShah, name: "DR Utpal Shah" },
          { img: Images.VikramjeetSinghKhera, name: "DR Vikramjeet Singh Khera" },
          { img: Images.VirendrasinhRaj, name: "DR Virendrasinh Raj" },
          { img: Images.YuvrajsinhJhala, name: "DR Yuvrajsinh Jhala" }
        ].map((person, i) => (
          <TeamCard key={i} image={person.img || "/fallback.png"} alt={person.name} name={person.name} />
        ))}
      </div>

      {/* MOC and Front Runners */}
      <div className="grid sm:grid-cols-2 gap-6 mt-16">
        <div>
          <h3 className="text-xl font-bold">Management & Organizing Committee (MOC)</h3>
          <p className="text-lg font-normal">
            All 125 members of the Organizing Committee are volunteers; they include industry leaders, entrepreneurs,
            educationists, teachers, doctors, artists, professionals from corporates and NGOs, and citizens from all
            walks of life.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Front Runners</h3>
          <p className="text-lg font-normal">
            All 150 Front Runners are volunteers; they are students from various colleges and institutes in and around
            Vadodara, offering their time, efforts and energies to the Marathon as part of their college internships.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheTeam;
