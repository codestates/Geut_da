import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import IsLoginState from '../../states/IsLoginState';

const LoginModalWrap = styled.div`
  display: flex;
  position: relative;
  width: 70vw;
  height: 70vh;
  padding: 3rem 3rem 3rem 0;
  background-color: #ffffff;
  border-radius: 1rem;
  overflow: hidden;

  .closeButton {
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    color: #646464;
    background: none;
    font-weight: 700;
    font-size: 1.5em;
  }
  .closeButton:hover {
    cursor: pointer;
  }
`;

const LoginModalImg = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: auto;
    height: 100%;
  }
`;

const LoginModalContentWrap = styled.div`
  flex: 1;
  text-align: center;
`;

const LoginModalSubContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  height: 100%;
  margin-left: 2rem;
  padding: 2rem;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2);
`;

const LoginModalLogoWrap = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100%;
  }
`;
const LoginModalInputWrap = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;

  h3 {
    font-size: 1.4em;
    font-weight: 700;
    margin: 0 0 2rem;
    padding: 0;
  }

  input {
    border: none;
    margin-bottom: 1rem;
    border-bottom: 1px solid #c4c4c4;
    text-align: center;
    font-size: 1.1em;
  }
  input:focus {
    outline: none;
  }
  span {
    font-size: 0.85em;
    color: red;
  }
`;

const LoginModalLinkWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 100%;
    height: 2.5rem;
    margin-top: 1rem;
    border: none;
    border-radius: 10px;
    background-color: #9e9e9e;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.1em;
    transition: all 0.5s;
  }

  button:hover,
  button:focus {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
  }

  span {
    font-size: 1em;
    color: #666;
  }
  span:hover {
    color: var(--color-red);
    border-bottom: 1px solid var(--color-red);
  }
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

  const LogInReqHandler = (event) => {
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
          'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/users/login',
          {
            email: loginInputInfo.email,
            password: loginInputInfo.password,
          },
          config
        )
        .then((res) => {
          // console.log(res);
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

  const LogInReqEnterHandler = (event) => {
    if (event.key === 'Enter') {
      LogInReqHandler(loginInputInfo);
    }
  };

  const LoginModalCloseHandler = () => {
    LoginModalHandler(false);
  };

  return (
    <LoginModalWrap onClick={(e) => e.stopPropagation()}>
      <LoginModalImg>
        <img src='/images/human.png' alt='일러스트 이미지' />
      </LoginModalImg>
      <button onClick={LoginModalCloseHandler} className={'closeButton'}>
        &times;
      </button>
      <LoginModalContentWrap>
        <LoginModalSubContentWrap>
          <LoginModalLogoWrap>
            <img src='/images/geutda_logo.svg' alt='Logo' />
          </LoginModalLogoWrap>
          <LoginModalInputWrap>
            <h3>Login</h3>
            <input
              type='email'
              placeholder='Email'
              value={loginInputInfo.email}
              onChange={InputValueChangeHandler}
              onKeyPress={LogInReqEnterHandler}
            />
            <input
              type='password'
              placeholder='password'
              value={loginInputInfo.password}
              onChange={InputValueChangeHandler}
              onKeyUp={LogInReqEnterHandler}
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
        </LoginModalSubContentWrap>
      </LoginModalContentWrap>
    </LoginModalWrap>
  );
};

export default LoginModal;
