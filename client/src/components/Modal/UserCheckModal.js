import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const UserCheckModalWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 30vh;
  padding: 3rem;
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

  h3.pwCeckText {
    margin-bottom: 1.5em;
    font-weight: 700;
  }

  span {
    color: red;
    margin-bottom: 2rem;
  }

  input {
    border: none;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #c4c4c4;
    text-align: center;
    font-size: 1.4em;
  }

  input:focus {
    outline: none;
  }
  .userCheckButton {
    width: 100%;
    height: 3rem;
    border: none;
    border-radius: 10px;
    background-color: #9e9e9e;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.2em;
    transition: all 0.5s;
  }

  .userCheckButton:focus,
  .userCheckButton:hover {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
  }
`;

const UserCheckModal = ({
  openPasswordModalHandler,
  isPasswordCorrectHandler,
  openUserEditModalHandler,
  pwCheckValueHandler,
}) => {
  const [checkPassword, setCheckPassword] = useState('');
  const [isPwCheck, setIsPwCheck] = useState(false);
  const [pwCheckMessage, setPwCheckMessage] = useState('');
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')).token
      }`,
    },
  };

  const passwordCheckHandler = () => {
    if (checkPassword === '') {
      setIsPwCheck(true);
      setPwCheckMessage('필수 입력 사항입니다');
    }
    axios
      .post('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/users/check', { password: checkPassword }, config)
      .then((res) => {
        isPasswordCorrectHandler();
        pwCheckValueHandler(checkPassword);
        openPasswordModalHandler();
        openUserEditModalHandler();
      })
      .catch((err) => {
        if (checkPassword === '') {
          setIsPwCheck(true);
          setPwCheckMessage('필수 입력 사항입니다');
        } else {
          setIsPwCheck(true);
          setPwCheckMessage('비밀번호를 다시 확인 해주세요');
        }
      });
  };
  const checkPasswordHandler = (event) => {
    setCheckPassword(event.target.value);
  };

  const checkPasswordBlur = () => {
    if (checkPassword === '') {
      setIsPwCheck(true);
      setPwCheckMessage('필수 입력 사항입니다');
    }
  };

  const checkPasswordEnter = (event) => {
    if (event.key === 'Enter') {
      passwordCheckHandler(checkPassword);
    }
  };

  return (
    <UserCheckModalWrap onClick={(e) => e.stopPropagation()}>
      <button onClick={openPasswordModalHandler} className={'closeButton'}>
        &times;
      </button>
      <h3 className={'pwCeckText'}>비밀번호 확인</h3>
      <input
        type='password'
        placeholder='password'
        onChange={checkPasswordHandler}
        onBlur={checkPasswordBlur}
        onKeyUp={checkPasswordEnter}
      />
      {isPwCheck ? (
        <span>{pwCheckMessage}</span>
      ) : (
        <span>
          <br />
        </span>
      )}
      <button onClick={passwordCheckHandler} className={'userCheckButton'}>
        확인
      </button>
    </UserCheckModalWrap>
  );
};

export default UserCheckModal;
