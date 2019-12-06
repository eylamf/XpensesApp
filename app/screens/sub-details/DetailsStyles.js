// @flow

import {StyleSheet} from 'react-native';
import type {Theme} from '../../utils/Types';
import Constants from '../../utils/Constants';

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
    },

    headerRight: {
      height: 24,
      paddingLeft: 40,
      ...theme.styles.center,
    },

    listContent: {backgroundColor: theme.colors.main},

    top: {
      paddingTop: Constants.getStatusBarHeight() + Constants.getNavbarHeight(),
      ...theme.styles.center,
    },

    logo: {
      width: 60,
      height: 60,
      tintColor: theme.colors.white,
      marginBottom: 15,
    },

    name: {
      marginBottom: 10,
      ...theme.styles.mdWhiteText,
      ...theme.styles.bold,
    },

    costSection: {
      paddingTop: 30,
      paddingBottom: 30,
      ...theme.styles.center,
    },

    costContainer: {
      height: 40,
      paddingHorizontal: 15,
      borderRadius: 5,
      alignSelf: 'center',
    },

    costInput: {
      marginLeft: 2,
      letterSpacing: 1,
      marginRight: -1,
      ...theme.styles.mdWhiteText,
    },
  });

export default stylesheet;
