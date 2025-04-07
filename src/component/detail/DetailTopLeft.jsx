import React, { useContext } from 'react';
import { DetailContext } from '../../context/DetailContext';
import { useDetail } from '../../hooks/useDetail';

export default function DetailTopLeft({ detail, filteredImages }) {
  const { activeCase, activeColor, casesData } = useContext(DetailContext);
  const handleImage = () => {
    if (detail.kinds === "iphone") {
      if (activeCase === "bounce") {
        return '/images/detail/bounce/bouncedefault.jpg'
      } else if (activeCase === "ring") {
        return '/images/detail/ring/ringdefault.jpg'
      } else if (activeCase === "mirror") {
        return '/images/detail/mirror/mirrordefault.jpg'
      }

    }
  }

  // JSON에서 현재 케이스(activeCase)와 컬러(activeColor)에 해당하는 이미지 배열을 추출
  const getJsonImages = (caseType, color) => {
    // JSON 구조: detailFeature[caseType].colorImg[0] 안에 { colorKey: [이미지경로1, 이미지경로2, ...] } 형태
    if (
      casesData[caseType] &&
      casesData[caseType].colorImg &&
      casesData[caseType].colorImg.length > 0
    ) {
      const colorObj = casesData[caseType].colorImg[0];
      if (colorObj[color]) {
        return colorObj[color];
      }
    }
    return [];
  };

  // JSON 이미지 배열 (예: ["images/iphone16pro=common/iphone16p_common_side_case_bounce_color_babyblue.png", ...])
  const jsonImages = getJsonImages(activeCase, activeColor);




  return (
    <div className="relative flex-1">
      <div className="flex flex-col gap-17">
        <div className="relative flex w-full">
          <img
            src={`http://54.180.155.70:9000/${filteredImages[0]}`}
            alt=""
            className="w-[83.2%] h-auto object-cover justify-center mx-auto"
          />
        </div>
        <div className="grid grid-cols-2 gap-17">
          {
            filteredImages[1] ? (
              <img
                src={`http://54.180.155.70:9000/${filteredImages[1]}`}
                alt=""
                className="object-cover w-[98%] h-auto"
              />
            ) : ("")
          }
          <img
            src={jsonImages[0]}
            alt=""
            className="object-cover w-full h-auto"
          />
        </div>
        <div className="grid grid-cols-2 gap-17">
          <img
            src={
              jsonImages[1]
            }
            alt=""
            className="object-cover w-full h-auto"
          />
          <img
            src={handleImage()}
            alt=""
            className="object-cover w-full h-auto"
          />
        </div>
      </div>
    </div>

  );
};