import { useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/Modal/LoginModal';
import SignupModal from '../components/Modal/SignupModal';


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
    <>
      <Header LoginModalHandler={LoginModalHandler} SignupModalHandler={SignupModalHandler} />
      <div>Landing Page</div>
      <button onClick={LoginModalHandler}>시작하기</button>
      {clickLogin ? <LoginModal LoginModalHandler={LoginModalHandler} SignupModalHandler={SignupModalHandler} /> : null}
      {clickSignup ? <SignupModal /> : null}
    </>
  );
};

export default Landing;