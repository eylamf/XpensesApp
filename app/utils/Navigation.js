// @flow

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MySubscriptions from '../screens/my-subscriptions/MySubscriptions';
import FixedSubscriptions from '../screens/fixed-subscriptions/FixedSubscriptions';

const NavStack = createNativeStackNavigator();

export const Navigation = (): React$Node => (
  <NavStack.Navigator>
    <NavStack.Screen name={'Subscriptions'} component={MySubscriptions} />
    <NavStack.Screen
      name={'FixedSubscriptions'}
      component={FixedSubscriptions}
    />
  </NavStack.Navigator>
);
