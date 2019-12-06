// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';

type Props = {
  style?: any,
  children: React$Node,
  alignment: 'center' | 'flex-end' | 'flex-start',
};

const Row = ({style, children, alignment}: Props): React$Node => {
  return (
    <View
      style={StyleSheet.compose(
        [styles.container, {alignItems: alignment}],
        style,
      )}>
      {children}
    </View>
  );
};

Row.defaultProps = {
  alignment: 'center',
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
});

export default Row;
