import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const UserCheckModalWrap = styled.div`
  display: flex;
  width: 50%;
  height: 50vh;
  margin: 15em auto;
  border: 1px solid black;
  flex-direction: column;
`;

const UserCheckModal = ({
  openPasswordModalHandler,
  isPasswordCorrectHandler,
  openUserEditModalHandler,
  pwCheckValueHandler,
}) => {
  const [checkPassword, setCheckPassword] = useState('');
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')).token
      }`,
    },
  };

  const passwordCheckHandler = () => {
    console.log(checkPassword);
    axios
      .post('/api/users/check', { password: checkPassword }, config)
      .then((res) => {
        isPasswordCorrectHandler();
        console.log(res);
        pwCheckValueHandler(checkPassword);
        openPasswordModalHandler();
        openUserEditModalHandler();
      })
      .catch((err) => {
        isPasswordCorrectHandler();
        alert('비밀번호가 틀립니다.');
      });
  };
  const checkPasswordHandler = (event) => {
    setCheckPassword(event.target.value);
  };

  return (
    <UserCheckModalWrap onClick={(e) => e.stopPropagation()}>
      <button onClick={openPasswordModalHandler}>Close</button>
      <h2>UserCheckModal</h2>
      <div>비밀번호 확인</div>
      <input
        type='password'
        placeholder='password'
        onChange={checkPasswordHandler}
      />
      <button onClick={passwordCheckHandler}>확인</button>
    </UserCheckModalWrap>
  );
};

export default UserCheckModal;
