import React, { useEffect, useContext } from "react";
import CartItem from "./cart/CartItem.jsx";
import CartFooter from "./cart/CartFooter.jsx";
import Summary from "./cart/Summary.jsx";
import CartHeader from "./cart/CartHeader.jsx";
import { CartContext } from "../context/CartContext.js";
import { useCart } from "../hooks/useCart.js";
import { DetailContext } from "../context/DetailContext.js";
import { AuthContext } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import Payment from "./cart/Payment.jsx";
import Guarantee from "./cart/Guarantee.jsx";

export default function Cart() {
  const { currentCase } = useContext(DetailContext);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const { cartList, cartCount, totalPrice } = useContext(CartContext);
  const {
    isCartOpen,
    toggleCart,
    getCartList,
    updateCartList,
    deleteCartItem,
  } = useCart();

  // 장바구니 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  // 로그인 인증 체크
  useEffect(() => {
    if (!isCartOpen) return; // 장바구니가 열릴 때만 실행되도록

    if (!isLoggedIn) {
      const select = window.confirm(
        "로그인이 필요한 서비스입니다. \n로그인 하시겠습니까?"
      );
      toggleCart(); // 장바구니 닫기

      if (select) {
        navigate("/login");
      }
      return; // 로그인하지 않으면 함수 종료
    }

    getCartList();
  }, [isCartOpen, isLoggedIn]);

  // 장바구니 결제 버튼
  const handlePaymentClick = () => {
    toggleCart(); // 장바구니 닫기
    navigate("/payment"); // 결제 페이지로 이동
  };

  return (
    <>
      {/* 반투명 검은 배경 */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-75 backdrop-blur-sm"
          onClick={toggleCart} // 클릭하면 장바구니 닫힘
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg transform ${isCartOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 
          max-h-screen overflow-y-auto`}
      >
        {/* 장바구니 헤더 */}
        <CartHeader cartCount={cartCount} />

        <div className="px-16 mt-8 ">
          {cartList.length === 0 ? (
            <div className="mt-8">
              <p className="text-center text-gray-500 text-12">
                <span className="text-red-600">₩50,000</span> 더 구매하고 무료로
                배송 받으세요!
              </p>
              <div className="flex flex-col items-center justify-center py-16 my-12">
                <p className="mb-12 text-center text-gray-500">
                  장바구니가 비었습니다!
                </p>
                <div className="flex flex-col gap-12">
                  <div className="px-20 py-10 text-center rounded-full bg-gray">
                    폰케이스 구매하기
                  </div>
                  <div className="px-20 py-10 text-center rounded-full bg-gray">
                    이어버드 케이스 구매하기
                  </div>
                  <div className="px-20 py-10 text-center rounded-full bg-gray">
                    워치 밴드 구매하기
                  </div>
                  <div className="px-20 py-10 text-center rounded-full bg-gray">
                    기타 악세서리 구매하기
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-8 text-center text-12 ">
                모든 주문 <span className="text-red-600">일반 배송 무료!</span>
              </p>

              {/* 담은 상품 정보 */}
              <CartItem
                cartList={cartList}
                currentCase={currentCase}
                updateCartList={updateCartList}
                deleteCartItem={deleteCartItem}
              />

              {/* summary */}
              <Summary totalPrice={totalPrice} />
            </>
          )}
        </div>

        {/* 기존에 있던 코드 컴포넌트화 */}
        <Payment
          conStyle="flex flex-col items-center gap-16 px-16 py-16 text-12"
          text="Free Shipping Worldwide"
        />
        <Guarantee
          conStyle="flex flex-col items-center gap-20 px-16 py-32"
          flex="flex flex-col items-center gap-20 "
          description='케이스티파이는 "10일 이내 무조건 교환 및 반품" 정책과 "6개월 제품 보증"
        정책을 제공합니다.'
          textStyle="text-center text-10"
        />

        {/* 장바구니 footer */}
        <CartFooter totalPrice={totalPrice} cartCount={cartCount} />

        {/* 결제하기 버튼 */}
        <div className="flex justify-center py-4 mt-8">
          <button
            onClick={handlePaymentClick} // 결제하기 클릭 시 장바구니 닫고 /payment 페이지로 이동
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md text-14"
          >
            결제하기
          </button>
        </div>
      </div>
    </>
  );
}
