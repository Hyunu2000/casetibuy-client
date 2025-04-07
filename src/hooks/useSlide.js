import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SlideContext } from "../context/SlideContext.js";
import { useDetail } from "../hooks/useDetail.js";
import useProduct from "../hooks/useProduct.js";

export const useSlide = () => {
  const { slideList, setSlideList } = useContext(SlideContext);
  const { parseCaseAndColor } = useDetail();
  const { getProductList } = useProduct();
  const [hnrSlides, setHnrSlides] = useState({
    recommended: [],
    hot: [],
    new: [],
  });

  /**
   * slides.json 전체 데이터, case, color 가져오기
   */
  useEffect(() => {
    axios
      .get("/data/slides.json")
      .then((res) => {
        // 데이터가 객체이므로, 원하는 키에 맞는 배열을 선택
        const { visualSlideImage, featuredCollection, collaborator } = res.data;

        // visualSlideImage에 대해 `parseCaseAndColor()` 적용
        const visualSlides = visualSlideImage.map((slide) => {
          const { caseType, color } = parseCaseAndColor(slide.src);
          return { ...slide, caseType, color };
        });

        // collaborator에 대해 `parseCaseAndColor()` 적용
        const collabSlides = collaborator.map((slide) => {
          const { caseType, color } = parseCaseAndColor(slide.image);
          return { ...slide, caseType, color };
        });

        // featuredCollection에도 `parseCaseAndColor()` 적용
        const featuredSlides = featuredCollection.map((slide) => {
          const { caseType, color } = parseCaseAndColor(slide.image);
          return { ...slide, caseType, color };
        });

        // SlideContext에 저장
        setSlideList({
          visualSlideImage: visualSlides,
          featuredCollection: featuredSlides,
          collaborator: collabSlides,
        });
      })
      .catch((error) => console.log("Axios Error:", error));
  }, []);

  /**
   * server product 중 isHot, isNew, isRec 데이터 가져오기
   */

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductList();
      if (!data || data.length === 0) return;

      const categorizedData = {
        recommended: [],
        hot: [],
        new: [],
      };

      // 배경색 배열
      const bgColors = ["bg-orange", "bg-green", "bg-blue", "bg-yellow"];

      // 각 상품의 출력할 데이터, 스타일 정리
      data.forEach((item) => {
        // parseCaseAndColor 호출하여 케이스와 색상 정보 추출
        const { caseType, color } = parseCaseAndColor(item.repImage);

        const productData = {
          image: `http://54.180.155.70:9000/${item.repImage}`,
          pid: item.pid,
          title: item.name,
          btnText: "Buy Now",
          btnStyle: "py-12 px-20 text-20 rounded-full border",
          bgColor: bgColors[item.pid % bgColors.length],
          cpadding: "p-24",
          cround: "rounded-20",
          caseType: caseType,
          color: color,
        };

        if (item.isRec === 1) categorizedData.recommended.push(productData);
        if (item.isHot === 1) categorizedData.hot.push(productData);
        if (item.isNew === 1) categorizedData.new.push(productData);
      });

      setHnrSlides(categorizedData);
    };

    fetchData();
  }, [getProductList, parseCaseAndColor]);

  return { slideList, setSlideList, hnrSlides, setHnrSlides };
};
