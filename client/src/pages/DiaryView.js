import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import DrawingModal from '../components/Modal/DrawingModal';
import { Tag } from '../components/Tags';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherDownpour,
  TiWeatherSnow,
} from 'react-icons/ti';

const DiaryWrap = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: row;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  > div.img {
    background-color: #eee;
  }
  div.title {
    margin: 0.5rem 0;
    padding: 0.5rem 0 1rem;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
  }
`;

const DiaryView = () => {
  const [diaryInfo, setDiaryInfo] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [clickDrawing, setClickDrawing] = useState(false);
  const [drawingImg, setDrawingImg] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [weatherIdx, setWeatherIdx] = useState(0);
  const [inputContent, setInputContent] = useState('');
  const [tags, setTags] = useState([]);

  const history = useNavigate();
  const location = useLocation();
  const DrawingHandler = () => {
    setClickDrawing(!clickDrawing);
  };

  useEffect(() => {
    if (location.state._id) {
      axios
        .get('/api/contents', {
          ...config,
          params: { _id: location.state._id },
        })
        .then((res) => {
          setDiaryInfo(res.data);
          setDrawingImg(res.data.image);
          setInputTitle(res.data.title);
          setWeatherIdx(res.data.weather);
          setInputContent(res.data.text);
          setTags(res.data.hashtags);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')).token
      }`,
    },
  };

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')).token
      }`,
      'Content-Type': 'application/json',
    },
  };

  const DeleteDiaryHandler = () => {
    if (location.state._id) {
      axios
        .delete('/api/contents', {
          ...config,
          data: { _id: location.state._id },
        })
        .then((res) => {
          history('/main');
        });
    }
  };

  const isEditHanlder = () => {
    //수정버튼 클릭시 input 활성화
    setIsEdit(!isEdit);
  };

  const diaryUpdateHandler = () => {
    //수정완료하여 save버튼 클릭시 axios 요청 / 수정 완료되면 isEditHander 실행
    console.log(inputTitle);
    console.log(inputContent);
    console.log(tags);
    console.log(location.state._id);
    axios
      .patch(
        '/api/contents',
        {
          drawing:
            'https://twitter.com/Chuwinkle_/status/1002903547761999873/photo/1',
          title: inputTitle,
          text: inputContent,
          hashtags: tags,
          _id: location.state._id,
        },
        config2
      )
      .then((res) => {
        //수정이 잘되었을 경우 새로 전달받은 정보를 다시 DiaryViwe에 띄워줌
        window.location.replace('/main/diaryview');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputHandler = (event) => {
    if (event.target.placeholder === 'Title') {
      setInputTitle(event.target.value);
    } else if (event.target.placeholder === '오늘의 일기') {
      setInputContent(event.target.value);
    }
  };

  const SaveDrawingHandler = (url) => {
    setDrawingImg(url);
  };

  return (
    <>
      <Header />
      {isEdit ? (
        <DiaryWrap>
          <div className='img' onClick={DrawingHandler}>
            <img src={drawingImg} alt='drawing' />
          </div>
          {clickDrawing && (
            <DrawingModal
              DrawingHandler={DrawingHandler}
              SaveDrawingHandler={SaveDrawingHandler}
            />
          )}
          <div>
            <div className='title'>
              <input
                type='text'
                placeholder='Title'
                value={inputTitle}
                onChange={inputHandler}
              />
              <button onClick={diaryUpdateHandler}>Save</button>
            </div>
            <Tag tags={tags} setTags={setTags} />
            <button>{diaryInfo.weather}</button>
            <span>{diaryInfo.createdAt}</span>
            <input
              type='text'
              placeholder='오늘의 일기'
              value={inputContent}
              onChange={inputHandler}
            />
          </div>
        </DiaryWrap>
      ) : (
        <DiaryWrap>
          <div className='img'>
            <img src={diaryInfo.drawing} alt='drawing' />
          </div>
          <div>
            <div className='title'>
              {diaryInfo.title}
              <button onClick={DeleteDiaryHandler}>Delete</button>
              <button onClick={isEditHanlder}>Edit</button>
            </div>
            {diaryInfo.hashtags &&
              diaryInfo.hashtags.map((el, idx) => {
                return <span key={idx}>#{el}</span>;
              })}
            <button>{diaryInfo.weather}</button>
            <span>{diaryInfo.createdAt}</span>
            <p>{diaryInfo.text}</p>
          </div>
        </DiaryWrap>
      )}
    </>
  );
};

export default DiaryView;
