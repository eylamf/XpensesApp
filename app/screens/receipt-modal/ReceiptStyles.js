// @flow

import {StyleSheet} from 'react-native';
import type {Theme} from '../../utils/Types';
import Constants from '../../utils/Constants';
import {convertColorToOpacity} from '../../utils/Theme';

export const MODAL_WIDTH = Constants.getWindowWidth() - 60;
export const MODAL_HEIGHT = Constants.getWindowHeight() * 0.67;

const stylesheet = (theme: Theme) => {
  const isLight = theme.id === 'light';
  const color = isLight ? theme.colors.black : theme.colors.soft3;
  const opacity = isLight ? 0.5 : 0.3;

  return StyleSheet.create({
    container: {
      flex: 1,
      ...theme.styles.center,
    },

    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: convertColorToOpacity(color, opacity),
    },

    content: {
      width: MODAL_WIDTH,
      maxHeight: MODAL_HEIGHT,
      borderRadius: 5,
      backgroundColor: theme.colors.main,
    },

    header: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },

    title: {
      paddingLeft: 15,
      marginBottom: 10,
      ...theme.styles.smLightText,
    },

    closeBtn: {
      width: 80,
      height: 30,
      justifyContent: 'center',
    },

    closeIcon: {
      width: 18,
      height: 18,
      transform: [{rotate: '45deg'}],
      tintColor: theme.colors.opposite,
    },

    titleContainer: {
      flex: 2,
      ...theme.styles.center,
    },
  });
};

export default stylesheet;
