import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const UserEditModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 40vw;
  padding: 3.5rem;
  background-color: #ffffff;
  border-radius: 10px;

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

const UserEditTitleWrap = styled.div`
  flex: 1;
  text-align: center;
  padding: 1rem 0;

  h3.userEditText {
    font-weight: 700;
    padding: 0;
    margin: 0;
  }

  .userEditText.userEditMargin {
    font-weight: 500;
  }
`;

const UserEditInputWrap = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  input {
    border: none;
    margin-bottom: 0.1rem;
    border-bottom: 1px solid #c4c4c4;
    text-align: center;
    font-size: 1.1em;
  }

  input:focus {
    outline: none;
  }

  span {
    color: red;
    margin-bottom: 0.4rem;
  }

  span.validatepass {
    color: green;
  }

  span.lineheight {
    margin-bottom: 2rem;
  }
`;

const UserEditButtonWrap = styled.div`
  flex: 1;
  width: 100%;

  .userEditButton {
    width: 100%;
    height: 2.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border: none;
    border-radius: 10px;
    background-color: #9e9e9e;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.1em;
    transition: all 0.5s;
  }

  .userEditButton:focus,
  .userEditButton:hover {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
    background-color: #000;
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
    //?????????
    if (editValidateState.nickname && nicknameValidText === 'ok') {
      setNicknameValidateMessage('?????? ????????? ????????? ?????????');
    } else if (!editValidateState.nickname && nicknameValidText === 'overlap') {
      setNicknameValidateMessage('?????? ?????? ????????? ?????????');
    } else if (!editValidateState.nickname && nicknameValidText === 'nothing') {
      setNicknameValidateMessage('???????????? ???????????? ???????????????');
    } else if (!editValidateState.nickname && nicknameValidText === 'invalidate') {
      setNicknameValidateMessage('??? ?????? ?????? ??? ?????? ????????? ???????????? ??????????????????');
    }

    //????????????
    if (!editValidateState.password && pwValidText === 'same') {
      setPwValidateMessage('????????? ????????? ???????????? ?????????');
    } else if (editValidateState.password && pwValidText === 'ok') {
      setPwValidateMessage('?????? ????????? ???????????? ?????????');
    } else if (!editValidateState.password && pwValidText === 'nothing') {
      setPwValidateMessage('???????????? ??????????????? ???????????????');
    } else if (!editValidateState.password && pwValidText === 'invalidate') {
      setPwValidateMessage('?????????, ??????, ??????????????? ???????????? 8~20????????? ??????????????????.');
    }

    //???????????? ??????
    if (editValidateState.passwordCheck && pwCheckValidText === 'ok') {
      setPwCheckValidateMessage('???????????? ??????');
    } else if (!editValidateState.passwordCheck && pwCheckValidText === 'nothing') {
      setPwCheckValidateMessage('???????????? ?????? ??? ?????? ?????? ???????????????');
    } else if (!editValidateState.passwordCheck && pwCheckValidText === 'invalidate') {
      setPwCheckValidateMessage('??????????????? ???????????? ????????????');
    }
  }, [nicknameValidText, pwValidText, pwCheckValidText]);

  const pwdExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  const nicknameExp = /^([a-zA-Z0-9???-???|???-???|???-???]).{1,10}$/;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const config2 = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
    },
  };

  const editInputValueChange = (event) => {
    //?????? ???????????? ????????? ?????? value?????? ???????????? ??????
    if (event.target.type === 'text') {
      setUserInputInfo({ ...userInputInfo, nickname: event.target.value });
    }

    if (event.target.type === 'password' && event.target.placeholder === 'New Password') {
      setUserInputInfo({ ...userInputInfo, password: event.target.value });
    }
    if (event.target.type === 'password' && event.target.placeholder === 'Password Check') {
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
    } else if (event.target.type === 'text' && !nicknameExp.test(userInputInfo.nickname)) {
      setEditValidateState({ ...editValidateState, nickname: false });
      setIsSpanColor({ ...isSpanColor, nickname: false });
      setNicknameValidText('invalidate');
    } else if (event.target.type === 'text' && nicknameExp.test(userInputInfo.nickname)) {
      axios
        .post('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/users/nickname', { nickname: userInputInfo.nickname }, config)
        .then((res) => {
          //??????????????? ???????????? ??????
          setEditValidateState({ ...editValidateState, nickname: true });
          setIsSpanColor({ ...isSpanColor, nickname: true });
          setNicknameValidText('ok');
        })
        .catch((err) => {
          //???????????? ????????? ??????
          setEditValidateState({ ...editValidateState, nickname: false });
          setIsSpanColor({ ...isSpanColor, nickname: false });
          setNicknameValidText('overlap');
        });
    }
  };

  const PasswordOnBlurHandler = (event) => {
    //password OnBlur
    if (event.target.type === 'password' && userInputInfo.password === pwCheckdValue && event.target.placeholder === 'New Password') {
      setEditValidateState({ ...editValidateState, password: false });
      setIsSpanColor({ ...isSpanColor, password: false });
      setPwValidText('same');
    } else if (event.target.type === 'password' && userInputInfo.password === '' && event.target.placeholder === 'New Password') {
      setEditValidateState({ ...editValidateState, password: false });
      setIsSpanColor({ ...isSpanColor, password: false });
      setPwValidText('nothing');
    } else if (event.target.type === 'password' && !pwdExp.test(userInputInfo.password) && event.target.placeholder === 'New Password') {
      setEditValidateState({ ...editValidateState, password: false });
      setIsSpanColor({ ...isSpanColor, password: false });
      setPwValidText('invalidate');
    } else if (event.target.type === 'password' && pwdExp.test(userInputInfo.password) && event.target.placeholder === 'New Password') {
      setEditValidateState({ ...editValidateState, password: true });
      setIsSpanColor({ ...isSpanColor, password: true });
      setPwValidText('ok');
    }

    //password Check OnBlur
    if (event.target.type === 'password' && userInputInfo.passwordCheck === '' && event.target.placeholder === 'Password Check') {
      setEditValidateState({ ...editValidateState, passwordCheck: false });
      setIsSpanColor({ ...isSpanColor, passwordCheck: false });
      setPwCheckValidText('nothing');
    } else if (event.target.type === 'password' && userInputInfo.passwordCheck !== '' && event.target.placeholder === 'Password Check' && userInputInfo.password !== userInputInfo.passwordCheck) {
      setEditValidateState({ ...editValidateState, passwordCheck: false });
      setIsSpanColor({ ...isSpanColor, passwordCheck: false });
      setPwCheckValidText('invalidate');
    } else if (event.target.type === 'password' && userInputInfo.passwordCheck !== '' && event.target.placeholder === 'Password Check' && userInputInfo.password === userInputInfo.passwordCheck) {
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
      //?????????, ???????????? ?????? ????????? ????????? ???????????? ?????? ??????
      if (!editValidateState.nickname && !pwValidateAllPass) {
        return;
      }
      //???????????? ?????????????????? ???????????????
      if (editValidateState.nickname && !pwValidateAllPass) {
        delete editInfo.password;
      }
      //??????????????? ????????? ????????? ????????? ??????
      if (!editValidateState.nickname && pwValidateAllPass) {
        delete editInfo.nickname;
      }

      //axios??????
      axios
        .patch('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/users/profile', editInfo, config2)
        .then((res) => {
          // console.log(res);
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
      <UserEditTitleWrap>
        <h3 className={'userEditText'}>?????? ?????? ??????</h3>
        <div className={'userEditText userEditMargin'}>&#42;????????? ?????? ??????????????? ????????? ???????????????</div>
      </UserEditTitleWrap>
      <UserEditInputWrap>
        <input type='text' placeholder='Nickname' value={userInputInfo.nickname} onChange={editInputValueChange} onBlur={editUpOnBlurHandler} />
        {nicknameValidateMessage ? (
          <span className={isSpanColor.nickname ? 'validatepass' : null}>{nicknameValidateMessage}</span>
        ) : (
          <span>
            <br />
          </span>
        )}
        <input type='password' placeholder='New Password' value={userInputInfo.password} onChange={editInputValueChange} onBlur={PasswordOnBlurHandler} />
        {pwValidateMessage ? (
          <span className={isSpanColor.password ? 'validatepass' : null}>{pwValidateMessage}</span>
        ) : (
          <span>
            <br />
          </span>
        )}
        <input type='password' placeholder='Password Check' value={userInputInfo.passwordCheck} onChange={editInputValueChange} onBlur={PasswordOnBlurHandler} />
        {pwCheckValidateMessage ? (
          <span className={isSpanColor.passwordCheck ? 'validatepass lineheight' : null}>{pwCheckValidateMessage}</span>
        ) : (
          <span className={'lineheight'}>
            <br />
          </span>
        )}
      </UserEditInputWrap>
      <UserEditButtonWrap>
        <button onClick={editHandler} className={'userEditButton'}>
          ??? ???
        </button>
      </UserEditButtonWrap>
    </UserEditModalWrap>
  );
};

export default UserEditModal;
