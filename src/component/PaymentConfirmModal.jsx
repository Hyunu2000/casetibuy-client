import React from "react";

export default function PaymentConfirmModal({
    buyerInfo,
    shippingInfo,
    paymentMethod,
    cardDetails,
    onConfirm,
    onCancel,
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-md p-8 w-[90%] max-w-md">
                <h2 className="mb-4 text-xl font-bold">결제 정보 확인</h2>
                <div className="mb-4">
                    <p className="font-semibold">구매자 정보</p>
                    <p>이름: {buyerInfo.name}</p>
                    <p>이메일: {buyerInfo.email}</p>
                    <p>전화번호: {buyerInfo.phone}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">배송지 정보</p>
                    <p>우편번호: {shippingInfo.zipcode}</p>
                    <p>주소: {shippingInfo.address}</p>
                    <p>상세주소: {shippingInfo.detailAddress}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">결제 수단</p>
                    {paymentMethod === "creditCard" ? (
                        <>
                            <p>카드 번호: {cardDetails.cardNumber}</p>
                            <p>유효기간: {cardDetails.expiryDate}</p>
                            <p>CVC: {cardDetails.cvcNumber}</p>
                        </>
                    ) : (
                        <p>카카오페이</p>
                    )}
                </div>
                <div className="flex justify-end gap-4">
                    <button onClick={onCancel} className="px-6 py-10 text-white bg-orange rounded-6">
                        결제 취소
                    </button>
                    <button onClick={onConfirm} className="px-6 py-10 text-white bg-blue rounded-6">
                        결제확인
                    </button>
                </div>
            </div>
        </div>
    );
}
