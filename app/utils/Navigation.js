// @flow

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MySubscriptions from '../screens/my-subscriptions/MySubscriptions';

const NavStack = createNativeStackNavigator();

export const Navigation = (): React$Node => (
  <NavStack.Navigator>
    <NavStack.Screen name={'Subscriptions'} component={MySubscriptions} />
  </NavStack.Navigator>
);
