// @flow

import AsyncStorage from '@react-native-community/async-storage';
import {SubscriptionsStore} from './Store';
import Subscription from '../../class-models/Subscription';
import Company from '../../class-models/Company';
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
        });

        subscriptions[subscription.id] = subscription;
      });

      SubscriptionsStore.setSubscriptions(subscriptions);
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

    SubscriptionsStore.deleteSubscription(subID);
  } catch (e) {
    console.warn('Subscription Actions: delete - error deleting', e);
  }
};

/**
 * Add a subscription.
 */
export const addSubscription = async (subscription: Subscription) => {
  try {
    await AsyncStorage.setItem(
      `sub:${subscription.id}`,
      JSON.stringify(subscription),
    );

    SubscriptionsStore.addSubscription(subscription);
  } catch (e) {
    console.warn('Subscription Actions: add - error adding', e);
  }
};
