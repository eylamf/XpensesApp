// @flow

import React from 'react';
import type {Element} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/hooks/useTheme';
import Row from '../Row';

type Props = {
  color: string,
  title: string,
};

const SubDetailsHeader = ({color, title}: Props): Element<any> => {
  const insets = useSafeArea();
  const [theme, styles] = useTheme(stylesheet);

  return (
    <Row style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Row>
  );
};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 80,
    },

    left: {
      width: 80,
      justifyContent: 'center',
    },

    center: {
      flex: 1,
      ...theme.styles.center,
    },

    title: {
      ...theme.styles.text,
      ...theme.styles.bold,
    },

    right: {
      width: 80,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  });

export default SubDetailsHeader;
