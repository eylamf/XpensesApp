// @flow

import React from 'react';
import type {Element} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';
import Constants from '../../utils/Constants';
import Row from '../Row';
import LineDivider from '../LineDivider';

type Props = {
  onDone: () => void,
  onClose: () => void,
};

const ColorGridHeader = ({onDone, onClose}: Props): Element<any> => {
  const [theme, styles] = useTheme(stylesheet);

  const insets = useSafeArea();

  return (
    <>
      <View style={{height: 0}} />
      <Row style={styles.container}>
        <View style={styles.left}>
          <TouchableOpacity
            style={styles.headerBtn}
            activeOpacity={0.8}
            onPress={onClose}>
            <Text style={theme.styles.text}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={theme.styles.flexOne} />
        <View style={styles.right}>
          <TouchableOpacity
            style={styles.headerBtn}
            activeOpacity={0.8}
            onPress={onDone}>
            <Text style={styles.doneLabel}>Done</Text>
          </TouchableOpacity>
        </View>
      </Row>
      <LineDivider color={theme.colors.soft1} />
    </>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: Constants.getNavbarHeight(),
      paddingHorizontal: 15,
    },

    left: {
      width: 100,
      height: Constants.getNavbarHeight(),
      justifyContent: 'center',
    },

    right: {
      width: 100,
      height: Constants.getNavbarHeight(),
      alignItems: 'flex-end',
      justifyContent: 'center',
    },

    doneLabel: {
      ...theme.styles.text,
      ...theme.styles.bold,
    },
  });

export default ColorGridHeader;
