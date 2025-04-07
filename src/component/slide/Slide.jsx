import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { HiArrowLongRight, HiArrowLongLeft } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import SlideItem from "./SlideItem.jsx";
import Visual from "./Visual.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../style/swiper.css";

export default function Slide({
  slidesData,
  pagination,
  navigation,
  className,
  slidesPerView,
  spaceBetween,
  loop,
  autoplay,
  slidesPerGroup,
  slideKey,
  slidesOffsetBefore,
  slidesOffsetAfter,
}) {
  const swiperRef = useRef(null);
  const location = useLocation();
  const { setIconColor } = useTheme(); // Header 아이콘 색상 변경

  // 홈(`/home`)으로 돌아올 때 슬라이드 첫 번째 이미지의 `iconColor` 적용
  useEffect(() => {
    if (
      location.pathname === "/home" &&
      className === "visual" &&
      slidesData.length > 0
    ) {
      setIconColor(slidesData[0]?.iconColor === "white" ? "white" : "black");
    }
  }, [location.pathname, slidesData, className, setIconColor]);

  return (
    <div className={`swiper-container`}>
      <Swiper
        className={`custom-swiper ${className}`}
        ref={swiperRef}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        observer={true}
        observeParents={true}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        slidesOffsetBefore={slidesOffsetBefore}
        slidesOffsetAfter={slidesOffsetAfter}
        spaceBetween={spaceBetween}
        loop={loop}
        autoplay={autoplay ? { delay: 5000 } : false}
        pagination={pagination}
        navigation={navigation}
        modules={[Pagination, Navigation, Autoplay]}
        onSlideChange={(swiper) => {
          const activeSlide = slidesData?.[swiper.realIndex];
          if (activeSlide) {
            setIconColor(activeSlide.iconColor === "white" ? "white" : "black");
          }
        }}
      >
        {/* 슬라이드 내용 */}
        {slidesData.map((slide, index) => {
          return className === "visual" ? (
            <SwiperSlide key={index} className="bg-black">
              <Link
                key={slide.pid}
                to={`/detail/${slide.pid}`}
                state={{ activeCase: slide.caseType, activeColor: slide.color }} // caseType과 color 함께 전달
                onClick={() => window.scrollTo(0, 0)}
                draggable="false"
              >
                <Visual key={index} slide={slide} swiperRef={swiperRef} />
              </Link>
            </SwiperSlide>
          ) : className === "collaborator" ? (
            <SwiperSlide key={index}>
              <Link
                key={slide.pid}
                to={`/detail/${slide.pid}`}
                state={{ activeCase: slide.caseType, activeColor: slide.color }} // caseType과 color 함께 전달
                onClick={() => window.scrollTo(0, 0)}
                draggable="false"
              >
                <div className="px-20 py-10 overflow-hidden border border-grayhborder rounded-20">
                  <img src={slide.image} alt={index} className="w-full" />
                </div>
              </Link>
            </SwiperSlide>
          ) : (
            <SwiperSlide key={index} className="relative">
              <SlideItem {...slide} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {className !== "visual" && className !== "collaborator" && (
        <div
          className={`relative flex justify-between w-full p-24 mt-16 pagination-wrapper-${className}`}
        >
          {/* 페이지네이션 */}
          {pagination && (
            <div
              className={`flex items-center justify-center gap-8 custom-pagination-${slideKey}`}
            ></div>
          )}

          {/* 네비게이션 버튼 */}
          {navigation && (
            <div className={`navigation-common px-32`}>
              <button
                className={`px-24 py-4 bg-black rounded-30 custom-prev-${slideKey}`}
              >
                <HiArrowLongLeft />
              </button>
              <button
                className={`px-24 py-4 bg-black rounded-30 custom-next-${slideKey}`}
              >
                <HiArrowLongRight />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
