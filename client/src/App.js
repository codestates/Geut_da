import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IsLoginState from './states/IsLoginState';
import { useRecoilState } from 'recoil';
import Landing from './pages/Landing';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import DiaryView from './pages/DiaryView';
import NewDiary from './pages/NewDiary';

const App = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsLoginState);
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/main' element={<Main />} />
        <Route path='/main/diaryview' element={<DiaryView />} />
        <Route path='/main/newdiary' element={<NewDiary />} />
        <Route path='/mypage' element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
