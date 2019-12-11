// @flow

import React from 'react';
import type {Element} from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Constants from '../../utils/Constants';

type Props = {
  selected: boolean,
  color: string,
  selectedColor: string,
  onPress: () => void,
};

const ColorGridItem = ({
  selected,
  color,
  selectedColor,
  onPress,
}: Props): Element<any> => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}>
      <View
        style={[
          styles.outer,
          {borderColor: selected ? selectedColor : 'transparent'},
        ]}>
        <View style={[styles.content, {backgroundColor: color}]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Constants.getWindowWidth() / 5,
    height: Constants.getWindowWidth() / 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  outer: {
    width: Constants.getWindowWidth() / 5 - 30,
    height: Constants.getWindowWidth() / 5 - 30,
    borderWidth: 2,
    borderRadius: Constants.getWindowWidth() / 5 - 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    width: Constants.getWindowWidth() / 5 - 40,
    height: Constants.getWindowWidth() / 5 - 40,
    borderRadius: Constants.getWindowWidth() / 5 - 40,
  },
});

export default ColorGridItem;
