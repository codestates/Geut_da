import styled from 'styled-components';

const weather = ['맑음', '흐림', '비', '눈'];

const DiaryWrap = styled.div`
  width: 200px;

  div.title {
    margin: 0.5rem 0;
    padding: 0.5rem 0 1rem;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  .img {
    height: 260px;
    background-color: rgba(255, 255, 255, 0.8);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      height: 100%;
    }
  }
  h3 {
    margin: 0;
    padding: 0;
  }
  span {
    font-size: 0.9em;
    color: #888;
  }
`;

const Diary = ({ diary }) => {
  return (
    <DiaryWrap>
      <div className='img'>
        <img src={diary.drawing} size='200x260' alt='drawing' />
      </div>
      <div className='title'>
        <h3>{diary.title}</h3>
        <span>{weather[diary.weather]}</span>
      </div>
      <span>{diary.createdAt}</span>
    </DiaryWrap>
  );
};

export default Diary;
