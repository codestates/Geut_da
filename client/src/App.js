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
        <Route exact path='/' element={isLogin ? <Main /> : <Landing />} />
        <Route path='/main' element={isLogin ? <Main /> : <Landing />} />
        <Route
          path='/main/diaryview'
          element={isLogin ? <DiaryView /> : <Landing />}
        />
        <Route
          path='/main/newdiary'
          element={isLogin ? <NewDiary /> : <Landing />}
        />
        <Route path='/mypage' element={isLogin ? <Mypage /> : <Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
