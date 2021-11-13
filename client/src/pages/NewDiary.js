import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DrawingModal from '../components/Modal/DrawingModal';

const NewDiary = () => {
  const [clickDrawing, setClickDrawing] = useState(false);
  const [drawingImg, setDrawingImg] = useState('');

  const DrawingHandler = () => {
    setClickDrawing(!clickDrawing);
  };
  const SaveDrawingHandler = (url) => {
    setDrawingImg(url);
  };

  return (
    <>
      <Header />
      <h3>DiaryView</h3>
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
      <input type='text' placeholder='Title' />
      <Link to='/main'>Delete</Link>
      <button>Edit</button>
      <button>Save</button>
      <input type='text' placeholder='HashTages' />
      <button>Wheather</button>
      <input type='text' placeholder='contents' />
    </>
  );
};

export default NewDiary;
