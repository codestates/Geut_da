import { Link } from 'react-router-dom';

const Nav = () => {

  return (
    <>
      <div>Nav</div>
      <Link to="/main">Main</Link>
      <Link to="/Mypage">Mypage</Link>
      <Link to="/">Logout</Link>
    </>
  )
}

export default Nav;