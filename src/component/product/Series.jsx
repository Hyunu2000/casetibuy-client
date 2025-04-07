import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SeriesItem from "./SeriesItem.jsx";
import { PListContext } from "../../context/PListContext.js";
import useColorScheme from "../../hooks/useColorScheme.js";

export default function Series() {
  const { setSelectList,seriesData,setSelectedSeries,setSearchTerm,setSearchResults,setClassifyFilter,setSelectedItem,setCategory } = useContext(PListContext);
  
  const getColorScheme = useColorScheme();
  const navigate = useNavigate();

  const handleList = (kinds) => {
    setSelectList(kinds);
  };
  // 시리즈 선택 변경 함수
  const handleSeriesChange = (series) => {
    setSearchTerm('');        // 검색어 초기화
    setSearchResults(null);   // 검색 결과 초기화
    setSelectedSeries(series);
    setClassifyFilter('')
    setSelectedItem('') 
    setCategory(false)
  };
  return (
    <div className="px-32 pb-16 pt-98">
      {/* 시리즈 타이틀 */}
      <div className="mb-8">
        <p className="font-bold text-26">시리즈</p>
      </div>

      {/* 미디어 시리즈 콘텐츠 */}
      <div className="">
        <div className="flex gap-16 p-2">
          {seriesData.map((item, index) => (
            <SeriesItem
              key={index}
              onClick={() => {
                handleList(item.kinds);
                navigate("/products");
                handleSeriesChange(item);
                
              }}
              className={`w-[10%] h-full min-h-100 min-w-116 rounded-16 cursor-pointer p-8 pb-16 ${getColorScheme(index).bg}`}
              imageSrc={item.imageSrc}
              title={item.title}
              titleClassName={`mt-8 font-extrabold text-12 ${getColorScheme(index).text}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
