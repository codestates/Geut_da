import styled from 'styled-components';
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
  //유효성검사 정규표현식
  // const pwdExp =
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  // const emailExp =
  //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // const nicknameExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;

  return (
    <SignUpModalWrap onClick={(e) => e.stopPropagation()}>
      <SignUpModalImg>이미지</SignUpModalImg>
      <SignUpModalContentWrap>
        <button onClick={SignupModalHandler}>&times;</button>
        <div>로고</div>
        <SignUpModalInputWrap>
          <div>Sign Up</div>
          <input type='email' placeholder='Email' />
          <span>Success</span>
          <input type='password' placeholder='password' />
          <span>Wrong</span>
          <input type='password' placeholder='password check' />
          <span>Wrong</span>
          <input type='text' placeholder='nickname' />
          <span>Wrong</span>
        </SignUpModalInputWrap>
        <button>Sign Up</button>
      </SignUpModalContentWrap>
    </SignUpModalWrap>
  );
};

export default SignupModal;
