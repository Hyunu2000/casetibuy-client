import React from "react";
import FeaturedCollection from "../component/slide/FeaturedCollection.jsx";
import Slide from "../component/slide/Slide.jsx";
import { useSlide } from "../hooks/useSlide.js";

export default function Home() {
  const { slideList, hnrSlides } = useSlide();
  
  const title = {
    recommended: "Recommended Collection",
    hot: "Now Hot Designs!",
    new: "#CasetibuyNew",
  };

  return (
    <div>
      {/* visual slider */}
      <Slide
        slidesData={slideList.visualSlideImage || []}
        className="visual"
        pagination={true}
        navigation={false}
        slidesPerView="1"
        spaceBetween="0"
        loop={true}
        autoplay={true}
        slidesPerGroup={1}
      />

      {/* collaborator */}
      <Slide
        slidesData={slideList.collaborator || []}
        className="collaborator"
        pagination={false}
        navigation={true}
        slidesPerView="4.9"
        spaceBetween="30"
        autoplay={false}
        loop={false}
        navStyle="navigation-collabo"
        slidesPerGroup={1}
      />

      {/* Featured Collection */}
      <div className="content product-container bg-bg">
        <h2 className="pb-16 font-bold text-36">Featured Collection</h2>
        <FeaturedCollection slidesData={slideList.featuredCollection || []} />
      </div>

      {/* Common Slides */}
      {Object.entries(hnrSlides).map(([key, value]) => (
        <div className="overflow-visible content bg-bg">
          <h2 className="pt-32 pb-16 pl-32 font-bold text-36">
            {title[key] || key}
          </h2>
          <div className="pb-32">
            <Slide
              slideKey={key}
              className="common"
              slidesData={value}
              pagination={{
                el: `.custom-pagination-${key}`,
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="${className} custom-bullet"></span>`;
                },
              }}
              navigation={{
                nextEl: `.custom-next-${key}`,
                prevEl: `.custom-prev-${key}`,
              }}
              slidesPerView={3.5}
              spaceBetween="30"
              autoplay={false}
              loop={false}
              slidesPerGroup={3}
              slidesOffsetBefore={32}
              slidesOffsetAfter={32}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
