import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
const SignUpModalWrap = styled.div`
  display: flex;
  position: relative;
  width: 70vw;
  height: 70vh;
  padding: 3rem;
  background-color: #ffffff;
  border-radius: 1rem;

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

const SignUpModalImg = styled.div`
  flex: 1;
  overflow: hidden;

  img {
    height: 100%;
  }
`;

const SignUpModalContentWrap = styled.div`
  flex: 1;
  text-align: center;
`;

const SignUpModalSubContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  height: 100%;
  margin-left: 2rem;
  padding: 2rem;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2);
`;

const SignUpModalLogoWrap = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
  }
`;

const SignUpModalInputWrap = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.2rem;

  h3.SignUpTitle {
    font-size: 1.4em;
    font-weight: 700;
    margin: 0 0 2rem;
    padding: 0;
  }

  input {
    border: none;
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
    margin-bottom: 0.5rem;
  }
  span.validatepass {
    color: green;
  }
`;

const SignUpModalButtonWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  .signUp {
    width: 100%;
    height: 2.5rem;
    border: none;
    border-radius: 10px;
    background-color: #9e9e9e;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.1em;
    transition: all 0.5s;
  }

  .signUp:hover,
  .signUp:focus {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
  }
`;

const SignupModal = ({ SignupModalHandler, LoginModalHandler }) => {
  const [signUpInputInfo, setSignUpInputInfo] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });
  const [signUpValidateState, setSignUpvalidateState] = useState({
    email: false,
    password: false,
    passwordCheck: false,
    nickname: false,
  });

  const [allValidateCheck, setAllValidateCheck] = useState(false);
  const [emailValidateMessage, setEmailValidateMessage] = useState(false);
  const [emailValidText, setEmailValidText] = useState(false);
  const [nicknameValidateMessage, setNicknameValidateMessage] = useState(false);
  const [nicknameValidText, setNicknameValidText] = useState(false);
  const [pwValidateMessage, setPwValidateMessage] = useState(false);
  const [pwValidText, setPwValidText] = useState(false);
  const [pwCheckValidateMessage, setPwCheckValidateMessage] = useState(false);
  const [pwCheckValidText, setPwCheckValidText] = useState(false);
  const [isSpanColor, setIsSpanColor] = useState({
    email: false,
    password: false,
    passwordCheck: false,
    nickname: false,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    //이메일
    if (signUpValidateState.email && emailValidText === 'ok') {
      setEmailValidateMessage('사용 가능한 이메일 입니다');
    } else if (!signUpValidateState.email && emailValidText === 'overlap') {
      setEmailValidateMessage('사용중인 이메일 입니다');
    } else if (!signUpValidateState.email && emailValidText === 'nothing') {
      setEmailValidateMessage('필수 입력 사항입니다');
    } else if (!signUpValidateState.email && emailValidText === 'invalidate') {
      setEmailValidateMessage('이메일 형식으로 입력해주세요');
    }
    //닉네임
    if (signUpValidateState.nickname && nicknameValidText === 'ok') {
      setNicknameValidateMessage('사용 가능한 닉네임 입니다');
    } else if (
      !signUpValidateState.nickname &&
      nicknameValidText === 'overlap'
    ) {
      setNicknameValidateMessage('사용중인 닉네임 입니다');
    } else if (
      !signUpValidateState.nickname &&
      nicknameValidText === 'nothing'
    ) {
      setNicknameValidateMessage('필수 입력 사항입니다');
    } else if (
      !signUpValidateState.nickname &&
      nicknameValidText === 'invalidate'
    ) {
      setNicknameValidateMessage(
        '두글자 이상 열 글자 이하로 닉네임을 입력해주세요'
      );
    }

    //비밀번호
    if (signUpValidateState.password && pwValidText === 'ok') {
      setPwValidateMessage('사용 가능한 비밀번호 입니다');
    } else if (!signUpValidateState.password && pwValidText === 'nothing') {
      setPwValidateMessage('필수 입력 사항입니다');
    } else if (!signUpValidateState.password && pwValidText === 'invalidate') {
      setPwValidateMessage(
        '알파벳, 숫자, 특수문자를 포함하여 8~20글자를 입력해주세요.'
      );
    }

    //비밀번호 확인
    if (signUpValidateState.passwordCheck && pwCheckValidText === 'ok') {
      setPwCheckValidateMessage('비밀번호 일치');
    } else if (
      !signUpValidateState.passwordCheck &&
      pwCheckValidText === 'nothing'
    ) {
      setPwCheckValidateMessage('필수 입력 사항입니다');
    } else if (
      !signUpValidateState.passwordCheck &&
      pwCheckValidText === 'invalidate'
    ) {
      setPwCheckValidateMessage('비밀번호와 일치하지 않습니다');
    }
  }, [emailValidText, nicknameValidText, pwValidText, pwCheckValidText]);

  useEffect(() => {
    //signUpValidateState 변경시 마다 실행.
    if (
      signUpValidateState.email === true &&
      signUpValidateState.password === true &&
      signUpValidateState.passwordCheck === true &&
      signUpValidateState.nickname === true
    ) {
      setAllValidateCheck(true);
    } else {
      setAllValidateCheck(false);
    }
  }, [signUpValidateState]);

  //유효성검사 정규표현식
  const pwdExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  const emailExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const nicknameExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;

  const SignUpInputValueChange = (event) => {
    //내가 인풋창에 입력한 값을 value값에 넣어주는 로직
    if (event.target.type === 'email') {
      setSignUpInputInfo({ ...signUpInputInfo, email: event.target.value });
    }

    if (event.target.type === 'text') {
      setSignUpInputInfo({ ...signUpInputInfo, nickname: event.target.value });
    }

    if (
      event.target.type === 'password' &&
      event.target.placeholder === 'password'
    ) {
      setSignUpInputInfo({ ...signUpInputInfo, password: event.target.value });
    }
    if (
      event.target.type === 'password' &&
      event.target.placeholder === 'password check'
    ) {
      setSignUpInputInfo({
        ...signUpInputInfo,
        passwordCheck: event.target.value,
      });
    }
  };

  const SignUpOnBlurHandler = (event) => {
    //email OnBlur
    if (event.target.type === 'email' && signUpInputInfo.email === '') {
      setSignUpvalidateState({ ...signUpValidateState, email: false });
      setIsSpanColor({ ...isSpanColor, email: false });
      setEmailValidText('nothing');
    } else if (
      event.target.type === 'email' &&
      !emailExp.test(signUpInputInfo.email)
    ) {
      setSignUpvalidateState({ ...signUpValidateState, email: false });
      setIsSpanColor({ ...isSpanColor, email: false });
      setEmailValidText('invalidate');
    } else if (
      event.target.type === 'email' &&
      emailExp.test(signUpInputInfo.email)
    ) {
      axios
        .post('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/users/email', { email: signUpInputInfo.email }, config)
        .then((res) => {
          //사용가능한 메일인 경우
          setSignUpvalidateState({ ...signUpValidateState, email: true });
          setIsSpanColor({ ...isSpanColor, email: true });
          setEmailValidText('ok');
        })
        .catch((err) => {
          //닉네임이 중복인 경우
          setSignUpvalidateState({ ...signUpValidateState, email: false });
          setIsSpanColor({ ...isSpanColor, email: false });
          setEmailValidText('overlap');
        });
    }
    //nickname OnBlur
    if (event.target.type === 'text' && signUpInputInfo.nickname === '') {
      setSignUpvalidateState({ ...signUpValidateState, nickname: false });
      setIsSpanColor({ ...isSpanColor, nickname: false });
      setNicknameValidText('nothing');
    } else if (
      event.target.type === 'text' &&
      !nicknameExp.test(signUpInputInfo.nickname)
    ) {
      setSignUpvalidateState({ ...signUpValidateState, nickname: false });
      setIsSpanColor({ ...isSpanColor, nickname: false });
      setNicknameValidText('invalidate');
    } else if (
      event.target.type === 'text' &&
      nicknameExp.test(signUpInputInfo.nickname)
    ) {
      axios
        .post(
          'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/users/nickname',
          { nickname: signUpInputInfo.nickname },
          config
        )
        .then((res) => {
          //사용가능한 닉네임인 경우
          setSignUpvalidateState({ ...signUpValidateState, nickname: true });
          setIsSpanColor({ ...isSpanColor, nickname: true });
          setNicknameValidText('ok');
        })
        .catch((err) => {
          //닉네임이 중복인 경우
          setSignUpvalidateState({ ...signUpValidateState, nickname: false });
          setIsSpanColor({ ...isSpanColor, nickname: false });
          setNicknameValidText('overlap');
        });
    }
  };

  const PasswordOnBlurHandler = (event) => {
    //password OnBlur
    if (
      event.target.type === 'password' &&
      signUpInputInfo.password === '' &&
      event.target.placeholder === 'password'
    ) {
      setSignUpvalidateState({ ...signUpValidateState, password: false });
      setIsSpanColor({ ...isSpanColor, password: false });
      setPwValidText('nothing');
    } else if (
      event.target.type === 'password' &&
      !pwdExp.test(signUpInputInfo.password) &&
      event.target.placeholder === 'password'
    ) {
      setSignUpvalidateState({ ...signUpValidateState, password: false });
      setIsSpanColor({ ...isSpanColor, password: false });
      setPwValidText('invalidate');
    } else if (
      event.target.type === 'password' &&
      pwdExp.test(signUpInputInfo.password) &&
      event.target.placeholder === 'password'
    ) {
      setSignUpvalidateState({ ...signUpValidateState, password: true });
      setIsSpanColor({ ...isSpanColor, password: true });
      setPwValidText('ok');
    }

    //password Check OnBlur
    if (
      event.target.type === 'password' &&
      signUpInputInfo.passwordCheck === '' &&
      event.target.placeholder === 'password check'
    ) {
      setSignUpvalidateState({ ...signUpValidateState, passwordCheck: false });
      setIsSpanColor({ ...isSpanColor, passwordCheck: false });
      setPwCheckValidText('nothing');
    } else if (
      event.target.type === 'password' &&
      signUpInputInfo.passwordCheck !== '' &&
      event.target.placeholder === 'password check' &&
      signUpInputInfo.password !== signUpInputInfo.passwordCheck
    ) {
      setSignUpvalidateState({ ...signUpValidateState, passwordCheck: false });
      setIsSpanColor({ ...isSpanColor, passwordCheck: false });
      setPwCheckValidText('invalidate');
    } else if (
      event.target.type === 'password' &&
      signUpInputInfo.passwordCheck !== '' &&
      event.target.placeholder === 'password check' &&
      signUpInputInfo.password === signUpInputInfo.passwordCheck
    ) {
      setSignUpvalidateState({ ...signUpValidateState, passwordCheck: true });
      setIsSpanColor({ ...isSpanColor, passwordCheck: true });
      setPwCheckValidText('ok');
    }
  };

  const SignUpHandler = (event) => {
    //회원가입 요청
    if (allValidateCheck) {
      //axios 요청
      axios
        .post(
          'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/users',
          {
            email: signUpInputInfo.email,
            password: signUpInputInfo.password,
            nickname: signUpInputInfo.nickname,
          },
          config
        )
        .then((res) => {
          //회원가입 완료되면 회원가입 모달창 닫고 로그인 모달창을 띄운다
          LoginModalHandler();
          SignupModalHandler();
        })
        .catch((err) => {
          //회원가입 실패하면 발생하는 이벤트 적으면됨
        });
    } else {
      //입력 안한것이 있으면 필수 입력이라고 문구 나와야됨.
      if (!emailValidateMessage) {
        setEmailValidText('nothing');
      }
      if (!nicknameValidateMessage) {
        setNicknameValidText('nothing');
      }
      if (!pwValidateMessage) {
        setPwValidText('nothing');
      }
      if (!pwCheckValidateMessage) {
        setPwCheckValidText('nothing');
      }
    }
  };

  return (
    <SignUpModalWrap onClick={(e) => e.stopPropagation()}>
      <SignUpModalImg>
        <img src='/images/bg.jpeg' alt='일러스트 이미지' />
      </SignUpModalImg>
      <button onClick={SignupModalHandler} className={'closeButton'}>
        &times;
      </button>
      <SignUpModalContentWrap>
        <SignUpModalSubContentWrap>
          <SignUpModalLogoWrap>
            <img src='/images/geutda_logo.svg' alt='Logo' />
          </SignUpModalLogoWrap>
          <SignUpModalInputWrap>
            <h3 className={'SignUpTitle'}>Sign Up</h3>
            <input
              type='email'
              placeholder='Email'
              value={signUpInputInfo.email}
              onChange={SignUpInputValueChange}
              onBlur={SignUpOnBlurHandler}
            />
            {emailValidateMessage ? (
              <span className={isSpanColor.email ? 'validatepass' : null}>
                {emailValidateMessage}
              </span>
            ) : (
              <span>
                <br />
              </span>
            )}
            <input
              type='password'
              placeholder='password'
              value={signUpInputInfo.password}
              onChange={SignUpInputValueChange}
              onBlur={PasswordOnBlurHandler}
            />
            {pwValidateMessage ? (
              <span className={isSpanColor.password ? 'validatepass' : null}>
                {pwValidateMessage}
              </span>
            ) : (
              <span>
                <br />
              </span>
            )}
            <input
              type='password'
              placeholder='password check'
              value={signUpInputInfo.passwordCheck}
              onChange={SignUpInputValueChange}
              onBlur={PasswordOnBlurHandler}
            />
            {pwCheckValidateMessage ? (
              <span
                className={isSpanColor.passwordCheck ? 'validatepass' : null}
              >
                {pwCheckValidateMessage}
              </span>
            ) : (
              <span>
                <br />
              </span>
            )}
            <input
              type='text'
              placeholder='nickname'
              value={signUpInputInfo.nickname}
              onChange={SignUpInputValueChange}
              onBlur={SignUpOnBlurHandler}
            />
            {nicknameValidateMessage ? (
              <span className={isSpanColor.nickname ? 'validatepass' : null}>
                {nicknameValidateMessage}
              </span>
            ) : (
              <span>
                <br />
              </span>
            )}
          </SignUpModalInputWrap>
          <SignUpModalButtonWrap>
            <button onClick={SignUpHandler} className={'signUp'}>
              Sign Up
            </button>
          </SignUpModalButtonWrap>
        </SignUpModalSubContentWrap>
      </SignUpModalContentWrap>
    </SignUpModalWrap>
  );
};

export default SignupModal;
