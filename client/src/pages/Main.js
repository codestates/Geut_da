import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Diary from '../components/Diary';
import HashTages from '../components/HashTages';
// import DiaryView from './DiaryView';

const Main = () => {

  // recoil로 로그인 상태 관리 필수

  return (
    <>
      <Header />
      <div>Main</div>
      {/* 해쉬태그 리스트
          - 해쉬태그별 필터링 구현하기
          - 해쉬태그 선택시 해당 해쉬태그로 타이틀 변경
       */}
      <HashTages />
      {/* dialog 라이브러리 연결하기, 월별 필터링 구현하기 */}
      <div>2021년 11월</div>
      <Link to="/main/diaryview">Add</Link>
      <ul>
        <li><Link to="/main/diaryview" ><Diary /></Link></li>
      </ul>
      <Footer />
    </>
  )
}

export default Main;