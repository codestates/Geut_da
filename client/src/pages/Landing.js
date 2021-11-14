import { useState, useEffect } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/Modal/LoginModal';
import SignupModal from '../components/Modal/SignupModal';
import styled from 'styled-components';
import IsLoginState from '../states/IsLoginState';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

const ModalBackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Landing = () => {
  const [clickLogin, setClickLogin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);
  const loginCheck = useRecoilValue(IsLoginState);
  const history = useNavigate();

  const LoginModalHandler = () => {
    setClickLogin(!clickLogin);
  };

  const SignupModalHandler = () => {
    setClickSignup(!clickSignup);
  };

  useEffect(() => {
    if (loginCheck) {
      history('/main');
    }
  });

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
        <ModalBackDrop onClick={SignupModalHandler}>
          <SignupModal
            SignupModalHandler={SignupModalHandler}
            LoginModalHandler={LoginModalHandler}
          />
        </ModalBackDrop>
      ) : null}
    </>
  );
};

export default Landing;
