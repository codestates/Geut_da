import { set } from 'mongoose';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components/macro';

const DrawingModalBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    text-align: center;
  }

  div.drawing_modal {
    margin: auto;
    padding: 2rem 3rem;
    background-color: #fff;
    border-radius: 1rem;
    position: relative;
  }
  button.close_btn {
    margin: 0;
    padding: 1rem 1.2rem;
    font-size: 1.5em;
    line-height: 1;
    color: var(--color-black);
    border: none;
    background: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
  button.close_btn:hover {
    color: var(--color-red);
  }
  div.controls_range {
    margin-top: 1rem;
    font-size: 0.9em;
    color: #666;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  div.controls_btns {
    display: flex;
    justify-content: center;
  }
  // button css reset
  div.controls_btns button {
    margin: 1.2rem 0.2rem 0.5rem;
    padding: 0.3rem 0.6rem;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
  }
  div.controls_btns button.active {
    border: 1px solid #999;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  }
  ul {
    margin: 1rem;
    display: flex;
    justify-content: center;
  }
  li {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 0.2rem;
    border-radius: 50%;
    cursor: pointer;
  }

  p {
    text-align: center;
    color: var(--color-black);
  }
`;
// 캔버스 영역 css
const CanvasWrap = styled.div`
  width: 50vw;
  height: 50vh;
  margin: auto;
  background-color: #eee;
  position: relative;
  canvas {
    border: 2px solid #ccc;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`;

const DrawingModal = ({ DrawingHandler, SaveDrawingHandler, drawingImg }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFillMode, setIsFillMode] = useState(false);
  const [lineWidth, setLineWidth] = useState(2.5);
  let previousImg = drawingImg;

  //반응형 캔버스
  const [windowSize, setWindowSize] = useState({
    width: document.body.clientWidth / 2,
    height: document.body.clientHeight / 2,
  });

  //window 사이즈 변경될때마다 실행
  useEffect(() => {
    let resizeTimer;
    let windowSizer = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowSize({
          width: document.body.clientWidth / 2,
          height: document.body.clientHeight / 2,
        });
      }, 10);
      canvas.width = windowSize.width;
      canvas.height = windowSize.height;
    };
    window.addEventListener('resize', windowSizer);

    return () => {
      window.removeEventListener('resize', windowSizer);
    };
  }, [windowSize]);

  // 초기값 설정
  const image = new Image();
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = document.body.clientWidth / 2;
    canvas.height = document.body.clientHeight / 2;

    const ctx = canvas.getContext('2d');
    image.setAttribute('crossOrigin', '*');
    image.src = previousImg;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
    image.onerror = () => {
      previousImg = 'https://geutda-cors.herokuapp.com/' + drawingImg;
      image.src = previousImg;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
    };
    // first draw
    ctx.strokeStyle = '#2c2c2c';
    ctx.lineWidth = 2.5;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, []);

  // Draw start
  function initDraw({ nativeEvent }) {
    setIsDrawing(true);

    const ctx = canvasRef.current.getContext('2d');

    const { offsetX, offsetY } = nativeEvent;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  }
  // Draw 이벤트
  function draw({ nativeEvent }) {
    if (!isDrawing) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');

    const { offsetX, offsetY } = nativeEvent;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }

  // finish 이벤트
  function finishDraw() {
    setIsDrawing(false);
  }

  // color 변경 함수
  function handleColorClick({ nativeEvent }) {
    const ctx = canvasRef.current.getContext('2d');
    if (!isFillMode) {
      // fill모드 false일때 선 선색 변경
      ctx.strokeStyle = nativeEvent.target.style.backgroundColor;
    } else {
      // fill모드일때 색상 선택시 해당 색상으로 배경색 채우고 paint 모드로 변경
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = nativeEvent.target.style.backgroundColor;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setIsFillMode(!isFillMode);
      ctx.globalCompositeOperation = 'source-over';
    }
  }
  // lineWidth 변경 함수
  const handleRangeChange = ({ nativeEvent }) => {
    const ctx = canvasRef.current.getContext('2d');
    const size = nativeEvent.target.value;
    ctx.lineWidth = size;
    setLineWidth(size);
  };

  // 캔버스 Clear
  function fillWhiteHandler(event) {
    const ctx = canvasRef.current.getContext('2d');
    //클릭시 fillStyle을 white로 바꾸고
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    //fillRect(x축좌표, y축좌표, width, height)
  }
  // Fill, Paint 모드 변경 함수
  function fillModeHandler(event) {
    // fill 버튼 클릭시 fill 모드 true로 변경 (여러번 클릭해도 동일)
    if (event.target.dataset.mode === 'fill') {
      setIsFillMode(true);
    }
    // pain 버튼 클릭시 fill 모드 false로 변경 (여러번 클릭해도 동일)
    else if (event.target.dataset.mode === 'paint') {
      setIsFillMode(false);
    }
  }
  // 그림 저장 함수
  const SaveImgHandler = (event) => {
    //base64문자열로 받은 이미지
    const image = canvasRef.current.toDataURL();
    SaveDrawingHandler(image);
    DrawingHandler();
  };

  return (
    <DrawingModalBackdrop>
      <div className='drawing_modal'>
        <h3>Drawing Canvas</h3>
        <button className='close_btn' onClick={DrawingHandler}>
          &times;
        </button>
        {/* Cavas 구현 */}
        <CanvasWrap>
          <canvas ref={canvasRef} onMouseDown={initDraw} onMouseUp={finishDraw} onMouseMove={draw} onMouseLeave={finishDraw} />
        </CanvasWrap>
        <div className='controls'>
          <div className='controls_range'>
            <input type='range' min='0.1' max='15' value={lineWidth} step='0.1' onChange={handleRangeChange} />
            <div>{lineWidth}</div>
          </div>
          <div className='controls_btns'>
            <button onClick={fillWhiteHandler}>Clear</button>
            <button onClick={fillModeHandler} className={!isFillMode ? 'active' : ''} data-mode='paint'>
              Paint
            </button>
            <button onClick={fillModeHandler} className={isFillMode ? 'active' : ''} data-mode='fill'>
              Fill
            </button>
            <button onClick={SaveImgHandler}>Save</button>
          </div>
        </div>
        {/* 컬러 팔레트 */}
        <ul>
          <li style={{ backgroundColor: '#ffffff', border: '1px solid #ccc' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#f0f0f0' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#2c2c2c' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#FAEBD7' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#a52a2a' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#d26c6c' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#d2691e' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#ffbb00' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#8fbc8f' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#339933' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#b7e2fc' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#4682b4' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#f2f2fc' }} onClick={handleColorClick} />
          <li style={{ backgroundColor: '#c37fcc' }} onClick={handleColorClick} />
        </ul>
        <p>*배경을 채우면 기존에 그린 배경색과 섞여서 채워집니다</p>
      </div>
    </DrawingModalBackdrop>
  );
};

export default DrawingModal;
