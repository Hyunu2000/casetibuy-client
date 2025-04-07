import React, { useContext } from "react";
import { PListContext } from "../../context/PListContext";

export default function Classify() {
  const { setClassifyFilter,selectedItem, setSelectedItem,category,setCategory } = useContext(PListContext);

  // "케이스티파이 추천" → "rec", "신상품" → "new", "인기" → "hot"
  const handleClassify = (item) => {
    setSelectedItem(item);
    setCategory(false);
    let filterType = "all";
    if (item === "신상품") {
      filterType = "new";
    } else if (item === "인기") {
      filterType = "hot";
    } else if (item === "케이스티파이 추천") {
      filterType = "rec";
    }
    setClassifyFilter(filterType);
  };

  return (
    <div>
      {/* 분류 버튼 */}
      <div className="flex relative md:text-[16px] justify-between items-center">
        <div className="ml-auto">
          <div className="relative cursor-pointer" onClick={() => setCategory(!category)}>
            <div className="flex items-center justify-center">
              <div>
                <span className="text-[16px] leading-[20px]">분류</span>
              </div>
              <div className="h-[20px] ml-[4px]">
                <img
                  src="https://cdn-stamplib.casetify.com/cms/image/3188ba203ec58648d71fa5d87e536ee4.png"
                  alt=""
                  className="w-[20px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 카테고리 리스트 */}
      {category && (
        <div className="absolute right-0 bg-white border-gray-500 shadow-lg w-[220px] rounded-20">
          <ul className="cursor-pointer p-15">
            {["케이스티파이 추천", "신상품", "인기"].map((item) => (
              <li
                key={item}
                className={`p-3 flex items-center gap-10 rounded-full transition-colors ${selectedItem === item ? "bg-[#F6E163]" : "bg-white"}`}
                onClick={() => handleClassify(item)}
              >
                <div className="flex items-center justify-center w-20 h-20">
                  {selectedItem === item && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className="w-20 h-20">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
