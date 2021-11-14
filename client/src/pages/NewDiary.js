import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import DrawingModal from '../components/Modal/DrawingModal';
import { Tag } from '../components/Tags';
import axios from 'axios';
import {
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherDownpour,
  TiWeatherSnow,
} from 'react-icons/ti';

const NewDiaryWrap = styled.div`
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0.2rem;
    padding: 0.2rem;
    border-radius: 50%;
    cursor: pointer;
  }
  svg.select {
    color: darkmagenta;
    background-color: lavender;
  }
`;

const NewDiary = () => {
  const [clickDrawing, setClickDrawing] = useState(false);
  const [drawingImg, setDrawingImg] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [weatherIdx, setWeatherIdx] = useState(0);
  const [inputTag, setInputTag] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [tags, setTags] = useState([]);

  const history = useNavigate();

  const DrawingHandler = () => {
    setClickDrawing(!clickDrawing);
  };
  const SaveDrawingHandler = (url) => {
    setDrawingImg(url);
  };

  const inputHandler = (event) => {
    if (event.target.placeholder === 'Title') {
      setInputTitle(event.target.value);
    } else if (event.target.placeholder === 'HashTag') {
      setInputTag(event.target.value);
    } else if (event.target.placeholder === '오늘의 일기') {
      setInputContent(event.target.value);
    }
  };

  const weatherSelectHandler = (event) => {
    const weatherArr = Number(event.target.dataset.weather);
    if (weatherArr === 0) {
      setWeatherIdx(weatherArr);
    } else if (weatherArr === 1) {
      setWeatherIdx(weatherArr);
    } else if (weatherArr === 2) {
      setWeatherIdx(weatherArr);
    } else if (weatherArr === 3) {
      setWeatherIdx(weatherArr);
    }
  };

  const postDiaryHandler = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('userInfo')).token
        }`,
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(
        '/api/contents/new',
        {
          title: inputTitle,
          text: inputContent,
          weather: weatherIdx,
          drawing:
            'https://twitter.com/Chuwinkle_/status/1002903547761999873/photo/1',
          hashtags: tags,
        },
        config
      )
      .then((res) => {
        console.log(res);
        //만약 내가쓴 일기가 잘 저장이 되면, res.data._id 에 내가 쓴 일기에 대한 고유한 id가 들어오는데
        //이 id값을 DiaryView에 전달만해주면 DiaryView에서 useEffec로 서버에 요청 해줌.
        history('/main/diaryview', { state: { _id: res.data._id } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <NewDiaryWrap>
      <Header />
      <h3>NewDiary</h3>
      <div onClick={DrawingHandler}>
        {drawingImg !== '' ? (
          <img src={drawingImg} alt='drawingImg' />
        ) : (
          'click me!'
        )}
      </div>
      {clickDrawing ? (
        <DrawingModal
          DrawingHandler={DrawingHandler}
          SaveDrawingHandler={SaveDrawingHandler}
        />
      ) : null}
      <input
        type='text'
        placeholder='Title'
        value={inputTitle}
        onChange={inputHandler}
      />
      <button onClick={postDiaryHandler}>Save</button>
      {/* <input
        type='text'
        placeholder='HashTag'
        value={inputTag}
        onChange={inputHandler}
      /> */}
      <Tag tags={tags} setTags={setTags} />
      {/* 날씨 선택 */}
      <TiWeatherSunny
        onClick={weatherSelectHandler}
        data-weather='0'
        className={weatherIdx === 0 ? 'select' : ''}
      />
      <TiWeatherPartlySunny
        onClick={weatherSelectHandler}
        data-weather='1'
        className={weatherIdx === 1 ? 'select' : ''}
      />
      <TiWeatherDownpour
        onClick={weatherSelectHandler}
        data-weather='2'
        className={weatherIdx === 2 ? 'select' : ''}
      />
      <TiWeatherSnow
        onClick={weatherSelectHandler}
        data-weather='3'
        className={weatherIdx === 3 ? 'select' : ''}
      />
      <input
        type='text'
        placeholder='오늘의 일기'
        value={inputContent}
        onChange={inputHandler}
      />
    </NewDiaryWrap>
  );
};

export default NewDiary;
