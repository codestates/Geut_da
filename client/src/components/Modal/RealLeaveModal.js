import axios from 'axios';
import IsLoginState from '../../states/IsLoginState';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { LANDING } from '../../constants/routes';
import dotenv from 'dotenv';
import S3 from 'react-aws-s3';

dotenv.config();

const RealLeavModalWrap = styled.div`
  display: flex;
  width: 50%;
  height: 50vh;
  margin: 15em auto;
  border: 1px solid black;
  flex-direction: column;
`;

const RealLeaveModal = ({ isRealUserResignHandler }) => {
  const [isLogin, setIsLogin] = useRecoilState(IsLoginState);
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  };
  const ReactS3Client = new S3(config);

  const realResignHandler = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      },
    };
    axios
      .get('/api/contents/all', config)
      .then((res) => {
        res.data.map((el) => ReactS3Client.deleteFile(el.split('/')[3]));
      })
      .then((res) => {
        axios
          .delete('/api/users/profile', config)
          .then((res) => {
            ReactS3Client.deleteFile(JSON.parse(localStorage.getItem('userInfo')).image.split('/')[3]).then((res) => {
              alert('탈퇴되었습니다. 이용해주셔서 감사합니다.');
              setIsLogin(false);
              localStorage.removeItem('userInfo');
              window.location.replace(LANDING);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <RealLeavModalWrap onClick={(e) => e.stopPropagation()}>
      <button onClick={isRealUserResignHandler}>Close</button>
      <div>정말 탈퇴하시겠습니까?</div>
      <button onClick={realResignHandler}>YES</button>
      <button onClick={isRealUserResignHandler}>NO</button>
    </RealLeavModalWrap>
  );
};

export default RealLeaveModal;
