import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const IsLoginState = atom({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default IsLoginState;
