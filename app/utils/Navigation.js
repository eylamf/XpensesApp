// @flow

import React from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from './hooks/useTheme';
import MySubscriptions from '../screens/my-subscriptions/MySubscriptions';
import FixedSubscriptions from '../screens/fixed-subscriptions/FixedSubscriptions';
import SubscriptionDetails from '../screens/sub-details/SubscriptionDetails';

const SearchStack = createNativeStackNavigator();

const FixedSubscriptionsNav = (): React$Node => (
  <SearchStack.Navigator initialRouteName={'Search'}>
    <SearchStack.Screen
      name={'Search'}
      component={FixedSubscriptions}
      options={{
        headerShown: false,
      }}
    />
    <SearchStack.Screen
      name={'SubDetails'}
      component={SubscriptionDetails}
      options={{
        // headerTransparent: true,
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

const stylesheet = () => {};

export const Navigation = (): React$Node => {
  const [theme] = useTheme(stylesheet);
  return (
    <NavStack.Navigator initialRouteName={'Subscriptions'}>
      <NavStack.Screen
        name={'Subscriptions'}
        component={MySubscriptions}
        options={{headerShown: false}}
      />
      <NavStack.Screen
        name={'FixedSubscriptions'}
        component={FixedSubscriptionsNav}
        options={{
          animation: 'fade',
          presentation: 'transparentModal',
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
};
