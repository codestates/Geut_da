import styled from 'styled-components';

const TagWrap = styled.div`
  padding-left: 1rem;
  text-overflow: ellipsis;
`;

const HashTages = ({ tages }) => {
  return (
    <TagWrap>
      <ul>
        {tages.map((tag) => {
          return <li>#{tag}</li>;
        })}
      </ul>
    </TagWrap>
  );
};

export default HashTages;
