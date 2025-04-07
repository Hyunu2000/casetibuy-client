import React from "react";

export default function Guarantee({
  conStyle,
  flex,
  imgeSize,
  description,
  textStyle,
  textSize,
  hidden,
}) {
  return (
    <div className={conStyle}>
      <div className={flex}>
        <div>
          <img
            className={imgeSize}
            src="https://cdn-stamplib.casetify.com/cms/image/9523e96c55b15e2e8ff379057cfe837e.png"
            alt="mark"
          />
        </div>
        <p className={`font-bold ${textSize}`}>100% 만족 보장</p>
      </div>
      <p className={`text-grayph ${textStyle}`}>
        {description}
        <span className={`${hidden} text-black underline`}>문의하기</span>
        &nbsp;<span className={hidden}>또는</span>&nbsp;
        <span className={`${hidden} text-black underline`}>더 알아보기.</span>
      </p>
    </div>
  );
}
