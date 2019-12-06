// @flow

import AsyncStorage from '@react-native-community/async-storage';
import {AppStateStore} from './Store';
import * as SubscriptionActions from '../subscriptions/Actions';

export const checkIfNewUser = async () => {
  try {
    const response = await AsyncStorage.getItem('isNewUser');

    if (response !== null) {
      const isNew = JSON.parse(response);

      console.log('App State Actions: isNew', isNew);

      AppStateStore.setIsNewUser(isNew);
    } else {
      await AsyncStorage.setItem('isNewUser', 'false');

      await SubscriptionActions.setFixedSubscriptions();
    }

    AppStateStore.setLoading(false);
  } catch (e) {
    console.warn('App State Actions: error checking if new user', e);
    AppStateStore.setLoading(false);
  }
};
