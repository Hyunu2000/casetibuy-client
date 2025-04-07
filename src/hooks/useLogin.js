import { useState, useRef } from "react";
import axios from "axios";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [usernameShake, setUsernameShake] = useState(false);
  const [passwordShake, setPasswordShake] = useState(false);
  const [loginError, setLoginError] = useState("");

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateUsername() || !validatePassword()) {
      return;
    }

    try {
      const response = await axios.post("http://54.180.155.70:9000/member/login", {
        // axios.post 사용
        id: username,
        pwd: password,
      });

      if (response.status === 200) {
        // axios는 성공 시 status가 200번대, response.data로 데이터 접근
        const data = response.data;
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.id); /// <<< 지혜 / 추가 : 로컬스토리지 아이디 저장>>>

          alert("로그인 성공!");
          window.location.href = "/";
        } else {
          setLoginError("아이디 또는 비밀번호를 확인해주세요.");
        }
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      if (error.response) {
        // 서버에서 응답이 왔지만 에러 상태 코드인 경우 (4xx, 5xx)
        setLoginError(
          error.response.data.message || "아이디 또는 비밀번호를 확인해주세요."
        ); // 서버 에러 메시지 사용
      } else if (error.request) {
        // 요청은 보냈으나 응답을 받지 못한 경우 (네트워크 에러 등)
        setLoginError("서버와 연결할 수 없습니다.");
      } else {
        // 요청을 만드는 중에 에러가 발생한 경우
        setLoginError("로그인 처리 중 오류가 발생했습니다.");
      }
    }
  };

  const validateUsername = () => {
    const trimmed = username.trim();
    if (trimmed.length < 6 || trimmed.length > 20) {
      setUsernameError("아이디를 입력해주세요.(6~20자)");
      setUsernameShake(true);
      setTimeout(() => setUsernameShake(false), 500);
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePassword = () => {
    const trimmed = password.trim();
    if (trimmed.length < 6 || trimmed.length > 20) {
      setPasswordError("비밀번호를 입력해주세요.(6~20자)");
      setPasswordShake(true);
      setTimeout(() => setPasswordShake(false), 500);
      return false;
    }
    setPasswordError("");
    return true;
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    usernameError,
    passwordError,
    usernameFocused,
    setUsernameFocused,
    passwordFocused,
    setPasswordFocused,
    usernameRef,
    passwordRef,
    handleLogin,
    validateUsername,
    validatePassword,
    usernameShake,
    passwordShake,
    loginError,
    setLoginError,
  };
}
