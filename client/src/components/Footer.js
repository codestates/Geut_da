import styled from 'styled-components';
// import SocialIcons from './SocialIcons';

const FooterWrap = styled.footer`
  padding: 1rem 2rem;
  background-color: #f0eee7;
  display: flex;
  z-index: 998;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  > div:nth-child(2) {
    text-align: center;
  }
  > div:nth-child(3) {
    text-align: right;
    align-items: flex-end;
  }

  h3 {
    margin-bottom: 1rem;
    font-family: serif;
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 0.85em;
    line-height: 1.3;
  }
  a.top_btn {
    width: 2rem;
    height: 2rem;
    margin-bottom: 0.5rem;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    background-color: #333;
    border-radius: 50%;
  }
`;

export const Attribution = styled.p`
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
      {/* <SocialIcons /> */}
      <div>
        <h3>DEVELOPER</h3>
        <ul>
          <li>JUNGHUN</li>
          <li>GARAM</li>
          <li>JINHYUN</li>
          <li>SOHUN</li>
        </ul>
      </div>
      <div>
        <h3>SOCIAL</h3>
        <ul>
          <li>GITHUB</li>
          <li>FACEBOOK</li>
          <li>INSTAGRAM</li>
          <li>TWITTER</li>
        </ul>
      </div>
      <div>
        <h3>TOP</h3>
        <a href='#top' name='bottom' className='top_btn'>
          &uarr;
        </a>
        <p> &copy; Copyright 2021 Geut_da. All rights reserved.</p>
        <Attribution>
          Project by <a href='https://codestates.com/'>Code States</a>, Coded by{' '}
          <a href='https://github.com/codestates/Geut_da'>Minimanimo</a>.
        </Attribution>
      </div>
    </FooterWrap>
  );
};

export default Footer;
