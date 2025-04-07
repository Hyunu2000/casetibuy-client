import React from "react";
import SlideItem from "./SlideItem.jsx";

export default function FeaturedCollection({ slidesData }) {
  return (
    <div className="grid w-full grid-cols-1 gap-24 lg:grid-cols-3">
      {slidesData.map((product, index) => (
        <div
          key={product.pid}
          className={`w-full      
                ${
                  index === 0
                    ? "sm:col-span-1 lg:col-span-2"
                    : index === 1 || index === 2
                    ? "sm:col-span-1 lg:col-span-1"
                    : index === 3
                    ? "sm:col-span-1 lg:col-span-2"
                    : ""
                }`}
        >
          <SlideItem key={index} {...product} />
        </div>
      ))}
    </div>
  );
}
