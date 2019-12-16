// @flow

import AsyncStorage from '@react-native-community/async-storage';
import {SubscriptionsStore} from './Store';
import ErrorHandler from '../../utils/ErrorHandler';
import Subscription from '../../class-models/Subscription';
import Company from '../../class-models/Company';
import * as NotificationActions from '../notifications/Actions';
import ReminderInterval from '../../class-models/ReminderInterval';
import SubscriptionCycleInterval from '../../class-models/SubscriptionCycleInterval';
import Notification from '../../class-models/Notification';
import {SUBSCRIPTIONS} from '../../utils/Data';

/**
 * Set fixed subscriptions for first-time-users.
 * Entries are pre-fixed with 'sub:'.
 */
export const setFixedSubscriptions = async () => {
  try {
    const pairs = [];

    Object.keys(SUBSCRIPTIONS).forEach(subID => {
      const key = `sub:${subID}`;
      pairs.push([key, JSON.stringify(SUBSCRIPTIONS[subID])]);
    });

    console.log('pairs', pairs);

    await AsyncStorage.multiSet(pairs);
  } catch (e) {
    console.warn(
      'Subscription Actions: setFixed - error setting fixed subs',
      e,
    );
    SubscriptionsStore.setLoading(false);
  }
};

/**
 * Fetch user's subscriptions.
 */
export const fetchSubscriptions = async () => {
  let keys = [];

  // Get keys with proper prefix
  try {
    keys = await AsyncStorage.getAllKeys();

    if (keys) {
      keys = keys.filter(key => {
        const split = key.split(':');

        return split[0] === 'sub';
      });

      // TODO: add a stores comparator to use here
      keys.sort();
      console.log(keys);

      // await AsyncStorage.multiRemove(keys);
    } else {
      throw new Error('Could not get keys');
    }
  } catch (e) {
    console.warn(
      'Subscription Actions: fetchSubscriptions - error fetching',
      e,
    );
    SubscriptionsStore.setLoading(false);
    return;
  }

  let results = [];

  try {
    results = await AsyncStorage.multiGet(keys);

    if (results) {
      const subscriptions = {};

      results.forEach(sub => {
        const json = JSON.parse(sub[1]);

        const subscription = new Subscription({
          ...json,
          company: new Company({...json.company}),
          cycle: new SubscriptionCycleInterval({...json.cycle}),
          reminderInterval: new ReminderInterval({...json.reminderInterval}),
        });

        subscriptions[subscription.id] = subscription;
      });

      console.log('Subscription Actions: subscriptions', subscriptions);

      SubscriptionsStore.setSubscriptions(subscriptions);
      SubscriptionsStore.adjustTotalCost();
    } else {
      throw new Error('Could not get subscriptions');
    }
  } catch (e) {
    console.warn(
      'Subscription Actions: fetchSubscriptions - error fetching',
      e,
    );
    SubscriptionsStore.setLoading(false);
  }
};

/**
 * Remove a subscription using ID.
 */
export const removeSubscription = async (subID: string) => {
  try {
    await AsyncStorage.removeItem(`sub:${subID}`);

    // Remove corresponding Notification if it exists
    const hasReminder = SubscriptionsStore.getSubscriptionHasReminder(subID);

    if (hasReminder) {
      await NotificationActions.removeNotification(subID);
    }

    SubscriptionsStore.removeSubscription(subID);
    SubscriptionsStore.adjustTotalCost();
  } catch (e) {
    console.warn('Subscription Actions: delete - error deleting', e);
  }
};

/**
 * Add a subscription.
 */
export const addSubscription = async (
  subscription: Subscription,
): Promise<?boolean> => {
  const exists = SubscriptionsStore.exists(subscription.id);

  if (exists) {
    ErrorHandler.showAlert({
      title: 'Oops',
      message: 'Looks like a subscription with the same name already exists.',
      actions: [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
    });

    return false;
  }

  try {
    await AsyncStorage.setItem(
      `sub:${subscription.id}`,
      JSON.stringify(subscription),
    );

    console.log('Subscription Actions: add subscription', subscription);

    if (subscription.hasReminder) {
      const notification: Notification = subscription.generateNotification();

      console.log('Subscription Actions: notification', notification);

      await NotificationActions.addNotification(notification);
    }

    SubscriptionsStore.addSubscription(subscription);
    SubscriptionsStore.adjustTotalCost();

    return true;
  } catch (e) {
    console.warn('Subscription Actions: add - error adding', e);
  }
};

export const updateSubscription = async (subscription: Subscription) => {
  try {
    await AsyncStorage.mergeItem(
      `sub:${subscription.id}`,
      JSON.stringify(subscription),
    );

    console.log('Subscription Actions: update - subscription', subscription);

    const old: Subscription = SubscriptionsStore.getSubscriptionByID(
      subscription.id,
    );

    if (subscription.hasReminder) {
      if (
        !old.cycle.isEqual(subscription.cycle) ||
        !old.reminderInterval.isEqual(subscription.reminderInterval) ||
        old.firstPayment !== subscription.firstPayment
      ) {
        const notification: Notification = subscription.generateNotification();

        console.log(
          'Subscription Actions: update - notification',
          notification,
        );

        await NotificationActions.updateNotification(notification);
      }
    }

    SubscriptionsStore.updateSubscription(subscription);

    if (
      subscription.cost !== old.cost ||
      subscription.firstPayment !== old.firstPayment ||
      !subscription.cycle.isEqual(old.cycle)
    ) {
      SubscriptionsStore.adjustTotalCost();
    }
  } catch (e) {
    console.warn('Subscription Actions: update - error updating', e);
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

      SubscriptionsStore.setCostFilters(costTypeFilter, costIntervalFilter);
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
