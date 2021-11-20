/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { LANDING, MAIN, MYPAGE } from '../constants/routes';
import IsLoginState from '../states/IsLoginState';
import { useRecoilState } from 'recoil';

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

  div.img_box {
    width: 10vh;
    height: 10vh;
    /* margin-bottom: 0.6rem; */
    border-radius: 50%;
    background-color: #eee;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  img {
    flex: 1;
    /* object-fit: contain; */
  }
  div.nickname {
    padding: 0.6rem 0 0.2rem;
    cursor: pointer;
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
    flex: 1;
    margin-top: 0.5rem;
    position: relative;
  }
  a {
    width: 100%;
    color: #fff;
    line-height: 2rem;
    display: inline-block;
  }
  a:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
  button.logout {
    width: 100%;
    font-size: 1em;
    color: #fff;
    line-height: 2rem;
    border: none;
    background: none;
    position: absolute;
    bottom: 2vh;
    left: 50%;
    transform: translateX(-50%);
    color: tomato;
    display: inline-block;
  }
  button.logout:hover {
    color: #fff;
    background-color: rgba(178, 34, 34, 0.5);
    cursor: pointer;
  }
`;

const Nav = ({ userInfo, LoginModalHandler }) => {
  const [IsLogin, setIsLogin] = useRecoilState(IsLoginState);
  const logOutHandler = () => {
    localStorage.removeItem('userInfo');
    setIsLogin(false);
    alert('로그아웃이 완료되었습니다.');
    window.location.replace(LANDING);
  };
  return (
    <>
      {IsLogin ? (
        <NavModal>
          <div className='img_box'>
            <img src={userInfo.image} alt='profile image' />
          </div>
          <div className='nickname'>{userInfo.nickname}</div>
          <div className='email'>{userInfo.email}</div>
          <ul>
            <li>
              <a>
                <div onClick={() => window.location.replace(MAIN)}>Main</div>
              </a>
            </li>
            <li>
              <a>
                <div onClick={() => window.location.replace(MYPAGE)}>Mypage</div>
              </a>
              {/* <Link to='/mypage'>Mypage</Link> */}
            </li>
            <li>
              <button className='logout' onClick={logOutHandler}>
                Logout
              </button>
            </li>
          </ul>
        </NavModal>
      ) : (
        <NavModal>
          <div className='img_box'>
            <img src='/images/user.jpeg' alt='profile image' />
          </div>
          <div className='nickname' onClick={LoginModalHandler}>
            로그인이 필요합니다
          </div>
        </NavModal>
      )}
    </>
  );
};

export default Nav;
