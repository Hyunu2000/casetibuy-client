import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import useOrder from "../hooks/useOrder.js";
import { useDetail } from "../hooks/useDetail.js";
import SeriesItem from "./product/SeriesItem.jsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import useColorScheme from "../hooks/useColorScheme.js";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
    const { isLoggedIn } = useContext(AuthContext);
    const { getOrderList } = useOrder();
    const { parseCaseAndColor } = useDetail();
    const [orderGroups, setOrderGroups] = useState([]);
    const getColorScheme = useColorScheme();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            getOrderList().then((data) => {
                if (!data) return;
                // order_id별 그룹화
                const groups = {};
                data.forEach((row) => {
                    if (!groups[row.order_id]) {
                        groups[row.order_id] = [];
                    }
                    groups[row.order_id].push(row);
                });
                // 내림차순 정렬
                const orderArray = Object.values(groups).sort(
                    (a, b) => new Date(b[0].order_date) - new Date(a[0].order_date)
                );
                setOrderGroups(orderArray);
            });
        }
    }, [isLoggedIn, getOrderList]);

    if (!orderGroups.length) {
        return <p>구매한 주문이 없습니다.</p>;
    }

    return (
        <div className="flex flex-col gap-8">
            <h2 className="font-bold text-32 mb-30">주문</h2>
            {orderGroups.map((orderGroup) => {
                const orderInfo = orderGroup[0];
                return (
                    <div
                        key={orderInfo.order_id}
                        className="p-16 border shadow-sm border-[#d9d9d9] rounded-20 mb-15"
                    >
                        {/* 주문 정보 */}
                        <div className="mb-4">
                            <div className="grid grid-flow-col w-[400px]">
                                <div className="flex flex-col text-[#8b8b8b]">
                                    <span>주문 번호</span>
                                    <span className="mt-8">주문 일자</span>
                                    <span className="my-8">총 금액</span>
                                </div>
                                <div className="flex flex-col">
                                    <span>{orderInfo.order_id}</span>
                                    <span className="mt-8">
                                        {new Date(orderInfo.order_date).toLocaleString()}
                                    </span>
                                    <span className="my-8">
                                        ￦ {Number(orderInfo.total_price).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="p-2 mr-5 bg-sky text-blue text-10">포인트</span>
                                <span className="text-blue">적립 완료</span>
                            </div>
                        </div>

                        <Swiper
                            spaceBetween={8}
                            slidesPerView={'auto'}
                        >
                            {orderGroup.map((item, index) => {
                                const { caseType, color } = parseCaseAndColor(item.image)
                                const { bg, text } = getColorScheme(index);

                                return (

                                    <SwiperSlide
                                        key={`${item.product_id}-${index}`}
                                        onClick={() => {
                                            navigate(`/detail/${item.product_id}`, {
                                                state: { activeCase: caseType, activeColor: color },
                                            });
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        <SeriesItem
                                            className={`p-8 pb-16 h-[250px] cursor-pointer w-[200px] rounded-16 ${bg}`}

                                            imageSrc={item.image}
                                            titleClassName={`mt-10 text-16 font-bold text-left ${text}`}
                                            title={item.product_name}
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                );
            })}
        </div>
    );
}
