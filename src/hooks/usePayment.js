import { useState } from "react";

export default function usePayment() {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvcNumber, setCvcNumber] = useState("");
    const [cardError, setCardError] = useState(null);
    const [expiryDateError, setExpiryDateError] = useState(null);
    const [cvcError, setCvcError] = useState(null);
    const [shake, setShake] = useState({
        cardNumber: false,
        expiryDate: false,
        cvcNumber: false,
    });

    const validateCardNumber = () => {
        const cleaned = cardNumber.replace(/-/g, "");
        if (!cardNumber) {
            setCardError("카드 번호를 입력해주세요.");
            setShake((prev) => ({ ...prev, cardNumber: true }));
            setTimeout(() => setShake((prev) => ({ ...prev, cardNumber: false })), 500);
        } else if (cleaned.length < 16) {
            setCardError("카드 번호 16자리를 입력해주세요.");
            setShake((prev) => ({ ...prev, cardNumber: true }));
            setTimeout(() => setShake((prev) => ({ ...prev, cardNumber: false })), 500);
        } else {
            setCardError(null);
            return null;
        }
    };

    const validateExpiryDate = () => {
        if (!expiryDate) {
            setExpiryDateError("유효기간을 입력해주세요.");
            setShake((prev) => ({ ...prev, expiryDate: true }));
            setTimeout(() => setShake((prev) => ({ ...prev, expiryDate: false })), 500);
        } else if (expiryDate.length !== 5) {
            setExpiryDateError("유효기간 형식에 맞춰 입력해주세요.");
            setShake((prev) => ({ ...prev, expiryDate: true }));
            setTimeout(() => setShake((prev) => ({ ...prev, expiryDate: false })), 500);
        } else {
            setExpiryDateError(null);
            return null;
        }
    };

    const validateCvcNumber = () => {
        if (!cvcNumber) {
            setCvcError("CVC 번호를 입력해주세요.");
            setShake((prev) => ({ ...prev, cvcNumber: true }));
            setTimeout(() => setShake((prev) => ({ ...prev, cvcNumber: false })), 500);
        } else if (cvcNumber.length !== 3) {
            setCvcError("CVC 번호 3자리를 입력해주세요.");
            setShake((prev) => ({ ...prev, cvcNumber: true }));
            setTimeout(() => setShake((prev) => ({ ...prev, cvcNumber: false })), 500);
        } else {
            setCvcError(null);
            return null;
        }
    };

    return {
        cardNumber,
        setCardNumber,
        expiryDate,
        setExpiryDate,
        cvcNumber,
        setCvcNumber,
        cardError,
        setCardError,
        expiryDateError,
        setExpiryDateError,
        cvcError,
        setCvcError,
        shake,
        validateCardNumber,
        validateExpiryDate,
        validateCvcNumber,
    };
}
