// @flow

import AsyncStorage from '@react-native-community/async-storage';
import {AppStateStore} from './Store';
import {SubscriptionsStore} from '../subscriptions/Store';
import * as SubscriptionActions from '../subscriptions/Actions';
import Subscription from '../../class-models/Subscription';
import type {CostTypeFilter, CostIntervalFilter} from '../../utils/Types';

export const checkIfNewUser = async () => {
  try {
    const response = await AsyncStorage.getItem('isNewUser');

    if (response !== null) {
      const isNew = JSON.parse(response);

      console.log('App State Actions: isNew', isNew);

      AppStateStore.setIsNewUser(isNew);
    } else {
      await AsyncStorage.setItem('isNewUser', 'false');
    }

    await SubscriptionActions.fetchSubscriptions();

    AppStateStore.setLoading(false);
  } catch (e) {
    console.warn('App State Actions: error checking if new user', e);
    AppStateStore.setLoading(false);
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

  console.log(
    'AppState Actions: Cost interval',
    filterType,
    filterInterval,
    finalCost,
  );

  // let finalCost = 0;

  // const subscriptions = Object.values(SubscriptionsStore.getSubscriptions());

  // let exp1 = 0;

  // subscriptions.forEach(sub => {
  //   const daysInMonth = 365 / 12;
  // });

  // switch (filterType) {
  //   case 'Average':

  //     break;
  //   case 'Remaining':
  //     break;

  //   case 'Total':
  //     // finalCost = subscriptions.reduce((a, b) => a + b.cost, 0);
  //     break;
  //   default:
  //     console.warn('AppState Actions: invalid filter type', filterType);
  //     break;
  // }

  // AppStateStore.setCostTypeFilter(filterType);
  SubscriptionsStore.setTotalCost(finalCost);
};
