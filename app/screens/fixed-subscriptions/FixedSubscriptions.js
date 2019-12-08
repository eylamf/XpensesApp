// @flow

import React, {useCallback, useLayoutEffect} from 'react';
import type {Element} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
      headerTintColor: theme.colors.opposite,
      headerTitleStyle: {color: null},
      headerTitle: 'All Subscriptions',
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Text style={theme.styles.text}>Close</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, styles.headerBtn, theme.colors.opposite, theme.styles.text]);

  const onSubscriptionPress = useCallback((subscription: Subscription) => {
    navigation.navigate('SubDetails', {subscription, isAddMode: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={theme.styles.container}>
      {/* <Text style={theme.styles.text} onPress={() => navigation.goBack()}>Close</Text> */}
      <FixedSubscriptionsList onItemPress={onSubscriptionPress} />
    </View>
  );
};

export default MySubscriptions;
