<<<<<<< HEAD
import React from "react";
import EditAccount from "../component/EditAccount.jsx";
import ContactEdit from "../component/ContactEdit.jsx";
import DeleteAccount from "../component/DeleteAccount.jsx";
import useAccountEdit from "../hooks/useAccountEdit.js";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const {
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
  } = useAccountEdit();
=======
import React from 'react';
import EditAccount from '../component/EditAccount.jsx';
import ContactEdit from '../component/ContactEdit.jsx';
import DeleteAccount from '../component/DeleteAccount.jsx';
import useAccountEdit from '../hooks/useAccountEdit.js';

export default function Settings() {
    const {
        currentId, name, birthdate, email, phone,
        currentPassword, newPassword, confirmNewPassword,
        setName, setBirthdate, setEmail, setPhone,
        setCurrentPassword, setNewPassword, setConfirmNewPassword,
        nameError, emailError, phoneError, currentPasswordError, newPasswordError, confirmNewPasswordError, birthdateError,
        currentPasswordShake, newPasswordShake, confirmNewPasswordShake, birthdateShake, emailShake, phoneShake, nameShake,
        currentPasswordRef, newPasswordRef, confirmNewPasswordRef, birthdateRef, emailRef, phoneRef, nameRef,
        handleUpdateAccount,
        // 유효성 검증 함수들
        validateName, validateBirthdate, validateEmail, validatePhone,
        validateCurrentPassword, validateNewPassword, validateConfirmNewPassword,
    } = useAccountEdit();
>>>>>>> main

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateAccount(e);
  };

<<<<<<< HEAD
  return (
    <>
      <div className="font-bold text-32 mb-30">계정 정보 수정하기</div>
      <form
        className="w-full mx-auto bg-white"
        noValidate
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        {/* 계정 정보 수정 영역 */}
        <EditAccount
          currentId={currentId}
          name={name}
          setName={setName}
          birthdate={birthdate}
          setBirthdate={setBirthdate}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmNewPassword={confirmNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
          nameError={nameError}
          birthdateError={birthdateError}
          emailError={emailError}
          phoneError={phoneError}
          currentPasswordError={currentPasswordError}
          newPasswordError={newPasswordError}
          confirmNewPasswordError={confirmNewPasswordError}
          nameShake={nameShake}
          birthdateShake={birthdateShake}
          emailShake={emailShake}
          phoneShake={phoneShake}
          currentPasswordShake={currentPasswordShake}
          newPasswordShake={newPasswordShake}
          confirmNewPasswordShake={confirmNewPasswordShake}
          nameRef={nameRef}
          birthdateRef={birthdateRef}
          emailRef={emailRef}
          phoneRef={phoneRef}
          currentPasswordRef={currentPasswordRef}
          newPasswordRef={newPasswordRef}
          confirmNewPasswordRef={confirmNewPasswordRef}
          validateCurrentPassword={validateCurrentPassword}
          validateNewPassword={validateNewPassword}
          validateConfirmNewPassword={validateConfirmNewPassword}
        />
        {/* 연락처 수정 영역 */}
        <ContactEdit />
        <div className="text-center">
          <button
            type="submit"
            className="p-15 bg-black border-2 text-18 text-white rounded-20 w-[300px]"
          >
            설정 업데이트
          </button>
        </div>
      </form>
      {/* 계정 삭제 영역 */}
      <DeleteAccount />
    </>
  );
=======
    return (
        <>
            <div className="font-bold text-32 mb-30">계정 정보 수정하기</div>
            <form className="w-full mx-auto bg-white" noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                {/* 계정 정보 수정 영역 */}
                <EditAccount
                    currentId={currentId}
                    name={name}
                    setName={setName}
                    birthdate={birthdate}
                    setBirthdate={setBirthdate}
                    email={email}
                    setEmail={setEmail}
                    phone={phone}
                    setPhone={setPhone}
                    currentPassword={currentPassword}
                    setCurrentPassword={setCurrentPassword}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    confirmNewPassword={confirmNewPassword}
                    setConfirmNewPassword={setConfirmNewPassword}
                    nameError={nameError}
                    emailError={emailError}
                    phoneError={phoneError}
                    currentPasswordError={currentPasswordError}
                    newPasswordError={newPasswordError}
                    confirmNewPasswordError={confirmNewPasswordError}
                    birthdateError={birthdateError}
                    currentPasswordShake={currentPasswordShake}
                    newPasswordShake={newPasswordShake}
                    confirmNewPasswordShake={confirmNewPasswordShake}
                    birthdateShake={birthdateShake}
                    emailShake={emailShake}
                    phoneShake={phoneShake}
                    nameShake={nameShake}
                    currentPasswordRef={currentPasswordRef}
                    newPasswordRef={newPasswordRef}
                    confirmNewPasswordRef={confirmNewPasswordRef}
                    birthdateRef={birthdateRef}
                    emailRef={emailRef}
                    phoneRef={phoneRef}
                    nameRef={nameRef}
                    // 전달할 유효성 함수들
                    validateName={validateName}
                    validateBirthdate={validateBirthdate}
                    validateEmail={validateEmail}
                    validatePhone={validatePhone}
                    validateCurrentPassword={validateCurrentPassword}
                    validateNewPassword={validateNewPassword}
                    validateConfirmNewPassword={validateConfirmNewPassword}
                />
                {/* 연락처 수정 영역 */}
                <ContactEdit />
                <div className="text-center">
                    <button type="submit" className="p-15 bg-black border-2 text-18 text-white rounded-20 w-[300px]">
                        설정 업데이트
                    </button>
                </div>
            </form>
            {/* 계정 삭제 영역 */}
            <DeleteAccount />
        </>
    );
>>>>>>> main
}
