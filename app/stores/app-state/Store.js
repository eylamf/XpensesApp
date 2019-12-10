// @flow

import * as remx from 'remx';
import type {CostTypeFilter, CostIntervalFilter} from '../../utils/Types';

type InitialState = {
  loading: boolean,
  isNewUser: boolean,
  bottomSheetEnabled: boolean,
};

const initialState: InitialState = {
  loading: true,
  isNewUser: true,
  bottomSheetEnabled: false,
};

const state = remx.state(initialState);

const getters = remx.getters({
  isLoading(): boolean {
    return state.loading;
  },

  isNewUser(): boolean {
    return state.isNewUser;
  },

  isBottomSheetEnabled(): boolean {
    return state.bottomSheetEnabled;
  },
});

const setters = remx.setters({
  setLoading(flag: boolean) {
    state.loading = flag;
  },

  setIsNewUser(flag: boolean) {
    state.isNewUser = flag;
  },

  setBottomSheetEnabled(flag: boolean) {
    state.bottomSheetEnabled = flag;
  },
});

export const AppStateStore = {
  ...setters,
  ...getters,
};
