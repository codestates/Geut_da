import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import IsLoginState from '../../states/IsLoginState';

const LoginModalWrap = styled.div`
  display: flex;
  width: 70%;
  height: 70vh;
  margin: 15em auto;
  border: 1px solid black;
`;

const LoginModalImg = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid black;
`;

const LoginModalContentWrap = styled.div`
  width: 50%;
  height: 100%;
  text-align: center;
  border: 1px solid black;
`;

const LoginModalInputWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginModalLinkWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginModal = ({ LoginModalHandler, SignupModalHandler }) => {
  const [loginInputInfo, setLoginInputInfo] = useState({
    email: '',
    password: '',
  });

  const [loginMessage, setLoginMessage] = useState(false);
  const LoginStateHandler = useSetRecoilState(IsLoginState);
  const history = useNavigate();

  //ID, Password 유효성 검사 정규표현식
  const emailExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let pwdExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

  const InputValueChangeHandler = (event) => {
    if (event.target.type === 'email') {
      setLoginInputInfo({ ...loginInputInfo, email: event.target.value });
    } else if (event.target.type === 'password') {
      setLoginInputInfo({ ...loginInputInfo, password: event.target.value });
    }
  };
  // SignUpModal On/ LoginModal Off
  const OpenSignUpModalHandler = (event) => {
    LoginModalHandler();
    SignupModalHandler();
  };

  const LogInReqHandler = async (event) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (
      emailExp.test(loginInputInfo.email) &&
      pwdExp.test(loginInputInfo.password)
    ) {
      axios
        .post(
          '/api/users/login',
          {
            email: loginInputInfo.email,
            password: loginInputInfo.password,
          },
          config
        )
        .then((res) => {
          console.log(res);
          const userInfo = res.data;
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          LoginStateHandler(true);
          setLoginMessage(false);
          setLoginInputInfo({ email: '', password: '' });
          history('/main');
        })
        .catch((err) => {
          console.log(err);
          setLoginMessage(true);
        });
    } else {
      setLoginMessage(true);
      LoginStateHandler(false);
    }
  };

  const LoginModalCloseHandler = () => {
    LoginModalHandler(false);
  };

  return (
    <LoginModalWrap onClick={(e) => e.stopPropagation()}>
      <LoginModalImg>이미지</LoginModalImg>
      <LoginModalContentWrap>
        <button onClick={LoginModalCloseHandler}>&times;</button>
        <div>로고</div>
        <LoginModalInputWrap>
          <div>Login</div>
          <input
            type='email'
            placeholder='Email'
            value={loginInputInfo.email}
            onChange={InputValueChangeHandler}
          />
          <input
            type='password'
            placeholder='password'
            value={loginInputInfo.password}
            onChange={InputValueChangeHandler}
          />
          {loginMessage ? (
            <span>
              &#42;아이디 또는 비밀번호가 잘못 입력 되었습니다.
              <br />
              <b>아이디</b>와 <b>비밀번호</b>를 정확히 입력해 주세요.
            </span>
          ) : null}
        </LoginModalInputWrap>
        <LoginModalLinkWrap>
          <span onClick={OpenSignUpModalHandler}>아직 계정이 없습니까?</span>
          <button onClick={LogInReqHandler}>Login</button>
        </LoginModalLinkWrap>
      </LoginModalContentWrap>
    </LoginModalWrap>
  );
};

export default LoginModal;
