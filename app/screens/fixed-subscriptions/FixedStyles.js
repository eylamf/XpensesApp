// @flow

import {StyleSheet} from 'react-native';
import type {Theme} from '../../utils/Types';

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    headerBtn: {
      height: 24,
      paddingRight: 30,
    },
  });

export default stylesheet;
