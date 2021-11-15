import styled from 'styled-components';

const LeaveModalWrap = styled.div`
  display: flex;
  width: 50%;
  height: 50vh;
  margin: 15em auto;
  border: 1px solid black;
  flex-direction: column;
`;

const LeaveModal = ({ isUserResignHandler, isRealUserResignHandler }) => {
  return (
    <LeaveModalWrap onClick={(e) => e.stopPropagation()}>
      <button onClick={isUserResignHandler}>Close</button>
      <div>
        탈퇴시 모든 게시물이 삭제됩니다.
        <br />
        정말 탈퇴하시겠습니까?
      </div>
      <button onClick={isRealUserResignHandler}>YES</button>
      <button onClick={isUserResignHandler}>NO</button>
    </LeaveModalWrap>
  );
};

export default LeaveModal;
