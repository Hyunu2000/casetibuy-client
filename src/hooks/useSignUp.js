import { useState, useRef } from "react";
import axios from 'axios';

export function useSignUp() {
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [nameError, setNameError] = useState("");
    const [birthdateError, setBirthdateError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [signupError, setSignupError] = useState("");
    const [isIdAvailable, setIsIdAvailable] = useState(false);

    const [nameFocused, setNameFocused] = useState(false);
    const [birthdateFocused, setBirthdateFocused] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordConfirmFocused, setPasswordConfirmFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);

    const [nameShake, setNameShake] = useState(false);
    const [birthdateShake, setBirthdateShake] = useState(false);
    const [usernameShake, setUsernameShake] = useState(false);
    const [passwordShake, setPasswordShake] = useState(false);
    const [passwordConfirmShake, setPasswordConfirmShake] = useState(false);
    const [emailShake, setEmailShake] = useState(false);
    const [phoneNumberShake, setPhoneNumberShake] = useState(false);


    const nameRef = useRef(null);
    const birthdateRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);
    const emailRef = useRef(null);
    const phoneNumberRef = useRef(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setSignupError("");

        if (!validateName() || !validateBirthdate() || !validateUsername() || !validatePassword() || !validatePasswordConfirm() || !validateEmail() || !validatePhoneNumber() || !isIdAvailable) {
            if (!isIdAvailable) {
                setUsernameError("아이디 중복확인을 해주세요.");
                setUsernameShake(true);
                setTimeout(() => setUsernameShake(false), 500);
            }
            return;
        }

        try {
            const response = await axios.post('http://54.180.155.70:9000/member/signup', {
                name: name,
                birthdate: birthdate,
                email: email,
                id: username,
                pwd: password,
                phone: phoneNumber,
            });

            if (response.status === 200) {
                const data = response.data;
                alert("회원가입 성공!");
                window.location.href = "/login";
            } else {

            }
        } catch (error) {
            console.error("회원가입 실패:", error);
            if (error.response) {
                setSignupError(error.response.data.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
            } else if (error.request) {
                setSignupError("서버와 연결할 수 없습니다.");
            } else {
                setSignupError("회원가입 처리 중 오류가 발생했습니다.");
            }
        }
    };

    const checkIdAvailability = async () => {
        if (!validateUsername()) {
            return;
        }
        setUsernameError("");
        setIsIdAvailable(false);

        try {
            const response = await axios.post('http://54.180.155.70:9000/member/idcheck', {
                id: username
            });

            if (response.status === 200) {
                const data = response.data;
                if (data.result === 0) {
                    setUsernameError("사용 가능한 아이디입니다.");
                    setIsIdAvailable(true);
                } else {
                    setUsernameError("이미 사용중인 아이디입니다. 다시 입력해주세요.");
                    setIsIdAvailable(false);
                    setUsernameShake(true);
                    setTimeout(() => setUsernameShake(false), 500);
                    usernameRef.current.focus();
                }
            } else {
                // ... (오류 처리)
            }
        } catch (error) {
            console.error("아이디 중복 확인 실패:", error);
            setUsernameError("아이디 중복 확인에 실패했습니다.");
            setIsIdAvailable(false);
            usernameRef.current.focus();
            if (error.response) {
                // ... (오류 처리)
            } else if (error.request) {
                setSignupError("서버와 연결할 수 없습니다.");
            } else {
                setSignupError("아이디 중복 확인 중 오류가 발생했습니다.");
            }
        }
    };


    const validateName = () => {
        const trimmed = name.trim();
        if (!trimmed) {
            setNameError("이름을 입력해주세요.");
            setNameShake(true);
            setTimeout(() => setNameShake(false), 500);
            return false;
        }
        setNameError("");
        return true;
    };

    const validateBirthdate = () => {
        const trimmed = birthdate.trim();
        if (!/^\d{8}$/.test(trimmed)) {
            setBirthdateError("생년월일을 8자리 숫자로 입력해주세요.");
            setBirthdateShake(true);
            setTimeout(() => setBirthdateShake(false), 500);
            return false;
        }
        setBirthdateError("");
        return true;
    };


    const validateUsername = () => {
        const trimmed = username.trim();
        if (trimmed.length < 6 || trimmed.length > 20) {
            setUsernameError("아이디를 6~20자로 입력해주세요.");
            setUsernameShake(true);
            setTimeout(() => setUsernameShake(false), 500);
            setIsIdAvailable(false);
            return false;
        }
        setUsernameError("");
        return true;
    };

    const validatePassword = () => {
        const trimmed = password.trim();
        if (trimmed.length < 6 || trimmed.length > 20) {
            setPasswordError("비밀번호를 6~20자로 입력해주세요.");
            setPasswordShake(true);
            setTimeout(() => setPasswordShake(false), 500);
            return false;
        }
        setPasswordError("");
        return true;
    };

    const validatePasswordConfirm = () => {
        const trimmed = passwordConfirm.trim();
        if (!passwordConfirm) {
            setPasswordConfirmError("비밀번호를 먼저 입력해주세요.");
            setPasswordConfirmShake(true);
            setTimeout(() => setPasswordConfirmShake(false), 500);
            passwordRef.current.focus();
            return false;
        } else if (trimmed.length < 6 || trimmed.length > 20) {
            setPasswordConfirmError("비밀번호를 6~20자로 입력해주세요.");
            setPasswordConfirmShake(true);
            setTimeout(() => setPasswordConfirmShake(false), 500);
            return false;
        } else if (password !== passwordConfirm) {
            setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
            setPasswordConfirmShake(true);
            setTimeout(() => setPasswordConfirmShake(false), 500);
            return false;
        } else {
            setPasswordConfirmError("비밀번호가 일치합니다.");
            return true;
        }
    };

    const validateEmail = () => {
        const trimmed = email.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setEmailError("이메일 형식이 올바르지 않습니다.");
            setEmailShake(true);
            setTimeout(() => setEmailShake(false), 500);
            return false;
        }
        setEmailError("");
        return true;
    };

    const validatePhoneNumber = () => {
        const trimmed = phoneNumber.trim();
        if (!/^\d{11}$/.test(trimmed)) {
            setPhoneNumberError("전화번호를 11자리 숫자로 입력해주세요.");
            setPhoneNumberShake(true);
            setTimeout(() => setPhoneNumberShake(false), 500);
            return false;
        }
        setPhoneNumberError("");
        return true;
    };


    return {
        name, setName,
        birthdate, setBirthdate,
        username, setUsername,
        password, setPassword,
        passwordConfirm, setPasswordConfirm,
        email, setEmail,
        phoneNumber, setPhoneNumber,

        nameError, setNameError,
        birthdateError, setBirthdateError,
        usernameError, setUsernameError,
        passwordError, setPasswordError,
        passwordConfirmError, setPasswordConfirmError,
        emailError, setEmailError,
        phoneNumberError, setPhoneNumberError,
        signupError, setSignupError,
        isIdAvailable, setIsIdAvailable,

        nameFocused, setNameFocused,
        birthdateFocused, setBirthdateFocused,
        usernameFocused, setUsernameFocused,
        passwordFocused, setPasswordFocused,
        passwordConfirmFocused, setPasswordConfirmFocused,
        emailFocused, setEmailFocused,
        phoneNumberFocused, setPhoneNumberFocused,

        nameShake, setNameShake,
        birthdateShake, setBirthdateShake,
        usernameShake, setUsernameShake,
        passwordShake, setPasswordShake,
        passwordConfirmShake, setPasswordConfirmShake,
        emailShake, setEmailShake,
        phoneNumberShake, setPhoneNumberShake,


        nameRef, birthdateRef, usernameRef, passwordRef, passwordConfirmRef, emailRef, phoneNumberRef,

        handleSignUp,
        validateName, validateBirthdate, validateUsername, validatePassword, validatePasswordConfirm, validateEmail, validatePhoneNumber,
        checkIdAvailability,
    };
}