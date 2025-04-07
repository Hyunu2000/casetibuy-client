import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useCart } from "../hooks/useCart";

const PaymentCartItems = () => {
    const { cartList, totalPrice } = useContext(CartContext);
    const { updateCartList, deleteCartItem } = useCart();

    // 수량 증가
    const handleIncrease = (item) => {
        updateCartList(item.cid, "increase");
    };

    // 수량 감소 (최소 1 이상)
    const handleDecrease = (item) => {
        if (item.qty > 1) {
            updateCartList(item.cid, "decrease");
        }
    };

    // 상품 삭제
    const handleDelete = (item) => {
        deleteCartItem(item.cid);
    };

    return (
        <div className="space-y-6">
            {cartList.length > 0 ? (
                cartList.map((item) => (
                    <div
                        key={item.cid}
                        className="flex items-center gap-4 pb-4 border-b"
                    >
                        <div>
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.cname}
                                    className="object-cover w-100 h-100"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-24 h-24 text-sm text-gray-500 bg-gray-200 rounded">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="flex-grow">
                            <p className="text-lg font-bold">{item.cname}</p>
                            <p className="text-sm text-gray-600">
                                색상: {item.color} | 케이스 타입: {item.caseType}
                            </p>
                            <p className="text-sm text-gray-600">
                                가격: {Number(item.price).toLocaleString()} 원
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleDecrease(item)}
                                    className="px-2 py-1 border rounded"
                                >
                                    -
                                </button>
                                <span>{item.qty}</span>
                                <button
                                    onClick={() => handleIncrease(item)}
                                    className="px-2 py-1 border rounded"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => handleDelete(item)}
                                className="px-2 py-1 mt-2 text-xs text-red-600 border rounded"
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">
                    장바구니에 담긴 상품이 없습니다.
                </p>
            )}
            <div className="mt-4 text-right">
                <p className="text-2xl font-bold">
                    총 가격: {Number(totalPrice).toLocaleString()} 원
                </p>
            </div>
        </div>
    );
};

export default PaymentCartItems;
