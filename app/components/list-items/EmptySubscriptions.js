// @flow

import React from 'react';
import type {Element} from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  textStyle: any,
};

const EmptySubscriptions = ({textStyle}: Props): Element<any> => {
  return (
    <View style={styles.container}>
      <Text style={textStyle}>Nothing to show</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmptySubscriptions;
