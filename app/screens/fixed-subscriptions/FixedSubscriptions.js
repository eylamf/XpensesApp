// @flow

import React, {useState} from 'react';
import type {Element} from 'react';
import {View, Text} from 'react-native';
import stylesheet from './FixedStyles';
import {useTheme} from '../../utils/hooks/useTheme';
import FixedSubscriptionsList from '../../components/lists/FixedSubscriptionsList';

type Props = {
  navigation: any,
  route: any,
};

const MySubscriptions = ({navigation, route}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  return (
    <View style={theme.styles.container}>
      <FixedSubscriptionsList />
    </View>
  );
};

export default MySubscriptions;
