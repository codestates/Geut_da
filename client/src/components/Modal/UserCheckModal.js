import axios from 'axios';
import { useState } from 'react';

const UserCheckModal = ({ openPasswordModalHandler, isPasswordCorrectHandler, openUserEditModalHandler}) => {
  const [checkPassword, setCheckPassword] = useState('');
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
    },
  };

  const passwordCheckHandler = () => {
    axios
      .post('/api/users/check', { password: checkPassword }, config)
      .then((res) => {
        isPasswordCorrectHandler();
        console.log(res);
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
  // const PasswordCheckHandler = () => {
  //   // 패스워드 체크 후 정보가 일치하면 패스워드확인 모달 비활성화 & 수정모달 활성화
  //   if(true){
  //     //axios 요청 보냄
  //     //만약 비밀번호를 제대로 입력했다면 현재 모달창을 찾고 Editable 모달창을 실행

  //   }
  // }

  return (
    <>
      <h2>UserCheckModal</h2>
      <button onClick={openPasswordModalHandler}>Close</button>
      <div>비밀번호 확인</div>
      <input type='password' placeholder='password' onChange={checkPasswordHandler} />
      <button onClick={passwordCheckHandler}>확인</button>
    </>
  );
};

export default UserCheckModal;
