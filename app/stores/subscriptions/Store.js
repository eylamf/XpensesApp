// @flow

import * as remx from 'remx';
import Subscription from '../../class-models/Subscription';

type SubscriptionsMap = {[key: string]: Subscription};

const initialState = {
  loading: true,
  ids: [],
  subscriptions: {},
  totalCost: 0,
};

const state = remx.state(initialState);

const getters = remx.getters({
  isLoading(): boolean {
    return state.loading;
  },

  getIDs(): string[] {
    return state.ids;
  },

  getSubscriptionByID(sid: string): Subscription {
    return state.subscriptions[sid];
  },

  getTotalCost(): number {
    return state.totalCost;
  },

  exists(sid: string): boolean {
    return state.subscriptions[sid] !== undefined;
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
    state.totalCost = Object.values(subscriptions).reduce(
      (a, b) => a + b.cost,
      0,
    );
  },

  addSubscription(subscription: Subscription) {
    state.subscriptions[subscription.id] = subscription;
    state.ids.push(subscription.id);
    state.totalCost += subscription.cost;
  },

  removeSubscription(sid: string) {
    state.totalCost -= state.subscriptions[sid].cost;
    state.ids = state.ids.filter(id => id !== sid);

    delete state.subscriptions[sid];
  },
});

export const SubscriptionsStore = {
  ...getters,
  ...setters,
};
