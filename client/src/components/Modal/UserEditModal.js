import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const UserEditModalWrap = styled.div`
  display: flex;
  width: 50%;
  height: 50vh;
  margin: 15em auto;
  border: 1px solid black;
  flex-direction: column;
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
      setNicknameValidateMessage('두글자 이상의 닉네임을 입력해주세요');
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
      setNicknameValidText('nothing');
    } else if (
      event.target.type === 'text' &&
      !nicknameExp.test(userInputInfo.nickname)
    ) {
      setEditValidateState({ ...editValidateState, nickname: false });
      setNicknameValidText('invalidate');
    } else if (
      event.target.type === 'text' &&
      nicknameExp.test(userInputInfo.nickname)
    ) {
      axios
        .post(
          '/api/users/nickname',
          { nickname: userInputInfo.nickname },
          config
        )
        .then((res) => {
          //사용가능한 닉네임인 경우
          setEditValidateState({ ...editValidateState, nickname: true });
          setNicknameValidText('ok');
        })
        .catch((err) => {
          //닉네임이 중복인 경우
          setEditValidateState({ ...editValidateState, nickname: false });
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
      setPwValidText('same');
    } else if (
      event.target.type === 'password' &&
      userInputInfo.password === '' &&
      event.target.placeholder === 'New Password'
    ) {
      setEditValidateState({ ...editValidateState, password: false });
      setPwValidText('nothing');
    } else if (
      event.target.type === 'password' &&
      !pwdExp.test(userInputInfo.password) &&
      event.target.placeholder === 'New Password'
    ) {
      setEditValidateState({ ...editValidateState, password: false });
      setPwValidText('invalidate');
    } else if (
      event.target.type === 'password' &&
      pwdExp.test(userInputInfo.password) &&
      event.target.placeholder === 'New Password'
    ) {
      setEditValidateState({ ...editValidateState, password: true });
      setPwValidText('ok');
    }

    //password Check OnBlur
    if (
      event.target.type === 'password' &&
      userInputInfo.passwordCheck === '' &&
      event.target.placeholder === 'Password Check'
    ) {
      setEditValidateState({ ...editValidateState, passwordCheck: false });
      setPwCheckValidText('nothing');
    } else if (
      event.target.type === 'password' &&
      userInputInfo.passwordCheck !== '' &&
      event.target.placeholder === 'Password Check' &&
      userInputInfo.password !== userInputInfo.passwordCheck
    ) {
      setEditValidateState({ ...editValidateState, passwordCheck: false });
      setPwCheckValidText('invalidate');
    } else if (
      event.target.type === 'password' &&
      userInputInfo.passwordCheck !== '' &&
      event.target.placeholder === 'Password Check' &&
      userInputInfo.password === userInputInfo.passwordCheck
    ) {
      setEditValidateState({ ...editValidateState, passwordCheck: true });
      setPwCheckValidText('ok');
    }
  };

  const editHandler = (event) => {
    if (userInputInfo.nickname === '' && userInputInfo.password === '') {
      setNicknameValidText('nothing');
      setPwValidText('nothing');
    } else if (
      editValidateState.nickname ||
      (editValidateState.password && editValidateState.passwordCheck)
    ) {
      if (editValidateState.password && editValidateState.passwordCheck) {
        userInputInfo.password = userInputInfo.password;
      } else {
        userInputInfo.password = pwCheckdValue;
      }
      axios
        .patch(
          '/api/users/profile',
          {
            nickname: userInputInfo.nickname,
            password: userInputInfo.password,
          },
          config2
        )
        .then((res) => {
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              ...JSON.parse(localStorage.userInfo),
              nickname: userInputInfo.nickname,
            })
          );
          alert('회원정보 수정이 완료되었습니다.');
          openUserEditModalHandler();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <UserEditModalWrap onClick={(e) => e.stopPropagation()}>
      <h2>UserEditModal</h2>
      <button onClick={openUserEditModalHandler}>Close</button>
      <div>회원 정보 수정</div>
      <input
        type='text'
        placeholder='Nickname'
        value={userInputInfo.nickname}
        onChange={editInputValueChange}
        onBlur={editUpOnBlurHandler}
      />
      {nicknameValidateMessage ? (
        <span>{nicknameValidateMessage}</span>
      ) : (
        <br />
      )}
      <input
        type='password'
        placeholder='New Password'
        value={userInputInfo.password}
        onChange={editInputValueChange}
        onBlur={PasswordOnBlurHandler}
      />
      {pwValidateMessage ? <span>{pwValidateMessage}</span> : <br />}
      <input
        type='password'
        placeholder='Password Check'
        value={userInputInfo.passwordCheck}
        onChange={editInputValueChange}
        onBlur={PasswordOnBlurHandler}
      />
      {pwCheckValidateMessage ? <span>{pwCheckValidateMessage}</span> : <br />}
      <button onClick={editHandler}>수 정</button>
    </UserEditModalWrap>
  );
};

export default UserEditModal;
