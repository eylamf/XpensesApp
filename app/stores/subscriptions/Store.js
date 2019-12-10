// @flow

import * as remx from 'remx';
import Subscription from '../../class-models/Subscription';
import type {CostTypeFilter, CostIntervalFilter} from '../../utils/Types';

type SubscriptionsMap = {[key: string]: Subscription};

type InitialState = {
  loading: boolean,
  ids: string[],
  subscriptions: SubscriptionsMap,
  totalCost: number,
  costTypeFilter: CostTypeFilter,
  costIntervalFilter: CostIntervalFilter,
};

const initialState: InitialState = {
  loading: true,
  ids: [],
  subscriptions: {},
  totalCost: 0,
  costTypeFilter: 'Exact',
  costIntervalFilter: 'This Month',
};

const state = remx.state(initialState);

const getters = remx.getters({
  isLoading(): boolean {
    return state.loading;
  },

  getIDs(): string[] {
    return state.ids;
  },

  getSubscriptions(): SubscriptionsMap {
    return state.subscriptions;
  },

  getSubscriptionByID(sid: string): Subscription {
    return state.subscriptions[sid];
  },

  getTotalCost(): number {
    return state.totalCost.toFixed(2);
  },

  exists(sid: string): boolean {
    return state.subscriptions[sid] !== undefined;
  },

  getSubscriptionHasReminder(subID: string): boolean {
    return state.subscriptions[subID].hasReminder;
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

  setIDs(ids: string[]) {
    state.ids = ids;
  },

  setSubscriptions(subscriptions: SubscriptionsMap) {
    state.subscriptions = subscriptions;
    state.ids = Object.keys(subscriptions);
  },

  addSubscription(subscription: Subscription) {
    state.subscriptions[subscription.id] = subscription;
    state.ids = [...state.ids, subscription.id];
  },

  removeSubscription(sid: string) {
    state.ids = state.ids.filter(id => id !== sid);

    delete state.subscriptions[sid];
  },

  updateSubscription(subscription: Subscription) {
    state.subscriptions[subscription.id] = subscription;
  },

  setTotalCost(c: number) {
    state.totalCost = c;
  },

  adjustTotalCost() {
    let finalCost = 0;

    state.ids.forEach(id => {
      const sub: Subscription = state.subscriptions[id];

      finalCost += sub.getCostForFilters(
        state.costTypeFilter,
        state.costIntervalFilter,
      );
    });

    state.totalCost = finalCost;
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

export const SubscriptionsStore = {
  ...getters,
  ...setters,
};
