import React from "react";

export default function Payment({ conStyle, hidden, text, textSize }) {
  const paymentMethods = [
    {
      src: "https://cdn-stamplib.casetify.com/cms/image/1f5b660ecb6d0e53919809f6df67c8e8.svg",
      alt: "visa",
    },
    {
      src: "https://cdn-stamplib.casetify.com/cms/image/47e8945cc56c62551afc38388a3eb372.svg",
      alt: "master",
    },
    {
      src: "https://cdn-stamplib.casetify.com/cms/image/b51baf6cb955ed8cffdfb34fd2c37afe.svg",
      alt: "amex",
    },
    {
      src: "https://cdn-stamplib.casetify.com/cms/image/45e398af85526b72f8ab70e323706650.svg",
      alt: "apple pay",
    },
    {
      src: "https://cdn-stamplib.casetify.com/cms/image/784a444c11b36187118025083d1781fb.svg",
      alt: "kakao pay",
    },
  ];
  return (
    <div className={conStyle}>
      <p className={textSize}>{text}</p>
      <ul className="flex gap-20">
        {paymentMethods.map((method, index) => (
          <li key={index} className="px-3 py-2 border rounded-6 border-graynav">
            <img src={method.src} alt={method.alt} />
          </li>
        ))}
      </ul>
      <p className={`text-10 ${hidden}`}>사용 가능한 결제 방법</p>
    </div>
  );
}
