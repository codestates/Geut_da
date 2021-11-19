import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import Header from '../components/Header';
import DrawingModal from '../components/Modal/DrawingModal';
import { Tag } from '../components/Tags';
import axios from 'axios';
import { BsSunFill, BsCloudSunFill, BsFillCloudRainFill, BsArrow90DegLeft } from 'react-icons/bs';
import { GiSnowman } from 'react-icons/gi';
import { MdSaveAlt } from 'react-icons/md';
import { BiLoaderCircle } from 'react-icons/bi';
import S3 from 'react-aws-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { MAIN } from '../constants/routes';

dotenv.config();

const NewDiaryWrap = styled.div`
  height: 90vh;
  padding: 4rem 0 3rem;
  position: relative;

  /* 뒤로가기 버튼 */
  > button.backbutton {
    margin: 0;
    padding: 0;
    border: none;
    position: absolute;
    top: 0.5rem;
    left: 0;
  }
  > button.backbutton a {
    width: 2.3rem;
    height: 2.3rem;
    color: #fff;
    font-size: 1.1em;
    line-height: 2.4rem;
    background: var(--color-black);
    border-radius: 50%;
    display: inline-block;
    padding-top: 0.15rem;
    padding-right: 0.1rem;
  }
  > button.backbutton a:hover {
    background-color: var(--color-beige);
  }
`;

const DiaryWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  > div.img {
    flex: 2;
    margin-right: 3rem;
    font-family: serif;
    font-size: 2em;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
    cursor: pointer;

    img {
      max-width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
  > div:nth-child(2) {
    flex: 3;
    justify-content: flex-start;
  }
  div.title {
    width: 100%;
    margin: 0.5rem 0;
    padding: 1rem 0;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  div.title div:nth-child(1) {
    flex: 1;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  /* 일기 제목 */
  div.title div:nth-child(1) input {
    width: 90%;
    border: none;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 0 0 0 0.4rem;
    font-size: 1.8em;
    font-weight: 700;
    border-radius: 0.1rem;
  }
  div.title div:nth-child(2) {
    font-size: 0.9em;
    text-align: right;
    color: #666;
  }
  /* 저장, 저장중 버튼 */
  div.title button {
    width: 2.4rem;
    height: 2.4rem;
    margin-top: -0.2rem;
    margin-left: 0.4rem;
    padding-top: 0.4rem;
    font-size: 1.5em;
    text-align: center;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.5s;
  }
  div.title button:hover {
    color: #fff;
    background-color: var(--color-beige);
    border-radius: 50%;
  }

  div.title div input:focus {
    outline: none;
  }
  /* 추가 설명 (태그, 날씨) */
  div.description {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  /* 태그 (span) */
  div.description div:nth-child(1) {
    flex: 8;
  }
  div.description div:nth-child(1) > span {
    margin-right: 0.4rem;
    color: var(--color-black);
  }
  /* 날씨 (svg) */
  div.description div.weather {
    flex: 3;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
  div.description div.weather div {
    max-width: 2rem;
    max-height: 2rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    transition: all 0.5s;
    cursor: pointer;
    position: relative;
  }
  div.description div.weather div.select {
    background-color: var(--color-beige);
  }
  div.description div.weather div span {
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  div.description div.weather div svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  div.diary_text {
    flex: 1;
    width: 100%;
    padding: 1rem;
    margin-top: 1.5rem;
    border: 1px solid #ddd;
    word-break: break-all;
    word-wrap: break-word;
    text-overflow: ellipsis;
  }
  div.diary_text p {
    margin: 0;
    line-height: 1.2;
  }
  div.diary_text textarea {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    border: none;
    background-color: rgba(255, 255, 255, 0.4);
    line-height: 1.2;
    resize: none;
    font-size: 1.3em;
  }

  div.diary_text textarea::placeholder {
    font-size: 1em;
  }
  div.diary_text textarea:focus {
    outline: none;
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
  const [isExistTitle, setIsExistTitle] = useState(false);
  const [isExistContent, setIsExistContent] = useState(false);
  const [blockDoubleClick, setBlockDoubleClick] = useState(false);

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
      inputTitle && setIsExistTitle(true);
    } else if (event.target.placeholder === 'HashTag') {
      setInputTag(event.target.value);
    } else if (event.target.placeholder === '오늘의 일기') {
      setInputContent(event.target.value);
      inputContent && setIsExistContent(true);
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
    const newFileName = uuidv4();
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };
    const ReactS3Client = new S3(config);
    const config2 = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        'Content-Type': 'application/json',
      },
    };
    // console.log(isExistAllContents);
    if (isExistContent && isExistTitle) {
      if (!drawingImg) {
        axios
          .post(
            'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents',
            {
              title: inputTitle,
              text: inputContent,
              weather: weatherIdx,
              drawing: `/images/examplePaints/${Math.floor(Math.random() * 5) + 1}.png`,
              hashtags: tags,
            },
            config2
          )
          .then((res) => {
            // console.log(res);
            //만약 내가쓴 일기가 잘 저장이 되면, res.data._id 에 내가 쓴 일기에 대한 고유한 id가 들어오는데
            //이 id값을 DiaryView에 전달만해주면 DiaryView에서 useEffec로 서버에 요청 해줌.
            history('/main/diaryview', { state: { _id: res.data._id } });
            setBlockDoubleClick(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const dataURLtoFile = (dataurl, filename) => {
          let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) u8arr[n] = bstr.charCodeAt(n);
          return new File([u8arr], filename, { type: mime });
        };
        const file = dataURLtoFile(drawingImg, 'hello.png');
        ReactS3Client.uploadFile(file, newFileName).then((data) => {
          if (data.status === 204) {
            axios
              .post(
                'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents',
                {
                  title: inputTitle,
                  text: inputContent,
                  weather: weatherIdx,
                  drawing: data.location,
                  hashtags: tags,
                },
                config2
              )
              .then((res) => {
                // console.log(res);
                //만약 내가쓴 일기가 잘 저장이 되면, res.data._id 에 내가 쓴 일기에 대한 고유한 id가 들어오는데
                //이 id값을 DiaryView에 전달만해주면 DiaryView에서 useEffec로 서버에 요청 해줌.
                history('/main/diaryview', { state: { _id: res.data._id } });
                setBlockDoubleClick(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    }
  };
  const handleClick = () => {
    if (!isExistContent || !isExistTitle) {
      setBlockDoubleClick(false);
      return;
    }
    if (blockDoubleClick) return;
    setBlockDoubleClick(true);
    postDiaryHandler();
  };

  return (
    <NewDiaryWrap>
      <Header />
      <>
        <button className='backbutton'>
          <Link to={MAIN}>
            <BsArrow90DegLeft />
          </Link>
        </button>
        <DiaryWrap>
          <div className='img' onClick={DrawingHandler}>
            {drawingImg !== '' ? <img src={drawingImg} alt='drawingImg' /> : 'CLICK ME!'}
          </div>
          {/* Drawing Modal */}
          {clickDrawing && <DrawingModal DrawingHandler={DrawingHandler} SaveDrawingHandler={SaveDrawingHandler} drawingImg={drawingImg} />}
          <div>
            <div className='title'>
              <div>
                <input type='text' placeholder='Title' value={inputTitle} onChange={inputHandler} />
                <div>
                  <button onClick={handleClick} disabled={blockDoubleClick}>
                    {blockDoubleClick ? <BiLoaderCircle /> : <MdSaveAlt />}
                  </button>
                </div>
              </div>
            </div>
            <div className='description'>
              {/* 해쉬태그 */}
              <div>
                <Tag tags={tags} setTags={setTags} />
              </div>
              {/* 날씨 선택 */}
              <div className='weather'>
                <div className={weatherIdx === 0 ? 'select' : ''}>
                  <span onClick={weatherSelectHandler} data-weather='0'></span>
                  <BsSunFill />
                </div>
                <div className={weatherIdx === 1 ? 'select' : ''}>
                  <span onClick={weatherSelectHandler} data-weather='1'></span>
                  <BsCloudSunFill />
                </div>
                <div className={weatherIdx === 2 ? 'select' : ''}>
                  <span onClick={weatherSelectHandler} data-weather='2'></span>
                  <BsFillCloudRainFill />
                </div>
                <div className={weatherIdx === 3 ? 'select' : ''}>
                  <span onClick={weatherSelectHandler} data-weather='3'></span>
                  <GiSnowman />
                </div>
              </div>
            </div>
            <div className='diary_text'>
              <textarea placeholder='오늘의 일기' value={inputContent} onChange={inputHandler} />
            </div>
          </div>
        </DiaryWrap>
      </>
    </NewDiaryWrap>
  );
};

export default NewDiary;
