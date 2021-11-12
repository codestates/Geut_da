import styled from 'styled-components';

const wheather = ['맑음', '흐림', '비', '눈'];

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
    background-color: #eee;
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
      <div className='img'></div>
      <div className='title'>
        <h3>{diary.title}</h3>
        <span>{wheather[diary.wheather]}</span>
      </div>
      <span>{diary.createdAt}</span>
    </DiaryWrap>
  );
};

export default Diary;
