// @flow

import React, {useCallback} from 'react';
import type {Element} from 'react';
import {View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import stylesheet from './SubscriptionsStyles';
import {useTheme} from '../../utils/hooks/useTheme';
import Subscription from '../../class-models/Subscription';
import SubscriptionsList from '../../components/lists/SubscriptionsList';
import SubscriptionsCostFooter from '../../components/headers/SubscriptionsCostFooter';
import LargeTitle from '../../components/headers/LargeTitle';

type Props = {
  navigation: any,
  route: any,
};

const PLUS = require('../../../assets/Plus.png');

const MySubscriptions = ({navigation, route}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const onGoToFixed = () => {
    navigation.navigate('FixedSubscriptions');
  };

  const onSubscriptionPress = useCallback(
    (subscription: Subscription) => {
      navigation.navigate('SubDetails', {subscription, isAddMode: false});
    },
    [navigation],
  );

  const onShowReceipt = () => {
    navigation.navigate('ReceiptModal');
  };

  return (
    <View style={theme.styles.container}>
      <LargeTitle
        title={'Subscriptions'}
        rightComponent={
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={onGoToFixed}
            hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}>
            <Image style={styles.addIcon} source={PLUS} resizeMode={'cover'} />
          </TouchableOpacity>
        }
      />
      {/* <Text style={[theme.styles.text, {marginTop: 30}]} onPress={onGoToFixed}>
        Go to fixed
      </Text> */}
      <SubscriptionsList onItemPress={onSubscriptionPress} />
      <SubscriptionsCostFooter onShowReceipt={onShowReceipt} />
    </View>
  );
};

export default MySubscriptions;
