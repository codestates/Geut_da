import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCheckModal from '../components/Modal/UserCheckModal';
import UserEditModal from '../components/Modal/UserEditModal';
import LeaveModal from '../components/Modal/LeaveModal';
import ProfileUpload from '../components/ProfileUpload';

const Mypage = () => {

  // const [profileImgChange, setProfileImgChange] = useState(false);
  const [userLeave, setUserLeave] = useState(false);
  const [editPasswordCheck , setEditPasswordCheck] = useState(false)
  const [userEditable, setUserEditable] = useState(false);

  // const ProfileChangeHandler = () => {
  //   setProfileImgChange(!profileImgChange)
  // }

  const UserLeaveHandler = () => {
    setUserLeave(!userLeave)
  }

  const EditPasswordCheckHandler = () => {
    //아래 함수 실행시 모달 on /off
    setEditPasswordCheck(!editPasswordCheck)
    UserEditableHandler();
  }

  const UserEditableHandler = () => {
    setUserEditable(!userEditable);
  }
  
  return (
    <>
      <Header />
      <div>Img</div>
      {/* <button onClick={ProfileChangeHandler}>이미지 수정 버튼</button> */}
      <div>Nickname</div>
      <div>Email</div>
      <button onClick={UserLeaveHandler}>회원탈퇴</button>
      <button onClick={EditPasswordCheckHandler}>정보수정</button>

      <div>유저 그림일기 개수</div>
      {/* 이미지 수정 버튼 클릭시 모달창 띄우기*/}
      <ProfileUpload/>
      {userLeave ? <LeaveModal UserLeaveHandler={UserLeaveHandler}/> : null}
      {editPasswordCheck ? <UserCheckModal /> : null}
      {userEditable ? <UserEditModal /> : null}
      <Footer />
    </>
  )
}

export default Mypage;