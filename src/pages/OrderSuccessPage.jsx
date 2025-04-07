import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext.js";
import { DetailContext } from "../context/DetailContext.js";

export default function OrderSuccessPage() {
    const [orderData, setOrderData] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setCartList, setCartCount } = useContext(CartContext);
    const pg_token = searchParams.get("pg_token");
    const { matchColor } = useContext(DetailContext);

    // localStorage에서 주문 데이터를 불러옵니다.
    useEffect(() => {
        const storedOrder = localStorage.getItem("orderData");
        if (storedOrder) {
            setOrderData(JSON.parse(storedOrder));
        }
    }, []);

    // pg_token이 있을 경우 Kakao 승인 API를 호출 후 주문 생성 API 호출
    useEffect(() => {
        if (pg_token) {
            const tid = localStorage.getItem("tid");
            const totalPrice = localStorage.getItem("total_price");
            const user_id = localStorage.getItem("user_id");
            const partner_order_id = localStorage.getItem("partner_order_id");

            axios
                .post("http://54.180.155.70:9000/payment/approve", {
                    pg_token,
                    tid,
                    id: user_id,
                    total_amount: totalPrice,
                    partner_order_id, // 클라이언트가 저장한 partner_order_id 사용
                })
                .then((res) => {
                    // 승인 후 localStorage에 저장된 주문 데이터를 DB로 전송
                    const storedOrder = localStorage.getItem("orderData");
                    if (storedOrder) {
                        const orderObj = JSON.parse(storedOrder);
                        axios
                            .post("http://54.180.155.70:9000/order/checkout", orderObj)
                            .then((orderRes) => {
                                localStorage.removeItem("tid");
                                localStorage.removeItem("total_price");
                                localStorage.removeItem("partner_order_id");
                                // localStorage.removeItem("orderData");
                                setCartList([]);
                                setCartCount(0);
                                setOrderData(orderObj);
                            })
                            .catch((orderErr) => {
                                console.error(
                                    "❌ 주문 생성 오류:",
                                    orderErr.response?.data || orderErr.message
                                );
                                alert("주문 처리 중 오류 발생");
                            });
                    }
                })
                .catch((err) => {
                    console.error(
                        "❌ 카카오페이 승인 실패:",
                        err.response?.data || err.message
                    );
                    alert("결제 승인 중 오류 발생");
                });
        }
    }, [pg_token, navigate]);

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
            <div className="p-[30px] mt-20 bg-white rounded-lg shadow-lg w-[500px] text-center border-2 h-[440px] overflow-y-scroll">
                    <h1 className="mb-40 text-2xl font-bold text-green">
                        🎉 주문이 완료되었습니다!
                    </h1>
                    <p className="my-10">주문하신 상품은 마이페이지에서 확인이 가능합니다.</p>
                    {orderData ? (
                        <>
                            <div>
                                <p className="mb-10">
                                    배송지: {orderData.address}, {orderData.detail_address}
                                </p>
                                <p className="text-lg font-bold text-blue-600 mb-30">
                                    총 ￦ {Number(orderData.total_price).toLocaleString()}
                                </p>
                                <h2 className="mt-10 font-semibold text-left text-20">주문 상품</h2>
                                <ul className="mt-4 text-left">
                                    {orderData.cartItems.map((item, index) => (
                                        <li key={index} className="p-3 border-b-2 border-[#eee]">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={item.product_image}
                                                    alt={item.product_name}
                                                    className="rounded w-80"
                                                />
                                                <div>
                                                    <p className="font-semibold">{item.product_name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        색상: {matchColor[item.color]} | {item.case_type}
                                                    </p>
                                                    <p className="text-sm font-bold">
                                                        ₩{Number(item.unit_price).toLocaleString()} × {item.qty}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link
                                to="/"
                            >
                                <button className="p-8 mt-20 text-white bg-blue w-150 rounded-12">
                                    메인으로 돌아가기
                                </button>
                            </Link>
                        </>
                    ) : (
                        <p>주문 정보를 불러오는 중...</p>
                    )}
            </div>
        </div>
    );
}
