import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Diary from '../components/Diary';
import HashTags from '../components/HashTags';
// import DiaryView from './DiaryView';

const Calender = styled.div`
  height: 5vh;
  line-height: 5vh;
  text-align: center;
`;

const AddBtn = styled.div`
  display: flex;
  justify-content: flex-end;

  a {
    width: 3vh;
    height: 3vh;
    margin-right: 1rem;
    line-height: 3vh;
    text-align: center;
    background-color: lavender;
    border-radius: 50%;
    display: inline-block;
  }
  a:hover {
    background-color: darksalmon;
  }
`;

const ContentWrap = styled.div`
  height: 72vh;
  padding-bottom: 5vh;
  display: flex;
`;

const TagList = styled.aside`
  flex: 1;
`;

const DiaryList = styled.ul`
  height: 100%;
  flex: 4;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  align-items: center;

  li {
    margin: 0.5rem;
    transition: margin 0.5s;
  }
  li:hover {
    margin: 0 1.5rem;
  }
`;

const Main = () => {
  // recoil로 로그인 상태 관리 필수
  const [diaries, setDiaries] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // 현재 년월 일기목록 요청
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('userInfo')).token
        }`,
      },
    };

    axios
      .get('/api/contents/by-month', config)
      .then((res) => {
        setDiaries(res.data);
        axios
          .get('/api/contents/hashtags', config)
          .then((res) => {
            setTags(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    // 전체 태그 목록 요청
    // axios
    //   .get('/api/contents/hashtags', config)
    //   .then((res) => {
    //     setTags(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  return (
    <>
      <Header />
      {/* dialog 라이브러리 연결하기, 월별 필터링 구현하기 */}
      <Calender>
        {/* <input type='month' id='calender' name='calender' value='2018-05' onChagne/> */}
      </Calender>
      <AddBtn>
        <Link to='/main/newdiary'>+</Link>
      </AddBtn>
      {/* 해쉬태그 리스트
          - 해쉬태그별 필터링 구현하기
          - 해쉬태그 선택시 해당 해쉬태그로 타이틀 변경
        */}
      <ContentWrap>
        <TagList>
          <HashTags tags={tags} />
        </TagList>
        <DiaryList>
          {diaries.map((diary) => {
            return (
              // https://rrecoder.tistory.com/101
              <li key={diary._id}>
                <Link to='/main/diaryview' state={{ _id: diary._id }}>
                  <Diary diary={diary} />
                </Link>
              </li>
            );
          })}
        </DiaryList>
      </ContentWrap>
      <Footer />
    </>
  );
};

export default Main;
