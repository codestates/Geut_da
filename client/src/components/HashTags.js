import styled from 'styled-components';

const TagWrap = styled.div`
  padding-left: 1rem;
  text-overflow: ellipsis;
`;

const HashTags = ({ tags }) => {
  return (
    <TagWrap>
      <ul>
        {tags.map((tag, index) => {
          return <li key={index}>#{tag}</li>;
        })}
      </ul>
    </TagWrap>
  );
};

export default HashTags;