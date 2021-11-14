import axios from 'axios';
import IsLoginState from '../../states/IsLoginState';
import { useRecoilState } from 'recoil';

const RealLeaveModal = ({ isRealUserResignHandler }) => {
  const [isLogin, setIsLogin] = useRecoilState(IsLoginState);
  const realResignHandler = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      },
    };
    axios
      .delete('/api/users/profile', config)
      .then((res) => {
        alert('탈퇴되었습니다. 이용해주셔서 감사합니다.');
        setIsLogin(false);
        localStorage.removeItem('userInfo');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <button onClick={isRealUserResignHandler}>Close</button>
      <div>정말 탈퇴하시겠습니까?</div>
      <button onClick={realResignHandler}>YES</button>
      <button onClick={isRealUserResignHandler}>NO</button>
    </>
  );
};

export default RealLeaveModal;
