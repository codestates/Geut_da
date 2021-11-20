import styled from 'styled-components';

const YesNoModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 30vw;
  padding: 3rem;
  background-color: #ffffff;
  border-radius: 1rem;
  text-align: center;

  .closeButton {
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    color: #646464;
    background: none;
    font-weight: 700;
    font-size: 1.5em;
  }
  .closeButton:hover {
    cursor: pointer;
  }
`;

const YesNoTextWrap = styled.div`
  margin-bottom: 0.1rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  margin-top: 2rem;
  width: 100%;
  .nobutton:hover {
    background-color: #f00;
  }

  button {
    width: 50%;
    height: 2.5rem;
    border: none;
    border-radius: 10px;
    background-color: #9e9e9e;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.1em;
    transition: all 0.5s;
  }

  button:focus,
  button:hover {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
    background-color: #000;
  }

  button:nth-child(1) {
    margin-right: 1.5em;
  }
`;

const YesNoModal = ({ NO, YES, MESSAGE, MESSAGE2 }) => {
  return (
    <YesNoModalWrap onClick={(e) => e.stopPropagation()}>
      <button onClick={NO} className={'closeButton'}>
        &times;
      </button>
      <YesNoTextWrap>
        <div>
          {MESSAGE}
          <br />
          <strong>{MESSAGE2}</strong>
        </div>
      </YesNoTextWrap>
      <ButtonWrap>
        <button onClick={YES}>YES</button>
        <button onClick={NO} className='nobutton'>
          NO
        </button>
      </ButtonWrap>
    </YesNoModalWrap>
  );
};

export default YesNoModal;
