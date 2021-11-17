import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const UserEditModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40%;
  height: 50vh;
  background-color: #ffffff;
  padding: 5em auto;
  border-radius: 10px;

  .closeButton {
    position: absolute;
    top: 1%;
    right: 1%;
    border: none;
    color: #646464;
    background-color: #ffffff;
    font-weight: 700;
    font-size: 1.5em;
  }
  .closeButton:hover {
    cursor: pointer;
  }

  div.userEditText {
    font-weight: 700;
  }

  div.userEditText.userEditMargin {
    margin-bottom: 0.5rem;
  }

  input {
    width: 80%;
    border: none;
    height: 1.2em;
    border-bottom: 1px solid #c4c4c4;
    text-align: center;
    font-size: 1.4em;
    margin: 0.3em 3em;
  }

  input:focus {
    outline: none;
  }

  .userEditButton {
    width: 60%;
    height: 3em;
    border: none;
    border-radius: 10px;
    background-color: #9e9e9e;
    color: #ffffff;
    font-weight: 700;
    transform: all, 1s;
    font-size: 1.2em;
  }

  .userEditButton:focus,
  .userEditButton:hover {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
  }

  span {
    color: red;
  }

  span.validatepass {
    color: green;
  }

  span.lineheight {
    margin-bottom: 2em;
  }
`;

const UserEditModal = ({ openUserEditModalHandler, pwCheckdValue }) => {
  const [userInputInfo, setUserInputInfo] = useState({
    nickname: '',
    password: '',
    passwordCheck: '',
  });
  const [editValidateState, setEditValidateState] = useState({
    nickname: false,
    password: false,
    passwordCheck: false,
  });

  const [nicknameValidateMessage, setNicknameValidateMessage] = useState(false);
  const [nicknameValidText, setNicknameValidText] = useState(false);
  const [pwValidateMessage, setPwValidateMessage] = useState(false);
  const [pwValidText, setPwValidText] = useState(false);
  const [pwCheckValidateMessage, setPwCheckValidateMessage] = useState(false);
  const [pwCheckValidText, setPwCheckValidText] = useState(false);
  const [pwValidateAllPass, setPwValidateAllPass] = useState(false);
  const [isSpanColor, setIsSpanColor] = useState({
    password: false,
    passwordCheck: false,
    nickname: false,
  });

  useEffect(() => {
    if (editValidateState.password && editValidateState.passwordCheck) {
      setPwValidateAllPass(true);
    } else {
      setPwValidateAllPass(false);
    }
  }, [editValidateState]);

  useEffect(() => {
    //닉네임
    if (editValidateState.nickname && nicknameValidText === 'ok') {
      setNicknameValidateMessage('사용 가능한 닉네임 입니다');
    } else if (!editValidateState.nickname && nicknameValidText === 'overlap') {
      setNicknameValidateMessage('사용중인 닉네임 입니다');
    } else if (!editValidateState.nickname && nicknameValidText === 'nothing') {
      setNicknameValidateMessage('변경하실 닉네임을 적어주세요');
    } else if (
      !editValidateState.nickname &&
      nicknameValidText === 'invalidate'
    ) {
      setNicknameValidateMessage(
        '두글자 이상 열 글자 이하로 닉네임을 입력해주세요'
      );
    }

    //비밀번호
    if (!editValidateState.password && pwValidText === 'same') {
      setPwValidateMessage('기존과 동일한 비밀번호 입니다');
    } else if (editValidateState.password && pwValidText === 'ok') {
      setPwValidateMessage('사용 가능한 비밀번호 입니다');
    } else if (!editValidateState.password && pwValidText === 'nothing') {
      setPwValidateMessage('변경하실 비밀번호를 적어주세요');
    } else if (!editValidateState.password && pwValidText === 'invalidate') {
      setPwValidateMessage(
        '알파벳, 숫자, 특수문자를 포함하여 8~20글자를 입력해주세요.'
      );
    }

    //비밀번호 확인
    if (editValidateState.passwordCheck && pwCheckValidText === 'ok') {
      setPwCheckValidateMessage('비밀번호 일치');
    } else if (
      !editValidateState.passwordCheck &&
      pwCheckValidText === 'nothing'
    ) {
      setPwCheckValidateMessage('비밀번호 변경시 필수 입력 사항입니다');
    } else if (
      !editValidateState.passwordCheck &&
      pwCheckValidText === 'invalidate'
    ) {
      setPwCheckValidateMessage('비밀번호와 일치하지 않습니다');
    }
  }, [nicknameValidText, pwValidText, pwCheckValidText]);

  const pwdExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  const nicknameExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const config2 = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')).token
      }`,
    },
  };

  const editInputValueChange = (event) => {
    //내가 인풋창에 입력한 값을 value값에 넣어주는 로직
    if (event.target.type === 'text') {
      setUserInputInfo({ ...userInputInfo, nickname: event.target.value });
    }

    if (
      event.target.type === 'password' &&
      event.target.placeholder === 'New Password'
    ) {
      setUserInputInfo({ ...userInputInfo, password: event.target.value });
    }
    if (
      event.target.type === 'password' &&
      event.target.placeholder === 'Password Check'
    ) {
      setUserInputInfo({
        ...userInputInfo,
        passwordCheck: event.target.value,
      });
    }
  };

  const editUpOnBlurHandler = (event) => {
    //nickname OnBlur
    if (event.target.type === 'text' && userInputInfo.nickname === '') {
      setEditValidateState({ ...editValidateState, nickname: false });
      setIsSpanColor({ ...isSpanColor, nickname: false });
      setNicknameValidText('nothing');
    } else if (
      event.target.type === 'text' &&
      !nicknameExp.test(userInputInfo.nickname)
    ) {
      setEditValidateState({ ...editValidateState, nickname: false });
      setIsSpanColor({ ...isSpanColor, nickname: false });
      setNicknameValidText('invalidate');
    } else if (
      event.target.type === 'text' &&
      nicknameExp.test(userInputInfo.nickname)
    ) {
      axios
        .post(
          'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/users/nickname',
          { nickname: userInputInfo.nickname },
          config
        )
        .then((res) => {
          //사용가능한 닉네임인 경우
          setEditValidateState({ ...editValidateState, nickname: true });
          setIsSpanColor({ ...isSpanColor, nickname: true });
          setNicknameValidText('ok');
        })
        .catch((err) => {
          //닉네임이 중복인 경우
          setEditValidateState({ ...editValidateState, nickname: false });
          setIsSpanColor({ ...isSpanColor, nickname: false });
          setNicknameValidText('overlap');
        });
    }
  };

  const PasswordOnBlurHandler = (event) => {
    //password OnBlur
    if (
      event.target.type === 'password' &&
      userInputInfo.password === pwCheckdValue &&
      event.target.placeholder === 'New Password'
    ) {
      setEditValidateState({ ...editValidateState, password: false });
      setIsSpanColor({ ...isSpanColor, password: false });
      setPwValidText('same');
    } else if (
      event.target.type === 'password' &&
      userInputInfo.password === '' &&
      event.target.placeholder === 'New Password'
    ) {
      setEditValidateState({ ...editValidateState, password: false });
      setIsSpanColor({ ...isSpanColor, password: false });
      setPwValidText('nothing');
    } else if (
      event.target.type === 'password' &&
      !pwdExp.test(userInputInfo.password) &&
      event.target.placeholder === 'New Password'
    ) {
      setEditValidateState({ ...editValidateState, password: false });
      setIsSpanColor({ ...isSpanColor, password: false });
      setPwValidText('invalidate');
    } else if (
      event.target.type === 'password' &&
      pwdExp.test(userInputInfo.password) &&
      event.target.placeholder === 'New Password'
    ) {
      setEditValidateState({ ...editValidateState, password: true });
      setIsSpanColor({ ...isSpanColor, password: true });
      setPwValidText('ok');
    }

    //password Check OnBlur
    if (
      event.target.type === 'password' &&
      userInputInfo.passwordCheck === '' &&
      event.target.placeholder === 'Password Check'
    ) {
      setEditValidateState({ ...editValidateState, passwordCheck: false });
      setIsSpanColor({ ...isSpanColor, passwordCheck: false });
      setPwCheckValidText('nothing');
    } else if (
      event.target.type === 'password' &&
      userInputInfo.passwordCheck !== '' &&
      event.target.placeholder === 'Password Check' &&
      userInputInfo.password !== userInputInfo.passwordCheck
    ) {
      setEditValidateState({ ...editValidateState, passwordCheck: false });
      setIsSpanColor({ ...isSpanColor, passwordCheck: false });
      setPwCheckValidText('invalidate');
    } else if (
      event.target.type === 'password' &&
      userInputInfo.passwordCheck !== '' &&
      event.target.placeholder === 'Password Check' &&
      userInputInfo.password === userInputInfo.passwordCheck
    ) {
      setEditValidateState({ ...editValidateState, passwordCheck: true });
      setIsSpanColor({ ...isSpanColor, passwordCheck: true });
      setPwCheckValidText('ok');
    }
  };

  const editHandler = (event) => {
    const editInfo = { ...userInputInfo };
    delete editInfo.passwordCheck;

    if (userInputInfo.nickname === '' && userInputInfo.password === '') {
      setNicknameValidText('nothing');
      setPwValidText('nothing');
    } else {
      //닉네임, 패스워드 모두 유효성 검사를 통과하지 못한 경우
      if (!editValidateState.nickname && !pwValidateAllPass) {
        return;
      }
      //닉네임만 유효성검사를 통과한경우
      if (editValidateState.nickname && !pwValidateAllPass) {
        delete editInfo.password;
      }
      //비밀번호만 유효성 검사를 통과한 경우
      if (!editValidateState.nickname && pwValidateAllPass) {
        delete editInfo.nickname;
      }

      //axios요청
      axios
        .patch('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/users/profile', editInfo, config2)
        .then((res) => {
          console.log(res);
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              ...JSON.parse(localStorage.userInfo),
              nickname: res.data.nickname,
            })
          );
          alert(res.data.message);
          openUserEditModalHandler();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <UserEditModalWrap onClick={(e) => e.stopPropagation()}>
      <button onClick={openUserEditModalHandler} className={'closeButton'}>
        &times;
      </button>
      <div className={'userEditText'}>회원 정보 수정</div>
      <div className={'userEditText userEditMargin'}>
        &#42;닉네임 혹은 비밀번호만 수정도 가능합니다
      </div>
      <input
        type='text'
        placeholder='Nickname'
        value={userInputInfo.nickname}
        onChange={editInputValueChange}
        onBlur={editUpOnBlurHandler}
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
      <input
        type='password'
        placeholder='New Password'
        value={userInputInfo.password}
        onChange={editInputValueChange}
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
        placeholder='Password Check'
        value={userInputInfo.passwordCheck}
        onChange={editInputValueChange}
        onBlur={PasswordOnBlurHandler}
      />
      {pwCheckValidateMessage ? (
        <span
          className={
            isSpanColor.passwordCheck ? 'validatepass lineheight' : null
          }
        >
          {pwCheckValidateMessage}
        </span>
      ) : (
        <span className={'lineheight'}>
          <br />
        </span>
      )}
      <button onClick={editHandler} className={'userEditButton'}>
        수 정
      </button>
    </UserEditModalWrap>
  );
};

export default UserEditModal;
