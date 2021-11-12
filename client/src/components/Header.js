import { useState } from 'react';
import styled from 'styled-components';
import Nav from './Nav';

const HeaderWrap = styled.header`
  height: 10vh;
  background-color: lavenderblush;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  background-color: tomato;
  flex: 1;
`;

const NavWrap = styled.div`
  text-align: center;
  background-color: darkorange;
  position: relative;
  flex: 1;

  // menu 버튼 클릭 전 ui
  input[id='menuicon'] {
    display: none;
  }
  input[id='menuicon'] + label {
    display: block;
    width: 2.5rem;
    height: 1.5rem;
    margin: auto;
    position: relative;
    cursor: pointer;
  }
  input[id='menuicon'] + label span {
    display: block;
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 2px;
    border-radius: 30px;
    background-color: brown;
    transition: all 0.5s;
  }
  input[id='menuicon'] + label span:nth-child(1) {
    width: 60%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  input[id='menuicon'] + label span:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
  }
  input[id='menuicon'] + label span:nth-child(3) {
    width: 60%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
  input[id='menuicon'] + label p {
    position: absolute;
    color: brown;
  }
  input[id='menuicon'] + label div.backdrop {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: -100vh;
    left: 0;
    transition: all 0.5s;
    z-index: 2;
    opacity: 0;
  }
  input[id='menuicon'] + label + nav {
    position: absolute;
    top: -70vh;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.5s;
    z-index: 3;
  }
  // menu 버튼 클릭 애니메이션 & nav 띄우기
  input[id='menuicon']:checked + label span:nth-child(1) {
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  input[id='menuicon']:checked + label span:nth-child(2) {
    opacity: 0;
  }
  input[id='menuicon']:checked + label span:nth-child(3) {
    background-color: #fff;
    opacity: 1;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 50%) rotate(-45deg);
  }
  input[id='menuicon']:checked + label p {
    opacity: 0;
  }
  input[id='menuicon']:checked + label div.backdrop {
    top: 0;
    opacity: 1;
  }
  input[id='menuicon']:checked + label + nav {
    top: -1rem;
  }
`;

const InfoWrap = styled.div`
  text-align: right;
  background-color: lightcyan;
  flex: 1;
`;

const Header = ({ LoginModalHandler, SignupModalHandler }) => {
  //로그인 상태라면 닉네임이 나와야하고
  //비 로그인 상태라면 Login, Signup이 나와야함.
  const [isLogin, setIsLogin] = useState(true);

  return (
    <HeaderWrap>
      <Logo>긋다</Logo>
      <NavWrap>
        <input type='checkbox' id='menuicon' />
        <label htmlFor='menuicon'>
          <span></span>
          <span></span>
          <span></span>
          <p>menu</p>
          <div className='backdrop'></div>
        </label>
        <Nav />
        {/* <label for='menuicon'>
        </label> */}
      </NavWrap>
      <InfoWrap>
        {isLogin ? (
          <div>Nickname</div>
        ) : (
          <div>
            <button onClick={LoginModalHandler}>Login</button>
            <button onClick={SignupModalHandler}>Signup</button>
          </div>
        )}
      </InfoWrap>
    </HeaderWrap>
  );
};

export default Header;
