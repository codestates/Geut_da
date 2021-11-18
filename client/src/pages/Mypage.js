/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components/macro';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCheckModal from '../components/Modal/UserCheckModal';
import UserEditModal from '../components/Modal/UserEditModal';
import LeaveModal from '../components/Modal/LeaveModal';
import ProfileUpload from '../components/ProfileUpload';
import RealLeaveModal from '../components/Modal/RealLeaveModal';
import Heatmap from '../components/Heatmap';
import Loader from '../components/Loader';
import Diary from '../components/Diary';

const MypageWrap = styled.div`
  padding-bottom: 22vh;
`;

const LoaderBackDrop = styled.div`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileInfo = styled.div`
  width: 80vw;
  margin: 1.5rem auto 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--color-beige);

  div.user_info {
    margin-right: 2.5rem;
  }

  div.img_box {
    width: 10vh;
    margin: 0 auto 0.5rem;
    position: relative;
  }
  div.img_box img {
    width: 10vh;
    height: 10vh;
    border-radius: 50%;
    background-color: #eee;
    flex: 1;
  }

  h3,
  p {
    margin: 0;
    padding: 0;
    color: var(--color-black);
    line-height: 2;
  }
  button {
    margin: 0.4rem;
    padding: 0.2rem 0.4rem;
    font-size: 0.8em;
    color: var(--color-red);
    background: none;
    border: none;
    border-radius: 0.2rem;
    transition: all 0.5s;
  }
  button:hover {
    color: #fff;
    background-color: var(--color-red);
  }
`;

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
  width: 80vw;
  height: 60vh;
  margin: auto;
  padding: 1rem 0 5vh;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  align-items: center;

  &::-webkit-scrollbar {
    height: 0.6rem;
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid #eee;
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-beige);
    border-radius: 1rem;
  }

  > div {
    flex: 1;
    height: 49vh;
    text-align: center;
    line-height: 49vh;
  }
  li {
    margin: 0.2rem 0.5rem;
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
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
    },
  };

  useEffect(() => {
    axios
      .get('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents/total', config)
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
    if (!value) {
      setDiaries([]);
      return;
    }

    const [year, month, date] = value.date.split('-');

    axios
      .get('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents/by-date', {
        ...config,
        params: { year, month, date },
      })
      .then((res) => {
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
    <MypageWrap>
      {console.log(
        '                                                                        ,,\n\
                                                                       /  ,\n\
                                                                      /   /\n\
                                                                     /   /\n\
                                                                    /   /\n\
    __________________________                                     /   /\n\
    ⎢                         ⎥                                   /   /\n\
    ⎢  혹시 내가 보여? 난 고양이야  ⎥                                  /   /\n\
    ⎢____    _________________⎥                                 /   /\n\
          \\/    ,      ,,                                      /   /\n\
               /%c@%c\\____/%c@%c \\                                ____/   /\n\
              /           \\                         _____/        /__\n\
        /" \\ / •    •      \\                     __/             /  %c@@%c"\\\n\
        \\    %c@@%c  ㅅ  %c@@%c     /___             ___/                /    _/\n\
      /" \\   \\                 \\__________/                    |__/ "\\\n\
      \\   \\                                                   /      /\n\
       \\    \\  __                                                  _/\n\
        \\                                                       __/\n\
          \\_                                             ______/\n\
             \\ ___                                     _/\n\
                    \\__                             __/\n\
                        \\_____                _____/\n\
                              \\______________/\n\
          \n',
        'color:#ff6905',
        'color:defalut',
        'color:#ff6905',
        'color:defalut',
        'color:#ff6905',
        'color:defalut',
        'color:#ff6905',
        'color:defalut',
        'color:#ff6905',
        'color:defalut'
      )}
      <Header />
      {isLoading ? (
        <LoaderBackDrop>
          <Loader />
        </LoaderBackDrop>
      ) : (
        <>
          <ProfileInfo>
            <div className='user_info'>
              <div className='img_box'>
                <img src={JSON.parse(localStorage.getItem('userInfo')).image} alt='profile image' />
                {/* 이미지 수정 버튼 클릭시 바로 파일 업로드창 표출(input[type='file']) */}
                <ProfileUpload />
              </div>
              {/* <button onClick={ProfileChangeHandler}>이미지 수정 버튼</button> */}
              <div>{JSON.parse(localStorage.getItem('userInfo')).nickname}</div>
              <div>{JSON.parse(localStorage.getItem('userInfo')).email}</div>
              <button onClick={isUserResignHandler}>회원탈퇴</button>
              <button onClick={openPasswordModalHandler}>정보수정</button>
            </div>
            {/* 일기 잔디 */}
            <Heatmap counts={counts} searchDayHandler={searchDayHandler} />
          </ProfileInfo>
          {/* 잔디 클릭시 리스트 업데이트 */}
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

          {/* Modal */}
          {isUserResign && (
            <ModalBackDrop onClick={isUserResignHandler}>
              <LeaveModal isUserResignHandler={isUserResignHandler} isRealUserResignHandler={isRealUserResignHandler} />
            </ModalBackDrop>
          )}
          {isRealUserResign && (
            <ModalBackDrop onClick={isRealUserResignHandler}>
              <RealLeaveModal isRealUserResignHandler={isRealUserResignHandler} isUserResignHandler={isUserResignHandler} />
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
              <UserEditModal openUserEditModalHandler={openUserEditModalHandler} pwCheckdValue={pwCheckdValue} />
            </ModalBackDrop>
          )}
        </>
      )}
      <Footer />
    </MypageWrap>
  );
};

export default Mypage;
