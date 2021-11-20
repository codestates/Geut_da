import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components/macro';

export const StyledSocialIcons = styled.div`
  li {
    list-style: none;
  }

  a {
    border: 2px solid #cd5c5c;
    border-radius: 50%;
    color: #cd5c5c;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 10px;
    height: 2.2rem;
    width: 2.2rem;
    text-decoration: none;
    &:hover {
      color: #daa520;
      border-color: #daa520;
    }
  }
`;

const SocialIcons = () => {
  return (
    <StyledSocialIcons>
      <li>
        <a href='https://facebook.com/'>
          <FaFacebook />
        </a>
        <a href='https://twitter.com/'>
          <FaTwitter />
        </a>
        <a href='https://instagram.com/'>
          <FaInstagram />
        </a>
      </li>
    </StyledSocialIcons>
  );
};

export default SocialIcons;
