import React from "react";

const VideoCard = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <header className="mb-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-violet-800 tracking-tight">
          Promo Video
        </h2>
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg max-w-5xl border border-violet-200 bg-white transition-shadow hover:shadow-2xl">
          <iframe
            src="https://www.youtube.com/embed/4xZRvNL5X4Y?si=OY0o_sH_6yRZfRLA"
            title="Promo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </header>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h3 className="text-2xl font-semibold text-violet-700 text-center md:text-left">
          Queen Run - Voting awareness
        </h3>
        <h3 className="text-2xl font-semibold text-violet-700 text-center md:text-left">
          VM RUN 10KM
        </h3>
        <h3 className="text-2xl font-semibold text-violet-700 text-center md:text-left">
          VM After movie 2023
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Video 2 */}
        <div className="aspect-video flex flex-col items-center rounded-xl overflow-hidden shadow-md border border-violet-100 bg-white p-2 transition-shadow hover:shadow-xl">
          <iframe
            src="https://www.youtube.com/embed/PkBL8Q3BGoM?si=KBL3OhFrkSSH3UqL"
            title="Queen Run - Voting awareness"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Video 3 */}
        <div className="aspect-video flex flex-col items-center rounded-xl overflow-hidden shadow-md border border-violet-100 bg-white p-2 transition-shadow hover:shadow-xl">
          <iframe
            src="https://www.youtube.com/embed/1quHexCETEo?si=eXawtw800G0yFxjl"
            title="VM RUN 10KM"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Video 4 */}
        <div className="aspect-video flex flex-col items-center rounded-xl overflow-hidden shadow-md border border-violet-100 bg-white p-2 transition-shadow hover:shadow-xl">
          <iframe
            src="https://www.youtube.com/embed/5WFRaMO9LsY?si=HMgtc1fLYUih6zzA"
            title="VM After movie 2023"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoCard;
