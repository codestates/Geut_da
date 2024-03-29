import axios from 'axios';
import IsLoginState from '../../states/IsLoginState';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { LANDING } from '../../constants/routes';
import dotenv from 'dotenv';
import S3 from 'react-aws-s3';

dotenv.config();

const RealLeavModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 30vw;
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 10px;
  text-align: center;

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

const RealLeaveButtonWrap = styled.div`
  display: flex;
  margin-top: 2em;
  width: 100%;
  .nobutton:hover {
    background-color: #f00;
  }

  button {
    width: 50%;
    height: 2.5rem;
    border: none;
    border-radius: 10px;
    background-color: #9e9e9e;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.1em;
    transition: all 0.5s;
  }

  button:focus,
  button:hover {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
    background-color: #000;
  }

  button:nth-child(1) {
    margin-right: 1.5em;
  }
`;

const RealLeaveModal = ({ isRealUserResignHandler }) => {
  const setIsLogin = useSetRecoilState(IsLoginState);
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
      .get('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents/all', config)
      .then((res) => {
        console.log(res.data);
        res.data.map((el) => ReactS3Client.deleteFile(el.drawing.split('/')[3]));
      })
      .then((res) => {
        axios
          .delete('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/users/profile', config)
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
      <button onClick={isRealUserResignHandler} className={'closeButton'}>
        &times;
      </button>
      <div>
        <strong>정말 탈퇴 하시겠습니까?</strong>
      </div>
      <RealLeaveButtonWrap>
        <button onClick={realResignHandler}>YES</button>
        <button onClick={isRealUserResignHandler} className='nobutton'>
          NO
        </button>
      </RealLeaveButtonWrap>
    </RealLeavModalWrap>
  );
};

export default RealLeaveModal;
