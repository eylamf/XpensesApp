// @flow

import React from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MySubscriptions from '../screens/my-subscriptions/MySubscriptions';
import FixedSubscriptions from '../screens/fixed-subscriptions/FixedSubscriptions';
import SubscriptionDetails from '../screens/sub-details/SubscriptionDetails';

const SearchStack = createNativeStackNavigator();

const FixedSubscriptionsNav = (): React$Node => (
  <SearchStack.Navigator initialRouteName={'Search'}>
    <SearchStack.Screen name={'Search'} component={FixedSubscriptions} />
    <SearchStack.Screen
      name={'SubDetails'}
      component={SubscriptionDetails}
      options={{
        headerStyle: {backgroundColor: 'transparent'},
        headerTranslucent: true,
        headerTintColor: 'rgb(255, 255, 255)',
        headerTitle: '',
        headerBackTitle: 'All',
      }}
    />
  </SearchStack.Navigator>
);

const NavStack = createNativeStackNavigator();

export const Navigation = (): React$Node => (
  <NavStack.Navigator initialRouteName={'Subscriptions'}>
    <NavStack.Screen name={'Subscriptions'} component={MySubscriptions} />
    <NavStack.Screen
      name={'FixedSubscriptions'}
      component={FixedSubscriptionsNav}
      options={{
        animation: 'fade',
        presentation: 'transparentModal',
        contentStyle: {backgroundColor: 'transparent'},
      }}
    />
    <NavStack.Screen
      name={'SubDetails'}
      component={SubscriptionDetails}
      options={{
        presentation: 'modal',
      }}
    />
  </NavStack.Navigator>
);
