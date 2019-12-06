// @flow

import React, {useState} from 'react';
import type {Element} from 'react';
import {View, Text} from 'react-native';
import stylesheet from './SubscriptionsStyles';
import {useTheme} from '../../utils/hooks/useTheme';
import SubscriptionsList from '../../components/lists/SubscriptionsList';

type Props = {
  navigation: any,
  route: any,
};

const MySubscriptions = ({navigation, route}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);
  const [count, setCount] = useState(0);

  return (
    <View style={theme.styles.container}>
      <SubscriptionsList />
    </View>
  );
};

export default MySubscriptions;
