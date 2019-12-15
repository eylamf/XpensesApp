// @flow

import React from 'react';
import type {Element} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '../utils/hooks/useTheme';
import type {Theme} from '../utils/Types';

type Props = {
  style: Object | Object[],
  uri: number | string,
  onAddPhoto: () => void,
  isAddMode: boolean,
  initials: string,
  rounded: boolean,
  bgColor?: string,
};

const CustomLogo = ({
  style,
  uri,
  onAddPhoto,
  isAddMode,
  initials,
  rounded,
  bgColor,
}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  if (typeof uri === 'string' && uri.length === 0) {
    if (isAddMode) {
      return (
        <TouchableOpacity
          style={styles.placeholder}
          activeOpacity={0.8}
          onPress={onAddPhoto}>
          <Text style={styles.placeholderLabel} allowFontScaling={false}>
            Add Photo
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={StyleSheet.compose(
            [styles.initialsPlaceholder, {backgroundColor: bgColor}],
            style,
          )}>
          <Text style={theme.styles.mdOpText} allowFontScaling={false}>
            {initials}
          </Text>
        </View>
      );
    }
  }

  return (
    <Image
      style={StyleSheet.compose(
        [styles.logo, rounded ? {borderRadius: 30} : null],
        style,
      )}
      source={typeof uri === 'number' ? uri : {uri}}
      resizeMode={'cover'}
    />
  );
};

CustomLogo.defaultProps = {
  style: {},
  uri: {uri: ''},
  onAddPhoto: () => {},
  isAddMode: false,
  initials: '',
  rounded: false,
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    placeholder: {
      width: 60,
      height: 60,
      padding: 4,
      borderRadius: 30,
      backgroundColor:
        theme.id === 'light' ? theme.colors.main : theme.colors.soft1,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.soft3,
      marginBottom: 15,
      ...theme.styles.center,
    },

    placeholderLabel: {
      textAlign: 'center',
      ...theme.styles.smText,
    },

    logo: {
      width: 60,
      height: 60,
    },

    initialsPlaceholder: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.soft1,
      ...theme.styles.center,
    },
  });

export default CustomLogo;
