import styled from 'styled-components';

const LeaveModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 30%;
  height: 30vh;
  background-color: #ffffff;
  padding: 5em auto;
  border-radius: 10px;
  text-align: center;

  .closeButton {
    position: absolute;
    top: 1%;
    right: 1%;
    border: none;
    color: #646464;
    background-color: #ffffff;
    font-weight: 700;
    font-size: 1.5em;
  }
  .closeButton:hover {
    cursor: pointer;
  }
`;

const LeaveTextWrap = styled.div``;

const LeaveButtonWrap = styled.div`
  display: flex;
  margin-top: 1.5em;

  button {
    width: 6em;
    height: 2.5em;
    border: none;
    border-radius: 10px;
    background-color: #9e9e9e;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.1em;
  }

  button:focus,
  button:hover {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
  }

  button:nth-child(1) {
    margin-right: 1.5em;
  }
`;

const LeaveModal = ({ isUserResignHandler, isRealUserResignHandler }) => {
  return (
    <LeaveModalWrap onClick={(e) => e.stopPropagation()}>
      <LeaveTextWrap>
        <button onClick={isUserResignHandler} className={'closeButton'}>
          &times;
        </button>
        <div>
          탈퇴시 모든 게시물이 삭제됩니다.
          <br />
          <strong>정말 탈퇴하시겠습니까?</strong>
        </div>
      </LeaveTextWrap>
      <LeaveButtonWrap>
        <button onClick={isRealUserResignHandler}>YES</button>
        <button onClick={isUserResignHandler}>NO</button>
      </LeaveButtonWrap>
    </LeaveModalWrap>
  );
};

export default LeaveModal;
