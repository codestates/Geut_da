import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginModal from '../components/Modal/LoginModal';
import SignupModal from '../components/Modal/SignupModal';
import styled from 'styled-components';

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
  section {
    height: 90vh;
    padding: 2rem;
    position: relative;
  }
  section h1 {
    margin: 0;
    padding: 0;
    font-size: 10em;
    font-family: serif;
    line-height: 1;
    text-align: center;
    color: #333;
  }
  section p {
    line-height: 1.4em;
    position: absolute;
    left: 2rem;
    bottom: 2rem;
  }
  section.section1 {
  }
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
      <Header
        LoginModalHandler={LoginModalHandler}
        SignupModalHandler={SignupModalHandler}
      />
      {/* 로그인, 회원가입 모달 */}
      {clickLogin ? (
        <ModalBackDrop onClick={LoginModalHandler}>
          <LoginModal
            LoginModalHandler={LoginModalHandler}
            SignupModalHandler={SignupModalHandler}
          />
        </ModalBackDrop>
      ) : null}
      {clickSignup ? (
        <ModalBackDrop onClick={SignupModalHandler}>
          <SignupModal
            SignupModalHandler={SignupModalHandler}
            LoginModalHandler={LoginModalHandler}
          />
        </ModalBackDrop>
      ) : null}
      <section className='section1'>
        <h1>GEUT_DA</h1>
        <p>
          나의 일상을 그려내는 그림일기 어플리케이션 <b>긋다</b>
          <br />
          어린 시절에 쓰던 그림 일기장 떠올리며, 나 자신에게 조금이나마
          <br />
          집중하는 시간을 갖길 바라는 마음에서 서비스를 기획하게 되었습니다.
          <br />
          그림을 그려보고 싶은데 막막할 때, 나의 일상을 하나씩 그려보며 그림
          연습도 하고,
          <br />
          직접 그린 그림과 일기로 무심하게 지나칠 뻔한 일상들을 좀 더 특별하게
          기록할 수 있습니다.
          <br />
          사진보다는 내 머릿속의 기억을 표현한 그림과 그 날의 감정을 글로 새긴
          그림일기.
          <br />
          오롯이 나에게 집중하기 위한 앱으로, 개인기록에 초점을 맞추고
          <br />
          필요한 기능만 담백하게 담아 지속적으로 사용가능하도록 구현했습니다.
          <br />
          나의 소중한 일상을 기억해내는 또 다른 방법, "긋다".
          <br />
          나만의 갤러리를 매일매일 채워나가보세요!
        </p>
        <a href='#bottom' className='bottom_btn'>
          &darr;
        </a>
      </section>
      <section className='section2'></section>
      <section className='section3'>
        <button onClick={LoginModalHandler}>START</button>
      </section>
      <Footer />
    </LandingWrap>
  );
};

export default Landing;
