// @flow

import React from 'react';
import type {Element} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

type Props = {
  subscriptionID: string,
};

const SubscriptionItem = ({
  subscriptionID,
}: Props): Element<any> => {
  return (
    <View>
      <Text>{subscriptionID}</Text>
    </View>
  );
};

export default SubscriptionItem;
