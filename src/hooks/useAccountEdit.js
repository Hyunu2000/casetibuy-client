import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useAccountEdit() {
  // 기본 유저 정보 상태 (편집 불가: 아이디)
  const [currentId, setCurrentId] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // 비밀번호 관련 상태
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // 에러 메시지 상태
  const [nameError, setNameError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  // 쉐이크 효과 상태
  const [nameShake, setNameShake] = useState(false);
  const [birthdateShake, setBirthdateShake] = useState(false);
  const [emailShake, setEmailShake] = useState(false);
  const [phoneShake, setPhoneShake] = useState(false);
  const [currentPasswordShake, setCurrentPasswordShake] = useState(false);
  const [newPasswordShake, setNewPasswordShake] = useState(false);
  const [confirmNewPasswordShake, setConfirmNewPasswordShake] = useState(false);

  // 각 입력 필드에 대한 ref
  const nameRef = useRef(null);
  const birthdateRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

  const navigate = useNavigate();

  // 로그인한 유저 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get("http://54.180.155.70:9000/member/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data;
        setCurrentId(user.id || "");
        setName(user.name || "");
        setBirthdate(user.birthdate || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
      })
      .catch((err) => {
        console.error("유저정보 가져오기 실패:", err);
      });
  }, []);

  // 검증 함수들
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
      setBirthdateError("생년월일은 8자리 숫자로 입력해주세요.");
      setBirthdateShake(true);
      setTimeout(() => setBirthdateShake(false), 500);
      return false;
    }
    setBirthdateError("");
    return true;
  };

  const validateEmail = () => {
    const trimmed = email.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed) {
      setEmailError("이메일을 입력해주세요.");
      setEmailShake(true);
      setTimeout(() => setEmailShake(false), 500);
      return false;
    }
    if (!regex.test(trimmed)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      setEmailShake(true);
      setTimeout(() => setEmailShake(false), 500);
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = () => {
    const trimmed = phone.trim();
    if (!trimmed) {
      setPhoneError("전화번호를 입력해주세요.");
      setPhoneShake(true);
      setTimeout(() => setPhoneShake(false), 500);
      return false;
    }
    if (!/^\d{11}$/.test(trimmed)) {
      setPhoneError("전화번호는 11자리 숫자로 입력해주세요.");
      setPhoneShake(true);
      setTimeout(() => setPhoneShake(false), 500);
      return false;
    }
    setPhoneError("");
    return true;
  };

  // 현재 비밀번호 검증: 6~20자 조건과 서버 일치 확인
  const validateCurrentPassword = async () => {
    const trimmed = currentPassword.trim();
    if (!trimmed) {
      setCurrentPasswordError("현재 사용 중인 비밀번호를 입력해주세요.");
      setCurrentPasswordShake(true);
      setTimeout(() => setCurrentPasswordShake(false), 500);
      return false;
    }
    if (trimmed.length < 6 || trimmed.length > 20) {
      setCurrentPasswordError("현재 사용 중인 비밀번호는 6~20자로 입력해주세요.");
      setCurrentPasswordShake(true);
      setTimeout(() => setCurrentPasswordShake(false), 500);
      return false;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://54.180.155.70:9000/member/checkPassword",
        { currentPassword: trimmed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.match) {
        setCurrentPasswordError(""); // 성공 시 에러 초기화
        return true;
      } else {
        setCurrentPasswordError("현재 비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
        setCurrentPasswordShake(true);
        setTimeout(() => setCurrentPasswordShake(false), 500);
        return false;
      }
    } catch (error) {
      console.error("현재 비밀번호 검증 실패:", error);
      setCurrentPasswordError("비밀번호 확인 중 오류가 발생했습니다.");
      setCurrentPasswordShake(true);
      setTimeout(() => setCurrentPasswordShake(false), 500);
      return false;
    }
  };

  // 새 비밀번호 검증: 빈값이면 변경 안 함, 있으면 6~20자 조건 확인
  const validateNewPassword = () => {
    const trimmed = newPassword.trim();
    if (!trimmed) {
      setNewPasswordError("");
      return true;
    }
    if (trimmed.length < 6 || trimmed.length > 20) {
      setNewPasswordError("새롭게 사용할 비밀번호를 입력해주세요.(6~20자)");
      setNewPasswordShake(true);
      setTimeout(() => setNewPasswordShake(false), 500);
      return false;
    }
    setNewPasswordError("");
    return true;
  };

  // 새 비밀번호 확인 검증: 빈값이면 에러, 일치하지 않으면 에러
  const validateConfirmNewPassword = () => {
    const trimmed = confirmNewPassword.trim();
    if (!newPassword.trim() && !trimmed) {
      setConfirmNewPasswordError("");
      return true;
    }
    if (!trimmed) {
      setConfirmNewPasswordError("새 비밀번호 확인을 입력해주세요.");
      setConfirmNewPasswordShake(true);
      setTimeout(() => setConfirmNewPasswordShake(false), 500);
      return false;
    }
    if (newPassword.trim() !== trimmed) {
      setConfirmNewPasswordError("새 비밀번호가 일치하지 않습니다.");
      setConfirmNewPasswordShake(true);
      setTimeout(() => setConfirmNewPasswordShake(false), 500);
      return false;
    }
    setConfirmNewPasswordError("비밀번호가 일치합니다.");
    return true;
  };

  // 설정 업데이트 함수 (모든 필드 검증 후 서버 요청)
  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    if (!validateName()) return;
    if (!validateBirthdate()) return;
    if (!validateEmail()) return;
    if (!validatePhone()) return;

    const isCurrentValid = await validateCurrentPassword();
    if (!isCurrentValid) return;

    const isChangingPassword = newPassword.trim() !== "" || confirmNewPassword.trim() !== "";
    if (isChangingPassword) {
      if (currentPassword.trim() === newPassword.trim()) {
        setNewPasswordError("현재 사용 중인 비밀번호와 동일한 비밀번호를 사용할 수 없습니다.");
        setNewPasswordShake(true);
        setTimeout(() => setNewPasswordShake(false), 500);
        return;
      }
      if (!validateNewPassword()) return;
      if (!validateConfirmNewPassword()) return;
    }

    try {
      const token = localStorage.getItem("token");
      const body = {
        currentId,
        name,
        birthdate,
        email,
        phone,
        currentPassword: currentPassword.trim(),
        newPassword: isChangingPassword ? newPassword.trim() : "",
      };
      const res = await axios.put("http://54.180.155.70:9000/member/update", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        alert("계정 정보가 수정되었습니다.");
        navigate("/");
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("계정 정보 수정 오류:", error);
      alert("계정 정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return {
    currentId,
    name, setName,
    birthdate, setBirthdate,
    email, setEmail,
    phone, setPhone,
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    confirmNewPassword, setConfirmNewPassword,
    nameError,
    birthdateError,
    emailError,
    phoneError,
    currentPasswordError,
    newPasswordError,
    confirmNewPasswordError,
    nameShake,
    birthdateShake,
    emailShake,
    phoneShake,
    currentPasswordShake,
    newPasswordShake,
    confirmNewPasswordShake,
    nameRef,
    birthdateRef,
    emailRef,
    phoneRef,
    currentPasswordRef,
    newPasswordRef,
    confirmNewPasswordRef,
    handleUpdateAccount,
    validateCurrentPassword,
    validateNewPassword,
    validateConfirmNewPassword,
  };
}
