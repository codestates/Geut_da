import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginModal from '../components/Modal/LoginModal';
import SignupModal from '../components/Modal/SignupModal';
import styled from 'styled-components/macro';

const ModalBackDrop = styled.div`
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
`;

const LandingWrap = styled.div`
  a.bottom_btn {
    width: 2rem;
    height: 2rem;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    background-color: #333;
    border-radius: 50%;
    position: absolute;
    right: 2rem;
    bottom: 2rem;
  }
  section.section1 {
    height: 90vh;
    padding: 2rem;
    position: relative;
    overflow: wrap;
    text-overflow: whitespace-break;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      margin: 0;
      padding: 0;
      font-size: 10em;
      font-family: serif;
      line-height: 1;
      text-align: center;
      color: #333;
    }
    div {
      font-size: 2em;
      margin-top: 3rem;
      text-align: center;
    }
    b {
      padding-bottom: 0.2rem;
      border-bottom: 2px solid var(--color-black);
    }
  }
  section.section2 {
    > div:nth-child(1) {
      display: flex;
      padding: 2rem 3.5rem;
      justify-content: space-between;
      p {
        font-size: 1.3em;
        line-height: 1.4;
      }
      p:nth-child(2) {
        text-align: right;
      }
    }
    > div:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }
    div.box {
      width: 50%;
      padding: 3rem;
      display: flex;
      align-items: flex-end;
      img {
        flex: 1;
      }
      h2 {
        margin: 0;
        padding: 0 0 0 0.5rem;
        font-size: 10em;
        font-family: 'Racing Sans One', cursive;
        line-height: 1;
      }
    }
    div.box:nth-child(2),
    div.box:nth-child(4) {
      margin-top: 40vh;
      h2 {
        padding: 0 0.5rem 0 0;
      }
    }
  }
  section.section3 {
    height: 85vh;
    position: relative;
    span {
      height: auto;
      padding-bottom: 0.2rem;
      font-size: 4em;
      border-bottom: 2px solid var(--color-black);
      position: absolute;
      bottom: 32vh;
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.5s;
      cursor: pointer;
    }
    span:hover {
      color: var(--color-beige);
      border-bottom: 2px solid var(--color-beige);
    }
  }
`;

const Landing = () => {
  const [clickLogin, setClickLogin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);

  const LoginModalHandler = () => {
    setClickLogin(!clickLogin);
  };

  const SignupModalHandler = () => {
    setClickSignup(!clickSignup);
  };

  return (
    <LandingWrap>
      <Header LoginModalHandler={LoginModalHandler} SignupModalHandler={SignupModalHandler} />
      {/* 로그인, 회원가입 모달 */}
      {clickLogin ? (
        <ModalBackDrop onClick={LoginModalHandler}>
          <LoginModal LoginModalHandler={LoginModalHandler} SignupModalHandler={SignupModalHandler} />
        </ModalBackDrop>
      ) : null}
      {clickSignup ? (
        <ModalBackDrop onClick={SignupModalHandler}>
          <SignupModal SignupModalHandler={SignupModalHandler} LoginModalHandler={LoginModalHandler} />
        </ModalBackDrop>
      ) : null}
      <section className='section1'>
        <h1>GEUT_DA</h1>
        <div>
          나의 일상을 그려내는 그림일기 어플리케이션 <b>긋다</b>
        </div>
        <a href='#bottom' className='bottom_btn'>
          &darr;
        </a>
      </section>
      <section className='section2'>
        <div>
          <p>
            나 자신에게 마음을 열어주세요.
            <br />
            그림을 그리며 나의 하루에 말을 걸어보세요.
            <br />
            오늘은 너무 평범한 날인 동시에 미래를 잇는 가장 소중한 시간이니까요.
          </p>
          <p>
            소중한 일상을 기억해내는 또 다른 방법, "긋다".
            <br />
            내 생각과 감정들이 오롯이 새겨진 일기장이 될 거에요.
            <br />
            이제 나만의 갤러리를 채워나가보세요!
          </p>
        </div>
        <div>
          <div className='box'>
            <img src='/images/exampleDiary/1.png' alt='유저 다이어리 1' />
            <h2>1</h2>
          </div>
          <div className='box'>
            <h2>2</h2>
            <img src='/images/exampleDiary/2.png' alt='유저 다이어리 2' />
          </div>
          <div className='box'>
            <img src='/images/exampleDiary/3.png' alt='유저 다이어리 3' />
            <h2>3</h2>
          </div>
          <div className='box'>
            <h2>4</h2>
            <img src='/images/exampleDiary/4.png' alt='유저 다이어리 4' />
          </div>
        </div>
      </section>
      <section className='section3'>
        <span onClick={LoginModalHandler}>시작하기</span>
      </section>
      <Footer />
    </LandingWrap>
  );
};

export default Landing;
