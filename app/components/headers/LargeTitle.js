// @flow

import React from 'react';
import type {Element} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';
import Constants from '../../utils/Constants';
import Row from '../Row';

type Props = {
  title: string,
  rightComponent: ?Element<any>,
};

const LargeTitle = React.memo<any>(
  ({title, rightComponent}: Props): Element<any> => {
    const insets = useSafeArea();
    const [theme, styles] = useTheme(stylesheet);

    return (
      <Row
        style={[
          styles.container,
          {paddingTop: insets.top + Constants.getNavbarHeight() / 2},
        ]}>
        <Text style={styles.title} maxFontSizeMultiplier={1}>
          {title}
        </Text>
        {rightComponent}
      </Row>
    );
  },
);

// LargeTitle.defaultProps = {rightComponent: null};

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 15,
      paddingBottom: 10,
      backgroundColor: theme.colors.main,
    },

    title: {
      flex: 1,
      ...theme.styles.lgText,
      ...theme.styles.bolder,
      fontSize: 30,
      paddingBottom: 5,
    },
  });

export default LargeTitle;
