// @flow

import * as remx from 'remx';

const initialState = {
  loading: true,
  isNewUser: true,
};

const state = remx.state(initialState);

const getters = remx.getters({
  isLoading(): boolean {
    return state.loading;
  },

  isNewUser(): boolean {
    return state.isNewUser;
  },
});

const setters = remx.setters({
  setLoading(flag: boolean) {
    state.loading = flag;
  },

  setIsNewUser(flag: boolean) {
    state.isNewUser = flag;
  },
});

export const AppStateStore = {
  ...setters,
  ...getters,
};
