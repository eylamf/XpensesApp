// @flow

import React from 'react';
import type {Element} from 'react';
import {View, Text, StatusBar} from 'react-native';
import stylesheet from './DetailsStyles';
import {useTheme} from '../../utils/hooks/useTheme';
import SubDetailsHeader from '../../components/headers/SubDetailsHeader';
import Subscription from '../../class-models/Subscription';

type Props = {
  navigation: any,
  route: any,
};

const SubscriptionDetails = ({navigation, route}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const subscription: Subscription = route.params.subscription;

  return (
    <>
      <StatusBar barStyle={'light-content'} animated />
      <View style={theme.styles.container}>
        <SubDetailsHeader
          color={subscription.company.color}
          title={subscription.company.name}
        />
      </View>
    </>
  );
};

export default SubscriptionDetails;
