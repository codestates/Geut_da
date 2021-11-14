import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCheckModal from '../components/Modal/UserCheckModal';
import UserEditModal from '../components/Modal/UserEditModal';
import LeaveModal from '../components/Modal/LeaveModal';
import ProfileUpload from '../components/ProfileUpload';
import axios from 'axios';
import RealLeaveModal from '../components/Modal/RealLeaveModal';

const Mypage = () => {
  const [total, setTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      },
    };
    axios
      .get('/api/contents/total', config)
      .then((res) => {
        console.log(res);
        setTotal(res.data.total);
        setMonthTotal(res.data.totalByMonth);
      })
      .catch((err) => {
        setTotal(0);
        setMonthTotal(0);
      });
  }, []);

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
    setIsUserResign(!isUserResign);
    setRealIsUserResign(!isRealUserResign);
  };
  const openPasswordModalHandler = () => {
    //아래 함수 실행시 모달 on /off
    setOpenPasswordModal(!openPasswordModal);
  };

  const openUserEditModalHandler = () => {
    setOpenUserEditModal(!openUserEditModal);
  };

  return (
    <>
      <Header />
      <div>
        <img src={JSON.parse(localStorage.getItem('userInfo')).image} />
      </div>
      {/* <button onClick={ProfileChangeHandler}>이미지 수정 버튼</button> */}
      <div>{JSON.parse(localStorage.getItem('userInfo')).nickname}</div>
      <div>{JSON.parse(localStorage.getItem('userInfo')).email}</div>
      <button onClick={isUserResignHandler}>회원탈퇴</button>
      <button onClick={openPasswordModalHandler}>정보수정</button>

      <div>{total ? `작성한 총 게시물 ${total}` : `작성한 게시물이 없습니다.`}</div>
      <div>{monthTotal ? `이번달 작성한 게시물 수 ${monthTotal}` : `이번달에 작성한 게시물이 없습니다`}</div>
      {/* 이미지 수정 버튼 클릭시 모달창 띄우기*/}
      <ProfileUpload />
      {isUserResign && <LeaveModal isUserResignHandler={isUserResignHandler} isRealUserResignHandler={isRealUserResignHandler} />}
      {isRealUserResign && <RealLeaveModal isRealUserResignHandler={isRealUserResignHandler} />}
      {openPasswordModal && (
        <UserCheckModal openPasswordModalHandler={openPasswordModalHandler} isPasswordCorrectHandler={isPasswordCorrectHandler} openUserEditModalHandler={openUserEditModalHandler} />
      )}
      {openUserEditModal && <UserEditModal openUserEditModalHandler={openUserEditModalHandler} />}
      <Footer />
    </>
  );
};

export default Mypage;
