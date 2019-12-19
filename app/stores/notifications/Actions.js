// @flow

import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import {NotificationsStore} from './Store';
import Notification from '../../class-models/Notification';

export const registerForPushNotifications = () => {
  console.log('Notification Actions: called register for push notifications');
  PushNotification.configure({
    onNotification: notif => {
      console.log('RECEIVED NOTIFICATION IN-APP', notif);
      notif.finish(PushNotification.FetchResult.NoData);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
  });
};

/**
 * Fetch saved notifications.
 * Entries are pre-fixed with 'notif:'.
 */
export const fetchNotifications = async () => {
  let keys,
    results = [];

  // Get keys with proper prefix
  try {
    keys = await AsyncStorage.getAllKeys();

    // await AsyncStorage.multiRemove(keys);
    // PushNotification.cancelAllLocalNotifications();

    if (keys) {
      keys = keys.filter(key => {
        const split = key.split(':');

        return split[0] === 'notif';
      });

      console.log('Notification Actions: notif keys', keys);
    } else {
      throw new Error('Could not get notification keys');
    }
  } catch (e) {
    console.warn('Notification Actions: error fetching notification keys', e);
  }

  try {
    results = await AsyncStorage.multiGet(keys);

    if (results) {
      const notifications = {};

      results.forEach(notif => {
        const json = JSON.parse(notif[1]);

        const notification = new Notification({...json});

        notifications[notification.subID] = notification;
      });

      console.log('Notification Actions: all notifications', notifications);

      NotificationsStore.setNotifications(notifications);
    } else {
      throw new Error('Could not fetch notification values');
    }
  } catch (e) {
    console.warn('Notification Actions: error setting notification results', e);
  }
};

/**
 * Add a notification.
 */
export const addNotification = async (notification: Notification) => {
  console.log('Notification Actions: add notification', notification);
  try {
    await AsyncStorage.setItem(
      `notif:${notification.subID}`,
      JSON.stringify(notification),
    );

    // iOS
    PushNotification.localNotificationSchedule({
      date: new Date(notification.fireDate),
      title: notification.title,
      message: notification.message,
      playSound: true,
      soundName: 'default',
      repeatType: notification.repeatType,
      repeatTime: notification.repeatTime,
      userInfo: {id: notification.subID},
    });

    NotificationsStore.addNotification(notification);
  } catch (e) {
    console.warn('Notification Actions: error adding notification', e);
  }
};

/**
 * Remove a notification by ID.
 */
export const removeNotification = async (subID: string) => {
  try {
    await AsyncStorage.removeItem(`notif:${subID}`);

    // iOS
    PushNotification.cancelLocalNotifications({id: subID});

    NotificationsStore.removeNotification(subID);
  } catch (e) {
    console.warn(
      `Notification Actions: error removing notification with id ${subID}`,
      e,
    );
  }
};

export const updateNotification = async (notification: Notification) => {
  try {
    await AsyncStorage.mergeItem(
      `notif:${notification.subID}`,
      JSON.stringify(notification),
    );

    await removeNotification(notification.subID);
    await addNotification(notification);
  } catch (e) {
    console.warn(
      `Notification Actions: error updating notification with id ${
        notification.subID
      }`,
      e,
    );
  }
};
