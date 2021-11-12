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
  flex: 1;
`;

const InfoWrap = styled.div`
  text-align: right;
  background-color: lightcyan;
  flex: 1;
`;

const Header = ({LoginModalHandler, SignupModalHandler }) => {
  //로그인 상태라면 닉네임이 나와야하고
  //비 로그인 상태라면 Login, Signup이 나와야함.
  const [isLogin, setIsLogin] = useState(true);
  const [showNav, setShowNav] = useState(false);

  return (
    <HeaderWrap>
      <Logo>긋다</Logo>
      <NavWrap>
      { showNav ? <Nav /> : <div>menu</div> }
      </NavWrap>
      <InfoWrap>
      { isLogin
      ? <div>Nickname</div>
      : <div>
          <button onClick={LoginModalHandler}>Login</button>
          <button onClick={SignupModalHandler}>Signup</button>
        </div> }
      </InfoWrap>
    </HeaderWrap>
  )
}

export default Header;