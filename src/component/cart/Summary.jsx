import React from "react";

export default function Summary({ totalPrice }) {
  return (
    <div className={`flex flex-col gap-10 my-16 text-14`}>
      <div className={`flex justify-between`}>
        <p>소계</p>
        <p>￦{totalPrice.toLocaleString()}</p>
      </div>
      <div className={`flex justify-between`}>
        <p>배송비</p>
        <div className={`flex items-center justify-center gap-10`}>
          <span
            className={`px-12 py-4 border rounded-full text-12 text-orange border-orange`}
          >
            무료 배송
          </span>
          <p>{`￦0`}</p>
        </div>
      </div>
      <div className={`my-16 border border-graynav`}></div>
      <div className={`flex justify-between font-bold text-20`}>
        <p>총</p>
        <p>￦{totalPrice.toLocaleString()}</p>
      </div>
    </div>
  );
}
