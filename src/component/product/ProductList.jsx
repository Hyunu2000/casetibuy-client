import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DetailContext } from "../../context/DetailContext";
import { useDetail } from "../../hooks/useDetail";

export default function ProductList({ productList, layoutType }) {
  const { casesData, matchKinds } = useContext(DetailContext);
  const { parseCaseAndColor } = useDetail();

  return (
    <div
      className={`grid  ${
        layoutType === 2
          ? "grid-cols-2"
          : layoutType === 4
          ? "grid-cols-4"
          : "grid-cols-6"
      }`}
    >
      {productList.map((product) => {
        const { caseType, color } = parseCaseAndColor(product.repImage);
        const caseData = { ...(casesData[caseType] || {}), color };

        return (
          <Link
            to={`/detail/${product.pid}`}
            state={{ activeCase: caseType, activeColor: color }}
            onClick={() => window.scrollTo(0, 0)}
          >
            {/* product list */}
            <div className="relative w-full p-30">
              {/* Gradient Background */}
              <div
                className="absolute top-0 left-0 w-full h-full 
                                        bg-gradient-to-tl from-[#EEE] via-transparent to-[rgba(238,238,238,0)]"
              ></div>
              {/* 상품 이미지 */}
              <div className="w-full max-w-sm mx-auto absoulte">
                <img
                  src={`http://54.180.155.70:9000/${product.repImage}`}
                  alt={product.name}
                  className="object-cover w-full h-auto align-middle"
                />
              </div>
              {/* 상품 내용 */}
              <div className="relative flex flex-col justify-between mt-16">
                {/* 상품 정보 */}
                <div className="mt-12 gap-10 flex flex-col text-#8c8c8c">
                  <p className="truncate text-16">{product.name}</p>
                  <p className="text-14 text-name">{matchKinds[product.kinds]}</p>
                  <p className="h-[16.8px] truncate text-14 text-name">{caseData.cname}</p>
                </div>
                {/* 상품 가격 */}
                <div className="mt-30">
                  <span className="px-20 py-10 text-center text-white bg-black rounded-40 text-16 ">
                    ₩{caseData.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
