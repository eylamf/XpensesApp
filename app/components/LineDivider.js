// @flow

import React from 'react';
import type {Element} from 'react';
import {View, StyleSheet} from 'react-native';

type Props = {
  leftSpace: number,
  color: string,
};

const LineDivider = ({leftSpace, color}: Props): Element<any> => (
  <View
    style={[styles.container, {marginLeft: leftSpace, backgroundColor: color}]}
  />
);

LineDivider.defaultProps = {leftSpace: 0};

const styles = StyleSheet.create({
  container: {height: StyleSheet.hairlineWidth},
});

export default LineDivider;
