// @flow

import React from 'react';
import type {Element} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '../utils/hooks/useTheme';
import type {Theme} from '../utils/Types';

type Props = {
  uri: string,
  onAddPhoto: () => void,
};

const CustomLogo = ({uri, onAddPhoto}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  if (uri.length === 0) {
    return (
      <TouchableOpacity
        style={styles.placeholder}
        activeOpacity={0.8}
        onPress={onAddPhoto}>
        <Text style={styles.placeholderLabel}>Add Photo</Text>
      </TouchableOpacity>
    );
  }

  return <Image style={styles.logo} source={{uri}} resizeMode={'cover'} />;
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    placeholder: {
      width: 60,
      height: 60,
      padding: 4,
      borderRadius: 30,
      backgroundColor: theme.colors.soft1,
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
      marginBottom: 15,
    },
  });

export default CustomLogo;
