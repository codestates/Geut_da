import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

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

  div.drawing_modal {
    padding: 2rem 3rem;
    background-color: #fff;
    border-radius: 1rem;
    position: relative;
  }
  button.close_btn {
    margin: 0;
    padding: 1rem 1.5rem;
    font-size: 2em;
    line-height: 1;
    color: #333;
    border: none;
    background: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
  button.close_btn:hover {
    color: #888;
  }
  div.controls_range {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
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
`;

const CanvasWrap = styled.div`
  width: 50vw;
  height: 50vh;
  margin: auto;
  background-color: #eee;
  position: relative;

  canvas {
    /* background-color: lavender;
    display: block; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const DrawingModal = ({ DrawingHandler, SaveDrawingHandler }) => {
  // 컨텍스트
  let ctx;
  let canvas;
  let canvasRef = useRef(null);
  // let canvasWidth = window.innerWidth / 2;
  // let canvasHeight = window.innerHeight / 2;
  // 그림이 그려질 때 사용될 좌표값
  let pos = {
    drawable: false,
    X: -1,
    Y: -1,
  };
  // window.onresize = function (e) {
  //   // let canvas = document.getElementById('canvas');
  //   canvas.width = window.innerWidth / 2;
  //   canvas.height = window.innerHeight / 2;
  //   draw();
  // };

  // 초기화
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    canvas.width = 240;
    canvas.height = 300;
    // first draw
    ctx.strokeStyle = '#2c2c2c';
    ctx.lineWidth = 2.5;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // draw event
    canvas.addEventListener('mousedown', initDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDraw);
    canvas.addEventListener('mouseout', finishDraw);
  }, []);

  // 유틸 함수 - 이벤트 발생 좌표 리턴
  function getPosition(event) {
    return {
      X: event.offsetX,
      Y: event.offsetY,
    };
  }

  //이벤트
  function initDraw(event) {
    ctx.beginPath();
    pos = { drawable: true, ...getPosition(event) };
    ctx.moveTo(pos.X, pos.Y);
  }
  // Draw 이벤트
  function draw(event) {
    if (pos.drawable) {
      pos = { ...pos, ...getPosition(event) };
      ctx.lineTo(pos.X, pos.Y);
      ctx.stroke();
    }
  }

  // finish 이벤트
  function finishDraw() {
    pos = { drawable: false, X: -1, Y: -1 };
  }

  // color 변경 함수
  function handleColorClick(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
  }
  // lineWidth 변경 함수
  const handleRangeChange = (event) => {
    const size = event.target.value;
    ctx.lineWidth = size;
  };

  //화면 Clear
  function fillWhiteHandler(event) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const SaveImgHandler = (event) => {
    //base64문자열로 받은 이미지
    const image = canvas.toDataURL();

    console.log(image);
    SaveDrawingHandler(image);
    // const link = useRef();
    // link.href = image;
    // link.download = 'Geut_da';
    // console.log(link);
  };
  return (
    <DrawingModalBackdrop>
      <div className='drawing_modal'>
        <h3>DrawingModal</h3>
        <button className='close_btn' onClick={DrawingHandler}>
          &times;
        </button>
        {/* Cavas 구현 */}
        <CanvasWrap>
          <canvas ref={canvasRef} {...ctx} />
        </CanvasWrap>
        <div className='controls'>
          <div className='controls_range'>
            <input
              type='range'
              min='0.1'
              max='5'
              defaultValue={'2.5'}
              step='0.1'
              onChange={handleRangeChange}
            />
          </div>
          <div className='controls_btns'>
            <button onClick={fillWhiteHandler}>Clear</button>
            <button>Fill</button>
            <button onClick={SaveImgHandler}>Save</button>
          </div>
        </div>
        {/* 컬러 팔레트 */}
        <ul>
          <li
            style={{ backgroundColor: '#ffffff', border: '1px solid #ccc' }}
            onClick={handleColorClick}
          ></li>
          <li
            style={{ backgroundColor: '#2c2c2c' }}
            onClick={handleColorClick}
          ></li>
          <li
            style={{ backgroundColor: '#a52a2a' }}
            onClick={handleColorClick}
          ></li>
          <li
            style={{ backgroundColor: '#d2691e' }}
            onClick={handleColorClick}
          ></li>
          <li
            style={{ backgroundColor: '#ffbb00' }}
            onClick={handleColorClick}
          ></li>
          <li
            style={{ backgroundColor: '#8fbc8f' }}
            onClick={handleColorClick}
          ></li>
          <li
            style={{ backgroundColor: '#4682b4' }}
            onClick={handleColorClick}
          ></li>
          <li
            style={{ backgroundColor: '#c37fcc' }}
            onClick={handleColorClick}
          ></li>
        </ul>
      </div>
    </DrawingModalBackdrop>
  );
};

export default DrawingModal;
