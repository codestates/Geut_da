import { atom } from 'recoil';

const IsLoginState = atom({
  key: 'LoginState',
  default: false,
});

export default IsLoginState;
