import React, { useContext } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "../../style/case-swiper.css";
import "../../style/bar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { DetailContext } from "../../context/DetailContext";
import { useDetail } from "../../hooks/useDetail";

export default function CaseSwiper({ detailImage, hasMatchingDetailImage }) {
  const { activeCase } = useContext(DetailContext);
  const { casesData, handleCaseClick, handleHover, handleLeave, parseCaseAndColor } = useDetail();

  return (
    <div>
      <Swiper 
      spaceBetween={16} 
      slidesPerView={2.5}
      breakpoints={{
          1024: {
            slidesPerView:"auto"
          },
      }}
      >
        {Object.keys(casesData).map((caseId) => {
          // detailImage 배열에 해당 케이스 타입(caseId)의 이미지가 있는지 확인
          const hasImage = hasMatchingDetailImage(detailImage, parseCaseAndColor, 'caseType', caseId);
          
          // 해당 케이스 타입에 맞는 이미지가 없으면 해당 슬라이드는 렌더링하지 않음
          if (!hasImage) return null;

          const caseItem = casesData[caseId];

          return (
            <SwiperSlide key={caseId}>
              <div
                className="max-w-135 case-swiper"
                onMouseEnter={() => handleHover(caseId)}
                onMouseLeave={handleLeave}
                onClick={() => handleCaseClick(caseId)}
              >
                <img
                  className={`rounded-16 ${
                    activeCase === caseId ? "border-1" : ""
                  }`}
                  src={`/images/detail/selectcase/${caseId}.png`}
                  alt={caseItem.cname}
                />
                <div className="flex flex-col mt-10">
                  <span className="truncate text-14">{caseItem.cname}</span>
                  <span className="text-14 text-black2">
                    ₩{caseItem.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
