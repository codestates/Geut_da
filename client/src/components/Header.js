import Nav from './Nav';

const Header = ({LoginModalHandler, SignupModalHandler }) => {

  //로그인 상태라면 닉네임이 나와야하고
  //비 로그인 상태라면 Login, Signup이 나와야함.

  return (
    <header>
      <div>Header</div>
      <h1>Logo</h1>
      <Nav />
      <button onClick={LoginModalHandler}>Login</button>
      <button onClick={SignupModalHandler}>Signup</button>
      <div>Nickname</div>
    </header>
  )
}

export default Header;