import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCheckModal from '../components/Modal/UserCheckModal';
import UserEditModal from '../components/Modal/UserEditModal';
import LeaveModal from '../components/Modal/LeaveModal';
import ProfileUpload from '../components/ProfileUpload';
import RealLeaveModal from '../components/Modal/RealLeaveModal';
import Heatmap from '../components/Heatmap';
import Loader from '../components/Loader';
import styled from 'styled-components';
import Diary from '../components/Diary';

const ModalBackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DiaryList = styled.ul`
  width: 100%;
  height: 100%;
  flex: 4;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  align-items: center;

  &::-webkit-scrollbar {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lavender;
    border-radius: 1rem;
  }

  > div {
    width: 100%;
    padding-right: 20vw;
    text-align: center;
  }
  li {
    margin: 0.5rem;
    transition: margin 0.5s;
  }
  li:hover {
    margin: 0 1.5rem;
  }
`;

const Mypage = () => {
  const [counts, setCounts] = useState({
    total: 0,
    totalByMonth: 0,
    totalByDay: [],
  });
  const [diaries, setDiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pwCheckdValue, setPwCheckValue] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')).token
      }`,
    },
  };

  useEffect(() => {
    axios
      .get('/api/contents/total', config)
      .then((res) => {
        setCounts({ ...counts, ...res.data });
        setIsLoading(false);
      })
      .catch((err) => {
        setCounts({});
        setIsLoading(false);
      });
  }, []);

  const searchDayHandler = (value) => {
    const [year, month, date] = value.date.split('-');

    axios
      .get('/api/contents/by-date', {
        ...config,
        params: { year: year, month: month, date: date },
      })
      .then((res) => {
        console.log(res.data);
        setDiaries(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const [isUserResign, setIsUserResign] = useState(false);
  const [isRealUserResign, setRealIsUserResign] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openUserEditModal, setOpenUserEditModal] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const isPasswordCorrectHandler = () => {
    setIsPasswordCorrect(!isPasswordCorrect);
  };
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isUserResignHandler = () => {
    setIsUserResign(!isUserResign);
  };
  const isRealUserResignHandler = () => {
    if (!isUserResign) {
      setRealIsUserResign(!isRealUserResign);
    } else {
      setIsUserResign(!isUserResign);
      setRealIsUserResign(!isRealUserResign);
    }
  };
  const openPasswordModalHandler = () => {
    //아래 함수 실행시 모달 on /off
    setOpenPasswordModal(!openPasswordModal);
  };

  const openUserEditModalHandler = () => {
    setOpenUserEditModal(!openUserEditModal);
  };

  const pwCheckValueHandler = (value) => {
    setPwCheckValue(value);
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <img src={JSON.parse(localStorage.getItem('userInfo')).image} />
          </div>
          {/* <button onClick={ProfileChangeHandler}>이미지 수정 버튼</button> */}
          <div>{JSON.parse(localStorage.getItem('userInfo')).nickname}</div>
          <div>{JSON.parse(localStorage.getItem('userInfo')).email}</div>
          <button onClick={isUserResignHandler}>회원탈퇴</button>
          <button onClick={openPasswordModalHandler}>정보수정</button>

          {/* 이미지 수정 버튼 클릭시 모달창 띄우기*/}
          <ProfileUpload />
          {isUserResign && (
            <ModalBackDrop onClick={isUserResignHandler}>
              <LeaveModal
                isUserResignHandler={isUserResignHandler}
                isRealUserResignHandler={isRealUserResignHandler}
              />
            </ModalBackDrop>
          )}
          {isRealUserResign && (
            <ModalBackDrop onClick={isRealUserResignHandler}>
              <RealLeaveModal
                isRealUserResignHandler={isRealUserResignHandler}
                isUserResignHandler={isUserResignHandler}
              />
            </ModalBackDrop>
          )}
          {openPasswordModal && (
            <ModalBackDrop onClick={openPasswordModalHandler}>
              <UserCheckModal
                openPasswordModalHandler={openPasswordModalHandler}
                isPasswordCorrectHandler={isPasswordCorrectHandler}
                openUserEditModalHandler={openUserEditModalHandler}
                pwCheckValueHandler={pwCheckValueHandler}
              />
            </ModalBackDrop>
          )}
          {openUserEditModal && (
            <ModalBackDrop onClick={openUserEditModalHandler}>
              <UserEditModal
                openUserEditModalHandler={openUserEditModalHandler}
                pwCheckdValue={pwCheckdValue}
              />
            </ModalBackDrop>
          )}
          <Heatmap counts={counts} searchDayHandler={searchDayHandler} />
          <DiaryList>
            {diaries.length ? (
              diaries.map((diary) => {
                return (
                  // https://rrecoder.tistory.com/101
                  <li key={diary._id}>
                    <Link to='/main/diaryview' state={{ _id: diary._id }}>
                      <Diary diary={diary} />
                    </Link>
                  </li>
                );
              })
            ) : (
              <div>일자를 클릭하여 그 날을 소환하세요</div>
            )}
          </DiaryList>
        </>
      )}
      <Footer />
    </>
  );
};

export default Mypage;
