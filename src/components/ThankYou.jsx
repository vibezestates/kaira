import React, { useState } from "react";
import bgimg from "../assets/images/experience-background.webp";


export default function Welcome() {

  return (
    <section
      className="py-6 md:py-8 md:p8 font-primary"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 sm:px-10 md:px-16">
        {/* Left Content */}
        <div className="w-full text-center md:text-left">
          <h2 className="text-4xl font-secondary sm:text-6xl md:text-5xl font-bold tracking-tighter pb-6 text-brown">
            Thank you !
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-brown leading-relaxed mb-2 md:mb-6">
          Our team will contact you soon.
          </p>

        </div>
      </div>
    </section>
  );
}
