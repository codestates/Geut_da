import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components/macro';
import Header from '../components/Header';
import DrawingModal from '../components/Modal/DrawingModal';
import { MAIN } from '../constants/routes';
import { Tag } from '../components/Tags';
import { BsSunFill, BsCloudSunFill, BsFillCloudRainFill } from 'react-icons/bs';
import { GiSnowman } from 'react-icons/gi';
import { BsArrow90DegLeft, BsTrash, BsPen } from 'react-icons/bs';
import { MdSaveAlt } from 'react-icons/md';
import S3 from 'react-aws-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import Loader from '../components/Loader';

dotenv.config();

const DiaryViewWrap = styled.div`
  height: 90vh;
  padding: 4rem 0 3rem;
  position: relative;

  /* 뒤로가기 버튼 */
  > button {
    margin: 0;
    padding: 0;
    border: none;
    position: absolute;
    top: 0.5rem;
    left: 0;
  }
  > button a {
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
  > button a:hover {
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
    background-color: rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;

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
  div.title div:nth-child(1) h3 {
    flex: 1;
    margin: 0;
    padding: 0;
    font-size: 1.8em;
    font-weight: 700;
  }
  div.title div:nth-child(2) {
    font-size: 0.9em;
    text-align: right;
    color: #666;
  }
  /* 수정, 삭제 버튼 */
  div.title button {
    width: 2rem;
    height: 2rem;
    margin-top: -0.2rem;
    margin-left: 0.4rem;
    padding-top: 0.2rem;
    font-size: 1.1em;
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

  div.title div input {
    width: 90%;
    border: none;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 0 0 0 0.4rem;
    font-size: 1.8em;
    font-weight: 700;
    border-radius: 0.1rem;
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

  div.description div:nth-child(1) {
    flex: 9;
  }
  div.description div:nth-child(2) {
    flex: 1;
    text-align: right;
  }

  /* 태그 (span) */
  div.description div:nth-child(1) > span {
    margin-right: 0.4rem;
    color: var(--color-black);
  }
  /* 날씨 (svg) */
  div.description div:nth-child(2) svg {
    font-size: 1.4em;
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
    background: none;
    line-height: 1.2;
    resize: none;
    font-size: 1.3em;
    background-color: rgba(255, 255, 255, 0.5);
  }

  div.diary_text textarea:focus {
    outline: none;
  }

  div.diary_text textarea::placeholder {
    font-size: 1em;
  }
`;

const LoaderBackDrop = styled.div`
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DiaryView = () => {
  const [diaryInfo, setDiaryInfo] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [clickDrawing, setClickDrawing] = useState(false);
  const [drawingImg, setDrawingImg] = useState(diaryInfo.drawing);
  const [inputTitle, setInputTitle] = useState('');
  const [weatherIdx, setWeatherIdx] = useState(0);
  const [inputContent, setInputContent] = useState('');
  const [tags, setTags] = useState([]);
  const [originImg, setOriginImg] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const history = useNavigate();
  const location = useLocation();
  const s3config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  };
  const ReactS3Client = new S3(s3config);

  const DrawingHandler = () => {
    setClickDrawing(!clickDrawing);
  };

  useEffect(() => {
    if (location.state._id) {
      axios
        .get('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents', {
          ...config,
          params: { _id: location.state._id },
        })
        .then((res) => {
          setDiaryInfo(res.data);
          setDrawingImg(res.data.drawing);
          setOriginImg(res.data.drawing);
          setInputTitle(res.data.title);
          setWeatherIdx(res.data.weather);
          setInputContent(res.data.text);
          setTags(res.data.hashtags);
          setisLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setisLoading(false);
        });
    }
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
    },
  };

  const config2 = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      'Content-Type': 'application/json',
    },
  };

  const DeleteDiaryHandler = () => {
    if (location.state._id) {
      axios
        .delete('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents', {
          ...config,
          data: { _id: location.state._id },
        })
        .then((res) => {
          ReactS3Client.deleteFile(originImg.split('/')[3]);
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
    if (drawingImg.split('/')[1] === 'images') {
      axios
        .patch(
          'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents',
          {
            drawing: drawingImg,
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
    } else {
      if (drawingImg === originImg) {
        axios
          .patch(
            'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents',
            {
              drawing: originImg,
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
        const newFileName = uuidv4();
        ReactS3Client.deleteFile(originImg.split('/')[3]);
        ReactS3Client.uploadFile(file, newFileName).then((data) => {
          if (data.status === 204) {
            axios
              .patch(
                'http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:5000/api/contents',
                {
                  drawing: data.location,
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
          }
        });
      }
    }
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
    <DiaryViewWrap>
      <Header />
      {isLoading ? (
        <LoaderBackDrop>
          <Loader />
        </LoaderBackDrop>
      ) : (
        <>
          <button>
            <Link to={MAIN}>
              <BsArrow90DegLeft />
            </Link>
          </button>
          {isEdit ? (
            <DiaryWrap>
              <div className='img' onClick={DrawingHandler}>
                <img src={drawingImg} alt='drawing' />
              </div>
              {/* Drawing Modal */}
              {clickDrawing && <DrawingModal DrawingHandler={DrawingHandler} SaveDrawingHandler={SaveDrawingHandler} drawingImg={drawingImg} />}
              <div>
                <div className='title'>
                  <div>
                    <input type='text' placeholder='Title' value={inputTitle} onChange={inputHandler} />
                    <div>
                      <button onClick={diaryUpdateHandler}>
                        <MdSaveAlt />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='description'>
                  {/* 해쉬태그 */}
                  <div>
                    <Tag tags={tags} setTags={setTags} />
                  </div>
                  {/* 날씨 아이콘 */}
                  <div>
                    {weatherIdx === 0 && <BsSunFill />}
                    {weatherIdx === 1 && <BsCloudSunFill />}
                    {weatherIdx === 2 && <BsFillCloudRainFill />}
                    {weatherIdx === 3 && <GiSnowman />}
                  </div>
                </div>
                <div className='diary_text'>
                  <textarea placeholder='오늘의 일기' value={inputContent} onChange={inputHandler} />
                </div>
              </div>
            </DiaryWrap>
          ) : (
            <DiaryWrap>
              <div className='img'>
                <img src={diaryInfo.drawing} alt='drawing' />
              </div>
              <div>
                <div className='title'>
                  <div>
                    <h3>{diaryInfo.title}</h3>
                    <div>
                      <button onClick={DeleteDiaryHandler}>
                        <BsTrash />
                      </button>
                      <button onClick={isEditHanlder}>
                        <BsPen />
                      </button>
                    </div>
                  </div>
                  <div>
                    <span>{diaryInfo.createdAt}</span>
                  </div>
                </div>
                <div className='description'>
                  {/* 해쉬태그 */}
                  <div>
                    {diaryInfo.hashtags &&
                      diaryInfo.hashtags.map((el, idx) => {
                        return <span key={idx}>#{el}</span>;
                      })}
                  </div>
                  {/* 날씨 아이콘 */}
                  <div>
                    {weatherIdx === 0 && <BsSunFill />}
                    {weatherIdx === 1 && <BsCloudSunFill />}
                    {weatherIdx === 2 && <BsFillCloudRainFill />}
                    {weatherIdx === 3 && <GiSnowman />}
                  </div>
                </div>
                <div className='diary_text'>
                  <p>{diaryInfo.text}</p>
                </div>
              </div>
            </DiaryWrap>
          )}
        </>
      )}
    </DiaryViewWrap>
  );
};

export default DiaryView;
