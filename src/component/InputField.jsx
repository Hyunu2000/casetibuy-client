import React, { useState } from "react";

export default function InputField({
    id,
    type = "text",
    label,
    value,
    setValue,
    error,
    refElement,
    validate,
    shake,
    maxLength,
    inputType,
    onBlur,
    readOnly,
    visualFocus,
    onChange,
}) {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        // 입력값에서 모든 공백 제거
        let newValue = e.target.value.replace(/\s/g, "");

        // 숫자 전용이면 숫자만 허용
        if (inputType === "number-only") {
            newValue = newValue.replace(/\D/g, "");
        }

        // 카드 번호 포맷 처리
        if (id === "cardNumber") {
            const cleaned = newValue.replace(/\D/g, "").slice(0, 16);
            const formatted = cleaned.match(/.{1,4}/g)?.join("-") || "";
            setValue(formatted);
            return;
        }

        // 유효기간 포맷 처리
        if (id === "expiryDate") {
            const cleaned = newValue.replace(/\D/g, "").slice(0, 4);
            let formatted = cleaned;
            if (cleaned.length > 2) {
                formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
            }
            setValue(formatted);
            return;
        }

        if (onChange) {
            onChange(e);
        } else {
            setValue(newValue);
        }
    };

    const isSuccessMessage =
        error === "비밀번호가 일치합니다." || error === "사용 가능한 아이디입니다.";

    return (
        <div className="relative w-full mb-25">
            <p
                className={`absolute top-50 left-4 text-11 transition-opacity duration-300 ${isSuccessMessage ? "text-green" : "text-red-500"
                    } ${error ? "opacity-100" : "opacity-0"}`}
            >
                {error}
            </p>

            <input
                type={type}
                id={id}
                placeholder=" "
                required
                spellCheck="false"
                autoComplete="off"
                value={value}
                onChange={handleChange}
                ref={refElement}
                onFocus={() => !readOnly && setIsFocused(true)}
                onBlur={() => {
                    if (!readOnly) setIsFocused(false);
                    if (typeof validate === "function") {
                        validate();
                    }
                    if (onBlur) {
                        onBlur();
                    }
                }}
                className={`peer block w-full pt-20 pb-5 px-8 text-black rounded-12 text-[16px] focus:outline-none bg-white border-1
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    ${error && !isFocused
                        ? isSuccessMessage
                            ? "border-green"
                            : "border-red-500"
                        : "border-black"
                    }
                    ${isFocused ? "focus:border-blue-500" : ""}
                    ${shake ? "animate-shake" : ""}`}
                maxLength={maxLength}
                readOnly={readOnly}
                style={
                    validate && !error && value
                        ? { borderColor: "#059669", borderWidth: "1px" }
                        : {}
                }
            />

            <label
                htmlFor={id}
                className={`text-[#8c8c8c] absolute left-8 transition-all duration-200
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-14
                    peer-focus:top-5 peer-focus:!translate-y-0 peer-focus:text-11 peer-focus:text-blue-500
                    peer-valid:top-5 peer-valid:!translate-y-0 peer-valid:text-11 peer-valid:text-blue-500
                    ${visualFocus ? "top-5 !translate-y-0 text-11 text-blue-500" : ""}
                    ${validate && !error && value ? "text-green-500" : ""}
                    ${value ? "!top-5 !translate-y-0 text-11" : ""}`}
            >
                {label}
            </label>
        </div>
    );
}
