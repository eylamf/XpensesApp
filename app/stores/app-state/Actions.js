// @flow

import AsyncStorage from '@react-native-community/async-storage';
import {AppStateStore} from './Store';
import {SubscriptionsStore} from '../subscriptions/Store';
import Subscription from '../../class-models/Subscription';
import type {CostTypeFilter, CostIntervalFilter} from '../../utils/Types';
import * as SubscriptionActions from '../subscriptions/Actions';
import * as NotificationActions from '../notifications/Actions';

export const initialize = async () => {
  await checkIfNewUser();

  await fetchCostFilters();

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

export const fetchCostFilters = async () => {
  try {
    const response = await AsyncStorage.multiGet([
      'costTypeFilter',
      'costIntervalFilter',
    ]);

    if (response[0][1] != null && response[1][1] != null) {
      const costTypeFilter = response[0][1];
      const costIntervalFilter = response[1][1];

      AppStateStore.setCostFilters(costTypeFilter, costIntervalFilter);
    } else {
      // Set initial values
      const keyPairs = [
        ['costTypeFilter', 'Exact'],
        ['costIntervalFilter', 'This Month'],
      ];

      await AsyncStorage.multiSet(keyPairs);
    }
  } catch (e) {
    console.warn('AppState Actions: error fetching cost filters', e);
  }
};

export const adjustFinalCost = (
  filterType: CostTypeFilter,
  filterInterval: CostIntervalFilter,
) => {
  let finalCost = 0;

  SubscriptionsStore.getIDs().forEach(subID => {
    const sub: Subscription = SubscriptionsStore.getSubscriptionByID(subID);

    finalCost += sub.getCostForFilters(filterType, filterInterval);
  });

  AppStateStore.setCostFilters(filterType, filterInterval);
  SubscriptionsStore.setTotalCost(finalCost);
};
