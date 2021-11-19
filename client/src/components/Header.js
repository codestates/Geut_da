import styled from 'styled-components/macro';
import IsLoginState from '../states/IsLoginState';
import { useRecoilValue } from 'recoil';
import Nav from './Nav';
import { MAIN, MYPAGE } from '../constants/routes';

const HeaderWrap = styled.header`
  padding: 1.2rem;
  background-color: var(--color-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  height: 100%;
  flex: 1;

  > img {
    height: 100%;
    cursor: pointer;
  }
`;

const NavWrap = styled.div`
  text-align: center;
  position: relative;
  flex: 1;

  //! menu 버튼 클릭 전 ui
  input[id='menuicon'] {
    display: none;
  }
  input[id='menuicon'] + label {
    display: block;
    width: 8rem;
    height: 1.5rem;
    margin: auto;
    position: relative;
    cursor: pointer;
  }
  input[id='menuicon'] + label span {
    height: 2px;
    background-color: brown;
    border-radius: 30px;
    display: block;
    position: absolute;
    z-index: 10;
    transition: all 0.5s;
  }
  input[id='menuicon'] + label span:nth-child(1) {
    width: 2rem;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  input[id='menuicon'] + label span:nth-child(2) {
    width: 2.5rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  input[id='menuicon'] + label span:nth-child(3) {
    width: 2rem;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  input[id='menuicon'] + label span:nth-child(4) {
    width: 8rem;
    height: 2.5rem;
    background-color: transparent;
    top: 1rem;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  input[id='menuicon'] + label p {
    margin: 0;
    padding: 0;
    color: brown;
    position: absolute;
    left: 50%;
    bottom: -1.3rem;
    transform: translate(-50%, -50%);
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
  //! menu 버튼 클릭 애니메이션 & nav 띄우기
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
  height: 100%;
  font-weight: bold;
  text-align: right;
  color: #333;
  flex: 1;

  > div {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .cursorPointer {
    cursor: pointer;
  }
  .btn {
    height: 100%;
    width: 3.6rem;
    margin-left: 1rem;
    font-family: serif;
    font-size: 1em;
    border: 1px solid #888;
    background: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 30;
    transition: 0.5s;
    cursor: pointer;
  }
  .btn::before,
  .btn::after {
    position: absolute;
    background: #f0eee7;
    z-index: 20;
    transition: 0.5s;
    content: '';
  }
  .btn::before {
    height: 110%;
    width: 3rem;
  }
  .btn::after {
    width: 3.6rem;
    height: 80%;
  }
  .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .btn:hover::before {
    width: 0px;
    background: rgba(255, 255, 255, 0.6);
  }
  .btn:hover::after {
    height: 0px;
    background: rgba(255, 255, 255, 0.6);
  }
  .btn:hover {
    background: rgba(255, 255, 255, 0.6);
  }
  .btn span {
    position: absolute;
    z-index: 50;
  }
`;

const Header = ({ LoginModalHandler, SignupModalHandler }) => {
  //로그인 상태라면 닉네임이 나와야하고
  //비 로그인 상태라면 Login, Signup이 나와야함.
  const IsLogin = useRecoilValue(IsLoginState);

  return (
    <HeaderWrap name='top'>
      <Logo>
        <img src='/images/geutda_logo.svg' alt='Logo' onClick={() => window.location.replace(MAIN)} />
      </Logo>
      <NavWrap>
        <input type='checkbox' id='menuicon' />
        <label htmlFor='menuicon'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <p>menu</p>
          <div className='backdrop'></div>
        </label>
        <Nav userInfo={JSON.parse(localStorage.getItem('userInfo'))} />
      </NavWrap>
      <InfoWrap>
        {IsLogin ? (
          <div>
            <span onClick={() => window.location.replace(MYPAGE)} className='cursorPointer'>
              {JSON.parse(localStorage.getItem('userInfo')).nickname}
            </span>
          </div>
        ) : (
          <div>
            <div className='btn' onClick={LoginModalHandler}>
              <span className='noselect'>Login</span>
            </div>
            <div className='btn' onClick={SignupModalHandler}>
              <span className='noselect'>Signup</span>
            </div>
          </div>
        )}
      </InfoWrap>
    </HeaderWrap>
  );
};

export default Header;
