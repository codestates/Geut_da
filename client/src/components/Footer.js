import styled from 'styled-components';
import SocialIcons from './SocialIcons';

const FooterWrap = styled.footer`
  height: 10vh;
  background-color: lavender;
  p {
    text-align: right;
  }
`;

export const Attribution = styled.p`
  font-size: 11px;
  a {
    color: hsl(228, 45%, 44%);
    &:hover {
      color: #daa520;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrap>
      <SocialIcons />
      <p> &copy; Copyright 2021 Geut_da. All rights reserved.</p>
      <Attribution>
        Project by <a href='https://codestates.com/'>Code States</a>, Coded by{' '}
        <a href='https://github.com/codestates/Geut_da'>Minimanimo</a>.
      </Attribution>
    </FooterWrap>
  );
};

export default Footer;
