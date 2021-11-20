import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const ClickedDiary = atom({
  key: 'DiaryState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export default ClickedDiary;
