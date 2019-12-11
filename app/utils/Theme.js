// @flow

import {StyleSheet} from 'react-native';
import type {Theme, ColorMap} from './Types';

export const COLORS: ColorMap = {
  light: {
    primary: 'rgb(110, 197, 235)',
    primaryDark: 'rgb(204, 63, 87)',
    secondary: '',
    accent: '',
    main: 'rgb(255, 255, 255)',
    soft: 'rgb(244, 246, 247)',
    soft1: 'rgb(233, 240, 242)',
    soft2: 'rgb(209, 219, 222)',
    soft3: 'rgb(174, 180, 189)',
    opposite: 'rgb(57, 60, 64)',
    white: 'rgb(255, 255, 255)',
    black: 'rgb(0, 0, 0)',
  },

  dark: {
    primary: 'rgb(110, 197, 235)',
    primaryDark: 'rgb(204, 63, 87)',
    secondary: '',
    accent: '',
    main: 'rgb(0, 0, 0)',
    soft: 'rgb(20, 20, 26)',
    soft1: 'rgb(38, 42, 48)',
    soft2: 'rgb(51, 56, 64)',
    soft3: 'rgb(96, 102, 110)',
    opposite: 'rgb(255, 255, 255)',
    white: 'rgb(255, 255, 255)',
    black: 'rgb(0, 0, 0)',
  },
};

function STYLES(id: 'light' | 'dark') {
  return StyleSheet.create({
    flexOne: {flex: 1},

    container: {
      flex: 1,
      backgroundColor: COLORS[id].main,
    },

    softContainer: {
      flex: 1,
      backgroundColor: COLORS[id].soft,
    },

    padding: {padding: 15},

    text: {
      color: COLORS[id].opposite,
      fontSize: 13,
    },

    smText: {
      color: COLORS[id].opposite,
      fontSize: 10,
    },

    mdText: {
      color: COLORS[id].opposite,
      fontSize: 18,
    },

    lgText: {
      color: COLORS[id].opposite,
      fontSize: 28,
    },

    lightText: {
      color: COLORS[id].soft3,
      fontSize: 13,
    },

    smLightText: {
      color: COLORS[id].soft3,
      fontSize: 10,
    },

    mdLightText: {
      color: COLORS[id].soft3,
      fontSize: 18,
    },

    lgLightText: {
      color: COLORS[id].soft3,
      fontSize: 28,
    },

    whiteText: {
      color: COLORS[id].white,
      fontSize: 13,
    },

    mdWhiteText: {
      color: COLORS[id].white,
      fontSize: 18,
    },

    smWhiteText: {
      color: COLORS[id].white,
      fontSize: 10,
    },

    lgWhiteText: {
      color: COLORS[id].white,
      fontSize: 28,
    },

    opText: {
      color: COLORS[id].main,
      fontSize: 13,
    },

    mdOpText: {
      color: COLORS[id].main,
      fontSize: 18,
    },

    smOpText: {
      color: COLORS[id].main,
      fontSize: 10,
    },

    primaryText: {
      color: COLORS[id].primary,
      fontSize: 13,
    },

    smPrimaryText: {
      color: COLORS[id].primary,
      fontSize: 10,
    },

    mdPrimaryText: {
      color: COLORS[id].primary,
      fontSize: 18,
    },

    bold: {fontWeight: '600'},

    bolder: {fontWeight: 'bold'},

    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}

export function generateTheme(id: 'light' | 'dark'): Theme {
  const oppositeID = id === 'light' ? 'dark' : 'light';

  return {
    id,
    oppositeID,
    colors: COLORS[id],
    styles: STYLES(id),
  };
}

/**
 * Add opacity to a color by creating an rgba value from an rgb
 * @param {*} color - color in the form rgb(... ... ...)
 * @param {*} opacity - opacity value (0 - 1)
 */
export function convertColorToOpacity(color: string, opacity: number): string {
  const rgb = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  let r = '';
  let b = '';
  let g = '';

  if (rgb && rgb.length === 4) {
    r = rgb[1];
    g = rgb[2];
    b = rgb[3];
  } else {
    return color;
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
