import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../hooks/useCart.js";
import { CartContext } from "../context/CartContext.js";
import { AuthContext } from "../context/AuthContext.js";
import Series from "./product/Series";
import { useTheme } from "../context/ThemeContext.js";

// 방금 만든 SearchModal
import Search from "./Search";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, setCartList } = useContext(CartContext);
  const { toggleCart, getCount, setCount } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSeries, setShowSeries] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색 모달 open 여부
  const dropdownRef = useRef(null);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { iconColor, setIconColor } = useTheme();

  // 인기 검색어 샘플 데이터

  useEffect(() => {
    isLoggedIn ? getCount() : setCount(0);
  }, [isLoggedIn]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowSeries(false);
  }, [location]);

  useEffect(() => {
    const slidePages = ["/", "/home"];
    if (!slidePages.includes(location.pathname)) {
      setIconColor("black");
    }
  }, [location.pathname, setIconColor]);

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

  const toggleDropdown = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setIsDropdownOpen(true);
    }
  };

  // 검색 실행 함수 (SearchModal -> onSearch)
  const handleSearch = (search) => {
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* 검색 모달 */}
      <Search
        isSearchOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />

      {/* 헤더 영역 */}
      <div className="absolute z-30 w-full bg-transparent">
        <div className="relative flex items-center justify-between px-32 h-66">
          <div className="flex gap-20">
            <button
              type="button"
              onClick={() => location.pathname !== "/login" && setShowSeries((prev) => !prev)}
            >
              <FontAwesomeIcon
                className={`w-24 h-24 ${showSeries
                    ? "text-black"
                    : iconColor === "white"
                      ? "text-white"
                      : "text-black"
                  }`}
                icon={faBars}
              />
            </button>
            {/* 검색 아이콘 클릭 시 모달 오픈 */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
            >
              <FontAwesomeIcon
                className={`w-24 h-24 ${showSeries
                    ? "text-black"
                    : iconColor === "white"
                      ? "text-white"
                      : "text-black"
                  }`}
                icon={faMagnifyingGlass}
              />
            </button>
          </div>
          <Link to="/" className="h-40 w-120">
            <img
              src="/images/casetibuy-logo.png"
              alt="Casetify 로고"
            />
          </Link>
          <div className="flex gap-20">
            <div
              className="relative"
              ref={dropdownRef}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                type="button"
                {...(isLoggedIn
                  ? { onMouseOver: toggleDropdown }
                  : { onClick: toggleDropdown })}
              >
                <FontAwesomeIcon
                  className={`w-24 h-24 py-15 ${showSeries
                      ? "text-black"
                      : iconColor === "white"
                        ? "text-white"
                        : "text-black"
                    }`}
                  icon={faUser}
                />
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 text-black bg-white shadow-2xl top-50 rounded-15 w-120">
                  {isLoggedIn && location.pathname !== "/mypage" && (
                    <li>
                      <Link
                        to="/mypage"
                        className="block px-4 text-center py-14 hover:text-grayph text-14"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        마이페이지
                      </Link>
                    </li>
                  )}
                  {isLoggedIn && (
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full px-4 text-center py-14 hover:text-grayph text-14"
                      >
                        로그아웃
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={toggleCart} className="relative">
                <FontAwesomeIcon
                  className={`w-24 h-24 ${showSeries
                      ? "text-black"
                      : iconColor === "white"
                        ? "text-white"
                        : "text-black"
                    }`}
                  icon={faCartShopping}
                />
              </button>
              {cartCount > 0 && (
                <div className="relative w-16 h-16 pt-2 text-center text-white bg-black rounded-full top-4 text-12">
                  {cartCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {location.pathname !== "/products" && (
        <div
          className="w-full h-full overflow-hidden transition-all duration-700 ease-in-out origin-top bg-opacity-90"
          style={{ maxHeight: showSeries ? "600px" : "0px" }}
        >
          <Series />
        </div>
      )}
    </>
  );
}
