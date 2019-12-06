// @flow

import {StyleSheet} from 'react-native';
import type {Theme} from '../../utils/Types';

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
    },
  });

export default stylesheet;
