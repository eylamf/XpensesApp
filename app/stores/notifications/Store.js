// @flow

import * as remx from 'remx';
import Notification from '../../class-models/Notification';

type NotificationsMap = {[key: string]: Notification};

type InitialState = {
  ids: string[],
  notifications: NotificationsMap,
};

const initialState: InitialState = {
  ids: [],
  notifications: {},
};

const state = remx.state(initialState);

const getters = remx.getters({
  getIDs(): string[] {
    return state.ids;
  },

  getNotifications(): NotificationsMap {
    return state.notifications;
  },
});

const setters = remx.setters({
  setIDs(ids: string[]) {
    state.ids = ids;
  },

  setNotifications(notifications: NotificationsMap) {
    state.notifications = notifications;
    state.ids = Object.keys(notifications);
  },

  addNotification(notification: Notification) {
    state.notifications[notification.subID] = notification;
    state.ids.push(notification.subID);
  },

  removeNotification(subID: string) {
    const index = state.ids.indexOf(subID);

    state.ids.splice(index, 1);

    delete state.notifications[subID];
  },
});

export const NotificationsStore = {
  ...getters,
  ...setters,
};
