import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components/macro';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Diary from '../components/Diary';
import HashTags from '../components/HashTags';
import Loader from '../components/Loader';
import { BsPlusLg } from 'react-icons/bs';

const MainWrap = styled.div`
  padding-bottom: 22vh;
`;

const LoaderBackDrop = styled.div`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Search = styled.div`
  height: 5vh;
  line-height: 5vh;
  text-align: center;

  > div {
    font-weight: bold;
  }
  > input[type='month'] {
    margin: 0;
    padding: 0 0 0.1rem;
    font-family: sans-serif;
    font-size: 1em;
    text-align: right;
    background: none;
    border: none;
    border-bottom: 1px solid #ccc;
  }
  > input[type='month']:focus {
    outline: none;
  }
  span {
    padding-left: 0.5rem;
    cursor: pointer;
    color: var(--color-red);
  }
`;

const AddBtn = styled.div`
  display: flex;
  justify-content: flex-end;

  a {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    text-align: center;
    color: var(--color-red);
    border: 2px solid var(--color-red);
    border-radius: 50%;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a:hover {
    color: #fff;
    background-color: var(--color-red);
  }
`;

const ContentWrap = styled.div`
  height: 72vh;
  padding-bottom: 5vh;
  display: flex;
`;

const TagList = styled.aside`
  margin: 1rem 2rem 0 0;
  flex: 1;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff;
    border-radius: 2px;
  }
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

const Main = () => {
  // recoil로 로그인 상태 관리 필수
  const [isLoading, setIsLoading] = useState(true);
  const [diaries, setDiaries] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTag, setSearchTag] = useState(null);
  const [searchMonth, setSearchMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')).token
      }`,
    },
  };

  useEffect(() => {
    // 현재 년월 일기목록 요청
    axios
      .get(
        'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents/by-month',
        config
      )
      .then((res) => {
        setDiaries(res.data);
        axios
          .get(
            'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents/hashtags',
            config
          )
          .then((res) => {
            setTags(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchMonthHandler = (event) => {
    setIsLoading(true);
    const data = event ? event.target.value : searchMonth;
    setSearchMonth(data);
    setSearchTag(null);
    const [year, month] = data.split('-');

    axios
      .get(
        'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents/by-month',
        {
          ...config,
          params: { year: year, month: month },
        }
      )
      .then((res) => {
        setDiaries(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const searchTagHandler = (tag) => {
    setIsLoading(true);
    setSearchTag(tag);
    setSearchMonth(new Date().toISOString().slice(0, 7));

    axios
      .get(
        'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents/by-hashtag',
        {
          ...config,
          params: { hashtag: tag },
        }
      )
      .then((res) => {
        setDiaries(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const searchTagResetHandler = () => {
    setSearchTag(null);
    searchMonthHandler();
  };

  return (
    <MainWrap>
      <Header />
      {/* dialog 라이브러리 연결하기, 월별 필터링 구현하기 */}
      <Search>
        <input
          type='month'
          id='calender'
          name='calender'
          value={searchMonth}
          onChange={searchMonthHandler}
        />
        <div>
          {searchTag}
          {searchTag && <span onClick={searchTagResetHandler}>&times;</span>}
        </div>
      </Search>
      <AddBtn>
        <Link to='/main/newdiary'>
          <BsPlusLg />
        </Link>
      </AddBtn>
      {/* 해쉬태그 리스트
          - 해쉬태그별 필터링 구현하기
          - 해쉬태그 선택시 해당 해쉬태그로 타이틀 변경
        */}
      {isLoading ? (
        <LoaderBackDrop>
          <Loader />
        </LoaderBackDrop>
      ) : (
        <ContentWrap>
          <TagList>
            <HashTags tags={tags} searchTagHandler={searchTagHandler} />
          </TagList>
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
              <div>목록이 비어있습니다.</div>
            )}
          </DiaryList>
        </ContentWrap>
      )}
      <Footer />
    </MainWrap>
  );
};

export default Main;
