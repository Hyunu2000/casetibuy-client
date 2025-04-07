import React, { useEffect, useState } from "react";
import axios from "axios";
import Payment from "../component/cart/Payment.jsx";
import Guarantee from "../component/cart/Guarantee.jsx";

export default function Footer() {
  const [footMenu, setFootMenu] = useState([]);

  useEffect(() => {
    axios
      .get("/data/footerMenu.json")
      .then((res) => setFootMenu(res.data))
      .catch((error) => console.log(error));
  }, []);

  const firstCategory = footMenu.length > 0 ? footMenu[0].category : "";
  const firstItems = footMenu.length > 0 ? footMenu[0].items : [];

  return (
    <>
      <div className="flex items-center justify-center py-40 mt-40">
        <Payment
          conStyle="flex flex-col justify-center items-center gap-5 px-28 w-full"
          hidden="hidden"
          text="사용 가능한 결제 방법"
          textSize="text-24 font-bold"
        />
        <div className="w-1 border h-150 border-grayhborder"></div>
        <Guarantee
          conStyle="flex flex-col justify-center items-center px-28 justify-between  w-full"
          flex="flex gap-10 items-center pb-28"
          imgeSize="w-36 h-36"
          description={`케이스티파이는 선정된 제품에 대해\n
                      구매 후 10일 이내 조건 없이 반품 및 교환,\n
                      6개월 제품 보증을 제공해 드립니다.\n
                      도움이 필요하시다면 연락하기 또는\n
                      더 알아보기를 클릭해 주세요.`}
          textStyle="leading-12 text-center whitespace-pre-line text-16"
          textSize="text-24"
          hidden="hidden"
        />
      </div>

      <footer className="text-white bg-black footer">
        {/* footer-top */}
        <div className="footer-top">
          <div className="px-24 pt-32 leading-2">
            <div className="flex justify-between py-20 pr-80">
              {/* sns icon */}
              <div>
                <h2 className="pb-10 text-16">{firstCategory}</h2>
                <ul className="flex gap-10">
                  {firstItems.map((item, index) => (
                    <li key={index} className="sns">
                      <img src={item} alt="" />
                    </li>
                  ))}
                </ul>
              </div>
              <>
                {/* 기종 카테고리 부분 */}
                {footMenu &&
                  footMenu.slice(1).map((section, index) => (
                    <div key={index} className="flex flex-col gap-10">
                      <h3 className="text-16">{section.category}</h3>
                      <ul className="flex flex-col gap-10 text-14">
                        {section.category === "기종"
                          ? section.items.map((device, deviceIndex) => (
                              <li
                                key={deviceIndex}
                                className="flex flex-col gap-10"
                              >
                                <strong>{device.brand}</strong>
                                <ul className="flex flex-col gap-10">
                                  {device.models.map((model, modelIndex) => (
                                    <li key={modelIndex}>{model}</li>
                                  ))}
                                </ul>
                              </li>
                            ))
                          : // 공통 카테고리 부분
                            section.items.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                      </ul>
                    </div>
                  ))}
              </>
            </div>
          </div>
          <div className="flex justify-center p-20 pb-24 text-white pt-22 text-14">
            <div className="flex items-center justify-center gap-10">
              <span>Average</span>
              <img
                src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-3.5.svg"
                alt=""
                className="w-80"
              />
              <span>130,341 reviews</span>
              <img
                src="https://cdn.trustpilot.net/brand-assets/4.3.0/logo-white.svg"
                alt=""
                className="pb-5 w-80"
              />
            </div>
          </div>
        </div>

        {/* footer-bottom */}
        <div className="footer-bottom">
          <div className="flex flex-col justify-center items-center text-12 border-t-[1px] border-white text-[#666] px-10 pb-22 gap-10 pt-5">
            <p>
              케이스티파이: 케이스타그램 리미티드(Casetify: Casetagram Limited)
              | 케이스티파이 유한회사 (CASETiFY) | 대표: 응푸이순 웨슬리 (Wesley
              Ng)
            </p>
            <p>
              사업자등록번호: 580-88-02026 | 통신판매업 신고번호: 제
              2021-서울강남-03049 호
            </p>
            <p>주소: 서울특별시 강남구 선릉로 818 6층, 케이스티파이</p>
            <p>CS Center: hello@casetify.com</p>
            <p>휴무: 토요일, 일요일, 공휴일 휴무</p>
          </div>
          <div className="py-25 px-42 text-14">
            <p>
              Copyright © 2025 CASETiFY<span className="px-12">|</span>개인정보
              처리방침
              <span className="px-12">|</span>약관
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
