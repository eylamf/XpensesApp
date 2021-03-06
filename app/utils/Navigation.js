// @flow

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from './hooks/useTheme';
import MySubscriptions from '../screens/my-subscriptions/MySubscriptions';
import FixedSubscriptions from '../screens/fixed-subscriptions/FixedSubscriptions';
import SubscriptionDetails from '../screens/sub-details/SubscriptionDetails';
import CreateSubscription from '../screens/create-sub/CreateSubscription';
import ColorGrid from '../screens/color-grid/ColorGrid';
import ReceiptModal from '../screens/receipt-modal/ReceiptModal';

const SearchStack = createNativeStackNavigator();

const FixedSubscriptionsNav = (): React$Node => (
  <SearchStack.Navigator
    initialRouteName={'Search'}
    screenOptions={{
      borderRadius: 5,
      overflow: 'hidden',
    }}>
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
    <SearchStack.Screen
      name={'CreateNew'}
      component={CreateSubscription}
      options={{
        headerTitle: 'Custom',
      }}
    />
    <SearchStack.Screen
      name={'ColorGrid'}
      component={ColorGrid}
      options={{
        headerTitle: 'Colors',
      }}
    />
  </SearchStack.Navigator>
);

const NavStack = createNativeStackNavigator();

const stylesheet = () => {};

export const Navigation = (): React$Node => {
  const [theme] = useTheme(stylesheet);
  return (
    <NavStack.Navigator
      initialRouteName={'Subscriptions'}
      screenOptions={{
        contentStyle: {borderRadius: 5, overflow: 'hidden'},
      }}>
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
      <NavStack.Screen
        name={'ColorGrid'}
        component={ColorGrid}
        options={{
          headerTitle: 'Colors',
          presentation: 'modal',
        }}
      />
      <NavStack.Screen
        name={'ReceiptModal'}
        component={ReceiptModal}
        options={{
          animation: 'fade',
          presentation: 'transparentModal',
          contentStyle: {
            backgroundColor: 'transparent',
            borderRadius: 5,
            overflow: 'hidden',
          },
        }}
      />
    </NavStack.Navigator>
  );
};
