// @flow

import AsyncStorage from '@react-native-community/async-storage';
import {AppStateStore} from './Store';
import * as SubscriptionActions from '../subscriptions/Actions';
import * as NotificationActions from '../notifications/Actions';

export const initialize = async () => {
  await checkIfNewUser();

  await SubscriptionActions.fetchCostFilters();

  await SubscriptionActions.fetchSubscriptions();

  await NotificationActions.fetchNotifications();

  NotificationActions.registerForPushNotifications();

  AppStateStore.setLoading(false);
};

export const checkIfNewUser = async () => {
  try {
    const response = await AsyncStorage.getItem('isNewUser');

    if (response !== null) {
      const isNew = JSON.parse(response);

      AppStateStore.setIsNewUser(isNew);
    } else {
      // Set initial value
      await AsyncStorage.setItem('isNewUser', 'false');
    }
  } catch (e) {
    console.warn('App State Actions: error checking if new user', e);
  }
};
