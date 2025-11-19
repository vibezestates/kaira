import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";

import bgimg from "../assets/images/experience-background.webp";
import { Quote } from "lucide-react";

const reviews = [
  {
    name: "Akila Sharma",
    text: `I had a wonderful experience with Vibez Estates! The entire team is highly professional, transparent, and supportive throughout the process. From site visits to finalising the property, everything was well-organised and smooth. Special thanks to Prema and Krishna for their patience in answering all my questions and making the entire journey stress-free. The quality of the properties and the scenic locations are truly impressive. Highly recommend Vibez Estates to anyone looking for a beautiful property and a hassle-free buying experience!`,
  },
  {
    name: "Jagadeesh Nadar",
    text: `I and my wife visited Dharmasthala for Bilvadhara, and I loved the land! The main reason that made me buy the property was the Netravathi river just at the backdrop of the project — I instantly knew it was the right choice. Thanks to the Vibez Legal Team and Director Miss Shubha for the proper guidance throughout the project till registration.`,
  },
];

export default function ReviewSlider() {
  return (
    <div className="w-full">
      <section
        className="py-16"
        id="reviews"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-4xl md:text-7xl tracking-tighter text-brown font-primary pb-4 border-b-2 border-brown-light inline-block">
            What Our Clients Say
          </h2>

          {/* Slider */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            className="p-4"
            style={{
                paddingTop:"40px",
                paddingBottom:"10px"
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div
                  className="shadow-md rounded-2xl p-8 text-left relative overflow-hidden 
      hover:shadow-lg transition-shadow duration-300 
      h-full flex flex-col"
                >
                  <Quote className="absolute top-6 right-6 text-green-400 opacity-20 w-12 h-12" />

                  <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
                    {review.text}
                  </p>

                  <h4 className="text-lg font-semibold text-green-700 mt-auto">
                    {review.name}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows BELOW */}
      <div className="flex justify-center space-x-6 mt-4">
  <button
    className="prev-btn w-12 h-12 flex items-center justify-center bg-transparent border border-gray-300 rounded-full shadow hover:bg-gray-100 transition"
  >
    <ChevronLeft className="w-6 h-6 text-gray-700" />
  </button>

  <button
    className="next-btn w-12 h-12 flex items-center justify-center bg-transparent border border-gray-300 rounded-full shadow hover:bg-gray-100 transition"
  >
    <ChevronRight className="w-6 h-6 text-gray-700" />
  </button>
</div>
        </div>
      </section>
    </div>
  );
}
