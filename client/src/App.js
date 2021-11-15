import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { PrivateRoute } from './helpers/protect';
import { DiaryView, Landing, Main, Mypage, NewDiary } from './pages';

const App = () => {
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
