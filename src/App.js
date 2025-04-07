import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import "./style/common.css";
import "./style/style.css";
import "swiper/css";
import DetailProduct from "./pages/DetailProduct.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./component/Cart.jsx";
import Home from "./pages/Home.jsx";
import NewProduct from "./pages/NewProduct.jsx";
import Mypage from "./pages/Mypage.jsx";
import Settings from "./pages/Settings.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import { DetailProvider } from "./context/DetailContext.js";
import { CartProvider } from "./context/CartContext";
import { PListProvider } from "./context/PListContext.js";
import { ThemeProvider } from "./context/ThemeContext.js";
import { AuthProvider } from "./context/AuthContext.js";
import { ReviewProvider } from "./context/ReviewContext.js";
import { SlideProvider } from "./context/SlideContext.js";
import ClearOrderDataWrapper from "./component/ClearOrderDataWrapper.jsx";
import ProductPage from "./component/product/ProductPage.jsx";

// ✅ 로그인한 유저는 /login 접근 못 하게 막는 라우트
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return !token ? children : <Navigate to="/" replace />;
}

// ✅ 로그인한 유저만 접근 가능한 라우트
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

// ✅ 주문 성공 페이지 접근 제한
function OrderSuccessRoute({ children }) {
  const orderData = localStorage.getItem("orderData");
  if (!orderData) {
    alert("잘못된 접근입니다.");
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <SlideProvider>
      <ReviewProvider>
        <ThemeProvider>
          <AuthProvider>
            <PListProvider>
              <CartProvider>
                <DetailProvider>
                  <BrowserRouter>
                    <ClearOrderDataWrapper />
                    <Routes>
                      <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/detail/:pid" element={<DetailProduct />} />
                        <Route path="/new" element={<NewProduct />} />
                        <Route
                          path="/login"
                          element={
                            <PublicRoute>
                              <Login />
                            </PublicRoute>
                          }
                        />
                        <Route
                          path="/mypage"
                          element={
                            <PrivateRoute>
                              <Mypage />
                            </PrivateRoute>
                          }
                        />
                        <Route path="/setting" element={<Settings />} />
                        <Route
                          path="/order-success"
                          element={
                            <OrderSuccessRoute>
                              <OrderSuccessPage />
                            </OrderSuccessRoute>
                          }
                        />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/products" element={<ProductPage />} />
                      </Route>
                    </Routes>
                    <Cart />
                  </BrowserRouter>
                </DetailProvider>
              </CartProvider>
            </PListProvider>
          </AuthProvider>
        </ThemeProvider>
      </ReviewProvider>
    </SlideProvider>
  );
}

export default App;
