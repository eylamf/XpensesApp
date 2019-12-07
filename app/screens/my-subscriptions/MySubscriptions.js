// @flow

import React, {useCallback} from 'react';
import type {Element} from 'react';
import {View, Text} from 'react-native';
import stylesheet from './SubscriptionsStyles';
import {useTheme} from '../../utils/hooks/useTheme';
import Subscription from '../../class-models/Subscription';
import SubscriptionsList from '../../components/lists/SubscriptionsList';

type Props = {
  navigation: any,
  route: any,
};

const MySubscriptions = ({navigation, route}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const onGoToFixed = () => {
    navigation.navigate('FixedSubscriptions');
  };

  const onSubscriptionPress = useCallback(
    (subscription: Subscription) => {
      navigation.navigate('SubDetails', {subscription, isAdd: false});
    },
    [navigation],
  );

  return (
    <View style={theme.styles.container}>
      <Text style={theme.styles.text} onPress={onGoToFixed}>
        Go to fixed
      </Text>
      <SubscriptionsList onItemPress={onSubscriptionPress} />
    </View>
  );
};

export default MySubscriptions;
