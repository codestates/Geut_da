import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DrawingModal from '../components/Modal/DrawingModal';

const DiaryView = () => {
  const [clickDrawing, setClickDrawing] = useState(false);

  const DrawingHandler = () => {
    setClickDrawing(!clickDrawing);
  }
  return (
    <>
      <Header />
      <div>DiaryView</div>
      <div onClick={DrawingHandler}>img</div>
      { clickDrawing ? <DrawingModal /> : null }
      <input type="text" placeholder="Title" />
      <Link to="/main">Delete</Link>
      <button>Edit</button>
      <button>Save</button>
      <input type="text" placeholder="HashTages" />
      <button>Wheather</button>
      <input type="text" placeholder="contents" />
    </>
  )
}

export default DiaryView;