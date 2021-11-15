import { useState } from 'react';
import styled from 'styled-components';

const TagWrap = styled.div`
  padding-left: 1rem;
  text-overflow: ellipsis;

  li {
    padding: 0.2rem;
    cursor: pointer;
  }
  li:hover {
    font-weight: bold;
  }
`;

const HashTags = ({ tags, searchTagHandler }) => {
  const [clickedTag, setClickedTag] = useState('');

  const clickedTagHandler = (tag) => {
    setClickedTag(tag);
  };

  return (
    <TagWrap>
      <ul>
        {tags.map((tag, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                clickedTagHandler(tag);
                searchTagHandler(tag);
              }}
            >
              #{tag}
            </li>
          );
        })}
      </ul>
    </TagWrap>
  );
};

export default HashTags;
