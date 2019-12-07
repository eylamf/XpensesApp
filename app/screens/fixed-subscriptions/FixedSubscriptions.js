// @flow

import React, {useCallback, useLayoutEffect} from 'react';
import type {Element} from 'react';
import {View, Text} from 'react-native';
import stylesheet from './FixedStyles';
import {useTheme} from '../../utils/hooks/useTheme';
import Subscription from '../../class-models/Subscription';
import FixedSubscriptionsList from '../../components/lists/FixedSubscriptionsList';

type Props = {
  navigation: any,
  route: any,
};

const MySubscriptions = ({navigation, route}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'All Subscriptions',
    });
  }, [navigation]);

  const onSubscriptionPress = useCallback((subscription: Subscription) => {
    navigation.navigate('SubDetails', {subscription, isAddMode: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={theme.styles.container}>
      <Text style={theme.styles.text} onPress={() => navigation.goBack()}>Close</Text>
      <FixedSubscriptionsList onItemPress={onSubscriptionPress} />
    </View>
  );
};

export default MySubscriptions;
