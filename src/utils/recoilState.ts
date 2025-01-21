import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const setToken = atom({
  key: 'setToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const getToken = selector({
  key: 'getToken',
  get: ({ get }) => {
    const token: string = get(setToken);
    return token;
  },
});

export const setUser = atom({
  key: 'setUser',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const getUser = selector({
  key: 'getUser',
  get: ({ get }) => {
    const token: any = get(setUser);
    return token;
  },
});
