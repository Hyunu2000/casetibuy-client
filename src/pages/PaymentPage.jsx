import React, { useState, useRef, useEffect, useContext } from "react";
import InputField from "../component/InputField.jsx";
import usePayment from "../hooks/usePayment.js";
import AddressModal from "../component/AddressModal.jsx";
import CartItem from "../component/cart/CartItem.jsx";
import Summary from "../component/cart/Summary.jsx";
import { useCart } from "../hooks/useCart.js";
import { AuthContext } from "../context/AuthContext.js";
import { CartContext } from "../context/CartContext.js";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentPage() {
    const { isLoggedIn } = useContext(AuthContext);
    const { cartList, totalPrice, setCartCount, setCartList } = useContext(CartContext);
    const { getCartList, updateCartList, deleteCartItem } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const pgToken = searchParams.get("pg_token");
    const [userData, setUserData] = useState({ name: "", email: "", phone: "" });

    // 로그인 상태이면 사용자 정보 API 호출
    useEffect(() => {
        if (isLoggedIn) {
            getCartList();
            const token = localStorage.getItem("token");
            fetch("http://54.180.155.70:9000/member/userinfo", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => setUserData(data))
                .catch((err) =>
                    console.error("사용자 정보를 가져오는데 실패했습니다.", err)
                );
        } else {
            setUserData({ name: "", email: "", phone: "" });
        }
    }, [isLoggedIn]);

    const [paymentMethod, setPaymentMethod] = useState("creditCard");
    const [shippingAddress, setShippingAddress] = useState(null);
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 에러 상태 (우편번호, 상세주소)
    const [zipcodeError, setZipcodeError] = useState(null);
    const [detailAddressError, setDetailAddressError] = useState(null);

    // 각 필드의 ref
    const zipcodeRef = useRef(null);
    const addressRef = useRef(null);
    const detailAddressRef = useRef(null);

    const {
        cardNumber,
        setCardNumber,
        expiryDate,
        setExpiryDate,
        cvcNumber,
        setCvcNumber,
        cardError,
        expiryDateError,
        cvcError,
        shake,
        validateCardNumber,
        validateExpiryDate,
        validateCvcNumber,
    } = usePayment();

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleAddressSelect = (addressData) => {
        setShippingAddress(addressData);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const onAddressSelected = (addressData) => {
        setAddress(addressData.address);
        setZipcode(addressData.zipcode);
        handleAddressSelect(addressData);
        handleCloseModal();
        setZipcodeError(null);
    };

    const handleDetailAddressChange = (e) => {
        setDetailAddress(e.target.value);
        if (e.target.value) {
            setDetailAddressError(null);
        }
    };

    // 크레딧 카드 결제: 즉시 주문 생성 API 호출
    const handleCreditCardPayment = async (orderData) => {
        validateCardNumber();
        const cleanedCard = cardNumber.replace(/-/g, "");
        if (!cardNumber || cleanedCard.length < 16) return;
        validateExpiryDate();
        if (!expiryDate || expiryDate.length !== 5) return;
        validateCvcNumber();
        if (!cvcNumber || cvcNumber.length !== 3) return;

        try {
            const response = await axios.post(
                "http://54.180.155.70:9000/order/checkout",
                orderData
            );
            if (response.status === 201) {
                setCartList([]); // 장바구니 비우기
                setCartCount(0);
                localStorage.setItem("orderData", JSON.stringify(orderData));
                navigate("/order-success");
            }
        } catch (error) {
            console.error(
                "❌ 주문 요청 중 오류 발생:",
                error.response?.data || error.message
            );
            alert("주문 처리 중 오류가 발생했습니다.");
        }
    };

    // 카카오페이 결제: QR 결제 API 호출 후 리다이렉트 (주문 데이터는 localStorage에 저장)
    const handleKakaoPayPayment = async (orderData) => {
        const id = localStorage.getItem("user_id");
        try {
            const res = await axios.post("http://54.180.155.70:9000/payment/qr", {
                id: id,
                item_name: "테스트 상품",
                total_amount: totalPrice,
            });
            if (res.data.next_redirect_pc_url) {
                // 승인 URL로 리다이렉트하기 전에 필요한 값들을 localStorage에 저장합니다.
                localStorage.setItem("orderData", JSON.stringify(orderData));
                localStorage.setItem("tid", res.data.tid);
                localStorage.setItem("total_price", totalPrice);
                localStorage.setItem("partner_order_id", res.data.partner_order_id);
                window.location.href = res.data.next_redirect_pc_url;
            }
        } catch (error) {
            console.log("❌ 카카오페이 QR 결제 에러 발생", error);
        }
    };

    // 결제 승인 후 DB에 주문 생성 (공통 함수)
    const confirmPayment = async (orderData, tid) => {
        try {
            const finalOrderData = { ...orderData, tid };
            const orderResponse = await axios.post(
                "http://54.180.155.70:9000/order/checkout",
                finalOrderData
            );
            if (orderResponse.status === 201) {
                setCartList([]); // 장바구니 비우기
                localStorage.setItem("orderData", JSON.stringify(finalOrderData));
                navigate("/order-success");
            }
        } catch (error) {
            console.error(
                "❌ 주문 저장 오류 발생:",
                error.response?.data || error.message
            );
            alert("주문 처리 중 오류가 발생했습니다.");
        }
    };

    // 카카오페이 승인 처리 (QR 인증 후)
    const handleKakaoPayApprove = async (pgToken) => {
        const id = localStorage.getItem("user_id");
        const tid = localStorage.getItem("tid");
        const totalPrice = localStorage.getItem("total_price");
        try {
            const res = await axios.post("http://54.180.155.70:9000/payment/approve", {
                pg_token: pgToken,
                tid,
                id,
                total_amount: totalPrice,
            });
            localStorage.removeItem("tid");
            localStorage.removeItem("total_price");
            // localStorage에 저장했던 주문 데이터를 가져와 DB에 주문 생성
            const storedOrderData = JSON.parse(localStorage.getItem("orderData"));
            await confirmPayment(storedOrderData, tid);
        } catch (error) {
            console.error("❌ 카카오페이 승인 실패:", error);
            alert("결제 승인 중 오류 발생");
        }
    };

    // pg_token이 있을 경우 카카오페이 승인 처리 실행 (QR 인증 후 리다이렉트 시)
    useEffect(() => {
        if (pgToken) {
            handleKakaoPayApprove(pgToken);
        }
    }, [pgToken]);

    // 결제하기 버튼 클릭 시 실행
    const handleSubmit = async () => {
        if (!cartList || cartList.length === 0) {
            alert("카트에 담긴 상품이 없습니다. 먼저 상품을 담아주세요.");
            navigate("/");
            return;
        }
        if (!zipcode) {
            setZipcodeError("주소 검색을 통해 배송지를 선택해주세요.");
            zipcodeRef.current?.focus();
            return;
        }
        if (!detailAddress) {
            setDetailAddressError("상세주소를 입력해주세요.");
            detailAddressRef.current?.focus();
            return;
        }

        const cartItems = cartList.map((item) => ({
            product_id: item.pid,
            product_name: item.pname,
            kinds: item.kinds,
            qty: item.qty,
            unit_price: item.price,
            color: item.color,
            case_type: item.cname,
            product_image: item.image,
        }));
        

        const orderData = {
            member_id: localStorage.getItem("user_id"),
            total_price: totalPrice,
            payment_method: paymentMethod,
            zipcode,
            address,
            detail_address: detailAddress,
            cartItems,
        };

        if (paymentMethod === "creditCard") {
            await handleCreditCardPayment(orderData);
        } else if (paymentMethod === "kakaoPay") {
            await handleKakaoPayPayment(orderData);
        }
    };

        return (
        <div className="flex justify-center w-full min-h-screen mt-66">
            <div className="flex w-full max-w-[1000px] min-h-screen font-sans">
                <div className="w-[60%] p-8">
                    <div className="mb-8">
                        <h2 className="mb-20 font-bold text-32">구매자 정보</h2>
                        <InputField
                            id="buyerName"
                            type="text"
                            label="이름"
                            value={userData.name}
                            readOnly
                        />
                        <InputField
                            id="buyerEmail"
                            type="text"
                            label="이메일"
                            value={userData.email}
                            readOnly
                        />
                        <InputField
                            id="buyerPhone"
                            type="text"
                            label="전화번호"
                            value={userData.phone}
                            readOnly
                        />
                    </div>

                    <div className="mb-8">
                        <h2 className="mb-20 font-bold text-32">배송지 정보</h2>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-14">배송 받으실 주소를 선택해주세요.</p>
                            <button
                                onClick={handleOpenModal}
                                className="px-6 py-10 mb-10 ml-5 text-white rounded-6 w-80 text-12 bg-blue"
                            >
                                주소 검색
                            </button>
                        </div>
                        <div>
                            <InputField
                                id="zipcode"
                                type="text"
                                label="우편번호"
                                value={zipcode}
                                readOnly
                                refElement={zipcodeRef}
                                error={zipcodeError}
                            />
                            <InputField
                                id="address"
                                type="text"
                                label="주소"
                                value={address}
                                readOnly
                                refElement={addressRef}
                            />
                            <InputField
                                id="detailAddress"
                                type="text"
                                label="상세주소 (동/호수, 층수)"
                                value={detailAddress}
                                setValue={setDetailAddress}
                                refElement={detailAddressRef}
                                error={detailAddressError}
                                onChange={handleDetailAddressChange}
                            />
                            <AddressModal
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                onAddressSelected={onAddressSelected}
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-20 font-bold text-32">결제 수단</h2>
                        <div className="mb-20">
                            <div
                                className={`mb-15 px-15 py-10 border rounded-12 cursor-pointer ${paymentMethod === "creditCard"
                                        ? "border-blue-500 bg-blue-100"
                                        : "border-gray-300"
                                    }`}
                                onClick={() => handlePaymentMethodChange("creditCard")}
                            >
                                <label className="flex items-center gap-5 cursor-pointer">
                                    <span
                                        className={`w-15 h-15 rounded-full mb-2 border ${paymentMethod === "creditCard" ? "bg-black" : "bg-white"
                                            }`}
                                    ></span>
                                    <span className="text-base font-medium">Credit Card</span>
                                </label>
                                {paymentMethod === "creditCard" && (
                                    <div className="mt-5">
                                        <InputField
                                            id="cardNumber"
                                            type="text"
                                            label="카드 번호"
                                            value={cardNumber}
                                            setValue={setCardNumber}
                                            maxLength={19}
                                            inputType="number-only"
                                            validate={validateCardNumber}
                                            error={cardError}
                                            shake={shake.cardNumber}
                                        />
                                        <InputField
                                            id="expiryDate"
                                            type="text"
                                            label="유효기간(MM/YY)"
                                            value={expiryDate}
                                            setValue={setExpiryDate}
                                            maxLength={5}
                                            placeholder="MM/YY"
                                            validate={validateExpiryDate}
                                            error={expiryDateError}
                                            shake={shake.expiryDate}
                                        />
                                        <InputField
                                            id="cvcNumber"
                                            type="text"
                                            label="CVC"
                                            value={cvcNumber}
                                            setValue={setCvcNumber}
                                            maxLength={3}
                                            inputType="number-only"
                                            validate={validateCvcNumber}
                                            error={cvcError}
                                            shake={shake.cvcNumber}
                                        />
                                    </div>
                                )}
                            </div>
                            <div
                                className={`px-15 py-10 border rounded-12 cursor-pointer ${paymentMethod === "kakaoPay"
                                        ? "border-blue-500 bg-blue-100"
                                        : "border-gray-300"
                                    }`}
                                onClick={() => handlePaymentMethodChange("kakaoPay")}
                            >
                                <label className="flex items-center gap-5 cursor-pointer">
                                    <span
                                        className={`w-15 h-15 rounded-full mb-2 border ${paymentMethod === "kakaoPay" ? "bg-black" : "bg-white"
                                            }`}
                                    ></span>
                                    <span className="text-base font-medium text-gray-700">
                                        카카오페이
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="my-10">
                            <button
                                className="w-full p-12 text-white rounded-12 bg-blue"
                                onClick={handleSubmit}
                            >
                                결제하기
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-[35%] ml-[5%] p-8">
                    <h2 className="mb-20 font-bold text-32">주문 상품 정보</h2>
                    <CartItem
                        cartList={cartList}
                        updateCartList={updateCartList}
                        deleteCartItem={deleteCartItem}
                    />
                    <Summary 
                        totalPrice={totalPrice}
                    />
                </div>
            </div>
        </div>
    );
}
