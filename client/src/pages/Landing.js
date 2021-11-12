import { useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/Modal/LoginModal';
import SignupModal from '../components/Modal/SignupModal';
import styled from 'styled-components';

const ModalBackDrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const Landing = () => {
  const [clickLogin, setClickLogin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);

  const LoginModalHandler = () => {
    setClickLogin(!clickLogin);
  };

  const SignupModalHandler = () => {
    setClickSignup(!clickSignup);
  };

  return (
    <>
      <Header
        LoginModalHandler={LoginModalHandler}
        SignupModalHandler={SignupModalHandler}
      />
      <div>Landing Page</div>
      <button onClick={LoginModalHandler}>시작하기</button>
      {clickLogin ? (
        <ModalBackDrop onClick={LoginModalHandler}>
          <LoginModal
            LoginModalHandler={LoginModalHandler}
            SignupModalHandler={SignupModalHandler}
          />
        </ModalBackDrop>
      ) : null}
      {clickSignup ? (
        <ModalBackDrop>
          <SignupModal SignupModalHandler={SignupModalHandler} />
        </ModalBackDrop>
      ) : null}
    </>
  );
};

export default Landing;
