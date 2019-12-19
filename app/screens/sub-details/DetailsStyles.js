// @flow

import {StyleSheet} from 'react-native';
import type {Theme} from '../../utils/Types';
import Constants from '../../utils/Constants';

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
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
      marginBottom: 15,
    },

    name: {
      marginBottom: 10,
      ...theme.styles.mdWhiteText,
      ...theme.styles.bold,
    },

    costSection: {
      paddingTop: 30,
      paddingBottom: 35,
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

    colorPreview: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },

    deleteBtn: {
      paddingVertical: 15,
      backgroundColor: theme.colors.main,
      ...theme.styles.center,
    },
  });

export default stylesheet;
