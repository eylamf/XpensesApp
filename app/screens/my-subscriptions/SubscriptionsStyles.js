// @flow

import {StyleSheet} from 'react-native';
import type {Theme} from '../../utils/Types';

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
    },

    addBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.soft1,
      ...theme.styles.center,
    },

    addIcon: {
      width: 15,
      height: 15,
      tintColor: theme.colors.opposite,
    },
  });

export default stylesheet;
