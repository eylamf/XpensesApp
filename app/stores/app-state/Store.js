// @flow

import * as remx from 'remx';
import type {CostTypeFilter, CostIntervalFilter} from '../../utils/Types';

type InitialState = {
  loading: boolean,
  isNewUser: boolean,
  bottomSheetEnabled: boolean,
  costTypeFilter: CostTypeFilter,
  costIntervalFilter: CostIntervalFilter,
};

const initialState: InitialState = {
  loading: true,
  isNewUser: true,
  bottomSheetEnabled: false,
  costTypeFilter: 'Exact',
  costIntervalFilter: 'This Month',
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

  getCostTypeFilter(): CostTypeFilter {
    return state.costTypeFilter;
  },

  getCostIntervalFilter(): CostIntervalFilter {
    return state.costIntervalFilter;
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

  setCostTypeFilter(type: CostTypeFilter) {
    state.costTypeFilter = type;
  },

  setCostIntervalFilter(interval: CostIntervalFilter) {
    state.costIntervalFilter = interval;
  },

  setCostFilters(type: CostTypeFilter, interval: CostIntervalFilter) {
    state.costTypeFilter = type;
    state.costIntervalFilter = interval;
  },
});

export const AppStateStore = {
  ...setters,
  ...getters,
};
