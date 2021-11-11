import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import DiaryView from './pages/DiaryView';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/diaryview" element={<DiaryView />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
