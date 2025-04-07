import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGear, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { CartContext } from "../context/CartContext.js";
import Settings from "./Settings.jsx";
import OrderList from "../component/OrderList.jsx";

export default function Mypage() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setCartList } = useContext(CartContext);
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("order");

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      navigate("/");
      setTimeout(() => {
        setIsLoggedIn(false);
        setCartList([]);
        alert("로그아웃 되었습니다.");
      }, 500);
    }
  };

  const handleMenuClick = (menu) => setActiveMenu(menu);

  return (
    <div className="mt-66 max-w-[1200px] mx-auto"> 
      <div className="relative flex w-full gap-16 p-32">
        {/* 네비게이션 영역 (20% 비율, sticky) */}
        <nav className="sticky top-0 h-160 w-[20%] min-w-200 bg-graynav px-8 py-16 rounded-15">
          <ul className="flex flex-col gap-5">
            <li
              onClick={() => handleMenuClick("order")}
              className={`flex gap-5 px-20 py-10 rounded-full cursor-pointer transition-colors ${
                activeMenu === "order" ? "bg-black text-white" : "text-black"
              }`}
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                className={`w-20 h-20 ${activeMenu === "order" ? "text-white" : "text-black"}`}
              />
              주문
            </li>
            <li
              onClick={() => handleMenuClick("settings")}
              className={`flex gap-5 px-20 py-10 rounded-full cursor-pointer transition-colors ${
                activeMenu === "settings" ? "bg-black text-white" : "text-black"
              }`}
            >
              <FontAwesomeIcon
                icon={faGear}
                className={`w-20 h-20 ${activeMenu === "settings" ? "text-white" : "text-black"}`}
              />
              설정
            </li>
            <li className="flex gap-5 px-20 py-10 rounded-full cursor-pointer">
              <button onClick={handleLogout} className="flex items-center w-full gap-5">
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-20 h-20" />
                로그아웃
              </button>
            </li>
          </ul>
        </nav>
            
        {/* 컨텐츠 영역 */}
        <div className="w-[80%]">
          {activeMenu === "order" && <OrderList />}
          {activeMenu === "settings" && <Settings />}
        </div>
      </div>
    </div>
  );
}
