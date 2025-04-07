import React, { useState, useEffect } from "react";
import SignUp from "./SignUp.jsx";
import { useLogin } from "../hooks/useLogin.js";
import InputField from "../component/InputField.jsx";

export default function Login() {
  const {
    username, setUsername,
    password, setPassword,
    usernameError, passwordError,
    usernameFocused, setUsernameFocused,
    passwordFocused, setPasswordFocused,
    usernameRef, passwordRef,
    handleLogin,
    validateUsername,
    validatePassword,
    usernameShake, passwordShake,
    loginError, setLoginError
  } = useLogin();

  const [isSignUp, setIsSignUp] = useState(false);
  const [fade, setFade] = useState(false);
  const videos = [
    "/images/login/tom_jerry.mp4",
    "/images/login/chiikawa.mp4",
    "/images/login/kuromi.mp4",
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const handleTransition = () => {
      setFade(true);
      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
        setFade(false);
      }, 500);
    };

    const videoElement = document.querySelector("video");
    videoElement?.addEventListener("ended", handleTransition);

    return () => {
      videoElement?.removeEventListener("ended", handleTransition);
    };
  }, [currentVideoIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUsername()) {
      usernameRef.current.focus();
      return;
    }
    if (!validatePassword()) {
      passwordRef.current.focus();
      return;
    }
    handleLogin(e);
  };

  // 아이디 또는 비밀번호 input 필드에 focus 되면 loginError 를 초기화하는 useEffect
  useEffect(() => {
    if (usernameFocused || passwordFocused) {
      setLoginError(""); // loginError 초기화
    }
  }, [usernameFocused, passwordFocused, setLoginError]); // usernameFocused, passwordFocused, setLoginError 에 의존

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-66px)] overflow-hidden relative mt-66">
      <video
        className={`fixed top-0 left-0 w-full h-full object-cover duration-500 z-10 ${fade ? "opacity-0" : "opacity-100"}`}
        src={videos[currentVideoIndex]}
        autoPlay muted playsInline
      />
      <div className="fixed top-0 left-0 z-0 w-full h-full bg-black"></div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className="absolute text-center text-black transition-all duration-300 bg-white rounded-xl shadow-2xl w-[400px] top-[100px] left-1/2 lg:left-[75%] transform -translate-x-1/2 z-20 ">
          {isSignUp ? "" : <div className="w-full overflow-hidden h-[180px]">
            <img src="/images/login/skater_john.jpg" alt="Skater" className="object-cover w-full h-full rounded-t-md" />
          </div>}
          <div className="pt-0 pb-20 px-50">
            <p className={`mt-20 mb-16 font-bold text-24 ${isSignUp ? 'mt-30 mb-20' : ''}`}>
              {isSignUp ? "회원가입" : "로그인"}
            </p>
            {!isSignUp ? (
              <div className="flex flex-col items-center">
                <InputField
                  id="username"
                  label="아이디"
                  value={username}
                  setValue={setUsername}
                  error={usernameError}
                  refElement={usernameRef}
                  focused={usernameFocused}
                  setFocused={setUsernameFocused}
                  validate={validateUsername}
                  shake={usernameShake}
                />
                <InputField
                  id="password"
                  type="password"
                  label="비밀번호"
                  value={password}
                  setValue={setPassword}
                  error={passwordError}
                  refElement={passwordRef}
                  focused={passwordFocused}
                  setFocused={setPasswordFocused}
                  validate={validatePassword}
                  shake={passwordShake}
                />
                <button type="submit" className="w-full p-12 text-white transition-all duration-300 bg-blue rounded-12 text-16">로그인</button>
                {loginError && <p className="mt-10 text-sm text-red-500">{loginError}</p>}
              </div>
            ) : (
              <SignUp setIsSignUp={setIsSignUp} />
            )}
            <div className="flex items-center justify-center gap-5 mt-20 text-[14px]">
              <span className="text-black">{isSignUp ? "이미 계정이 있습니까?" : "CASETiBUY 계정이 없습니까?"}</span>
              <a onClick={() => setIsSignUp(!isSignUp)} className="underline cursor-pointer text-blue">
                {isSignUp ? "로그인" : "지금 만드세요."}
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}