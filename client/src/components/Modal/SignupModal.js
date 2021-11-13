import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
const SignUpModalWrap = styled.div`
  display: flex;
  width: 70%;
  height: 70vh;
  margin: 15em auto;
  border: 3px solid black;
`;

const SignUpModalImg = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid black;
`;

const SignUpModalContentWrap = styled.div`
  width: 50%;
  height: 100%;
  text-align: center;
  border: 1px solid black;
`;

const SignUpModalInputWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignupModal = ({ SignupModalHandler }) => {
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

  const [emailValidateMessage, setEmailValidateMessage] = useState(false);
  const [emailValidText, setEmailValidText] = useState(false);
  const [nicknameValidateMessage, setNicknameValidateMessage] = useState(false);
  const [nicknameValidText, setNicknameValidText] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    //이메일
    if (signUpValidateState.email && emailValidText === 'ok') {
      setEmailValidateMessage('사용 가능한 닉네임 입니다');
    } else if (!signUpValidateState.email && emailValidText === 'overlap') {
      setEmailValidateMessage('사용중인 닉네임 입니다');
    } else if (!signUpValidateState.email && emailValidText === 'nothing') {
      setEmailValidateMessage('필수 입력 사항입니다');
    } else if (!signUpValidateState.email && emailValidText === 'invalidate') {
      setEmailValidateMessage(
        '알파벳, 숫자, 특수문자를 포함하여 8~20글자를 입력해주세요.'
      );
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
      setNicknameValidateMessage('두글자 이상의 닉네임을 입력해주세요');
    }
  });

  //유효성검사 정규표현식
  const pwdExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  const emailExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const nicknameExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;

  const SignUpInputValueChange = (event) => {
    //내가 인풋창에 입력한 값을 value값에 넣어주는 로직
    if (event.target.type === 'email') {
      setSignUpInputInfo({ ...signUpInputInfo, email: event.target.value });
    }

    if (event.target.type === 'text') {
      setSignUpInputInfo({ ...signUpInputInfo, nickname: event.target.value });
    }
  };

  const SignUpOnBlurHandler = (event) => {
    //email OnBlur

    if (event.target.type === 'email' && signUpInputInfo.email === '') {
      setSignUpvalidateState({ ...signUpValidateState, email: false });
      setEmailValidText('nothing');
    } else if (
      event.target.type === 'email' &&
      !emailExp.test(signUpInputInfo.email)
    ) {
      setSignUpvalidateState({ ...signUpValidateState, email: false });
      setEmailValidText('invalidate');
    } else if (
      event.target.type === 'email' &&
      emailExp.test(signUpInputInfo.email)
    ) {
      axios
        .post('/api/users/email', { email: signUpInputInfo.email }, config)
        .then((res) => {
          //사용가능한 메일인 경우
          console.log('메일 사용가능');
          console.log(res);
          setSignUpvalidateState({ ...signUpValidateState, email: true });
          setEmailValidText('ok');
        })
        .catch((err) => {
          //닉네임이 중복인 경우
          console.log('이메일 중복');
          console.log(err);
          setSignUpvalidateState({ ...signUpValidateState, email: false });
          setEmailValidText('overlap');
        });
    }
    //nickname OnBlur
    if (event.target.type === 'text' && signUpInputInfo.nickname === '') {
      setSignUpvalidateState({ ...signUpValidateState, nickname: false });
      setNicknameValidText('nothing');
    } else if (
      event.target.type === 'text' &&
      !nicknameExp.test(signUpInputInfo.nickname)
    ) {
      setSignUpvalidateState({ ...signUpValidateState, nickname: false });
      setNicknameValidText('invalidate');
    } else if (
      event.target.type === 'text' &&
      nicknameExp.test(signUpInputInfo.nickname)
    ) {
      axios
        .post(
          '/api/users/nickname',
          { nickname: signUpInputInfo.nickname },
          config
        )
        .then((res) => {
          //사용가능한 닉네임인 경우
          console.log('닉네임 사용가능');
          console.log(res);
          setSignUpvalidateState({ ...signUpValidateState, nickname: true });
          setNicknameValidText('ok');
        })
        .catch((err) => {
          //닉네임이 중복인 경우
          console.log('닉네임 중복');
          console.log(err);
          setSignUpvalidateState({ ...signUpValidateState, nickname: false });
          setNicknameValidText('overlap');
        });
    }
  };

  return (
    <SignUpModalWrap onClick={(e) => e.stopPropagation()}>
      <SignUpModalImg>이미지</SignUpModalImg>
      <SignUpModalContentWrap>
        <button onClick={SignupModalHandler}>&times;</button>
        <div>로고</div>
        <SignUpModalInputWrap>
          <div>Sign Up</div>
          <input
            type='email'
            placeholder='Email'
            value={signUpInputInfo.email}
            onChange={SignUpInputValueChange}
            onBlur={SignUpOnBlurHandler}
          />
          {emailValidateMessage ? <span>{emailValidateMessage}</span> : <br />}
          <input type='password' placeholder='password' />
          <span>Wrong</span>
          <input type='password' placeholder='password check' />
          <span>Wrong</span>
          <input
            type='text'
            placeholder='nickname'
            value={signUpInputInfo.nickname}
            onChange={SignUpInputValueChange}
            onBlur={SignUpOnBlurHandler}
          />
          {nicknameValidateMessage ? (
            <span>{nicknameValidateMessage}</span>
          ) : (
            <br />
          )}
        </SignUpModalInputWrap>
        <button>Sign Up</button>
      </SignUpModalContentWrap>
    </SignUpModalWrap>
  );
};

export default SignupModal;
