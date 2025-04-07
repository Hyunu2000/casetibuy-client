import React from "react";
import "../../style/swiper.css";

export default function Visual({ slide, swiperRef }) {
  const bgColor = {
    yellow: "bg-yellow",
    blue: "bg-blue",
    green: "bg-green",
    pink: "bg-pink",
    orange: "bg-orange",
    gray: "bg-gray",
  };

  const textColor = {
    yellow: "text-yellow",
    blue: "text-blue",
    green: "text-green",
    pink: "text-pink",
    orange: "text-orange",
    white: "text-white",
  };

  return (
    <div className="relative">
      {slide.src.endsWith(".mp4") ? (
        <video
          autoPlay
          muted
          loop
          className="object-cover w-full h-full"
          onLoadedData={() => {
            if (swiperRef.current) {
              swiperRef.current.slideTo(0, 0);
              swiperRef.current.update();
            }
          }}
        >
          <source src={slide.src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={slide.src}
          alt={slide.title}
          className="object-cover w-full h-full"
        />
      )}
      <div
        className={`absolute p-4 bottom-24 left-24 flex flex-col items-start`}
      >
        <h2
          className={`p-16 font-bold text-36 rounded-br-10 rounded-t-10 ${
            bgColor[slide.textBgColor]
          } ${textColor[slide.titleColor]}`}
        >
          {slide.title}
        </h2>
        <span
          className={`py-12 rounded-b-10 rounded-tr-10 px-15 text-20 ${
            bgColor[slide.textBgColor]
          } ${textColor[slide.textColor]}`}
        >
          {slide.description}
        </span>
      </div>
    </div>
  );
}
