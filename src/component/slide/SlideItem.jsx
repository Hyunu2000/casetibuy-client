import React from "react";
import { Link } from "react-router-dom";

export default function SlideItem({
  className,
  title,
  image,
  description,
  label,
  labelStyle,
  btnStyle,
  bgColor,
  btnColor,
  btnText,
  cpadding,
  cround,
  contentPadding,
  pid,
  caseType,
  color,
}) {
  return (
    <Link
      key={pid}
      to={`/detail/${pid}`}
      state={{ activeCase: caseType, activeColor: color }}
      onClick={() => window.scrollTo(0, 0)}
      className="block w-full h-full"
    >
      <div
        className={`w-full h-full rounded-20 overflow-hidden block ${bgColor} ${className} ${cpadding}`}
      >
        <div className="w-full overflow-hidden">
          <img src={image} alt={title} className={`w-full ${cround}`} />
        </div>
        <div
          className={`w-full md:h-[200px] h-[230px] flex flex-col items-start justify-between text-start ${contentPadding}`}
        >
          <span className={`${labelStyle}`}>{label}</span>
          <div>
            <h2 className={`mt-10 font-bold md:text-26 text-18`}>{title}</h2>
            <p>{description}</p>
          </div>
          <button className={`mt-30 ${btnStyle} ${btnColor}`}>{btnText}</button>
        </div>
      </div>
    </Link>
  );
}
