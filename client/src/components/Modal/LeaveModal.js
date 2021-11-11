import { Link } from 'react-router-dom';

const LeaveModal = ({ UserLeaveHandler }) => {
  return (
    <>
      <button onClick={UserLeaveHandler}>Close</button>
      <div>
        탈퇴시 모든 게시물이 삭제됩니다.<br />
        정말 탈퇴하시겠습니까?
      </div>
      <Link to="/">YES</Link>
      <button onClick={UserLeaveHandler}>NO</button>
    </>
  )
}

export default LeaveModal;