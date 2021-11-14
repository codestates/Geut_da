const LeaveModal = ({ isUserResignHandler, isRealUserResignHandler }) => {
  return (
    <>
      <button onClick={isUserResignHandler}>Close</button>
      <div>
        탈퇴시 모든 게시물이 삭제됩니다.
        <br />
        정말 탈퇴하시겠습니까?
      </div>
      <button onClick={isRealUserResignHandler}>YES</button>
      <button onClick={isUserResignHandler}>NO</button>
    </>
  );
};

export default LeaveModal;
