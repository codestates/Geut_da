import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IsLoginState from '../states/IsLoginState';
import { useRecoilValue } from 'recoil';

//! userInfo 더미데이터
const userInfo = {
  _id: 1,
  name: 'User',
  email: 'test@test.com',
  image: 'image',
};

const NavModal = styled.nav`
  width: 60vh;
  height: 60vh;
  padding: 8vh 10vh;
  color: #fff;
  background-color: #5a5c63;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  div.img {
    width: 10vh;
    height: 10vh;
    /* margin-bottom: 0.6rem; */
    border-radius: 50%;
    background-color: #eee;
  }
  div.nickname {
    padding: 0.6rem 0 0.2rem;
  }
  div.email {
    width: 100%;
    padding-bottom: 0.4rem;
    font-size: 0.9em;
    color: #ccc;
    border-bottom: 1px solid #fff;
  }
  ul {
    width: 100%;
    margin-top: 0.5rem;
  }
  a {
    width: 100%;
    color: #fff;
    line-height: 2rem;
    display: inline-block;
  }
  a:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  a.logout {
    margin-top: 7rem;
    color: tomato;
  }
  a.logout:hover {
    color: #fff;
    background-color: rgba(178, 34, 34, 0.5);
  }
`;

const Nav = () => {
  const IsLogin = useRecoilValue(IsLoginState);

  return (
    <>
      {/* {IsLogin ? ( */}
      <NavModal>
        <div className='img'></div>
        <div className='nickname'>{userInfo.name}</div>
        <div className='email'>{userInfo.email}</div>
        <ul>
          <li>
            <Link to='/main'>Main</Link>
          </li>
          <li>
            <Link to='/mypage'>Mypage</Link>
          </li>
          <li>
            <Link to='/' className='logout'>
              Logout
            </Link>
          </li>
        </ul>
      </NavModal>
      {/* ) : (
        <NavModal>
          <ul>
            <li>
              <Link to='/'>Landing</Link>
            </li>
          </ul>
        </NavModal>
      )} */}
    </>
  );
};

export default Nav;
