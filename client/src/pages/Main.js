import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Diary from '../components/Diary';
import HashTages from '../components/HashTages';
// import DiaryView from './DiaryView';

//! dummy data
const tages = [
  '회',
  '바다',
  '노을',
  '맑음',
  '백신',
  '모더나',
  '강아지',
  '산책',
];
const diarys = [
  {
    _id: 1,
    title: '바다 가서 회 한사발',
    wheather: 1,
    tags: ['회', '바다'],
    content:
      '오늘은 바다에 가서 맛있는 회를 먹었다. 역시 회는 추울때 먹어야 맛있다.',
    image: 'images',
    createdAt: '2021.11.12',
  },
  {
    _id: 2,
    title: '백신 맞은 날',
    wheather: 3,
    tags: ['백신', '모더나'],
    content: '아프다..',
    image: 'images',
    createdAt: '2021.11.12',
  },
  {
    _id: 3,
    title: '오늘은 맑음',
    wheather: 0,
    tags: ['맑음', '노을'],
    content: '날씨도 좋고 노을도 예뻤다.',
    image: 'images',
    createdAt: '2021.11.12',
  },
  {
    _id: 4,
    title: '강아지 산책',
    wheather: 1,
    tags: ['강아지', '산책'],
    content: '산책이 좋아진 집순이 강쥐 씐났다 ㅋㅋ',
    image: 'images',
    createdAt: '2021.11.12',
  },
];
const userInfo = {
  _id: 1,
  name: 'User',
  email: 'test@test.com',
  image: 'image',
};

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

  return (
    <>
      <Header userInfo={userInfo} />
      {/* dialog 라이브러리 연결하기, 월별 필터링 구현하기 */}
      <Calender>2021년 11월</Calender>
      <AddBtn>
        <Link to='/main/diaryview'>+</Link>
      </AddBtn>
      {/* 해쉬태그 리스트
          - 해쉬태그별 필터링 구현하기
          - 해쉬태그 선택시 해당 해쉬태그로 타이틀 변경
        */}
      <ContentWrap>
        <TagList>
          <HashTages tages={tages} />
        </TagList>
        <DiaryList>
          {diarys.map((diary) => {
            return (
              <li>
                <Link to='/main/diaryview'>
                  <Diary key={diary._id} diary={diary} />
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
