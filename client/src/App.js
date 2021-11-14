import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as ROUTES from './constants/routes';
import { PrivateRoute } from './helpers/protect';
import { DiaryView, Landing, Main, Mypage, NewDiary } from './pages';
import IsLoginState from './states/IsLoginState';

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
    <Router>
      <Routes>
        <Route path={ROUTES.MAIN} element={<PrivateRoute />}>
          <Route path={ROUTES.MAIN} element={<Main />} />
        </Route>
        <Route path={ROUTES.DIARYVIEW} element={<PrivateRoute />}>
          <Route path={ROUTES.DIARYVIEW} element={<DiaryView />} />
        </Route>
        <Route path={ROUTES.NEWDIARY} element={<PrivateRoute />}>
          <Route path={ROUTES.NEWDIARY} element={<NewDiary />} />
        </Route>
        <Route path={ROUTES.MYPAGE} element={<PrivateRoute />}>
          <Route path={ROUTES.MYPAGE} element={<Mypage />} />
        </Route>
        <Route path={ROUTES.LANDING} element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
