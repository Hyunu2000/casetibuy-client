import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate(); // ✅ 추가된 부분

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateUsername() || !validatePassword()) {
      return;
    }

    try {
      const response = await axios.post("http://43.200.171.0:9000/member/login", {
        id: username,
        pwd: password,
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.id);
          alert("로그인 성공!");
          navigate("/", { replace: true });
        } else {
          setLoginError("아이디 또는 비밀번호를 확인해주세요.");
        }
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      if (error.response) {
        setLoginError(
          error.response.data.message || "아이디 또는 비밀번호를 확인해주세요."
        );
      } else if (error.request) {
        setLoginError("서버와 연결할 수 없습니다.");
      } else {
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
