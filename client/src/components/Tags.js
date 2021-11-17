import styled from 'styled-components';

export const TagsInput = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  padding: 0;
  border-radius: 6px;
  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    > .tag {
      width: auto;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 8px;
      font-size: 0.9em;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 8px 0;
      background: var(--color-black);
      > .tag-title {
        color: #fff;
      }
      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 1em;
        margin-left: 0.4rem;
        color: var(--color-red);
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
      }
    }
  }
  > input {
    flex: 1;
    border: none;
    height: 2.2rem;
    font-size: 1em;
    padding: 0 0 0 0.4rem;
    border: 1px solid #ddd;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0.2rem;
    :focus {
      outline: transparent;
    }
  }
  &:focus-within {
    border: none;
  }
`;

export const Tag = ({ tags, setTags }) => {
  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addTags = (event) => {
    const filtered = tags.filter((el) => el === event.target.value);
    if (event.target.value !== '' && filtered.length === 0) {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };

  return (
    <>
      <TagsInput>
        <ul id='tags'>
          {tags.map((tag, index) => (
            <li key={index} className='tag'>
              <span className='tag-title'>{tag}</span>
              <span
                className='tag-close-icon'
                onClick={() => removeTags(index)}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
        <input
          className='tag-input'
          type='text'
          onKeyUp={(event) =>
            event.key === 'Enter' || event.key === ' ' ? addTags(event) : null
          }
          placeholder='Press enter to add and space tags'
        />
      </TagsInput>
    </>
  );
};
