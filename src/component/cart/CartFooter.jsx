import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart.js";
import { CartContext } from "../../context/CartContext.js";

export default function CartFooter({ totalPrice, cartCount }) {
  const { cartList } = useContext(CartContext);
  const navigate = useNavigate();
  const { toggleCart } = useCart();

    // 장바구니 결제 버튼
    const handlePayment = () => {
      // 카트에 담긴 상품이 없으면 알림 후 장바구니 닫기
      if (!cartList || cartList.length === 0) {
        alert("카트에 담긴 상품이 없습니다. 먼저 상품을 담아주세요.");
        toggleCart();
        return;
      }
      toggleCart(); // 장바구니 닫기
      navigate("/payment"); // 결제 페이지로 이동
    };

  return (
    <div className="sticky bottom-0 left-0 w-full px-16 pt-4 bg-white pb-18 ">
      <div className="flex justify-between w-full text-14">
        <span>{cartCount} Items</span>
        <span>총 ￦{totalPrice.toLocaleString()}</span>
      </div>
      <button
        onClick={handlePayment}
        className="w-full px-20 mt-4 text-white bg-black rounded-full py-15"
      >
        결제하기
      </button>
    </div>
  );
}
